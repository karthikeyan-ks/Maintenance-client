import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Existing from './Existing';
import Issued from './Issued';
import Pending from './Pending';
import Review from './Review';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Create/>} />
          <Route path='/existing' element={<Existing />} />
          <Route path='/issued' element={<Issued />} />
          <Route path='/pending' element={<Pending />} />
          <Route path='/review' element={<Review />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
