import PlayerItem from "./PlayerItem";
import styles from "./PlayerList.module.css";
import { useRouter } from "next/router";

function PlayerList(props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ul className={styles.teams}>
      <h1 className={styles.head}>NHL Roster</h1>
      {!props.selectedRoster && (
        <a className={styles.link} href={`/teams/${id}`}>
          Back to Team Details
        </a>
      )}

      {/* maps through selectedRoster prop which was defined in pages/teams/[id]/roster */}
      {/* then passes PlayerItem component and passes relevant information to be used as props*/}
      {/* if a roster has not been selected or a roster did not exist in the given year */}
      {/* the user will be given a message of 'No team found.' */}
      {props.selectedRoster ? (
        props.selectedRoster.map((player) => (
          <PlayerItem
            image={`http://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}
            key={player.person.id}
            id={player.person.id}
            name={player.person.fullName}
          />
        ))
      ) : (
        <p className={styles.error}>
          No team found. Select a season after {props.year}.
        </p>
      )}
    </ul>
  );
}

export default PlayerList;
