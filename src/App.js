import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Layout from './components/Layout/Layout'
import Home from './routes/Home/Home'
import Details from './routes/Details/Details'
import PersonPage from './routes/PersonPage'
import Credits from './routes/Credits/Credits'
import PageNotFound from './components/PageNotFound/PageNotFound'

const App = () => {

  return (
    <ScrollToTop>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='*' element={<PageNotFound />} />
          <Route index element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/person/:personId' element={<PersonPage />} />
          <Route path='/credits/:mediaType/:movieId' element={<Credits />} />
        </Route>
      </Routes>
    </ScrollToTop>
  )
}

export default App
