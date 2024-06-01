import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    axios.get('/api/v1/news')
      .then(response => setNews(response.data))
      .catch(error => console.error(error));

    const handleNewsReceived = (event) => {
      const newNewsItem = event.detail;
      setNews((prevNews) => {
        console.log(prevNews)
        const newsIndex = prevNews.findIndex(item => item.id === newNewsItem.id);
        if (newsIndex !== -1) {
          const updatedNews = [...prevNews];
          if (newNewsItem.hidden == true) {
            updatedNews.splice(newsIndex, 1);
            return updatedNews;
          } else {
            updatedNews[newsIndex] = newNewsItem;
            return updatedNews;
          }
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

  const sortNews = () => {
    const sortedNews = [...news].sort((a, b) => {
      const dateA = new Date(a.published_at);
      const dateB = new Date(b.published_at);
      if (sortOrder === 'desc') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    setNews(sortedNews);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Список новостей</h1>
      <button onClick={sortNews} className="btn btn-primary mb-3">
        Сортировать по дате {sortOrder === 'desc' ? 'по убыванию' : 'по возрастанию'}
      </button>
      <ul className="list-group">
        {news.map(newsItem => (
          newsItem && (
            <li key={newsItem.id} className="list-group-item">
              <Link to={`/news/${newsItem.id}`}>
                <h5>{newsItem.title}</h5>
                <img src={newsItem.image.url} alt={newsItem.title} className="img-fluid" />
              </Link>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default NewsList;