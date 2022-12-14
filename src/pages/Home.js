import { Link } from "react-router-dom";

import { useEffect } from "react";

import "./styles.css";
import Masonry from "react-masonry-css";

import Loading from "../components/Loading";
import Error from "../components/Error";

import { useSelector, useDispatch } from "react-redux"; // store üzerindeki bir veriye ulaşmak için useSelector kullanılır.
import { fetchCharacters } from "../redux/charactersSlice";

function Home() {
  // burda useSelectors kullanmamın sebebi, store üzerindeki bir veriye ulaşmak istiyorum.
  const characters = useSelector((state) => state.characters.items); // store üzerindeki characters verisine ulaşmak için state.characters yazılır. useSelectors kullandım çünkü
  const nextPage = useSelector((state) => state.characters.page); // characters page değerine ulaşmak için state.characters.page yazılır.
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);

  console.log(hasNextPage);

  // store üzerindeki bir veriyi değiştirmek için useDispatch kullanılır.
  const dispatch = useDispatch();

  useEffect(() => {
    // useEffect kullandım çünkü, sayfa ilk açıldığında, sayfa sonuna gelindiğinde, sayfa yenilendiğinde çalışmasını istiyorum.
    if (status === "idle") {
      // status değeri "idle" ise, yani sayfa ilk açıldığında çalışmasını istiyorum.
      dispatch(fetchCharacters()); // ilk açıldığında, sayfa yenilendiğinde çalışmasını istiyorum.
    }
  }, [dispatch, status]); // dispatch değiştiğinde useEffect çalışır.

  if (status === "failed") {
    // status değeri failed ise Error componentini döndür.
    return <Error message={error} />; // Error componentine message propu olarak error değerini gönderiyorum.
  }

  return (
    // return içindeki kodlar, Home componentini döndürür.
    <div>
      <Masonry // Masonry componenti, karakterlerin sıralanmasını sağlar.
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column" // Masonry componentini kullanarak, karakterlerin görünümünü ayarlıyorum.
      >
        {characters.map(
          (
            character // characters verisini map fonksiyonu ile dönüyorum. store üzerindeki characters verisine ulaşmak için state.characters yazılır.
          ) => (
            <div key={character.char_id}>
              {" "}
              {/* key propu, React'in her bir elemanı tekil olarak tanımasını sağlar. */}
              <Link to={`/char/${character.char_id}`}>
                <img
                  alt={character.name} // karakterin ismini alt propuna yazıyorum.
                  src={character.img} // karakterin resmini src propuna yazıyorum.
                  className="character"
                />
                <div className="char_name">{character.name}</div>{" "}
                {/* karakterin ismini yazdırıyorum. */}
              </Link>
            </div>
          )
        )}
      </Masonry>

      <div style={{ padding: "20px 0 40px 0", textAlign: "center" }}>
        {status === "loading" ?? <Loading />}{" "}
        {/* status değeri loading ise Loading componentini döndür. */}
        {hasNextPage &&
          (status !== "loading" ?? ( // hasNextPage true ise ve status loading değil ise, aşağıdaki kodları çalıştır.
            <button onClick={() => dispatch(fetchCharacters(nextPage))}>
              {" "}
              {/* store üzerindeki bir veriyi değiştirmek için useDispatch kullanılır. */}
              Load More {{ nextPage }}
            </button>
          ))}
        {
          !hasNextPage ?? <div>There is no character.</div> // eğer nextPage yoksa, "There is no character." yazdır.
        }
      </div>
    </div>
  );
}
export default Home;

