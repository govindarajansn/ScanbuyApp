
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import BookList from './pages/BookList/Books'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/books" element={<BookList />}/>
    </Routes>
  );
}

export default App;
