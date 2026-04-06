import { NextRequest, NextResponse } from 'next/server';
import fetchContentType from '@/app/lib/strapi/fetchContentType';

/**
 * 通用的 Strapi Content Type API Route
 * 
 * 使用方式：
 * - GET /api/artworks?pagination[page]=1&pagination[pageSize]=20
 * - GET /api/artists?populate=artworks&filters[name][$contains]=王
 * - GET /api/events?sort[0]=date:desc&locale=zh-TW
 * 
 * 支援的參數格式：
 * - pagination[page], pagination[pageSize]
 * - filters[field][operator] (自動解析 JSON)
 * - populate (字串或物件，自動解析)
 * - sort[0], sort[1], ...
 * - fields[0], fields[1], ...
 * - locale
 * - spreadData=true (回傳單筆資料)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contentType: string }> }
) {
  try {
    const { contentType } = await params;
    const searchParams = request.nextUrl.searchParams;

    // 構建 Strapi 查詢參數
    const strapiParams: Record<string, any> = {};

    // 1. 處理 pagination
    const page = searchParams.get('pagination[page]');
    const pageSize = searchParams.get('pagination[pageSize]');
    if (page || pageSize) {
      strapiParams.pagination = {
        ...(page && { page: parseInt(page) }),
        ...(pageSize && { pageSize: parseInt(pageSize) })
      };
    }

    // 2. 處理 filters（支援 JSON 格式或 bracket notation）
    const filtersParam = searchParams.get('filters');
    if (filtersParam) {
      try {
        strapiParams.filters = JSON.parse(filtersParam);
      } catch {
        // 如果不是 JSON，使用 bracket notation 解析
        const filters: Record<string, any> = {};
        searchParams.forEach((value, key) => {
          if (key.startsWith('filters[')) {
            const matches = key.match(/filters\[(.*?)\](?:\[(.*?)\])?/);
            if (matches) {
              const [, field, operator] = matches;
              let parsedValue: any;
              try {
                parsedValue = JSON.parse(value);
              } catch {
                parsedValue = value;
              }
              if (operator) {
                filters[field] = { [operator]: parsedValue };
              } else {
                filters[field] = parsedValue;
              }
            }
          }
        });
        if (Object.keys(filters).length > 0) {
          strapiParams.filters = filters;
        }
      }
    }

    // 3. 處理 populate
    const populateParam = searchParams.get('populate');
    if (populateParam) {
      try {
        // 嘗試解析 JSON 格式的 populate
        strapiParams.populate = JSON.parse(populateParam);
      } catch {
        // 如果不是 JSON，使用原始值（例如 "populate=*"）
        strapiParams.populate = populateParam;
      }
    }

    // 4. 處理 sort（支援 JSON 格式或 bracket notation）
    const sortParam = searchParams.get('sort');
    if (sortParam) {
      try {
        strapiParams.sort = JSON.parse(sortParam);
      } catch {
        const sortArray: string[] = [];
        searchParams.forEach((value, key) => {
          if (key.startsWith('sort[')) sortArray.push(value);
        });
        if (sortArray.length > 0) strapiParams.sort = sortArray;
      }
    }

    // 5. 處理 fields（支援 JSON 格式或 bracket notation）
    const fieldsParam = searchParams.get('fields');
    if (fieldsParam) {
      try {
        strapiParams.fields = JSON.parse(fieldsParam);
      } catch {
        const fieldsArray: string[] = [];
        searchParams.forEach((value, key) => {
          if (key.startsWith('fields[')) fieldsArray.push(value);
        });
        if (fieldsArray.length > 0) strapiParams.fields = fieldsArray;
      }
    }

    // 6. 處理 locale
    const locale = searchParams.get('locale');
    if (locale) {
      strapiParams.locale = locale;
    }

    // 7. 處理 spreadData
    const spreadData = searchParams.get('spreadData') === 'true';

    // Fetch 資料
    const response = await fetchContentType(
      contentType,
      strapiParams,
      spreadData
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

