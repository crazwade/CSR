const lessonKey: string[] = ['JS網頁前端工程入門', 'Nodejs開發', '資料庫管理和開發'];

const lessonProcess: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const lessonContent: Record<string, {
  key: string;
  lessonName: string;
  lessonContent: string;
}[]> = {
  JS網頁前端工程入門: [
    {
      key: 'L1',
      lessonName: '變數與運算子',
      lessonContent: '介紹 JavaScript 變數的宣告、型別、運算子，以及數值、字串、布林等基本資料型別的運算。'
    },
    {
      key: 'L2',
      lessonName: '流程控制',
      lessonContent: '學習 if...else 判斷式、迴圈 (for, while) 等流程控制語句，用於控制程式執行的流程。'
    },
    {
      key: 'L3',
      lessonName: '函式基礎',
      lessonContent: '認識函式的定義、呼叫、參數、回傳值，以及函式的作用域。'
    },
    {
      key: 'L4',
      lessonName: 'DOM 操作',
      lessonContent: '學習如何操作 HTML 文件中的元素，包括取得元素、修改屬性、改變樣式、新增或刪除元素等。'
    },
    {
      key: 'L5',
      lessonName: '物件基礎',
      lessonContent: '介紹 JavaScript 物件的概念，包括物件的建立、屬性、方法，以及原型繼承。'
    },
    {
      key: 'L6',
      lessonName: '事件處理',
      lessonContent: '學習如何為 HTML 元素綁定事件監聽器，當事件發生時執行指定的 JavaScript 程式碼。'
    },
    {
      key: 'L7',
      lessonName: '網頁基礎',
      lessonContent: '回顧 HTML、CSS 的基礎概念，並結合 JavaScript 建構簡單的網頁。'
    },
    {
      key: 'L8',
      lessonName: '網頁應用',
      lessonContent: '開發互動式網頁應用程式，例如：簡易計算機、待辦事項清單、線上遊戲等。'
    },
    {
      key: 'L9',
      lessonName: '網頁框架',
      lessonContent: '介紹常見的網頁框架 (如 React, Vue, Angular) 的基本概念與優勢，並實作簡單的專案。'
    },
    {
      key: 'L10',
      lessonName: '自動排程',
      lessonContent: '利用 JavaScript 定時執行任務，例如：自動更新網頁內容、製作簡單的動畫效果。'
    },
    {
      key: 'L11',
      lessonName: '陣列物件',
      lessonContent: '學習 JavaScript 陣列的建立、存取、操作，以及常用方法 (map, filter, reduce) 的應用。'
    },
    {
      key: 'L12',
      lessonName: '網際網路簡介',
      lessonContent: '介紹網路的基本概念，如 TCP/IP、HTTP 協定、URL 等。'
    },
    {
      key: 'L13',
      lessonName: '網際網路基礎',
      lessonContent: '學習如何使用 JavaScript 發送 HTTP 請求，取得伺服器上的資料。'
    },
    {
      key: 'L14',
      lessonName: '網際網路應用',
      lessonContent: '開發與伺服器互動的網頁應用程式，例如：登入系統、資料查詢。'
    },
    {
      key: 'L15',
      lessonName: '網際網路框架',
      lessonContent: '介紹常見的後端框架 (如 Node.js, Express) 的基本概念與優勢，並實作簡單的 API。'
    }
  ],
  Nodejs開發: [
    {
      key: 'L1',
      lessonName: 'Node.js 入門與環境建置',
      lessonContent: '介紹 Node.js 的概念、優勢，以及如何安裝 Node.js 與 npm。建立第一個 Node.js 程式，並了解 CommonJS 模組系統。'
    },
    {
      key: 'L2',
      lessonName: 'JavaScript 重溫與進階',
      lessonContent: '回顧 JavaScript 的基礎語法，並深入探討函式、物件、原型繼承、非同步程式設計 (async/await, Promise) 等進階概念。'
    },
    {
      key: 'L3',
      lessonName: 'Express.js 快速上手',
      lessonContent: '介紹 Express.js 框架，建立 Express 伺服器，處理 HTTP 請求，並使用路由、中間件來組織應用程式。'
    },
    {
      key: 'L4',
      lessonName: '模板引擎 (Pug, EJS)',
      lessonContent: '學習使用模板引擎動態生成 HTML，讓後端可以更方便地渲染網頁。'
    },
    {
      key: 'L5',
      lessonName: '資料庫整合 (MongoDB)',
      lessonContent: '介紹 MongoDB 資料庫的基本操作，包括建立資料庫、集合、文件，以及使用 Mongoose ODM 與 Node.js 進行互動。'
    },
    {
      key: 'L6',
      lessonName: '資料驗證與錯誤處理',
      lessonContent: '學習使用 middleware 進行資料驗證，並處理常見的錯誤，例如 404 Not Found、500 Internal Server Error。'
    },
    {
      key: 'L7',
      lessonName: 'RESTful API 設計',
      lessonContent: '了解 RESTful API 的設計原則，並使用 Express.js 實作 CRUD 操作的 API。'
    },
    {
      key: 'L8',
      lessonName: '檔案上傳與處理',
      lessonContent: '學習如何處理使用者上傳的檔案，包括檔案儲存、驗證、縮圖等。'
    },
    {
      key: 'L9',
      lessonName: 'WebSocket 實時通訊',
      lessonContent: '介紹 WebSocket 協定，並使用 Socket.IO 實現即時通訊功能，例如聊天室。'
    },
    {
      key: 'L10',
      lessonName: '安全性與防護',
      lessonContent: '了解常見的 Web 安全性問題，如 XSS、CSRF、SQL Injection，並學習如何防範。'
    },
    {
      key: 'L11',
      lessonName: '部署 Node.js 應用程式',
      lessonContent: '介紹如何將 Node.js 應用程式部署到雲端平台 (如 Heroku, AWS)，並進行環境配置。'
    },
    {
      key: 'L12',
      lessonName: '測試驅動開發 (TDD)',
      lessonContent: '學習使用 Jest 或 Mocha 等測試框架，撰寫單元測試，確保程式碼品質。'
    },
    {
      key: 'L13',
      lessonName: '效能優化',
      lessonContent: '探討 Node.js 程式的效能瓶頸，並學習如何優化程式碼，提升應用程式的性能。'
    },
    {
      key: 'L14',
      lessonName: '進階主題：微服務架構',
      lessonContent: '介紹微服務架構的概念，並使用 Node.js 實現簡單的微服務。'
    },
    {
      key: 'L15',
      lessonName: '實戰專案：開發一個完整的 Node.js 應用程式',
      lessonContent: '綜合前述所學，帶領學員開發一個完整的 Node.js 應用程式，例如部落格系統、待辦事項清單等。'
    }
  ],
  資料庫管理和開發: [
    {
      key: 'L1',
      lessonName: '資料庫基礎概念與MySQL簡介',
      lessonContent: '介紹資料庫的基本概念，如表格、欄位、記錄、關聯性等。深入了解MySQL的特性、優勢，以及在市場上的地位。'
    },
    {
      key: 'L2',
      lessonName: 'MySQL安裝與環境配置',
      lessonContent: '詳細介紹MySQL在不同作業系統上的安裝步驟，以及如何配置MySQL伺服器、設定使用者權限。'
    },
    {
      key: 'L3',
      lessonName: 'MySQL Workbench使用',
      lessonContent: '介紹MySQL Workbench這個圖形化管理工具，如何建立連線、執行SQL指令、視覺化資料庫結構。'
    },
    {
      key: 'L4',
      lessonName: 'SQL語法基礎(DQL)',
      lessonContent: '學習SELECT語句，用於查詢資料，包含條件查詢、排序、分組、聚合函數等。'
    },
    {
      key: 'L5',
      lessonName: 'SQL語法基礎(DML)',
      lessonContent: '學習INSERT、UPDATE、DELETE語句，用於新增、修改、刪除資料。'
    },
    {
      key: 'L6',
      lessonName: 'SQL語法基礎(DDL)',
      lessonContent: '學習CREATE、ALTER、DROP語句，用於建立、修改、刪除資料庫物件，如資料表、索引、視圖等。'
    },
    {
      key: 'L7',
      lessonName: '資料庫設計與正規化',
      lessonContent: '介紹資料庫設計的原則，如第一正規化、第二正規化、第三正規化，以及如何設計實體關係圖(ER圖)。'
    },
    {
      key: 'L8',
      lessonName: 'MySQL索引',
      lessonContent: '深入了解索引的原理，如何建立索引，以及索引的優缺點。'
    },
    {
      key: 'L9',
      lessonName: 'MySQL視圖',
      lessonContent: '介紹視圖的概念，如何建立視圖，以及視圖在簡化查詢和保護資料方面的應用。'
    },
    {
      key: 'L10',
      lessonName: 'MySQL存儲過程與函數',
      lessonContent: '學習存儲過程和函數的語法和用法，如何將複雜的業務邏輯封裝起來。'
    },
    {
      key: 'L11',
      lessonName: 'MySQL觸發器',
      lessonContent: '介紹觸發器的概念，如何建立觸發器，以及觸發器在資料一致性維護方面的應用。'
    },
    {
      key: 'L12',
      lessonName: 'MySQL資料備份與恢復',
      lessonContent: '學習MySQL的備份與恢復工具和方法，確保資料安全。'
    },
    {
      key: 'L13',
      lessonName: 'MySQL性能優化',
      lessonContent: '介紹MySQL性能優化的各種方法，包括索引優化、查詢優化、參數調優等。'
    },
    {
      key: 'L14',
      lessonName: 'MySQL高可用性與叢集',
      lessonContent: '介紹MySQL的主從複製、叢集等高可用性方案，確保資料庫服務的連續性。'
    },
    {
      key: 'L15',
      lessonName: 'MySQL實務專案',
      lessonContent: '透過一個完整的實務專案，將所學的知識應用到實際開發中，例如開發一個簡單的購物網站後台。'
    }
  ],
};

const classBehavior: {
  [key: string]: string[];
} = {
  一般: [
    '作品雖然出一些小問題，但在老師的指導下能夠做出一些改進，最終完成了一個令人滿意的作品。',
    '雖然作品遇到了一些困難，但經過一些努力和耐心，最終成功克服了挑戰並呈現出了一個不錯的成果。',
    '在作品的創作過程中碰到了一些障礙，但通過細心的觀察和嘗試，順利找到解決方案，並呈現出了具有想像力的作品。',
    '作品可能有一些需要改進的地方，但學生能夠非常專注地進行修改，最終經過努力完成了。',
    '遇到問題時會比較害羞不敢提問，不過經過老師引導和給予提示，就能順利處理問題並完成作品。',
    '遇到問題會想要獨立處理，進而花掉較多的時候，建議可以適時舉手向老師提問，來接受老師的引導。',
  ],
  優秀: [
    '這週在課堂上表現出色，努力參與討論並且提出了很多有深度的問題，展現了優異的創意能力。',
    '在本週的課程中，展現了積極的態度，並且能夠清楚地表達自己的觀點和想法。',
    '本週的課堂投入度很高，特別在小組活動中展現了團隊合作的精神，對於老師的建議也能夠耐心傾聽並接受。',
    '在課堂中表現得非常自信，能夠在同學和老師面前展示自己的作品，並且流利的解釋創意的靈感。',
    '在課堂上展現出優異的問題解決能力，能夠迅速理解難題並提出具體的解決方案，讓人印象深刻。',
    '在本週課程中展現了很高的創意天賦，作品設計獨具特色，並且能夠用簡單明瞭的方式向老師解釋自己的構想。',
    '表現得非常主動，積極參與老師提出的挑戰，並且能夠迅速掌握新的概念和技能。',
    '展現了優秀的溝通能力，能夠用清晰的語言向同學和老師解釋自己的想法和觀點。',
    '在課堂上能夠很好地運用所學的知識和技能，展現出了對於課程內容的理解和應用能力。',
    '對於課堂展現出十分的熱情，作品製作過程中也會主動與老師討論，吸收建議後完成不錯的作品。',
  ],
};

const classBehaviorKey: string[] = ['一般', '優秀'];

export {
  lessonKey, lessonProcess, lessonContent, classBehavior, classBehaviorKey,
};
