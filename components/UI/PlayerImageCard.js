import styles from "./PlayerImageCard.module.css";

function PlayerImageCard(props) {
  //styled card to surround components
  return <div className={styles.card}>{props.children}</div>;
}

export default PlayerImageCard;
