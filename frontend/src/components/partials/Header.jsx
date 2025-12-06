import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightToBracket,
  faUserPlus,
  faDrumstickBite,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// 🟩 Komponenta pro Header
function Header(props) {
  // 🟩 zjistí aktuální URL
  const location = useLocation();

  const navigate = useNavigate();

  // 🟧 Asynchornní funkce pro odhlášení
  async function handleLogout() {
    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/auth/logout.php",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await request.json();

      // 🟩 pokud úspěch
      if (result.success) {
        props.setCurrentUser(null);
        navigate("/");
      } else {
        console.log("Neznámá chyba při odhlašování");
      }
    } catch (error) {
      console.log("Nastala chyba", error);
    }
  }

  return (
    <header>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            {/* 🟩 Název aplikace */}
            <Link
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <span className="me-2">
                <FontAwesomeIcon icon={faDrumstickBite} />
              </span>
              <h1 className="h4 mb-0">MyRecipeApp</h1>
            </Link>

            {/* 🟩 Navigace */}
            <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
              {/* 🟩 Domů */}
              <li className="nav-item">
                <Link
                  to="/"
                  className={
                    location.pathname === "/"
                      ? "nav-link text-secondary text-decoration-underline"
                      : "nav-link text-secondary"
                  }
                >
                  <span className="me-2">
                    <FontAwesomeIcon icon={faHouse} />
                  </span>
                  Domů
                </Link>
              </li>

              {/*🟩  Přihlášení, pokud není uživatel */}

              {!props.currentUser && (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={
                      location.pathname === "/login"
                        ? "nav-link text-secondary text-decoration-underline"
                        : "nav-link text-secondary"
                    }
                  >
                    <span className="me-2">
                      <FontAwesomeIcon icon={faRightToBracket} />
                    </span>
                    Přihlášení
                  </Link>{" "}
                </li>
              )}

              {/* 🟩 Přihlášení, pokud uživatel je == uživatel */}

              {props.currentUser && (
                <li className="nav-item">
                  { /* ❗TODO doplnit cestu ❗ */}
                  <Link
                    to=""
                    className={
                      location.pathname === ""
                        ? "nav-link text-secondary text-decoration-underline"
                        : "nav-link text-secondary"
                    }
                  >
                    <span className="me-2">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    {props.currentUser.nickname}
                  </Link>
                </li>
              )}

              {/* 🟩 Registrace, pokud není uživatel */}
              {!props.currentUser && (
                <li className="nav-item">
                  <Link
                    to="/register"
                    className={
                      location.pathname === "/register"
                        ? "nav-link text-secondary text-decoration-underline"
                        : "nav-link text-secondary"
                    }
                  >
                    <span className="me-2">
                      <FontAwesomeIcon icon={faUserPlus} />
                    </span>
                    Registrace
                  </Link>
                </li>
              )}

              {/* 🟩 Registrace, pokud je uživatel == odhlášení */}
              {props.currentUser && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-secondary"
                    onClick={handleLogout}
                  >
                    <span className="me-2">
                      <FontAwesomeIcon icon={faRightToBracket} />
                    </span>
                    Odhlásit
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
};

export default Header;
