# 奧林匹亞數學知識庫 (Olympiad Mathematics Hub)

本專案收錄並整理了奧林匹亞數學（IMO 體系）的完整知識架構、核心領域、解題思維與競賽路徑，並提供 Markdown 知識筆記與現代化互動網頁。

---

## 專案結構

- [olympiad_mathematics.md](file:///Users/mmm/AntiG/OMath/olympiad_mathematics.md)：完整的奧林匹亞數學 Markdown 彙整筆記。
- [index.html](file:///Users/mmm/AntiG/OMath/index.html)：現代化互動網頁首頁。
- [styles.css](file:///Users/mmm/AntiG/OMath/styles.css)：響應式樣式表，支援深淺色主題切換、流體字體排印與 KaTeX 數學公式呈現。
- [app.js](file:///Users/mmm/AntiG/OMath/app.js)：網頁互動邏輯（KaTeX 公式渲染、領域篩選、路徑切換、滾動定位監聽）。

---

## 如何預覽網頁

您可以直接在瀏覽器中雙擊開啟 [index.html](file:///Users/mmm/AntiG/OMath/index.html)，或使用 Python 快速啟動本地靜態伺服器：

```bash
# 在此目錄下啟動本地伺服器
python3 -m http.server 8000
```

接著在瀏覽器打開：`http://localhost:8000` 即可體驗完整的互動網頁。
