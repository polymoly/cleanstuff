import { Paginator, PaginatorProps } from ".";
import { MorePlacement } from "../usePageMore";
import { More } from "./more";

interface StartProps extends Omit<PaginatorProps, "page"> {
  onJump?: (page?: number) => void;
}

const Start = ({ isPageMore, onClick, isActive, onJump }: StartProps) => {
  return isPageMore === MorePlacement.start ||
    isPageMore === MorePlacement.middle ? (
    <>
      <Paginator
        page={1}
        isActive={isActive}
        onClick={onClick}
        isPageMore={isPageMore}
      />
      <More onJump={onJump} />
    </>
  ) : null;
};

export { Start };
