import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NewsChannel from '../channels/news_channel';

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/news')
      .then(response => setNews(response.data))
      .catch(error => console.error(error));

    const handleNewsReceived = (event) => {
      const newNewsItem = event.detail;

      setNews((prevNews) => {
        const newsIndex = prevNews.findIndex(item => item.id === newNewsItem.id);

        if (newsIndex !== -1) {
          const updatedNews = [...prevNews];
          updatedNews[newsIndex] = newNewsItem;
          return updatedNews;
        } else {
          return [newNewsItem, ...prevNews];
        }
      });
    };

    window.addEventListener('news-received', handleNewsReceived);

    return () => {
      window.removeEventListener('news-received', handleNewsReceived);
    };
  }, []);

  return (
    <div>
      <h1>Список новостей</h1>
      <ul>
        {news.map(newsItem => (
          newsItem && (
            <li key={newsItem.id}>
              <Link to={`/news/${newsItem.id}`}>
                <h2>{newsItem.title}</h2>
                <img src={newsItem.image.url} alt={newsItem.title} />
              </Link>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default NewsList;