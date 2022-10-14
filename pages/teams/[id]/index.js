import Head from "next/head";
import { Fragment } from "react";
import TeamDetail from "../../../components/Teams/TeamDetail";
import teams from "@nhl-api/teams";

export default function TeamDetails({ data, teams }) {
  return (
    <Fragment>
      <Head>
        <title>NHL Team Details</title>
      </Head>

      <TeamDetail teams={data.teams["0"]} logo={teams} />
    </Fragment>
  );
}
export async function getStaticPaths() {
  const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/`);
  const data = await res.json();

  const paths = data.teams.map((team) => ({
    params: { id: team.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://statsapi.web.nhl.com/api/v1/teams/${params.id}`
  );
  const data = await res.json();

  //   let results = [];
  //   const item = {
  //     id: 51,
  //     name: "Seattle Kraken",
  //     abbreviation: "SEA",
  //     nicknames: ["Kraken"],
  //     colors: ["#C8102E", "#041E42", "#FFF"],
  //     logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Seattle_Kraken_official_logo.svg/440px-Seattle_Kraken_official_logo.svg.png",
  //     goalHorn:
  //       "https://github.com/gretzky/nhl-api/blob/master/packages/teams/src/assets/horns/wsh.m4a",
  //     goalHornSong:
  //       "https://github.com/gretzky/nhl-api/blob/master/packages/teams/src/assets/songs/wsh.mp3",
  //     isActive: true,
  //   };

  //   var foundIndex = teams.findIndex((x) => x.id === item.id);
  //   teams[foundIndex] = item;

  //   results.push(teams);

  return {
    props: {
      data,
      teams,
    },
  };
}
