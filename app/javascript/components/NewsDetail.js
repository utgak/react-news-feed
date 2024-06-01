import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NewsChannel from '../channels/news_channel';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/news/${id}`)
      .then(response => setNewsItem(response.data))
      .catch(error => console.error(error));

    const handleNewsReceived = (event) => {
      const updatedNewsItem = event.detail;

      if (updatedNewsItem.id === parseInt(id, 10)) {
        if (!updatedNewsItem.visible) {
          navigate('/news');
        } else {
          setNewsItem(updatedNewsItem);
        }
      }
    };

    window.addEventListener('news-received', handleNewsReceived);

    return () => {
      window.removeEventListener('news-received', handleNewsReceived);
    };
  }, [id, navigate]);

  if (!newsItem) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1>{newsItem.title}</h1>
      <img src={newsItem.image.url} alt={newsItem.title} className="img-fluid" />
      <p>{newsItem.content}</p>
    </div>
  );
};

export default NewsDetail;