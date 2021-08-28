import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { HtmlEditor } from "./html";
import { IFrame } from "./iFrame";
import useStyles from "./style";

const htmlInitialCode = `<div></div>

<style>
  div {
    width:300px;
    height:300px;
    background-color:brown;
  }
</style>
`;

export const Playground = () => {
  const [isEditorCollapse, setIsEditorCollapse] = useState<boolean>(false);
  const [htmlCode, setHtmlCode] = useState<string>(htmlInitialCode);
  const [src, setSrc] = useState<string>("");
  const classes = useStyles(isEditorCollapse as any);
  const debounceHtmlCode = useDebounce(htmlCode, 300);

  useEffect(() => {
    const srcDoc = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <style>
                        body {
                         overflow:hidden;
                        }
                      </style>
                    </head>
                    <body>
                    ${debounceHtmlCode}        
                    </body>
                        
                    </html>`;

    setSrc(srcDoc);
  }, [debounceHtmlCode]);

  return (
    <div className={classes.parentWrapper}>
      <div className={classes.header}>h</div>
      <div className={classes.container}>
        <div className={classes.htmlWrapper}>
          <HtmlEditor
            code={htmlCode}
            onChange={(value) => setHtmlCode(value || "")}
          />
        </div>
        <IFrame title="editor" srcDoc={src} />
      </div>
    </div>
  );
};
