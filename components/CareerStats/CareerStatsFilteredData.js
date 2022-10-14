import styles from "./CareerStatsList.module.css";
import { Fragment } from "react";

const CareerStatsFilteredData = (props) => {
  return (
    <Fragment>
      <table className={styles.content}>
        <thead>
          <tr>
            <th>Season</th>
            <th>League</th>
            <th>Team</th>
            <th>GP</th>
            <th>G</th>
            <th>A</th>
            <th>P</th>
            <th>PIM</th>
            <th>Shots</th>
            <th>TOI/G</th>
          </tr>
        </thead>
        <tbody>
          {/* filtes data by the selected filter (name) option use the selected state passed from PlayerStats rest of content is similar to CareerStatsList*/}
          {props.data
            .filter((value) => {
              return value.league.name.toString() === props.selected.toString();
            })
            .map((playerStat) => {
              return (
                <tr>
                  <td>
                    {playerStat.season.slice(0, 4) +
                      "-" +
                      playerStat.season.slice(4)}
                  </td>
                  <td>{playerStat.league.name}</td>
                  <td>{playerStat.team.name}</td>
                  <td>{playerStat.stat.games ? playerStat.stat.games : 0}</td>
                  <td>{playerStat.stat.goals ? playerStat.stat.goals : 0}</td>
                  <td>
                    {playerStat.stat.assists ? playerStat.stat.assists : 0}
                  </td>
                  <td>{playerStat.stat.points ? playerStat.stat.points : 0}</td>
                  <td>{playerStat.stat.pim ? playerStat.stat.pim : 0}</td>
                  <td>{playerStat.stat.shots ? playerStat.stat.shots : 0}</td>
                  <td>
                    {playerStat.stat.timeOnIce
                      ? Math.round(
                          parseInt(playerStat.stat.timeOnIce) /
                            parseInt(playerStat.stat.games)
                        )
                      : 0}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};
export default CareerStatsFilteredData;
