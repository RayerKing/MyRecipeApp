import PropTypes from "prop-types";
import { useState } from "react";
import MyRecept from "./profile/MyRecept";
import Profile_Info from "./profile/Profile_Info";
import Option from "./profile/Option";

// 🟩 Komponenta pro zobrazení profilu
function Profile(props) {
  // 🟩 State pro konkrétní stránku seznamu
  const [activeSection, setActiveSection] = useState("recept");

  // 🟩 Kontrola, zda je user
  if (!props.currentUser) {
    return null;
  }

  return (
    <div className="container my-4">
      <div className="row">
        {/* 🟩 Levý sloupec */}
        <div className="col-12 col-md-3 col-lg-2 border-end">
          <ul className="list-group list-group-flush">
            <li
              className={
                "list-group-item list-group-item-action border-0 ps-0 " +
                (activeSection === "recept" ? "fw-semibold" : "")
              }
              role="button"
              onClick={() => setActiveSection("recept")}
            >
              Moje recepty
            </li>

            <li
              className={
                "list-group-item list-group-item-action border-0 ps-0 " +
                (activeSection === "profile" ? "fw-semibold" : "")
              }
              role="button"
              onClick={() => setActiveSection("profile")}
            >
              Profil
            </li>

            <li
              className={
                "list-group-item list-group-item-action border-0 ps-0 " +
                (activeSection === "option" ? "fw-semibold" : "")
              }
              role="button"
              onClick={() => setActiveSection("option")}
            >
              Nastavení účtu
            </li>
          </ul>
        </div>

        {/* 🟩 Pravá část */ }
        <div className="col-12 col-md-9 col-lg-10 mt-3 mt-md-0">
          {activeSection === "recept" && <MyRecept />}
          {activeSection === "option" && <Option />}
          {activeSection === "profile" && (
            <Profile_Info
              currentUser={props.currentUser}
              setCurrentUser={props.setCurrentUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
};

export default Profile;
