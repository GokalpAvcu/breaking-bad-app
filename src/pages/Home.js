import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux"; // store üzerindeki bir veriye ulaşmak için useSelector kullanılır.
import { fetchCharacters } from "../redux/charactersSlice";

function Home() {
  const data = useSelector((state) => state.characters); // store üzerindeki characters verisine ulaşmak için state.characters yazılır.
  const dispatch = useDispatch(); // store üzerindeki bir veriyi değiştirmek için useDispatch kullanılır.

  useEffect(() => {
    dispatch(fetchCharacters()); // store üzerindeki bir veriyi değiştirmek için useDispatch kullanılır.
    console.log(data);
  }, [dispatch]); // dispatch değiştiğinde useEffect çalışır.

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
export default Home;
