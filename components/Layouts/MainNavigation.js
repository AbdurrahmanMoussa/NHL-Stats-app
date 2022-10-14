import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./MainNavigation.module.css";

function MainNavigation() {
  const router = useRouter();
  const { id, playerId } = router.query;
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/teams">
        NHL Teams
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>{!id && <Link href="/teams">All Teams</Link>}</li>

          <li>
            {id && (
              <Link href={`/teams/${id}/roster`}>Team Roster History</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
