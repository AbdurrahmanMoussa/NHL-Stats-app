import { useState } from "react";
import styles from "./Search.module.css";
import ImageFallback from "../UI/ImageWithFallback";
import searchIcon from "../../public/search_icon.png";

const Search = ({ setSearchTerm }) => {
  const [isClicked, setIsClicked] = useState(null);

  const handleImageClick = () => {
    setIsClicked(true);
  };
  return (
    <div className={styles.inputContainer}>
      <div className={styles.img}>
        {!isClicked ? (
          <ImageFallback
            src={searchIcon}
            fallbackSrc={""}
            alt="background image"
            width="40"
            height="60"
            priority
            className={styles.action}
            onClick={handleImageClick}
          />
        ) : (
          <div className={styles.close} onClick={() => setIsClicked(false)}>
            x
          </div>
        )}
      </div>
      {isClicked && (
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
    </div>
  );
};

export default Search;
