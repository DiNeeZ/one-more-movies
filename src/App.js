import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import Layout from "./components/Layout/Layout";
import Home from "./routes/Home/Home";
import Details from "./routes/Details/Details";
import Person from "./routes/Person/Person";
import Credits from "./routes/Credits/Credits";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import SearchResults from "./routes/SearchResults/SearchResults";
import Auth from "./routes/Auth/Auth";

import { useDispatch } from "react-redux";
import { setCurrentUser, setStoredUser } from "./features/userSlice";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const u = await createUserDocumentFromAuth(user);
        console.log(u);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<PageNotFound />} />
          <Route index element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/person/:personId" element={<Person />} />
          <Route path="/credits/:mediaType/:movieId" element={<Credits />} />
          <Route path="/search-results/:query" element={<SearchResults />} />
          <Route path="/auth/:type" element={<Auth />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
};

export default App;
