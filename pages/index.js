import { useEffect, useState } from "react";
import Seo from "../components/Seo";
const API_KEY = "5dcb3185f69302a6ddc93c02379bc41e";

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const { results } = await response.json();
      setMovies(results);
    })();
  }, []);
  return (
    <>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies.map((el) => (
        <div key={el.id}>
          <h4>{el.original_title}</h4>
        </div>
      ))}
    </>
  );
}
