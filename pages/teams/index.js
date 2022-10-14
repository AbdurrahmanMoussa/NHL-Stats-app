import Head from "next/head";
import { Fragment } from "react";
import TeamList from "../../components/Teams/TeamList";
import teams from "@nhl-api/teams";

export default function Teams(props) {
  return (
    <Fragment>
      <Head>
        <title>NHL Teams</title>
      </Head>

      <TeamList teams={props.teamInfo} logos={props.teams} />
    </Fragment>
  );
}

export async function getStaticProps() {
  let arr = [];
  const allTeams = await fetch("https://statsapi.web.nhl.com/api/v1/teams/")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.teams.length; i++) {
        arr.push(data.teams[i]);
      }
    });

  arr.sort((a, b) => a.name.localeCompare(b.name));

  return {
    props: {
      teamInfo: arr,
      teams,
    },
  };
}
