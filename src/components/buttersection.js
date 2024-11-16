// ButterSection.js
"use client";

import React from "react";
import { useEffect } from "react";
import styles from "./buttersection.module.css";

const ButterSection = ({ children }) => {
  useEffect(() => {
    let interval;
    const startTime = Date.now();

    function createButter() {
      const currentTime = Date.now();
      if (currentTime - startTime > 6000) {
        clearInterval(interval);
        return;
      }

      const butter = document.createElement("div");
      butter.classList.add(styles.butter);
      butter.style.left = `${Math.random() * 100}vw`;
      butter.style.top = `${Math.random() * 100}vh`;
      butter.style.animationDuration = `${Math.random() * 5 + 5}s`;
      document.body.appendChild(butter);

      setTimeout(() => {
        butter.remove();
      }, 10000);
    }

    interval = setInterval(createButter, 300);

    return () => clearInterval(interval);
  }, []);

  return <div className={styles.container}>{children}</div>;
};

export default ButterSection;
