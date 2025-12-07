import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

// 🟩 Komponenta Nastavení účtu přihlášeného uživatele
function Option(props) {
  // 🟩 State pro proměnné, které budu odesílat při změně ve formuláři
  const [optionNickname, setOptionNickname] = useState(
    props.currentUser.nickname
  );
  const [optionFirstName, setOptionFirstName] = useState(
    props.currentUser.firstName
  );
  const [optionLastName, setOptionLastName] = useState(
    props.currentUser.lastName
  );
  const [optionPassword, setOptionPassword] = useState("");

  const [email, setEmail] = useState(props.currentUser.email);
  const [emailPassword, setEmailPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [successEmail, setSuccessEmail] = useState("");

  // 🟧 Funkce pro změnu dat uživatele
  async function handleChangeData() {
    setErrorMessage("");
    setSuccessMessage("");

    const data = {
      optionNickname: optionNickname,
      optionFirstName: optionFirstName,
      optionLastName: optionLastName,
      optionPassword: optionPassword,
    };

    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/profile_option/profile_change.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const result = await request.json();

      console.log("Změna message: " + result.message);

      if (!result.success) {
        setErrorMessage("Něco se nepovedlo.");

        return;
      }

      if (result.success) {
        setSuccessMessage("Profil byl aktualizován.");
        setErrorMessage("");
        setOptionPassword("");

        props.setCurrentUser( e => ({
            ...e, nickname: result.nickname,
            firstName: result.firstName,
            lastName: result.lastName
        }))
      }
    } catch (error) {
      console.log("Chyba při změně dat v nastavení uživatele", error);
    }
  }

  // 🟧 Funkce pro změnu emailu
  async function handleChangeEmail() {
    setErrorEmail("");
    setSuccessEmail("");

    const data = { email, emailPassword };

    try {
      const request = await fetch("http://localhost/projekty/MyRecipeApp/backend/profile_option/email_change.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await request.json();

      if (!result.success) {
        setErrorEmail("Něco se pokazilo.");
        return;
      }
      if (result.success) {
        setSuccessEmail("Email byl úspěšně změněn.");
        setErrorEmail("");
        props.setCurrentUser(e => ({
            ...e, email: result.email
        }));
        setEmailPassword("");
      }
    } catch (error) {
      console.log("Při změně emailu došlo k chybě", error);
    }
  }
  return (
    <section className="d-flex justify-content-center mt-5 mb-5">
      <div className="card shadow border-0 w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center">
          {/* 🟩 Ikonka */}
          <FontAwesomeIcon icon={faCircleUser} className="register-icon mb-3" />

          <h2 className="mb-4">Nastavení účtu</h2>
          <h4 className="mb-4">Úprava údajů</h4>
          {/* 🟩 Změna Nickname, first name a last name */}
          <form>
            {/* 🟩 Nickname */}
            <div className="mb-3 text-center">
              <label
                htmlFor="option_nickname"
                className="form-label fs-5 fw-semibold"
              >
                Nickname
              </label>
              <input
                type="text"
                id="option_nickname"
                className="form-control text-center"
                value={optionNickname}
                onChange={(e) => setOptionNickname(e.target.value)}
              />
            </div>

            {/* 🟩 First Name */}
            <div className="mb-3 text-center">
              <label
                htmlFor="option_input_firstName"
                className="form-label fs-5 fw-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                id="option_input_firstName"
                className="form-control text-center"
                value={optionFirstName}
                onChange={(e) => setOptionFirstName(e.target.value)}
              />
            </div>

            {/* 🟩 Last Name */}
            <div className="mb-3 text-center">
              <label
                htmlFor="option_input_lastName"
                className="form-label fs-5 fw-semibold"
              >
                Last Name
              </label>
              <input
                type="text"
                id="option_input_lastName"
                className="form-control text-center"
                value={optionLastName}
                onChange={(e) => setOptionLastName(e.target.value)}
              />
            </div>

            {/* 🟩 Password */}
            <div className="mb-3 text-center">
              <label
                htmlFor="option_input_password"
                className="form-label fs-5 fw-semibold"
              >
                Password
              </label>
              <input
                type="password"
                id="option_input_password"
                className="form-control text-center"
                value={optionPassword}
                onChange={(e) => setOptionPassword(e.target.value)}
              />
            </div>

            {/* 🟩 Error / Success messages */}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}

            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={handleChangeData}
            >
              Změnit
            </button>
          </form>

          {/* 🟩 Změna emailu */}
          <form>
            {/* 🟩 Email */}
            <div className="mb-3 text-center">
              <label
                htmlFor="option_input_email"
                className="form-label fs-5 fw-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="option_input_email"
                className="form-control text-center"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* 🟩 Password */}
            <div className="mb-3 text-center">
              <label
                htmlFor="option_input_password_confirm"
                className="form-label fs-5 fw-semibold"
              >
                Password
              </label>
              <input
                type="password"
                id="option_input_password_confirm"
                className="form-control text-center"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
              />
            </div>

            {/* 🟩 Error / Success */}
            {errorEmail && <p className="text-danger">{errorEmail}</p>}
            {successEmail && <p className="text-success">{successEmail}</p>}

            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={handleChangeEmail}
            >
              Změnit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// TODO <p>Zmena hesla</p>
/*    <p>Zmena jmena</p>
      <p>Zmena emailu</p>
      <p>zmena njckname</p>
      <p>Zmena prijmeni</p>
      <p>Zrusit ucet</p> */

Option.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
};

export default Option;
