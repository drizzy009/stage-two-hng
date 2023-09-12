import styles from "./Header.module.css";
import SearchBar from "./../SearchBar/SearchBar";
import { Logo, menu } from "../../assets";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="Movie Box Logo" />
      </Link>
      <SearchBar />
      <div className={styles.rightButtons}>
        <span aria-label="sign-in button">Sign In</span>
        <img src={menu} alt="Menu" />
      </div>
    </div>
  );
};

export default Header;
