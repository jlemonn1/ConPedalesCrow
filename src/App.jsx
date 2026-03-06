import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Donar from './pages/Donar';
import Diario from './pages/Diario';
import ElViaje from './pages/ElViaje';
import Mapa from './pages/Mapa';
import Comunidad from './pages/Comunidad';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donar" element={<Donar />} />
        <Route path="/diario" element={<Diario />} />
        <Route path="/viaje" element={<ElViaje />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/comunidad" element={<Comunidad />} />
      </Routes>
    </Router>
  );
}

export default App;
