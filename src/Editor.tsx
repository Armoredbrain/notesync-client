import React, { useCallback } from "react";
import "./styles.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript, typescriptLanguage } from "@codemirror/lang-javascript";
import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { Socket } from "socket.io-client";

const theme = createTheme({
    theme: "dark",
    settings: {
        background: "#001022",
        foreground: "#ffaa00",
        caret: "#00ff00",
        selection: "#ffff0026",
        selectionMatch: "#fff00126",
        lineHighlight: "#ffff0010",
        gutterBackground: "#000111",
        gutterForeground: "#fffaaa",
    },
    styles: [
        { tag: t.comment, color: `${"#9DAAB8"}99` }, // comment
        { tag: t.variableName, color: "#8D709D" }, // toto foo bar
        { tag: [t.string, t.special(t.brace)], color: "#6A8759" }, // string value
        { tag: t.number, color: "#5C83FC" }, // number value
        { tag: t.bool, color: "#CB5732" }, // boolean value
        { tag: t.null, color: "#CC7832", fontWeight: "bold" }, // null value
        { tag: t.keyword, color: "#CC7832", fontWeight: "bold" }, // let ...
        { tag: t.operator, color: "#9DAAB8" }, // + - *
        { tag: t.typeName, color: "#FDC56B" }, // Record<string, unknown>
        { tag: t.className, color: "#FAC64B" }, // class Toto
        { tag: t.definition(t.typeName), color: "#FFC111" }, // T, K
        { tag: t.angleBracket, color: "#00FF00" }, // ?
        { tag: t.tagName, color: "#FF0000" }, // ?
        { tag: t.attributeName, color: "#FFD222" }, // ?
        { tag: t.constant(t.typeName), color: "##FFE333" }, // T, K
    ],
});

interface EditorProps {
    socket: Socket;
    content: string;
}

// TODO: implement syntax highlighting for TS
const Editor = ({ socket, content }: EditorProps): React.JSX.Element => {
    const onChange = useCallback((data: string) => {
        socket.emit("note-update", data);
    }, []);

    return (
        <CodeMirror
            value={content}
            height="100%"
            extensions={[javascript({ typescript: true }), typescriptLanguage]}
            theme={theme}
            onChange={onChange}
        />
    );
};
export default Editor;

// interface User {
//     name: string
//   }

//   function greet(name: string): string {
//     return `hello`
//   }

//   function transformNamesIntoUsers(names: string[]): User[] {
//     return names.reduce((users: User[], name: string) => {
//       users.push({name})
//       return user
//     }, [])
//   }

//   describe("transformNamesIntoUsers", () => {
//     test("should return a users array", () => {
//       expect(transformNamesIntoUsers(["toto", "tutu"]).toEqual([
//         {
//           name: "toto"
//         },
//         {
//           name: "tutu"
//         }
//       ]))
//     })
//   })
