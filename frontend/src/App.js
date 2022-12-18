import {
  Route,
  Routes
} from "react-router-dom";

import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'

function App() {

  return (
        <div className="App">
            <Header /> {/*this is importing the react components from compoenents/Header.js */}
            <Routes>
                <Route path="/" exact element={<NotesListPage />} />
                <Route path="/notes" exact element={<NotesListPage />} />
                <Route path="/notes/:id" element={<NotePage />} /> 
                {/* this is how dynamic routes work */}
            </Routes>
        </div>
  );
}

export default App;
