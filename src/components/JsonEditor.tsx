import React, { useCallback, useEffect, useRef } from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { Button } from "antd";

type Props = {
  json?: string;
  setJson: (value: string) => void;
};

const JsonEditor = ({ json, setJson }: Props) => {
  const cmRef = useRef<ReactCodeMirrorRef>(null);
  const [code, setCode] = React.useState(JSON.stringify(json));
  const [message, setMessage] = React.useState("");
  const [linebar, setLinebar] = React.useState("");

  const handleJson = useCallback(() => {
    setMessage("");
    try {
      if (code) {
        const obj = JSON.parse(code);
        setJson(obj);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        setJson(undefined);
      } else {
        throw error;
      }
    }
  }, [code]);
  const formatJson = useCallback(
    (_: any, replacer = 2) => {
      setMessage("");
      try {
        if (code) {
          const obj = JSON.parse(code);
          const str = JSON.stringify(obj, null, replacer);
          setCode(str);
        }
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
          setJson(undefined);
        } else {
          throw error;
        }
      }
    },
    [code]
  );

  const codeMirrorOnUpdate = (cm: any) => {
    const { selection } = cm.state;
    const line = cm.view.state.doc.lineAt(selection.main.from);
    setLinebar(
      `Line ${line.number}/${cm.state.doc.lines}, Column ${
        cm.state.selection.main.head - line.from + 1
      }`
    );
    const text = cm.state.sliceDoc(selection.main.from, selection.main.to);
    if (text) {
      if (selection.ranges.length > 1) {
        setLinebar(`${selection.ranges.length} selection regions`);
      } else {
        setLinebar(
          `${text.split("\n").length} lines, ${text.length} characters selected`
        );
      }
    }
  };

  useEffect(() => {
    handleJson();
  }, [code, handleJson]);

  return (
    <div className="w-full min-w-[230px] h-full relative bg-[rgb(245, 245, 245)]">
      <div className="flex items-center justify-between py-1 pl-3 text-xs">
        <div>{linebar && <span> {linebar} </span>}</div>
        {message && (
          <div className="p-1 px-2 ml-3 text-white bg-red-600 rounded-sm">
            {message}
          </div>
        )}
        {!message && (
          <div>
            <Button size="small" onClick={formatJson}>
              Format
            </Button>
          </div>
        )}
      </div>
      <div className="box-border h-full overflow-auto">
        <CodeMirror
          value={code}
          ref={cmRef}
          height="100%"
          className="h-full"
          extensions={[langs.json()]}
          onUpdate={(cm) => codeMirrorOnUpdate(cm)}
          onChange={setCode}
        />
      </div>
    </div>
  );
};

export default JsonEditor;
