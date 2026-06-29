import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { useSelector, useDispatch } from 'react-redux'
import CreateNote from './pages/CreateNote';
import ViewNotes from './pages/ViewNotes';
import { fetchNote } from './store/slices/noteSlices'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch();
  const { Note: notes, loading, error } = useSelector((state) => state.note);

  useEffect(() => {
    dispatch(fetchNote());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CreateNote />} />
            <Route path="/notes" element={<ViewNotes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;