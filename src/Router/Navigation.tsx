import { FC } from "react";
import { Link } from "react-router-dom";

export const Navigation: FC = () => {
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <Link to="/local">Local</Link>
      <Link to="/localRedux">Local Redux</Link>
      <Link to="/indexed">Indexed</Link>
      <Link to="/indexedLibrary">IndexedLib</Link>
    </nav>
  );
};
