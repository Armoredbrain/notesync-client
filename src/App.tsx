import "./styles.css";
import { io } from "socket.io-client";
import SocketWrapper from "./SocketWrapper";
import React from "react";

function App(): React.JSX.Element {
    const socket = io("127.0.0.1:7777", {
        transports: ["websocket"],
    });

    return <SocketWrapper socket={socket} />;
}
export default App;
