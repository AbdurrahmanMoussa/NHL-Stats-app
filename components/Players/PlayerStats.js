import { Fragment, useState } from "react";
import PlayerGamelogs from "./PlayerGamelogs";
import CareerStatsFilter from "../CareerStats/CareerStatsFilter";
import CareerStatsList from "../CareerStats/CareerStatsList";
import CareerStatsFilteredData from "../CareerStats/CareerStatsFilteredData";
import CareerStatsHeader from "../CareerStats/CareerStatsHeader";

const PlayerStats = (props) => {
  //TODO: Add ability to sort columns in table and view column definition for abbreviations on hover

  {
    /* State which handles value of the selected filter option */
  }
  const [selected, setSelected] = useState(0);

  {
    /* state handles state if gamelogs header is selected */
  }
  const [gameLogSelected, setGameLogSelected] = useState(null);

  {
    /* state which handles if filtered select option is clicked */
  }
  const [isSelect, setIsSelect] = useState(false);

  {
    /* state which handles gamelog active if GAME LOGS is clicked and adjusts style of gamelogs header accordingly */
  }
  const [isGamelogActive, setIsGamelogActive] = useState(null);

  {
    /* state which handles career active if CAREER is clicked and adjusts style of gamelogs header accordingly */
  }
  const [isCareerActive, setIsCareerActive] = useState(true);

  {
    /* handles state changes when GAME LOGS is selected */
  }
  const handleGameLogSelect = () => {
    setGameLogSelected(true);
    setIsGamelogActive(true);
    setIsCareerActive(false);
    return <PlayerGamelogs />;
  };

  {
    /* handles state changes when CAREER is selected */
  }
  const handleCareerSelect = () => {
    setIsSelect(false);
    setIsCareerActive(true);
    setGameLogSelected(false);
    setIsGamelogActive(false);
  };

  return (
    <>
      {/* returns header with relevant states and handler passed as props */}
      <CareerStatsHeader
        handleGameLogSelect={handleGameLogSelect}
        handleCareerSelect={handleCareerSelect}
        isGamelogActive={isGamelogActive}
        isCareerActive={isCareerActive}
      />

      {/* returns career stats filtered by the selected option if GAME LOGS is not selected and passes data as a prop which contains all player stats */}
      {/* also passes relevant states to adjust styles and values of the filter selected */}
      {!gameLogSelected && (
        <Fragment>
          <CareerStatsFilter
            data={props.data}
            isSelect={setIsSelect}
            isCareerActive={setIsCareerActive}
            selected={selected}
            setSelected={setSelected}
          />

          {/* returns filtered data only if the filtered select has been clicked otherwise display the career stats list */}
          {/* which is mapped through data prop and contains all player stats for the entirety of their career */}
          {isSelect ? (
            <CareerStatsFilteredData data={props.data} selected={selected} />
          ) : (
            <CareerStatsList data={props.data} />
          )}
        </Fragment>
      )}

      {/* displays a player's game logs if GAME LOGS is selected */}
      {gameLogSelected && <PlayerGamelogs />}
    </>
  );
};

export default PlayerStats;
