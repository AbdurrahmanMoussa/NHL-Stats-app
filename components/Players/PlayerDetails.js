import { Fragment } from "react";
import { useRouter } from "next/router";
import PlayerImageCard from "../UI/PlayerImageCard";
import styles from "./PlayerDetails.module.css";
import ImageFallback from "../UI/ImageWithFallback";
import PlayerStatsCard from "../UI/PlayerStatsCard";
import PlayerStats from "./PlayerStats";
import uuid from "react-uuid";
import backgroundImageFallBack from "../../public/player-background-image.jpg";
import backupPlayerImage from "../../public/player-image-fallback.jpg";

export default function PlayerDetails(props) {
  const router = useRouter();

  const { id, playerId } = router.query;

  //taking playerId from query to load player image with given id

  const image = `http://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`;

  let backGroundImage = `https://cms.nhl.bamgrid.com/images/actionshots/${playerId}_low_resolution.jpg`;

  //mapping all players and retrieving specific data for each player to be returned
  const playerInfo = props.playerInfo.map((playerInfo) => ({
    name: playerInfo.fullName,
    position: playerInfo.primaryPosition.abbreviation,
    birth: playerInfo.birthDate,
    height: playerInfo.height,
    number: playerInfo.primaryNumber,
    shoots: playerInfo.shootsCatches,
    city: playerInfo.birthCity,
    nationality: playerInfo.nationality,
    weight: playerInfo.weight,
  }));

  if (playerInfo[0].shoots.toString() === "L") {
    playerInfo[0].shoots = "Left";
  } else {
    playerInfo[0].shoots = "Right";
  }

  return (
    <Fragment>
      <PlayerImageCard>
        <div className={styles.background}>
          <ImageFallback
            src={backGroundImage}
            fallbackSrc={backgroundImageFallBack}
            alt="background image"
            width="1200"
            height="300"
            priority
            className={styles.action}
          />
        </div>

        <div className={styles.player}>
          <ImageFallback
            alt="player image"
            src={image}
            fallbackSrc={backupPlayerImage}
            width="400"
            height="300"
            className={styles.image}
            objectFit="fill"
            priority
          />
        </div>
        <div className={styles.container}>
          <div className={styles.info}>
            <h1
              className={styles.name}
            >{`${playerInfo[0].name} | #${playerInfo[0].number}`}</h1>

            <p className={styles.detail}>
              {`${playerInfo[0].position} | ${playerInfo[0].height} |
               ${playerInfo[0].weight} lb`}
            </p>

            <p>
              <b>Birthplace: </b>
              {`${playerInfo[0].city}, ${playerInfo[0].nationality}`}
            </p>

            <p>
              <b>Birth Year: </b>
              {playerInfo[0].birth}
            </p>
            <p>
              <b>Handedness: </b>
              {playerInfo[0].shoots}
            </p>
            <footer className={styles.guide}>
              <b>Gamelog Guide: </b>
              {`Select a Season After NHL Debut`}
            </footer>
          </div>
        </div>
      </PlayerImageCard>

      <PlayerStatsCard>
        <PlayerStats key={uuid()} data={props.playerStats} />
      </PlayerStatsCard>
      <a href={`/teams/${id}/roster`} className={styles.link}>
        Back to roster
      </a>
    </Fragment>
  );
}
