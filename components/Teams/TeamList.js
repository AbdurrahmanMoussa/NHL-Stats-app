import { Fragment, useState } from "react";
import TeamItem from "./TeamItem";
import styles from "./TeamList.module.css";
import Search from "./Search";
function TeamList(props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Fragment>
      <Search setSearchTerm={setSearchTerm} />
      <div className={styles.background}>
        <ul className={styles.teams}>
          <h1 className={styles.head}>NHL Teams</h1>

          {/* maps through teams prop which was defined in pages/teams */}
          {/* then passes TeamItem component and passes relevant information to be used as props*/}
          {props.teams
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
              ) {
                return val;
              }
            })
            .map((team) => (
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
    </Fragment>
  );
}

export default TeamList;
