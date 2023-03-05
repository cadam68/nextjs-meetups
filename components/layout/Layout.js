import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { useRouter } from "next/router";

function Layout(props) {
  const { route } = useRouter();

  const classAdd = route == "/api-doc" ? classes.mainLarge : "";

  return (
    <div>
      <MainNavigation />
      <main className={`${classes.main} ${classAdd}`}>{props.children}</main>
    </div>
  );
}

export default Layout;
