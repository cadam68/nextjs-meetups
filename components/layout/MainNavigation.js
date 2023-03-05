import classes from "./MainNavigation.module.css";
import Link from "next/link";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
          <li className={classes.divers}>
            <Link href="/api-doc">API-Doc</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
