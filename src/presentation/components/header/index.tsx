import React, { memo } from "react";
import Logo from "../logo";
import Styles from "./styles.scss";

const Header = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />

        <div className={Styles.logoutWrap}>
          <span>LUISAO O + BRABO</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
