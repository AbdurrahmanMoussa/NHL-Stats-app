import Head from "next/head";
import { Fragment } from "react";
import PlayerList from "../../../../components/Players/PlayerList";
import { useState } from "react";
import Select from "react-select";
import { seasonOptions } from "../../../../util/SeasonOptions";
import useHttp from "../../../../hooks/use-http";

export default function Players(props) {
  const [select, setSelect] = useState([]);

  //desructuring fetchData and handler to handle fetching data from api
  const { fetchData, handlePlayerList } = useHttp();

  //handler which sets the selected season based on user input and fetches the url using the custom useHttp hook
  const handler = (select) => {
    setSelect((selectedOption) => selectedOption);
    handlePlayerList(
      `https://statsapi.web.nhl.com/api/v1/teams/${props.id}/roster?expand=team.roster&season=${select.value}`
    );
  };

  return (
    <Fragment>
      <Head>
        <title>NHL Rosters</title>
      </Head>

      <Select
        id="select"
        instanceId={"select"}
        options={seasonOptions}
        placeholder={"Select a season"}
        autoFocus
        value={select.value}
        onChange={handler}
      />

      {/* displays player list only after data has been fetched*/}
      {fetchData && (
        <PlayerList
          selectedRoster={fetchData.roster}
          selected={select}
          year={props.year}
        />
      )}
    </Fragment>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/`);
  const data = await res.json();

  //relevant paramater to access unique teamId
  const paths = data.teams.map((team) => ({
    params: { id: team.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${id}`);
  const data = await res.json();

  let year = "";

  data.teams.map((team) => {
    year = team.firstYearOfPlay;
  });

  return {
    props: {
      id,
      year,
    },
  };
}
