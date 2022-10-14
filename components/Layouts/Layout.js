import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      {/* layout which wraps around entire application in _app.js*/}
      <MainNavigation />

      <main className={styles.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
