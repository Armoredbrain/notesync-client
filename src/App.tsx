import "./styles.css";
import { io } from "socket.io-client";
import Editor from "./Editor";
import SocketWrapper from "./SocketWrapper";

function App() {
  const socket = io("127.0.0.1:7777", {
    transports: ["websocket"],
  });

  return <SocketWrapper socket={socket} />;
}
export default App;
