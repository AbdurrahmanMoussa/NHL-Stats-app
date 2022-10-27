import styles from "./PlayerGamelogs.module.css";
import { useRouter } from "next/router";
import useHttp from "../../hooks/use-http";
import { seasonOptions } from "../../util/SeasonOptions";
import { useState } from "react";
import Select from "react-select";
import uuid from "react-uuid";

const PlayerGamelogs = () => {
  const [select, setSelect] = useState([]);

  {
    /* destructuring handlePlayerGamelogs to send fetch request function and destructures fetchData which was retrieved from handePlayerGamelogs*/
  }
  const { handlePlayerGamelogs, fetchData: gamelogs } = useHttp();

  {
    /* Using router to retrieve playerId */
  }
  const router = useRouter();

  const { playerId } = router.query;

  {
    /* handles previously selected value and passes current select value to handlePlayerGameLogs which fetches the data*/
  }
  const handler = (select) => {
    setSelect((selected) => selected);
    handlePlayerGamelogs(
      `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=gameLog&season=${select.value}`
    );
  };

  {
    /* displays message if no game logs are available*/
  }
  let errorMessage = (
    <p className={styles.error}>No game log availabe for selected season</p>
  );

  return (
    <>
      {/* uses utility function seasonOptions to retrieve all select options and sets value to the current state select.value*/}
      {/* then passes handler function to retrieve the selected gamelog */}
      <Select
        instanceId={"select"}
        options={seasonOptions}
        placeholder={"Select a season"}
        autoFocus
        value={select.value}
        onChange={handler}
        className={styles.select}
      />
      <table className={styles.content}>
        <thead>
          <tr key={uuid()}>
            <th>Date</th>
            <th>Team</th>
            {/* Goals */}
            <th>G</th>
            {/* Assists*/}
            <th>A</th>
            {/* Points */}
            <th>P</th>
            <th>+/-</th>
            {/* Powerplay goals */}
            <th>PPG</th>
            {/* Shorthanded goals */}
            <th>SHG</th>
            {/* Shorthanded points */}
            <th>SHP</th>
            {/* Game winning goals */}
            <th>GWG</th>
            {/* OT Goals */}
            <th>OTG</th>
            {/* Shots */}
            <th>S</th>
            {/* Time on ice */}
            <th>TOI</th>
          </tr>
        </thead>
        <tbody>
          {/* mapping gamelogs for season which was selected and retrieving relevant data */}
          {gamelogs.length > 0
            ? gamelogs.map((gamelog, idx) => {
                return (
                  <tr key={uuid()}>
                    <td>{gamelog.date}</td>
                    {/* if a team was the home team vs will  be displayed otherwise @ will be displayed which represents away team */}
                    <td>{`${!gamelog.isHome ? "@ " : "vs "}${
                      gamelog.opponent.name
                    }`}</td>
                    <td>{gamelog.stat.goals}</td>
                    <td>{gamelog.stat.assists}</td>
                    <td>{gamelog.stat.points}</td>
                    <td>{gamelog.stat.plusMinus}</td>
                    <td>{gamelog.stat.powerPlayGoals}</td>
                    <td>{gamelog.stat.shortHandedGoals}</td>
                    <td>{gamelog.stat.shortHandedPoints}</td>
                    <td>{gamelog.stat.gameWinningGoals}</td>
                    <td>{gamelog.stat.overTimeGoals}</td>
                    <td>{gamelog.stat.shots}</td>
                    {/* Handling situation if timeonice doesn't exist then setting fallback value of 0*/}
                    <td>
                      {gamelog.stat.timeOnIce ? gamelog.stat.timeOnIce : 0}
                    </td>
                  </tr>
                );
              })
            : errorMessage}
          {/* ^ displaying error message defined earlier to state no gamelogs found */}
        </tbody>
      </table>
    </>
  );
};
export default PlayerGamelogs;
