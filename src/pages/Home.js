import { useEffect } from "react";
import "./styles.css";
import Masonry from "react-masonry-css";
import { useSelector, useDispatch } from "react-redux"; // store üzerindeki bir veriye ulaşmak için useSelector kullanılır.
import { fetchCharacters } from "../redux/charactersSlice";

function Home() {
  const characters = useSelector((state) => state.characters.items); // store üzerindeki characters verisine ulaşmak için state.characters yazılır.
  const dispatch = useDispatch(); // store üzerindeki bir veriyi değiştirmek için useDispatch kullanılır.

  useEffect(() => {
    dispatch(fetchCharacters()); // store üzerindeki bir veriyi değiştirmek için useDispatch kullanılır.
  }, [dispatch]); // dispatch değiştiğinde useEffect çalışır.

  return (
    <div>
      <h1>characters</h1>

      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map((character) => ( // store üzerindeki characters verisine ulaşmak için state.characters yazılır.
          <div>
            <img alt={character.name} src={character.img} className="character" />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
export default Home;
