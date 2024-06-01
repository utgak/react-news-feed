import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import NewsList from './NewsList';
import NewsDetail from './NewsDetail';
import NotFound from './NotFound';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<NewsList />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;