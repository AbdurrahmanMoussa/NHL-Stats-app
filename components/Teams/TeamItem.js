import { useRouter } from "next/router";

import Card from "../ui/Card";
import ImageFallback from "../UI/ImageWithFallback";
import styles from "./TeamItem.module.css";

function TeamItem(props) {
  const router = useRouter();

  //routes to specific team after clicking 'Show Details'
  function showDetailsHandler() {
    router.push(`/teams/${props.id}`);
  }
  //backup logo to be used if one doesn't exist in props.logo
  let backUpLogo = `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${props.id}.svg`;

  //filtering specific logo from props.logo based on a common identifier which is the team abbreviation in this case
  let teamInfo = props.logo.filter(
    (logo) => props.abbrev === logo.abbreviation
  );

  return (
    <li className={styles.item}>
      <Card>
        <div className={styles.container}>
          <h1 className={styles.title}>{props.name}</h1>
          <div>
            {/* displaying team if team exists and handling error if image wasn't found and setting it to the backup */}
            {teamInfo["0"] && (
              <ImageFallback
                className={styles.image}
                alt="logo"
                src={backUpLogo}
                fallbackSrc={teamInfo["0"].logo}
                width="200"
                height="200"
                objectFit="contained"
              />
            )}
          </div>
          {/* routes to specified team through /teams/[id] */}
          <button onClick={showDetailsHandler} className={styles.actions}>
            Show Details
          </button>
        </div>
      </Card>
    </li>
  );
}

export default TeamItem;
