import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/news/${id}`)
      .then(response => setNewsItem(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!newsItem) return <div>Loading...</div>;

  return (
    <div>
      <h1>{newsItem.title}</h1>
      <img src={newsItem.image_url} alt={newsItem.title} />
      <p>{newsItem.content}</p>
    </div>
  );
};

export default NewsDetail;
