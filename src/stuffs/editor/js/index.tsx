
import { useState, useEffect, useCallback } from "react";
import { IAceEditor } from "react-ace/lib/types";

import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";
import htmlParser from "prettier/parser-html";
import { RequiredOptions } from "prettier";

import 'ace-builds';
import Editor from "react-ace";
import languageTools from "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-keybinding_menu";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/worker-javascript";
import "ace-builds/src-noconflict/keybinding-vscode";
import "ace-builds/src-noconflict/ext-spellcheck";
import 'ace-builds/src-noconflict/ext-static_highlight';
import 'ace-builds/src-noconflict/ext-emmet';
import 'ace-builds/src-noconflict/ext-whitespace';



interface JsEditorProps {
  code: string;
  onChange: (value: string) => void;
}

const prettierConfig:Partial<RequiredOptions> = {
  parser:'babel',
  plugins:[babylon,htmlParser],
  bracketSpacing:true,
  endOfLine:'lf'
}

export const JsEditor = ({ code, onChange }: JsEditorProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const formatCode = useCallback(
    (e: KeyboardEvent) => {
      try {
        if (isFocused && (e.key === "s" || e.key === "S") && e.ctrlKey) {

          const isValid = prettier.check(code, prettierConfig)
          const formattedCode = prettier.format(code,prettierConfig);
          e.preventDefault();
          if(!isValid){
            onChange(formattedCode);
          }
        }
      } catch (error) {
        console.log(error)
      }
      
    },
    [code, isFocused, onChange]
  );

  useEffect(() => {
    if (!window || !window.addEventListener) return;

    window.addEventListener("keydown", formatCode);

    return () => window.removeEventListener("keydown", formatCode);
  }, [formatCode]);

  const load = useCallback((editor:IAceEditor) => {
    if (languageTools && languageTools.snippetCompleter) {
      languageTools.snippetCompleter.getDocTooltip = null;
    }
    if(editor){
      editor.setOption('useWorker',false);
      editor.session.setUseWorker(false);
      editor.session.clearAnnotations()
      
    
    }
  },[]);

  return (
    <Editor
      mode="javascript"
      placeholder="javascript code here"
      theme="monokai"
      showGutter={true}
      showPrintMargin={false}
      fontSize={14}
      onChange={onChange}
      onLoad={load}
      onValidate={() => null}
      width={"500px"}
      height={"500px"}
      editorProps={{ $blockScrolling: true }}
      value={code}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      focus={isFocused}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false,
        enableEmmet: true,
        spellcheck: true,
        highlightSelectedWord:true

      }}
    />
  );
};
