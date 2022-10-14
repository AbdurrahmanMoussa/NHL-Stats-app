import styles from "./CareerStatsHeader.module.css";

const CareerStatsHeader = (props) => {
  return (
    <section className={styles.header}>
      <h3 className={styles.stats}>Stats</h3>

      <ul className={styles.list}>
        {/* uses handler passed from PlayerStats component to set all relevant states when CAREER is clicked and set styles accordingly */}
        <li
          onClick={() => {
            props.handleCareerSelect();
          }}
          className={
            props.isCareerActive ? styles["career-active"] : styles.career
          }
        >
          CAREER
        </li>

        {/* uses handler passed from PlayerStats component to set all relevant states when GAME LOGS is clicked and set styles accordingly */}
        <li
          onClick={() => {
            props.handleGameLogSelect();
          }}
          className={
            props.isGamelogActive ? styles["gamelogs-active"] : styles.gamelogs
          }
        >
          GAME LOGS
        </li>
      </ul>
    </section>
  );
};

export default CareerStatsHeader;
