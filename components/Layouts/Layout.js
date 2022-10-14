import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      {/* layout which wraps around entire application in _app.js*/}
      <MainNavigation />

      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
