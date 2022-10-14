import TeamItem from "./TeamItem";
import styles from "./TeamList.module.css";

function TeamList(props) {
  return (
    <div className={styles.background}>
      <ul className={styles.teams}>
        <h1 className={styles.head}>NHL Teams</h1>

        {/* maps through teams prop which was defined in pages/teams */}
        {/* then passes TeamItem component and passes relevant information to be used as props*/}
        {props.teams.map((team) => (
          <TeamItem
            key={team.id}
            id={team.id}
            name={team.name}
            teams={props.teams}
            abbrev={team.abbreviation}
            logo={props.logos}
          />
        ))}
      </ul>
    </div>
  );
}

export default TeamList;
