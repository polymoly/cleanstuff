import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { CssEditor } from "./css";
import { HtmlEditor } from "./html";
import { IFrame } from "./iFrame";
import { JsEditor } from "./js";
import useStyles from "./style";

export const Playground = () => {
  const classes = useStyles();
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [jsCode, setJsCode] = useState<string>("");
  const [src, setSrc] = useState<string>("");
  const debounceHtmlCode = useDebounce(htmlCode, 300);
  const debounceCssCode = useDebounce(cssCode, 300);
  const debouncejsCode = useDebounce(jsCode, 300);

  useEffect(() => {
    const srcDoc = `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <style>
                            ${debounceCssCode}
                            </style>
                        </head>
                        <body>
                        ${debounceHtmlCode}
                        <script type="text/javascript">
                        ${debouncejsCode}
                        </script>
                        </body>
                        
                    </html>`;

    setSrc(srcDoc);
  }, [debounceHtmlCode, debounceCssCode, debouncejsCode]);

  return (
    <div className={classes.container}>
      <HtmlEditor code={htmlCode} onChange={(value) => setHtmlCode(value)} />
      <CssEditor code={cssCode} onChange={(value) => setCssCode(value)} />
      <JsEditor code={jsCode} onChange={(value) => setJsCode(value)} />

      <IFrame title="editor" srcDoc={src} />
    </div>
  );
};
