//기본 import
import { ReactNode } from "react";

//컴포넌트 immport
import styles from "./FloatingButton.module.scss";

/** 함수 타입 지정 */
interface Props {
  children: ReactNode;
  size?: "small" | "medium";
  interaction?: "default" | "hovered" | "clicked";
  onClick?: () => void;
}

/** FloatingButton 컴포넌트 생성 */
const FloatingButton = ({
  children,
  size = "medium",
  interaction = "default",
  onClick,
}: Props) => {
  let buttonClass = styles.button;

  if (size === "small") buttonClass += ` ${styles.small}`;
  if (interaction === "hovered") buttonClass += ` ${styles.hovered}`;
  if (interaction === "clicked") buttonClass += `${styles.clicked}`;

  return (
    <>
      <button className={buttonClass} onClick={onClick}>
        {children}
      </button>
    </>
  );
};
