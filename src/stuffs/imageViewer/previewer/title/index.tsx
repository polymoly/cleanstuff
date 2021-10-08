import { memo } from "react";
import { downloadImage } from "../../utility/downloadImage";
import {
  CloseOutlined,
  ExpandOutlined,
  RotateRightOutlined,
  RotateLeftOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import classnames from "classnames";
import { TitleProps } from "../../utility/types";
import useStyles from "./style";

export const Title = memo(
  ({
    title,
    onClose,
    onFullscreen,
    onRotate,
    onZoom,
    zoomValue,
    currentIndex,
    sources,
    counterRender,
    options: {
      download = true,
      fullscreen = true,
      rotate = true,
      showCounter = true,
      zoom = true,
    } = {},
  }: TitleProps) => {
    const classes = useStyles();

    return (
      <div className={classes.imagePreviewTitle}>
        <div className={classes.tools}>
          <div onClick={onClose} className={classes.tool}>
            <CloseOutlined />
          </div>
          {fullscreen && (
            <div onClick={onFullscreen} className={classes.tool}>
              <ExpandOutlined />
            </div>
          )}
          {zoom && (
            <>
              <div onClick={() => onZoom()} className={classes.tool}>
                <ZoomInOutlined />
              </div>
              <div
                onClick={() => onZoom(true)}
                className={classnames(
                  classes.tool,
                  zoomValue === 1 && classes.disabledZoom
                )}
              >
                <ZoomOutOutlined />
              </div>
            </>
          )}
          {rotate && (
            <>
              <div onClick={() => onRotate()} className={classes.tool}>
                <RotateRightOutlined />
              </div>
              <div onClick={() => onRotate(true)} className={classes.tool}>
                <RotateLeftOutlined />
              </div>
            </>
          )}

          {download && (
            <div
              onClick={() => downloadImage(sources?.[currentIndex])}
              className={classes.tool}
            >
              <DownloadOutlined />
            </div>
          )}
        </div>
        {title}
        {showCounter && (
          <div className={classes.counter}>
            {counterRender ? (
              counterRender(currentIndex + 1, sources?.length)
            ) : (
              <span>{`${currentIndex + 1}/${sources?.length}`}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);
