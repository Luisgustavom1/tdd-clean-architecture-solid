import React, { memo, useContext } from "react";
import { ApiContext } from "@/presentation/contexts";
import Logo from "../logo";
import Styles from "./styles.scss";
import { useLogout } from "@/presentation/hooks";

const Header = () => {
  const logout = useLogout();
  const { getCurrentAccount } = useContext(ApiContext);
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    logout();
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />

        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount()?.name}</span>
          <a href="#" onClick={handleClick}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
