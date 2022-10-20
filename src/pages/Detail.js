import axios from 'axios';
import { useEffect, useState } from 'react';

import {useParams} from 'react-router-dom';


function Detail() {
  const [char, setChar] = useState(null);
  const {char_id} = useParams(); // useParams ile url'deki parametreye ulaşabiliyorum.

  useEffect(() => {
  axios(`$(process.env.REACT_APP_API_URL)/characters/${char_id}`)
  .then((res) => res.data)
  .then((data) => setChar(data));
  },[char_id])

    return (
      <div>
        <h1>Detail</h1>
      </div>
    );
  }
  export default Detail;