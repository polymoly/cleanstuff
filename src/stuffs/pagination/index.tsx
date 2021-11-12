import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { Paginator } from "./paginator";
import { End } from "./paginator/end";
import { Goto } from "./paginator/goto";
import { Start } from "./paginator/start";
import { Switch } from "./paginator/switch";
import { usePageMore } from "./usePageMore";

interface PaginationConfig {
  total: number;
  pageSize?: number;
  defaultPageSize?: number;
  current?: number;
  defaultCurrent?: number;
  showQuickJumper?: boolean;
  showTotalRange?: boolean | ((page?: number, total?: number) => ReactNode);
  hideOnSinglePage?: boolean;
  onPageChange?: (page?: number) => void;
}

interface ListProps {
  children(page: number): ReactNode;
  counts: number;
  current: number;
}

export const Pagination = ({
  pageSize,
  defaultPageSize = 10,
  total,
  current,
  defaultCurrent = 1,
  onPageChange,
  showQuickJumper = false,
  showTotalRange = false,
  hideOnSinglePage = false,
}: PaginationConfig) => {
  const [currentPage, setCurrentPage] = useState<number>(defaultCurrent);

  useEffect(() => {
    if (current) {
      setCurrentPage(current);
    }
  }, [current]);

  const pagesCount = useMemo(() => {
    return Math.ceil(total / (pageSize || defaultPageSize));
  }, [pageSize, defaultPageSize, total]);

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

  const onGotoPage = (page: number = 1) => {
    const precisedPage = Math.round(page);
    if (precisedPage > pagesCount) {
      setCurrentPage(pagesCount);
      return;
    }
    if (precisedPage < 1) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage(precisedPage);
  };

  const showTotal = useMemo<ReactNode | undefined>(() => {
    if (!showTotalRange) return;

    const rangeCalculate = (factor: 0 | 1) => {
      const range =
        (currentPage - factor) * (pageSize || defaultPageSize) + factor;
      if (range > total) {
        return total;
      }
      return range;
    };

    if (showTotalRange instanceof Function) {
      return showTotalRange(currentPage, total);
    }
    return `${rangeCalculate(1)}-${rangeCalculate(0)} of ${total} items`;
  }, [currentPage, defaultPageSize, pageSize, showTotalRange, total]);

  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  const hasShow = useMemo(
    () => !hideOnSinglePage || pagesCount !== 1,
    [hideOnSinglePage, pagesCount]
  );

  return hasShow ? (
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
      {showQuickJumper && <Goto onChange={(page) => onGotoPage(page)} />}
      {showTotal}
    </div>
  ) : null;
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
