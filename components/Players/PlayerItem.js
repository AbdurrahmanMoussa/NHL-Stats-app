import { useRouter } from "next/router";
import styles from "./PlayerItem.module.css";
import Card from "../ui/Card";
import ImageFallback from "../UI/ImageWithFallback";
import backUpImage from "../../public/player-image-fallback.jpg";

function PlayerItem(props) {
  const router = useRouter();
  const { id } = router.query;

  //route to retrieve specific player details from PlayerDetails.js component
  function showDetailsHandler() {
    router.push(`/teams/${id}/roster/${props.id}`);
  }

  return (
    <li className={styles.item}>
      <Card>
        <div className={styles.content}>
          <ImageFallback
            src={props.image}
            //if there is an error retrieving props.image, it sets target to the backup image
            fallbackSrc={backUpImage}
            width="150"
            height="120"
          />
          {/* displaying player information*/}
          <h1 className={styles.name}>{props.name}</h1>
          <h1></h1>
          {/* button which routes to PlayerDetails upon click */}
          <button onClick={showDetailsHandler} className={styles.actions}>
            Show Details
          </button>
        </div>
      </Card>
    </li>
  );
}

export default PlayerItem;
