import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AlumniPage from './pages/AlumniPage';
import CompanyPage from './pages/CompanyPage';
import StartupTeamPage from './pages/StartupTeamPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/alumni" element={<AlumniPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/team" element={<StartupTeamPage />} />
            </Routes>
        </Router>
    )
}

export default App
