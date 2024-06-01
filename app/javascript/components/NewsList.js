import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/news')
      .then(response => setNews(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Список новостей</h1>
      <ul>
        {news.map(newsItem => (
          <li key={newsItem.id}>
            <Link to={`/news/${newsItem.id}`}>
              <h2>{newsItem.title}</h2>
              <img src={newsItem.image_url} alt={newsItem.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
