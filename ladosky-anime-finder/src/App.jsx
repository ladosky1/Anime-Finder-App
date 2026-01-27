import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WatchlistProvider } from './context/WatchlistContext'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Results from './pages/Results'
import Watchlist from './pages/Watchlist'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {
  
  return (
    <WatchlistProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/results' element={<Results />} />
        <Route path='/watchlist' element={<Watchlist />} />
      </Routes>
      <Footer />
    </Router>
    </WatchlistProvider>
  )
  
}

export default App
