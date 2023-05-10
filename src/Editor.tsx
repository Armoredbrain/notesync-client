import { ReactElement, useCallback } from "react";
import "./styles.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { Socket, io } from "socket.io-client";

const grey = "#9DAAB8";
const blue = "#5C83FC";
const orange = "#CB7832";
const brightOrange = "#CC7832";
const violet = "#8D709D";
const green = "#6A8759";
const dullYellow = "#FCC56B";

const theme = createTheme({
  theme: "dark",
  settings: {
    background: "#001022",
    foreground: "#ffaa00",
    caret: "#00ff00",
    selection: "#ffff0026",
    selectionMatch: "#fff00026",
    lineHighlight: "#ffff0010",
    gutterBackground: "#000111",
    gutterForeground: "#fffaaa",
  },
  styles: [
    { tag: t.comment, color: `${grey}99` }, // comment
    { tag: t.variableName, color: violet }, // toto foo bar
    { tag: [t.string, t.special(t.brace)], color: green }, // string value
    { tag: t.number, color: blue }, // number value
    { tag: t.bool, color: orange }, // boolean value
    { tag: t.null, color: brightOrange, fontWeight: "bold" }, // null value
    { tag: t.keyword, color: brightOrange, fontWeight: "bold" }, // let ...
    { tag: t.operator, color: grey }, // + - *
    { tag: t.typeName, color: dullYellow }, // Record<string, unknown>
    { tag: t.className, color: dullYellow }, // class Toto
    { tag: t.definition(t.typeName), color: "#000fff" }, // ?
    { tag: t.angleBracket, color: "#00ff00" }, // ?
    { tag: t.tagName, color: "#ff0000" }, // ?
    { tag: t.attributeName, color: "#fff000" }, // ?
    { tag: t.constant(t.typeName), color: "#0000ff" }, // ?
  ],
});

interface EditorProps {
  socket: Socket;
  content: string;
}

const Editor = ({ socket, content }: EditorProps): ReactElement => {
  const onChange = useCallback((data: string) => {
    socket.emit("note-update", data);
  }, []);

  return (
    <CodeMirror
      value={content}
      height="100%"
      extensions={[javascript({ typescript: true })]}
      theme={theme}
      onChange={onChange}
    />
  );
};
export default Editor;
