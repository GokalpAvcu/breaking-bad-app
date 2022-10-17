import { useEffect } from "react";

import "./styles.css";
import Masonry from "react-masonry-css";

import Loading from "../components/Loading";
import Error from "../components/Error";

import { useSelector, useDispatch } from "react-redux"; // store üzerindeki bir veriye ulaşmak için useSelector kullanılır.
import { fetchCharacters } from "../redux/charactersSlice";

function Home() {
  const characters = useSelector((state) => state.characters.items); // store üzerindeki characters verisine ulaşmak için state.characters yazılır.
  const nextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const isLoading = useSelector((state) => state.characters.isLoading);
  const error = useSelector((state) => state.characters.error);

  const dispatch = useDispatch(); // store üzerindeki bir veriyi değiştirmek için useDispatch kullanılır.

  useEffect(() => {
    dispatch(fetchCharacters()); // store üzerindeki bir veriyi değiştirmek için useDispatch kullanılır.
  }, [dispatch]); // dispatch değiştiğinde useEffect çalışır.

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map(
          (
            character // store üzerindeki characters verisine ulaşmak için state.characters yazılır.
          ) => (
            <div>
              <img
                alt={character.name}
                src={character.img}
                className="character"
              />
              <div className="char_name">{character.name}</div>
            </div>
          )
        )}
      </Masonry>

      <div style={{ padding: "20px 0 40px 0", textAlign: "center" }}>
        {isLoading && <Loading />}
        {hasNextPage && !isLoading && (
          <button onClick={() => dispatch(fetchCharacters(nextPage))}>
            Load More ({nextPage})
          </button>
        )}
      </div>
    </div>
  );
}
export default Home;
