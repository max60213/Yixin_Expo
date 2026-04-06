### TL;DR（給 Cursor）
這是一個 **Next.js 前端** 專案，連接 **Strapi v5** 的 Headless API，提供**多語系**的藝術品採證／驗證平台介面。  
重點頁面包含：作品／系列詳情、驗證頁、公私有檔案的展示與搜尋、以及角色化的儀表板。

---

## Git Commit Message 規則

本專案遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 規範，並使用**繁體中文**撰寫 commit 描述。

### 基本格式

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit 類型（Type）

- **`feat`**：新增功能（correlates with MINOR in SemVer）
- **`fix`**：修復 bug（correlates with PATCH in SemVer）
- **`docs`**：文件變更
- **`style`**：程式碼格式調整（不影響功能）
- **`refactor`**：重構程式碼
- **`perf`**：效能優化
- **`test`**：測試相關
- **`chore`**：建置流程或工具變更
- **`ci`**：CI/CD 相關

### 規則說明

1. **類型與描述**：
   - 類型必須為英文（`feat`, `fix` 等）
   - 冒號後的空格後，描述內容**使用繁體中文**
   - 描述應簡潔明確，說明這次 commit 做了什麼

2. **Scope（選填）**：
   - 可選的範圍標示，用括號包圍
   - 例如：`feat(card): 新增活動卡片元件`

3. **Body（選填）**：
   - 在描述後空一行，提供更詳細的說明
   - 使用繁體中文撰寫

4. **Footer（選填）**：
   - 例如：`BREAKING CHANGE:`、`Closes #123` 等
   - `BREAKING CHANGE:` 必須全大寫，後面接繁體中文描述

5. **Breaking Changes**：
   - 在類型後加 `!`：`feat!: 重構認證系統`
   - 或在 footer 中：`BREAKING CHANGE: 移除舊版 API 支援`

### 範例

```bash
# 新增功能
feat(card): 新增活動卡片元件

# 修復 bug
fix(navigation): 修正行動版導航列顯示問題

# 文件更新
docs: 更新專案架構說明文件

# 帶有 body 的 commit
feat(api): 實作作品查詢 API

新增支援多條件篩選、排序功能，並優化查詢效能。

# Breaking change
feat!: 重構認證系統

BREAKING CHANGE: 移除舊版 token 驗證方式，請更新客戶端程式碼

# 帶 scope
fix(card): 修正卡片在手機版面的排版問題
refactor(components): 重構卡片元件結構
```

### 注意事項

- Commit 訊息的第一行（標題）限制在 50 字以內為佳
- 使用現在式、祈使語氣（例如：「新增」而非「新增了」）
- 避免使用「更新」、「修改」等模糊詞彙，應具體說明變更內容
- 如有關聯的 issue，可在 footer 中使用 `Closes #123` 或 `Refs: #123`

### 參考資源

- [Conventional Commits 規範](https://www.conventionalcommits.org/en/v1.0.0/)
- [Semantic Versioning](https://semver.org/)  