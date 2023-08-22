import React from "react";
import styles from "./MainCard.module.scss";

const MainCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const classes = `${styles["main-card"]} ${className ? className : ""}`

  return <div className={classes}>{children}</div>;
};

export default MainCard;
