import { useMemo } from "react";

export enum MorePlacement {
  start = "start",
  middle = "middle",
  end = "end",
  none = "none",
}

export const usePageMore = (
  pagesCount: number,
  currentPage: number
): MorePlacement => {
  const isPageMore = useMemo<MorePlacement>(() => {
    if (pagesCount <= 10) {
      return MorePlacement.none;
    }
    if (currentPage >= 5 && currentPage < pagesCount - 3) {
      return MorePlacement.middle;
    }
    if (currentPage < 5) {
      return MorePlacement.end;
    }
    if (currentPage > pagesCount - 5) {
      return MorePlacement.start;
    }
    return MorePlacement.none;
  }, [currentPage, pagesCount]);

  return isPageMore;
};
