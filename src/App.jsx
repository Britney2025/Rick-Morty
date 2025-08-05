import React from 'react'
import CharacterDetails from './components/CharacterDetails'
import Rick from './components/Rick'

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