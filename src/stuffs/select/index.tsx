import { useStyles } from "./style";
import {
  CheckOutlined,
  CloseCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "../modal/hooks/useClickOutside";
import { variants } from "./variants";
import classNames from "classnames";
import { CSSProperties } from "styled-components";
import { Spin } from "antd";
import { createPortal } from "react-dom";

type SelectValues = {
  label?: ReactNode;
  value: string | number;
};

interface SelectProps<T> {
  options: T[];
  value?: T;
  maxHeight?: number;
  height?: number;
  isLoading?: boolean;
  noContent?: ReactNode;
  placeholder?: string;
  isChecked?: boolean;
  loadingIndicator?: ReactNode;
  arrowIcon?: ReactNode | ((open: boolean) => ReactNode);
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  dropdownStyle?: CSSProperties;
  isDisabled?: boolean;
  error?: Error;
  bordered?: boolean;
  showSearch?: boolean;
  showArrow?: boolean;
  allowClear?: boolean;
  beforeExtraNode?: ReactNode;
  afterExtraNode?: ReactNode;
  clearIcon?: ReactNode;
  label?: string | ReactNode;
  shouldPrevent?: boolean;
  onClick?: () => void;
  checkedRender?: (item?: T) => ReactNode;
  renderItem?: (item?: T) => ReactNode;
  renderSelectedItem?: (item?: T) => ReactNode;
  labelExtractor?: (option?: T) => SelectValues["label"];
  valueExtractor?: (option: T) => SelectValues["value"];
  onChange?: (value?: T) => void;
  onVisible?: () => void;
  onSearch?: (value: string) => void;
}

export const Select = <S extends SelectValues = SelectValues>({
  maxHeight,
  onChange,
  options,
  value,
  labelExtractor = (item) => item?.label,
  valueExtractor = (item) => item.value,
  onVisible,
  isLoading,
  noContent,
  placeholder,
  renderItem,
  renderSelectedItem,
  checkedRender,
  isChecked,
  arrowIcon,
  dropdownStyle,
  loadingIndicator,
  wrapperClassName,
  wrapperStyle,
  isDisabled,
  error,
  afterExtraNode,
  beforeExtraNode,
  allowClear = false,
  bordered = true,
  showArrow = true,
  showSearch = false,
  clearIcon,
  label,
  onClick,
  shouldPrevent = false,
  onSearch,
  height = 40,
}: SelectProps<S>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<S | undefined>(value);
  // should debounce
  const [searchTerm, setSearchTerm] = useState<string>("");
  const classes = useStyles();
  const controls = useAnimation();
  const dropRef = useRef<HTMLDivElement>(null);

  const [block, setBlock] = useState<{ left: number; bottom: number }>();

  useEffect(() => {
    if (!value) return;

    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    if (!options || options.length === 0) return;

    const hasDuplicate = () => {
      const values = options.map((item) => valueExtractor(item));
      return values.find((item, index) => values.indexOf(item) !== index);
    };

    if (hasDuplicate()) {
      throw new Error(
        `options values must be unique. ${hasDuplicate()} has duplicated.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const onClose = () => setOpen(false);

  const onSelect = (item: S) => {
    setSelectedValue(item);

    const option = options.find(
      (value) => valueExtractor(value) === valueExtractor(item)
    );

    onChange?.(option);
    onClose();
  };

  useOnClickOutside(dropRef, () => setOpen(false));

  useEffect(() => {
    if (!open) return;

    controls.start("open").then(() => onVisible?.());

    return () => controls.stop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, open]);

  const onRenderSelectedItem = () => {
    if (!selectedValue) {
      return placeholder || "";
    }

    if (renderSelectedItem) {
      return renderSelectedItem(selectedValue);
    }
    return labelExtractor(selectedValue);
  };

  const onRenderItem = (item: S) => {
    if (renderItem) {
      return renderItem(item);
    }
    return labelExtractor(item);
  };

  const isSelected = (item: S) => {
    if (selectedValue) {
      return valueExtractor(selectedValue) === valueExtractor(item);
    }
  };

  const check = (item: S) => {
    if (isChecked && isSelected(item)) {
      return checkedRender ? checkedRender(item) : <CheckOutlined />;
    }
  };

  const loader = () => {
    if (loadingIndicator) {
      return loadingIndicator;
    }
    return <Spin spinning size='small' />;
  };

  const clear = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!allowClear) return;

    e.stopPropagation();

    setSelectedValue(undefined);
  };

  const filterOptions = useMemo(() => {
    return options?.filter((item) =>
      labelExtractor(item)
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase())
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, searchTerm]);

  const isNoContent = () => {
    return !filterOptions || filterOptions.length === 0;
  };

  useEffect(() => {
    if (!dropRef.current) return;
    const node = dropRef.current;

    const observer = new ResizeObserver(([entry]) => {
      const { left, bottom } = entry.target.getBoundingClientRect();

      setBlock({ left, bottom });
    });

    observer.observe(node);

    return () => observer.unobserve(node);
  }, [dropRef]);

  const arrow = () => {
    if (!arrowIcon) {
      return <DownOutlined />;
    }
    if (typeof arrowIcon === "function") {
      return arrowIcon?.(open);
    }
    return arrowIcon;
  };

  const shouldReverse = window.outerHeight - (block?.bottom || 0) < 300;

  return (
    <div
      ref={dropRef}
      className={classNames(classes.wrapper, wrapperClassName)}
      style={wrapperStyle}>
      {label && <div>{label}</div>}
      <div
        className={classNames(classes.container, bordered && classes.bordered)}
        style={{ height }}>
        <div
          className={classNames(classes.select, isDisabled && classes.disabled)}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (isLoading || isDisabled || shouldPrevent) {
              return;
            }
            onClick?.();
            setOpen(true);
          }}>
          <div>{onRenderSelectedItem()}</div>
          {/* show when hovered */}
          {allowClear && (
            <div className={classes.clear} onClick={clear}>
              {clearIcon ? clearIcon : <CloseCircleOutlined />}
            </div>
          )}
          {showArrow && (
            <div className={classes.arrow}>
              {isLoading ? loader() : arrow()}
            </div>
          )}
        </div>
        <Portal>
          <AnimatePresence
            key='dropdown'
            onExitComplete={() => setSearchTerm("")}>
            {open && (
              <motion.div
                variants={variants}
                initial='initial'
                animate={controls}
                exit='exit'
                custom={{ maxHeight, shouldReverse, block }}
                style={dropdownStyle}>
                {beforeExtraNode}
                {showSearch && (
                  <div className={classes.search}>
                    <input
                      className={classes.input}
                      type='text'
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        onSearch?.(e.target.value);
                      }}
                    />
                  </div>
                )}
                {!isNoContent() ? (
                  filterOptions?.map((item, index) => (
                    <div
                      key={index}
                      className={classNames(
                        classes.item,
                        isSelected(item) && classes.selected
                      )}
                      onClick={() => onSelect(item)}>
                      {onRenderItem(item)}
                      {check(item)}
                    </div>
                  ))
                ) : (
                  <div className={classes.noContent}>
                    {error ? (
                      <div>{error.message}</div>
                    ) : noContent ? (
                      noContent
                    ) : (
                      "No data found"
                    )}
                  </div>
                )}
                {afterExtraNode}
              </motion.div>
            )}
          </AnimatePresence>
        </Portal>
      </div>
    </div>
  );
};

const Portal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, document.body);
};
