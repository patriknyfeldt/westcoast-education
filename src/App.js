import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import Teachers from './pages/Teachers/Teachers';
import Course from './pages/Course/Course';

import Header from './layout/Header/Header'




function App() {
  return (
  <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/teachers' element={<Teachers />} />
        <Route path='/courses/:courseId' element={<Course />}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
