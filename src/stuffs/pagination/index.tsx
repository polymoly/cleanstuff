import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { Paginator } from "./paginator";
import { End } from "./paginator/end";
import { Start } from "./paginator/start";
import { Switch } from "./paginator/switch";
import { MorePlacement, usePageMore } from "./usePageMore";

interface PaginationConfig {
  total: number;
  pageSize: number;
  current?: number;
  onPageChange?: (page?: number) => void;
}

interface ListProps {
  children(page: number): ReactNode;
  counts: number;
  current: number;
}

export const Pagination = ({
  pageSize = 10,
  total,
  current,
  onPageChange,
}: PaginationConfig) => {
  const [currentPage, setCurrentPage] = useState<number>(current || 1);
  const pagesCount = useMemo(() => {
    return Math.ceil(total / (pageSize || 10));
  }, [pageSize, total]);
  const isPageMore = usePageMore(pagesCount, currentPage);

  const onPaging = (page: number) => {
    setCurrentPage(page);
  };

  const onPrevious = (page: number = 1) => {
    if (currentPage === 1) return;
    if (currentPage < page) {
      setCurrentPage((prevPage) => prevPage - currentPage);
      return;
    }
    setCurrentPage((prevPage) => prevPage - page);
  };

  const onNext = (page: number = 1) => {
    if (currentPage === pagesCount) return;
    const diff = pagesCount - currentPage;
    if (diff < page) {
      setCurrentPage((prevPage) => prevPage + diff);
      return;
    }
    setCurrentPage((prevPage) => prevPage + page);
  };

  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Switch onClick={() => onPrevious()} disabled={currentPage === 1} />
      <Start
        isActive={currentPage === 1}
        onClick={() => onPaging(1)}
        isPageMore={isPageMore}
        onJump={onPrevious}
      />

      <List counts={pagesCount} current={currentPage}>
        {(page) => (
          <Paginator
            page={page}
            onClick={() => onPaging(page)}
            isActive={page === currentPage}
            isPageMore={isPageMore}
          />
        )}
      </List>
      <End
        isActive={currentPage === pagesCount}
        isPageMore={isPageMore}
        onClick={() => onPaging(pagesCount)}
        total={pagesCount}
        onJump={onNext}
        isForward
      />
      <Switch
        onClick={() => onNext()}
        disabled={currentPage === pagesCount}
        isForward
      />
    </div>
  );
};

const List = ({ children, counts, current }: ListProps) => {
  const pages = useMemo(() => {
    const pageArray = Array.from({ length: counts }, (_, i) => i + 1);
    const clone = [...pageArray];
    if (counts <= 10) {
      return clone;
    }
    if (current < 5) {
      return clone.filter((page) => page <= 5);
    }
    if (current > counts - 4) {
      return clone.filter((page) => page > counts - 5);
    }
    return clone.filter((page) => page >= current - 2 && page <= current + 2);
  }, [counts, current]);

  return (
    <>
      {pages.map((pageIndex) => (
        <Fragment key={pageIndex}>{children(pageIndex)}</Fragment>
      ))}
    </>
  );
};
