import React, { ReactNode } from "react";
import WaveAnimation from "../WaveAnimation";

import Topbar from "./Topbar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full">
      {/* Topbar */}
      <Topbar />
      {/* Main content */}
      <div className="flex flex-col flex-1 relative">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
