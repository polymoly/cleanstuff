import { createElement, CSSProperties } from "react";
import classnames from "classnames";
import { jss } from "react-jss";
import faker from "faker/locale/fa";

type ComposeStyles<T extends ComposeProps<T>> = {
  [S in keyof CSSProperties]:
    | CSSProperties[S]
    | ((props: T) => CSSProperties[S]);
};

type TCompose = JSX.IntrinsicElements;
type PCompose<U extends keyof TCompose, T> = JSX.IntrinsicElements[U] & T;

type ComposeProps<C> = {
  [P in keyof C]: C[P];
};

type ComposeComponent<S extends keyof TCompose, P> = (
  props?: PCompose<S, P>
) => JSX.Element;

interface ComponentPropType<C extends keyof TCompose, P> {
  (props?: PCompose<C, P>): JSX.Element;
  addStyles: <T extends P>(styles?: ComposeStyles<T>) => ComposeComponent<C, T>;
}

const setStyle = <S, P>(style: S, props: P) => {
  if (typeof style === "function") {
    return style(props);
  }
  return style;
};

const compose = <C extends keyof TCompose, D extends ComposeProps<any>>(
  element: C
): ComponentPropType<C, D> => {
  const addStyles = <T extends ComposeProps<T>>(styles?: ComposeStyles<T>) => {
    const makeStyles = (props: T = {} as T) => {
      return Object.fromEntries(
        Object.entries(styles || {}).map(([property, style]) => {
          return [property, setStyle(style, props)];
        })
      );
    };

    const getStylesheet = (props?: T) => {
      return jss.createStyleSheet({
        [`compose`]: makeStyles(props),
      });
    };

    const component: ComponentPropType<C, T> = (props?: PCompose<C, T>) => {
      const builtInProps = Object.fromEntries(
        Object.entries(props || {}).filter(
          ([key]) => key.toLowerCase() in document.createElement(element)
        )
      );

      const extraProps = Object.fromEntries(
        Object.entries(props || {}).filter(
          ([key]) => !Object.keys(builtInProps || {}).includes(key)
        )
      ) as T;

      const { classes } = getStylesheet(extraProps).attach();

      return createElement(element.toString(), {
        ...builtInProps,
        className: classnames(classes.compose, props?.className),
      });
    };

    component.addStyles = addStyles;

    jss.removeStyleSheet(getStylesheet());
    return component;
  };

  return addStyles();
};

export const Wrapper = compose("div").addStyles<Size>({
  height: ({ size }) => size,
  color: ({ color }) => color,
  fontSize: 15,
});

interface Size {
  size?: number;
  color?: string;
}

export const Button = compose("button").addStyles({});
