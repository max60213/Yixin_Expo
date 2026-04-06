"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo, ReactNode } from "react";
import { useSession } from "next-auth/react";
import qs from "qs";

// ==================== Types ====================

interface CollectionsContextValue {
  collections: Record<string, string[]>;
  isInitialized: boolean;
  isAuthenticated: boolean;
  isCollected: (relation: string, documentId: string) => boolean;
  addCollect: (relation: string, documentId: string) => Promise<boolean>;
  removeCollect: (relation: string, documentId: string) => Promise<boolean>;
  toggleCollect: (relation: string, documentId: string) => void;
}

const CollectionsContext = createContext<CollectionsContextValue | null>(null);

// ==================== Provider ====================

interface CollectionsProviderProps {
  children: ReactNode;
  relations?: string[];
}

/**
 * 收藏狀態 Provider - 集中管理使用者的所有收藏狀態
 */
export function CollectionsProvider({
  children,
  relations = ['artworks']
}: CollectionsProviderProps) {
  const { data: session, status } = useSession();
  const [collections, setCollections] = useState<Record<string, string[]>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // 穩定化 relations 陣列
  const stableRelations = useMemo(
    () => relations,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(relations)]
  );

  // 初始化：從 Strapi 獲取使用者的收藏列表
  useEffect(() => {
    if (status === "loading") return;

    if (!session?.jwt) {
      setCollections({});
      setIsInitialized(true);
      return;
    }

    const abortController = new AbortController();

    const fetchCollections = async () => {
      try {
        const populateObj: Record<string, { fields: string[] }> = {};
        for (const relation of stableRelations) {
          populateObj[relation] = { fields: ['documentId'] };
        }

        const queryString = qs.stringify({ populate: populateObj }, { encodeValuesOnly: true });
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me?${queryString}`,
          {
            headers: { Authorization: `Bearer ${session.jwt}` },
            signal: abortController.signal,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const newCollections: Record<string, string[]> = {};
          for (const relation of stableRelations) {
            newCollections[relation] = (data[relation] || []).map((item: any) => item.documentId);
          }
          setCollections(newCollections);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        console.error('[Collections] 獲取收藏失敗:', error);
      } finally {
        if (!abortController.signal.aborted) {
          setIsInitialized(true);
        }
      }
    };

    fetchCollections();
    return () => abortController.abort();
  }, [session?.jwt, status, stableRelations]);

  const isCollected = useCallback(
    (relation: string, documentId: string) => collections[relation]?.includes(documentId) ?? false,
    [collections]
  );

  const addCollect = useCallback(
    async (relation: string, documentId: string): Promise<boolean> => {
      if (!session?.jwt) return false;

      // 樂觀更新
      setCollections(prev => ({
        ...prev,
        [relation]: [...(prev[relation] || []), documentId]
      }));

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/me`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.jwt}`,
            },
            body: JSON.stringify({ [relation]: { connect: [documentId] } }),
          }
        );

        if (!response.ok) {
          // 回滾
          setCollections(prev => ({
            ...prev,
            [relation]: (prev[relation] || []).filter(id => id !== documentId)
          }));
          alert("收藏失敗，請稍後再試");
          return false;
        }
        return true;
      } catch (error) {
        console.error("[Collections] 新增收藏異常:", error);
        setCollections(prev => ({
          ...prev,
          [relation]: (prev[relation] || []).filter(id => id !== documentId)
        }));
        alert("收藏失敗，請稍後再試");
        return false;
      }
    },
    [session?.jwt]
  );

  const removeCollect = useCallback(
    async (relation: string, documentId: string): Promise<boolean> => {
      if (!session?.jwt) return false;

      // 樂觀更新
      setCollections(prev => ({
        ...prev,
        [relation]: (prev[relation] || []).filter(id => id !== documentId)
      }));

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/me`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.jwt}`,
            },
            body: JSON.stringify({ [relation]: { disconnect: [documentId] } }),
          }
        );

        if (!response.ok) {
          // 回滾
          setCollections(prev => ({
            ...prev,
            [relation]: [...(prev[relation] || []), documentId]
          }));
          alert("取消收藏失敗，請稍後再試");
          return false;
        }
        return true;
      } catch (error) {
        console.error("[Collections] 移除收藏異常:", error);
        setCollections(prev => ({
          ...prev,
          [relation]: [...(prev[relation] || []), documentId]
        }));
        alert("取消收藏失敗，請稍後再試");
        return false;
      }
    },
    [session?.jwt]
  );

  const toggleCollect = useCallback(
    (relation: string, documentId: string) => {
      if (isCollected(relation, documentId)) {
        removeCollect(relation, documentId);
      } else {
        addCollect(relation, documentId);
      }
    },
    [isCollected, addCollect, removeCollect]
  );

  const value: CollectionsContextValue = {
    collections,
    isInitialized,
    isAuthenticated: !!session?.jwt,
    isCollected,
    addCollect,
    removeCollect,
    toggleCollect,
  };

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
}

// ==================== Hook ====================

/**
 * 使用收藏功能的 Hook
 * 
 * @example
 * const { isCollected, toggleCollect } = useCollections('artworks');
 * <button onClick={() => toggleCollect(documentId)}>
 *   {isCollected(documentId) ? '已收藏' : '收藏'}
 * </button>
 */
export function useCollections(relation: string) {
  const context = useContext(CollectionsContext);

  if (!context) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }

  const { collections, isInitialized, isAuthenticated, ...fns } = context;

  return {
    collections: collections[relation] || [],
    isInitialized,
    isAuthenticated,
    isCollected: useCallback((id: string) => fns.isCollected(relation, id), [fns, relation]),
    addCollect: useCallback((id: string) => fns.addCollect(relation, id), [fns, relation]),
    removeCollect: useCallback((id: string) => fns.removeCollect(relation, id), [fns, relation]),
    toggleCollect: useCallback((id: string) => fns.toggleCollect(relation, id), [fns, relation]),
  };
}
