import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { useContext } from 'react';

// import ListContext from './store/list-context';

import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import Teachers from './pages/Teachers/Teachers';
import Course from './pages/Courses/Course/Course';
import Teacher from './pages/Teachers/Teacher/Teacher';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function App() {
// const context = useContext(ListContext);

  return (
  <Router>
    <div className="App">
      <Header />
        <main className='main'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/teachers' element={<Teachers />} />
        <Route path='/courses/:courseId' element={<Course />}/>
        <Route path='/teachers/:teacherId' element={<Teacher />}/>
      </Routes>
        </main>
      {/* {context.error && 
      <div>something went wrong</div>} */}
      <Footer />
    </div>
  </Router>
  );
}

export default App;
