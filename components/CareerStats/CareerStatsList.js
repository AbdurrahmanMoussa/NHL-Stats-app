import styles from "./CareerStatsList.module.css";
import { Fragment } from "react";

const CareerStatsList = (props) => {
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
          {/* mapping all relevant player data to table */}
          {props.data.map((playerStat) => {
            return (
              <tr>
                {/* formats the season value with hyphen */}
                <td>
                  {playerStat.season.slice(0, 4) +
                    "-" +
                    playerStat.season.slice(4)}
                </td>
                <td>{playerStat.league.name}</td>
                <td>{playerStat.team.name}</td>
                {/* displays player stats only if they exist, fallback value is 0 */}
                <td>{playerStat.stat.games ? playerStat.stat.games : 0}</td>
                <td>{playerStat.stat.goals ? playerStat.stat.goals : 0}</td>
                <td>{playerStat.stat.assists ? playerStat.stat.assists : 0}</td>
                <td>{playerStat.stat.points ? playerStat.stat.points : 0}</td>
                <td>{playerStat.stat.pim ? playerStat.stat.pim : 0}</td>
                <td>{playerStat.stat.shots ? playerStat.stat.shots : 0}</td>
                <td>
                  {/* formatting timeOnIce by displaying TOI per game rather than total TOI*/}
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

export default CareerStatsList;
