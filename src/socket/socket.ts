import { io } from 'socket.io-client';

const serverUrl = 'http://192.168.86.229:3001'; // 伺服器的目標為本地的 3001 port

const socket = io(serverUrl, {
  path: '/socket', // 設定與後端相對應的路徑
  withCredentials: true, // 啟用傳送和接收 cookie
});

/** 連接 */
const connect = () => {
  socket.connect();
};

// 監聽如果中斷連線
socket.on('disconnect', async () => {
  connect();
});

// 監聽訊息
socket.on('message', (payload: {
  code: string,
  msg: string
}) => {
  const {
    code, msg,
  } = payload;

  console.log(msg);

  if (code !== '0001') {
    // TODO 失敗處理
    console.log(msg);
  }
});

export default { connect };
