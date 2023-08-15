# 學生紀錄管理系統 (Classroom Student Record)

這個專案是一個用來協助管理學生紀錄的應用程式，主要功能包括新增學生、選擇教室、使用 drag and draw 操作學生位置、選擇課程內容以及填寫課程完成紀錄等。

## 功能特點

- 新增學生：在課程開始前，您可以輕鬆地新增學生的名字
- 拖曳操作：使用 拖曳功能 將學生的名字拖曳到對應的位置上，實現視覺化的學生管理。
- 課程選擇：在每個位置上，您可以選擇該次上課的課程內容，以便更好地統計和記錄學生的學習進度。
- 自動生成課程紀錄：在課程完成時，系統會經過填入的資訊來自動生成課堂紀錄。

## 技術棧

- Vue 3：前端框架
- Element Plus：UI 庫
- Vite：快速開發工具
- TypeScript：程式語言
- ESLint：程式碼風格檢查
- vuedraggable：實現拖曳功能的套件

## 資料結構

```bash
csr/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── store/
│   │   ├── data.ts // 課程資料存放區
│   │   └── studentStore.ts // Pinia 狀態管理庫
│   ├── views/
│   │   ├── ...
│   ├── App.vue
│   ├── main.ts
│   └── ...
├── package.json
├── tsconfig.json
└── ...

```
