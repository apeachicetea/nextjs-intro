import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    //router hook으로 페이지 이동뿐만 아니라 쿼리로 내용을 전달해줄 수 있다.
    //push 2번째 인자에 유저에게 보일 url의 모습을 정의해주면 데이터를 쿼리에 전달해주면서 숨길수 있다
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          title,
        },
      },
      `/movies/${id}`
    );
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="Poster Image"
          />
          <h4>
            {/* Link도 Router hook와 같이 기능한다 */}
            <Link
              href={
                ({
                  pathname: `/movies/${movie.id}`,
                  query: {
                    title: movie.original_title,
                  },
                },
                `/movies/${movie.id}`)
              }
            >
              <a>{movie.original_title} </a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

//getServerSideProps안에 있는 코드는 어떤 것이든 간에 서버에서만 실행되게 된다
//무엇을 리턴하던지, 이걸 props로써 page에게 주게 된다.
export async function getServerSideProps() {
  const response = await fetch(`http://localhost:3000/api/movies`);
  const { results } = await response.json();
  return {
    props: {
      results,
    },
  };
}
