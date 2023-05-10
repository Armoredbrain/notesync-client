import { ReactElement, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Editor from "./Editor";

interface SocketWrapperProps {
  socket: Socket;
}

const SocketWrapper = ({ socket }: SocketWrapperProps): ReactElement => {
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.on("incoming-data", (data) => {
      setContent(data);
    });
    return () => {
      socket.off("incoming-data");
    };
  }, []);
  return <Editor socket={socket} content={content} />;
};
export default SocketWrapper;
