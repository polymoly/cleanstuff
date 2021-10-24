import { MorePlacement } from "../usePageMore";
import useStyles from "./style";

export interface PaginatorProps {
  onClick: () => void;
  isActive: boolean;
  page: number;
  isPageMore: MorePlacement;
  total?: number;
  isForward?: boolean;
}

export const Paginator = ({ isActive, onClick, page }: PaginatorProps) => {
  const classes = useStyles({ isActive } as any);
  return (
    <div className={classes.paginator} onClick={onClick}>
      {page}
    </div>
  );
};
