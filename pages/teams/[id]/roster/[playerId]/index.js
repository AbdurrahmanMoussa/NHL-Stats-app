import Head from "next/head";
import { Fragment, useEffect } from "react";
import PlayerDetails from "../../../../../components/Players/PlayerDetails";
import useHttp from "../../../../../hooks/use-http";

export default function PlayerDetail(props) {
  const { fetchData: playerStats, handlePlayerStats } = useHttp();

  useEffect(() => {
    handlePlayerStats(
      `https://statsapi.web.nhl.com/api/v1/people/${props.playerId}/stats/?stats=yearByYear`
    );
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Player Details</title>
      </Head>
      {/* 
 

      {/* {playerStats && console.log(playerStats.stats)} */}
      {props.playerInfo && (
        <PlayerDetails
          playerInfo={props.playerInfo.people}
          playerStats={playerStats}
          image={props.image}
        />
      )}
    </Fragment>
  );
}
export async function getStaticPaths() {
  const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/`);
  const data = await res.json();

  const paths = data.teams.map((team) => ({
    params: { id: team.id.toString(), playerId: "8469598" },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { playerId } = params;
  const players = await fetch(
    `https://statsapi.web.nhl.com/api/v1/people/${playerId}`
  ).then((response) => response.json());

  return {
    props: {
      playerInfo: players,
      playerId,
    },
  };
}
