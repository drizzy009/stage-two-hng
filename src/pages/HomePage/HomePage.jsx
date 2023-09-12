import styles from "./HomePage.module.css";
import Header from "./../../components/Header/Header";
import MovieList from "./../../components/MovieList/MovieList";

const HomePage = () => {
  return (
    <>
    <main className={styles.homePage}>
      <Header />
      
    </main>
    <MovieList />
    </>
  );
};

export default HomePage;
