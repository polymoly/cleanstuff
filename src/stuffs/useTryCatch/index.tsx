import { CSSProperties, useState } from "react";

type AnimatingOptions<T> = {
  targetValue: T;
  delay?: number;
  timeout?: number;
  ease?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
};

type DefaultProps = {
  style?: CSSProperties;
  className?: string;
};

class AnimatedInstructor {
  init: unknown;
  target: unknown;
  transitionProperties?: CSSProperties;
  View: <P extends DefaultProps>(props?: P) => JSX.Element;
  constructor() {
    this.init = undefined;
    this.transitionProperties = {};
    this.target = undefined;
    this.View = (props) => {
      return (
        <div
          {...props}
          style={{ ...props?.style, ...this.transitionProperties }}
        />
      );
    };
  }

  value<C extends any>(init: C) {
    this.init = init;
    return init;
  }

  animating<T>(options?: AnimatingOptions<T>) {
    const transitionProperties: CSSProperties = {
      transitionDelay: `${options?.delay || 0}ms`,
      transitionDuration: `${options?.timeout || 1000}ms`,
      transitionTimingFunction: options?.ease,
      transitionProperty: "all",
    };
    this.transitionProperties = transitionProperties;
    this.target = options?.targetValue;
    return this;
  }

  start() {
    this.value(this.target);
  }
}

const Animated = new AnimatedInstructor();

export { Animated };
