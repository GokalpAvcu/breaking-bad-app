import axios from 'axios';
import { useEffect, useState } from 'react';

import {useParams} from 'react-router-dom';


function Detail() {
  const [char, setChar] = useState(null);
  const [loading, setLoadiing] = useState(true);
  const {char_id} = useParams(); // useParams ile url'deki parametreye ulaşabiliyorum.

  useEffect(() => {
  axios(`$(process.env.REACT_APP_API_BASE_ENDPOINT)/characters/${char_id}`)
  .then((res) => res.data)
  .then((data) => setChar(data[0]));
  .finally(() => setLoading(false));
  },[char_id]);

    return (
      <div>
        {loading && <Loading/>}
        {char && (
          <div>
            <h1>{char.name}</h1>
            <img src={char.img} alt={{width:"50%"}} />           
           </div>
        )}
       
          {char && JSON.stringify(char)}
         
       
      </div>
    );
  }
  export default Detail;