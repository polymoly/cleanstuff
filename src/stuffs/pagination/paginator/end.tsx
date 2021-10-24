import { Paginator, PaginatorProps } from ".";
import { MorePlacement } from "../usePageMore";
import { More } from "./more";

interface EndProps extends Omit<PaginatorProps, "page"> {
  onJump?: (page?: number) => void;
}

const End = ({
  isPageMore,
  onClick,
  isActive,
  total,
  isForward,
  onJump,
}: EndProps) => {
  return isPageMore === MorePlacement.end ||
    isPageMore === MorePlacement.middle ? (
    <>
      <More isForward={isForward} onJump={onJump} />
      <Paginator
        page={total || 0}
        isActive={isActive}
        onClick={onClick}
        isPageMore={isPageMore}
      />
    </>
  ) : null;
};

export { End };
