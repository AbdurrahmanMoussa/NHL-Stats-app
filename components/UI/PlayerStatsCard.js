import styles from "./PlayerStatsCard.module.css";

function PlayerStatsCard(props) {
  {
    /*styled card to surround PlayerStats components*/
  }
  return <div className={styles.card}>{props.children}</div>;
}

export default PlayerStatsCard;
