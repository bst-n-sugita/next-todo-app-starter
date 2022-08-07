import { ReactElement } from "react";

import LoggedInHeader from "../../organisms/loggedInHeader";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <LoggedInHeader />
      {children}
    </>
  );
};

export default Layout;
