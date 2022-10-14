import { useState, useCallback } from "react";
const useHttp = () => {
  const [fetchData, setFetchedData] = useState([]);
  const arr = [];

  {
    /*handler to fetch players data for PlayerList */
  }
  const handlePlayerList = async (url) => {
    try {
      const req = await fetch(url).then((response) => response.json());

      setFetchedData(req);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayerStats = async (url) => {
    try {
      const req = await fetch(url).then((response) => response.json());

      {
        /* if the stats array exists, then passing the response data to fetchData */
      }
      if (req.stats) {
        setFetchedData(req.stats[0].splits);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayerGamelogs = async (url) => {
    try {
      const req = await fetch(url).then((response) => response.json());

      {
        /* if the stats array exists, then passing the response data to fetchData */
      }
      if (req.stats) {
        setFetchedData(req.stats[0].splits);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    fetchData,
    handlePlayerStats,
    handlePlayerList,
    handlePlayerGamelogs,
  };
};

export default useHttp;
