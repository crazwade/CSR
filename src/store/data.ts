const classRoomKey = [
  "麥塊初階班",
  "麥塊進階班",
  "麥塊綜合應用班"
];

const lessonContent = {
  "麥塊初階班": [
    {
      key: "L1",
      lessonName: "認識麥塊",
      lessonContent: "課程內容著重於學生對於麥塊的三度空間操作練習以及適應上課所需要的教學系統。"
    },
    {
      key: "L2",
      lessonName: "認識 Agent",
      lessonContent: "課程內容為認識程式機器人(Agent)與程式的序列概念，並將積木程式應用在建造圍牆與樓梯。"
    },
    {
      key: "L3",
      lessonName: "螺旋樓梯",
      lessonContent: "課程內容為程式的迴圈概念，透過簡化相同重複的程式碼來達到建造螺旋樓梯，從原本需要六十個程式積木減少到只需要十個就可以完成作品。"
    },
    {
      key: "L4",
      lessonName: "建造高塔",
      lessonContent: "課程內容為程式的迴圈概念，利用上次課程(L3)學到的迴圈概念，來製作高塔的建築物，活用學到的程式概念來完成作品。"
    },
    {
      key: "L5",
      lessonName: "引爆 TNT",
      lessonContent: "課程內容為程式的布林值概念，利用麥塊中的「TNT炸彈」搭配布林值true/false的程式概念，來製作轟炸機器人進行快速挖礦和整地。"
    },
    {
      key: "L6",
      lessonName: "農夫 Agent",
      lessonContent: "課程內容為程式的條件式概念(if/else)，利用麥塊中的「種田系統」透過程式機器人(Agent)來製作農夫程式碼，當沒有種子(if)就去拿種子，反之(else)就繼續種植的動作。"
    },
    {
      key: "L7",
      lessonName: "發射煙火",
      lessonContent: "課程內容為特殊物品製作，利用麥塊中的「合成系統」製作煙火並利用之前學習過的程式概念來讓程式機器人(Agent)來施放煙火。"
    },
    {
      key: "L8",
      lessonName: "鵝卵石生產線",
      lessonContent: "課程內容為特殊機關製作，利用麥塊中的「鵝卵石生成系統」透過迴圈機器人(Agent)操作普通活賽來取得生成的鵝卵石。"
    },
    {
      key: "L9",
      lessonName: "TNT 大砲",
      lessonContent: "課程內容為特殊機關製作，利用麥塊中的「TNT延遲爆炸效果」利用程式機器人(Agent)並使用之前學習過的程式概念製作出TNT的發射器。"
    },
    {
      key: "L10",
      lessonName: "火焰發射器",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L11",
      lessonName: "紅石電路",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L12",
      lessonName: "自動販賣機",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L13",
      lessonName: "自動化生產線",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L14",
      lessonName: "雲霄飛車",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L15",
      lessonName: "自動化農作物收割機",
      lessonContent: "課程內容為測試================================================。"
    },
  ],
  "麥塊進階班": [
    {
      key: "L1",
      lessonName: "觀察者自動農場",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L2",
      lessonName: "金字塔守衛",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L3",
      lessonName: "美妙音符方塊",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L4",
      lessonName: "智能大考驗",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L5",
      lessonName: "藥水魔法師",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L6",
      lessonName: "麥田圈印表機",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L7",
      lessonName: "狩獵遊戲",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L8",
      lessonName: "超人換裝間",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L9",
      lessonName: "猜拳遊戲",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L10",
      lessonName: "彩色隱藏門",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L11",
      lessonName: "秘密圖書館",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L12",
      lessonName: "解謎達人",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L13",
      lessonName: "快速傳輸器",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L14",
      lessonName: "計時跑酷賽",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L15",
      lessonName: "成功破關王",
      lessonContent: "課程內容為測試================================================。"
    }
  ],
  "麥塊綜合應用班": [
    {
      key: "L1",
      lessonName: "攤販製造機",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L2",
      lessonName: "中央噴水池",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L3",
      lessonName: "遊戲攤販",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L4",
      lessonName: "壽司攤販",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L5",
      lessonName: "商店街導覽員",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L6",
      lessonName: "射箭運動會",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L7",
      lessonName: "超級障礙賽",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L8",
      lessonName: "怪物闖關賽",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L9",
      lessonName: "幸運跑酷賽",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L10",
      lessonName: "急速礦車手",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L11",
      lessonName: "雙人大富翁",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L12",
      lessonName: "機會與命運",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L13",
      lessonName: "道具商店",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L14",
      lessonName: "星星兌換站",
      lessonContent: "課程內容為測試================================================。"
    },
    {
      key: "L15",
      lessonName: "大富翁機制",
      lessonContent: "課程內容為測試================================================。"
    }
  ]
};

export { classRoomKey, lessonContent };
