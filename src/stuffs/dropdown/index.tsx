import { Dropdown } from "antd";
import { Overlay } from "./overlay";
import useStyles from "./style";
import { SelectorProps } from "./types";
import { OverlayContext } from "./context";

export const Selector = ({
  list,
  listItemPrefix,
  listItemSuffix,
  onChangeValue,
  onSelect,
  onClick,
}: SelectorProps) => {
  const classes = useStyles();

  return (
    <OverlayContext.Provider value={[onChangeValue, onSelect, onClick]}>
      <div className={classes.container} style={{ width: 500 }}>
        <Dropdown
          overlay={<Overlay list={list} />}
          placement="bottomCenter"
          trigger={["click"]}
        >
          <div className={classes.inputContainer}>
            <input type="text" className={classes.input} />
          </div>
        </Dropdown>
      </div>
    </OverlayContext.Provider>
  );
};
