import { Routes, Route } from "react-router-dom";

import Home from "../components/views/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import PropTypes from "prop-types";
import Profile from "../components/views/Profile";
import DetailCard from "../components/views/recipe_card/DetailCard";
import EditCard from "../components/views/recipe_card/EditCard";
import AddCard from "../components/views/recipe_card/AddCard";

// 🟩 Router pro cesty
export default function AppRouter(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home lastPage={props.lastPage} setLastPage={props.setLastPage} />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            setCurrentUser={props.setCurrentUser}
            currentUser={props.currentUser}
            lastPage={props.lastPage}
            setLastPage={props.setLastPage}
          />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <Profile
            setCurrentUser={props.setCurrentUser}
            currentUser={props.currentUser}
            profilePage={props.profilePage}
            setProfilePage={props.setProfilePage}
          />
        }
      />
      <Route
        path="/recipe/:id"
        element={
          <DetailCard
            lastPage={props.lastPage}
            setLastPage={props.setLastPage}
            profilePage={props.profilePage}
            setProfilePage={props.setProfilePage}
            currentUser={props.currentUser}
          />
        }
      />
      <Route
        path="/recipe/:id/edit"
        element={
          <EditCard
            currentUser={props.currentUser}
            lastPage={props.lastPage}
            profilePage={props.profilePage}
            setFlashMessage={props.setFlashMessage}
          />
        }
      />
      <Route path="/add" element={<AddCard setFlashMessage={props.setFlashMessage} />} />
    </Routes>

  );
}

AppRouter.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
  lastPage: PropTypes.string,
  setLastPage: PropTypes.func,
  profilePage: PropTypes.string,
  setProfilePage: PropTypes.func,
  setFlashMessage: PropTypes.func,
};
