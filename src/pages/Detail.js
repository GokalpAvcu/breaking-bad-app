

import {useParams} from 'react-router-dom';

function Detail() {
  const {char_id} = useParams(); // useParams ile url'deki parametreye ulaşabiliyorum.
    return (
      <div>
        <h1>Detail</h1>
      </div>
    );
  }
  export default Detail;