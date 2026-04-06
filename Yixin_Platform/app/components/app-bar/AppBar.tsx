"use client";

import "./app-bar.css";
import { useBreakpoints } from "@/app/hooks/useBreakpoints";
import ProgressiveBlur from "@/components/app-bar/ProgressiveBlur";
import AccountMenu from "@/app/components/app-bar/AccountMenu";
import Yixin_Avatar from "@/public/Yixin_Avatar_Light.svg"
import Yixin_Workmark from "@/public/Yixin_Wordmark_Dark_Horizontal.svg"
import { Link } from "@/i18n/navigation";

const AppBar = () => {
  const { mdDown } = useBreakpoints();

  return (
    <nav className="app-bar">
      {!mdDown && <ProgressiveBlur />}
      <div className="app-bar__container">
        <div className="app-bar__left">
          <Link href="/">
            {mdDown ? (
              <Yixin_Workmark />
            ) : (
              <Yixin_Avatar />
            )}
          </Link>
        </div>
        <div className="app-bar__right">
          <AccountMenu />
        </div>
      </div>
    </nav>
  );
};

export default AppBar;