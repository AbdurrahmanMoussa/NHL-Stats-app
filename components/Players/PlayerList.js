import PlayerItem from "./PlayerItem";
import styles from "./PlayerList.module.css";
import { useRouter } from "next/router";

function PlayerList(props) {
  const router = useRouter();
  const { id } = router.query;
  let sort = props.selectedRoster?.sort((a, b) => {
    const nameA = a.person.fullName.substring(
      0,
      a.person.fullName.indexOf(" ")
    );

    const nameB = b.person.fullName.substring(
      0,
      b.person.fullName.indexOf(" ")
    );

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <ul className={styles.teams}>
      <h1 className={styles.head}>NHL Roster</h1>
      {/* maps through sorted selectedRoster prop which was defined in pages/teams/[id]/roster */}
      {/* then passes PlayerItem component and passes relevant information to be used as props*/}
      {/* if a roster has not been selected or a roster did not exist in the given year */}
      {/* the user will be given a message of 'No team found.' */}
      {props.selectedRoster ? (
        sort.map((player) => (
          <PlayerItem
            image={`http://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}
            key={player.person.id}
            id={player.person.id}
            name={player.person.fullName}
          />
        ))
      ) : (
        <div>
          <p className={styles.error}>
            No team found. Select a season after {props.year}.
          </p>

          <a className={styles.link} href={`/teams/${id}`}>
            Back to Team Details
          </a>
        </div>
      )}
    </ul>
  );
}

export default PlayerList;
