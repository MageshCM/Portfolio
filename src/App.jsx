import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import InnoFeed from './pages/projects/InnoFeed';
import AgricultureTraceability from './pages/projects/AgricultureTraceability';
import TaxChain from './pages/projects/TaxChain';
import Quants from './pages/projects/Quants';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/innofeed" element={<InnoFeed />} />
            <Route path="/projects/agriculture-traceability" element={<AgricultureTraceability />} />
            <Route path="/projects/tax-chain" element={<TaxChain />} />
            <Route path="/projects/quants" element={<Quants />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;