import { ReactNode } from "react";
import styles from "./text.module.scss";
import classNames from "classnames";

interface TextProps {
  children: string | ReactNode;
  className?: string;
}

export function Text({ children, className }: TextProps) {
  const textClassNames = classNames(styles["text"], className);

  return <p className={textClassNames}>{children}</p>;
}
