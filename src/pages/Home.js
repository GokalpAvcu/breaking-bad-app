import { useEffect } from "react";

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

      {characters.map(character => (
        <div >
         <img alt={character.name} src={character.img} />
         
        </div>
      ))}
    </div>
  );
}
export default Home;
