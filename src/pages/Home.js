import React from "react";

import {useSelector} from 'react-redux'; // store üzerindeki bir veriye ulaşmak için useSelector kullanılır.

function Home() {
  const data = useSelector((state) => state.characters); // store üzerindeki characters verisine ulaşmak için state.characters yazılır. 
  console.log(data);
  
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
export default Home;
