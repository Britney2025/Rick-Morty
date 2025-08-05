import CharacterDetails from './components/CharacterDetails'
import Rick from './components/Rick'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Rick />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>

  )
}

export default App