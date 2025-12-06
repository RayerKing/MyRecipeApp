import { Routes, Route } from "react-router-dom";

import Home from "../components/views/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import PropTypes from 'prop-types';
import Profile from "../components/views/Profile";

// 🟩 Router pro cesty
export default function AppRouter(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <Login
            setCurrentUser={props.setCurrentUser}
      currentUser={props.currentUser}
          />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile setCurrentUser={props.setCurrentUser}
            currentUser={props.currentUser} />}/>
    </Routes>
  );
}

AppRouter.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
};
