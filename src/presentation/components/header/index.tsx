import React, { memo, useContext } from "react";
import { ApiContext } from "@/presentation/contexts";
import Logo from "../logo";
import Styles from "./styles.scss";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext);
  const logout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace("/login");
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />

        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
