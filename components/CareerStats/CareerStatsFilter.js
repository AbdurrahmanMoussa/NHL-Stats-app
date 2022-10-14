import styles from "./CareerStatsFilter.module.css";

const CareerStatsFilter = (props) => {
  {
    /* handles state and values which are passed from PlayerStats and adjusts states according to style */
  }
  const handleSelectChange = (e) => {
    props.isSelect(true);
    props.setSelected(e.target.value);
    props.isCareerActive(false);
  };

  return (
    <>
      {/* handles select changes and gets value of selected option using selected state passed from PlayerStats */}
      <select
        onChange={handleSelectChange}
        name="seasons"
        id="season"
        placeholder="Select a season"
        value={props.selected}
        className={styles.select}
      >
        {/* filtering league by name from data prop which has multiple duplicate league name values*/}
        {/* Then mapping each unique season name from filtered name values */}
        {props.data
          .filter(
            (value, index) =>
              index ===
              props.data.findIndex(
                (other) =>
                  value.league.name.toString() === other.league.name.toString()
              )
          )
          .map((season, idx) => {
            return (
              <option key={idx} value={props.selected.value}>
                {season.league.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default CareerStatsFilter;
