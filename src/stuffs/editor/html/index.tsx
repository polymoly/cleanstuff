import { useState, useEffect, useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";
import babylon from "prettier/parser-babel";
import { RequiredOptions } from "prettier";

interface HtmlEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}
const prettierConfig: Partial<RequiredOptions> = {
  parser: "html",
  plugins: [htmlParser, babylon],
};

export const HtmlEditor = ({ code, onChange }: HtmlEditorProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const formatCode = useCallback(
    (e: KeyboardEvent) => {
      if (isFocused && (e.key === "s" || e.key === "S") && e.ctrlKey) {
        const formattedCode = prettier.format(code, prettierConfig);
        e.preventDefault();
        onChange(formattedCode);
      }
    },
    [code, isFocused, onChange]
  );

  useEffect(() => {
    if (!window || !window.addEventListener) return;

    window.addEventListener("keydown", formatCode);

    return () => window.removeEventListener("keydown", formatCode);
  }, [formatCode]);

  const mount: OnMount = (editor) => {
    editor.onDidFocusEditorText(() => setIsFocused(true));
    editor.onDidBlurEditorText(() => setIsFocused(false));
  };
  return (
    <Editor
      language="html"
      theme="vs-dark"
      height="100%"
      width="100%"
      value={code}
      onChange={onChange}
      loading={<div style={{ color: "#fff", fontSize: 19 }}>LOADING...</div>}
      onMount={mount}
      options={{
        acceptSuggestionOnCommitCharacter: true,
        acceptSuggestionOnEnter: "on",
        accessibilitySupport: "auto",
        automaticLayout: true,
        codeLens: true,
        colorDecorators: true,
        contextmenu: true,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: true,
        cursorStyle: "line",
        disableLayerHinting: false,
        disableMonospaceOptimizations: false,
        dragAndDrop: false,
        fixedOverflowWidgets: false,
        folding: true,
        foldingStrategy: "auto",
        fontLigatures: true,
        formatOnPaste: true,
        formatOnType: true,
        hideCursorInOverviewRuler: false,
        highlightActiveIndentGuide: true,
        links: true,
        mouseWheelZoom: false,
        multiCursorMergeOverlapping: true,
        multiCursorModifier: "alt",
        overviewRulerBorder: true,
        overviewRulerLanes: 2,
        quickSuggestions: true,
        quickSuggestionsDelay: 100,
        readOnly: false,
        renderControlCharacters: false,
        renderFinalNewline: true,
        renderIndentGuides: true,
        renderLineHighlight: "all",
        renderWhitespace: "none",
        revealHorizontalRightPadding: 30,
        roundedSelection: true,
        rulers: [],
        scrollBeyondLastColumn: 5,
        scrollBeyondLastLine: false,
        selectOnLineNumbers: true,
        selectionClipboard: true,
        selectionHighlight: true,
        showFoldingControls: "mouseover",
        smoothScrolling: true,
        suggestOnTriggerCharacters: true,
        wordBasedSuggestions: true,
        wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
        wordWrap: "on",
        wordWrapBreakAfterCharacters: "\t})]?|&,;",
        wordWrapBreakBeforeCharacters: "{([+",
        wordWrapColumn: 80,
        wrappingIndent: "none",
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        autoIndent: "advanced",
      }}
    />
  );
};
