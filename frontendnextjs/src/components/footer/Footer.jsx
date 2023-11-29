import React from "react";
import styles from "./page.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      {new Date().getFullYear()} @Developed by Mark Christian
    </div>
  );
};

export default Footer;
