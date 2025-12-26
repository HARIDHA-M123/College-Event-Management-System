import { io } from "socket.io-client";
const URL = "http://localhost:4000";
let socket;
function initSocket() {
  if (!socket) socket = io(URL);
  return socket;
}
function getSocket() {
  return socket;
}
var stdin_default = { initSocket, getSocket };
export {
  stdin_default as default,
  getSocket,
  initSocket
};
