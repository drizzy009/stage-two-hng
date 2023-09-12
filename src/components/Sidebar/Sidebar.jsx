import { logosidebar } from "../../assets";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { GrHomeRounded } from "react-icons/gr";
import { BiCameraMovie } from "react-icons/bi";
import { BsPlayBtn, BsCalendar2Minus } from "react-icons/bs";

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <Link to="/">
        <img src={logosidebar} alt="Logo" />
      </Link>
      <ul className={styles.sidebarItems}>
        <li>
          <GrHomeRounded />
          Home
        </li>
        <li>
          <BiCameraMovie />
          Movies
        </li>
        <li>
          <BsPlayBtn />
          TV Series
        </li>
        <li>
          <BsCalendar2Minus />
          Upcoming
        </li>
      </ul>
      <div className={styles.sidebarPlay}>
        <span>Play movie quizes and earn free tickets</span>
        <span>50k people are playing now</span>
        <a href="#">Start playing</a>
      </div>
      <div>
        <button role="button">Log out</button>
      </div>
    </aside>
  );
};

export default Sidebar;
