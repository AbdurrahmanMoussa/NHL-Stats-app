import { useState } from "react";
import styles from "./TeamDetail.module.css";
import Card from "../UI/Card";
import { useRouter } from "next/router";
import ImageFallback from "../UI/ImageWithFallback";

function TeamDetail(props) {
  const router = useRouter();

  {
    /*routes to selected teams roster*/
  }
  function showRostersHandler() {
    router.push(`/teams/${props.teams.id}/roster`);
  }

  {
    /* hovering state for mouse actions to change color of button */
  }
  const [isHovering, setIsHovering] = useState(false);

  {
    /*handling mouse hovering input to change background color of {team} roster button */
  }
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  {
    /*destructuring relevant values from props.teams which was passed as a prop from pages/teams/[id]/index.js*/
  }
  const {
    name,
    abbreviation: abbrev,
    division,
    conference,
    firstYearOfPlay: year,
    venue,
  } = props.teams;

  {
    /*filtering logos from array of teams which contains the logos and primary/secondary colors of teams*/
  }

  let teamInfo = props.logo.filter((logo) => abbrev === logo.abbreviation);

  {
    /*backup logo to be used if one does not exist in props.logo */
  }
  let backUpLogo = `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${props.teams.id}.svg`;

  {
    /*background color variable to set background color dynamically*/
  }
  let setBackGroundColor = null;

  {
    /* setting background color of {team} button based on hovering actions */
  }
  if (!isHovering && teamInfo[0]) {
    setBackGroundColor = teamInfo[0]?.colors["0"];
  } else if (isHovering && teamInfo[0]) {
    if (teamInfo[0]?.colors["1"] === "#FFF") {
      setBackGroundColor = "#000000";
    } else {
      setBackGroundColor = teamInfo[0]?.colors["1"];
    }
  }

  return (
    <Card className={styles.detail}>
      <div className={styles.container}>
        <h1 className={styles.header}>{name}</h1>
        <div className={styles.image}>
          {/* displaying logo if team exists */}
          {teamInfo[0] && (
            <ImageFallback
              className={styles.image}
              src={teamInfo[0].logo}
              fallbackSrc={backUpLogo}
              width="170"
              height="120"
            />
          )}
        </div>
        <div className={styles.created}>
          <h2>Abrreviation</h2>
          <p>{abbrev}</p>
        </div>
        <div className={styles.created}>
          <h2>Division</h2>

          <p>{division?.name}</p>
        </div>
        <div className={styles.created}>
          <h2>Conference</h2>
          <p>{conference?.name}</p>
        </div>
        <div className={styles.created}>
          <h2>Created</h2>
          <p>{year}</p>
        </div>
        <div className={styles.created}>
          <h2>Venue</h2>
          <p>{venue?.name}</p>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={showRostersHandler}
            style={{
              //assigning dynamic background color which was set dynamically earlier to backGroundColor
              backgroundColor: setBackGroundColor,
            }}
            className={styles.actions}
            //handling hovering actions to display dynamic background color on button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {name} Roster
          </button>
        </div>
      </div>
    </Card>
  );
}

export default TeamDetail;
