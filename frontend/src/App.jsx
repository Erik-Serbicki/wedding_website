import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ActivitiesPage from './pages/ActivitiesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-2xl font-serif text-wedding-accent hover:text-wedding-primary transition">
                Our Wedding
              </Link>
              <div className="flex space-x-8">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-wedding-primary transition font-medium"
                >
                  Home
                </Link>
                <Link 
                  to="/activities" 
                  className="text-gray-700 hover:text-wedding-primary transition font-medium"
                >
                  Honeymoon
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-400">
              Made with ❤️ for our special day
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
