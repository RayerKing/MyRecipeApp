import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

// 🟩 Komponenta Nastavení účtu přihlášeného uživatele
function Option(props) {
  // 🟩 State pro proměnné, které budu odesílat při změně ve formuláři dat
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

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 🟩 State pro proměnné pro formulář emailu
  const [email, setEmail] = useState(props.currentUser.email);
  const [emailPassword, setEmailPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [successEmail, setSuccessEmail] = useState("");

  // 🟩 State pro proměnné odesílané pro formulář hesla
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  const [errorPassword, setErrorPassword] = useState("");
  const [successPassword, setSuccessPassword] = useState("");

  // 🟩 State pro proměnné pro cancel formulář
  const [cancelPassword, setCancelPassword] = useState("");
  const [errorCancel, setErrorCancel] = useState("");
  const [successCancel, setSuccessCancel] = useState("");
  const [agree, setAgree] = useState(false);
  const [countdown, setCountdown] = useState(null);

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

        props.setCurrentUser((e) => ({
          ...e,
          nickname: result.nickname,
          firstName: result.firstName,
          lastName: result.lastName,
        }));
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
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/profile_option/email_change.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await request.json();

      if (!result.success) {
        setErrorEmail("Něco se pokazilo.");
        return;
      }
      if (result.success) {
        setSuccessEmail("Email byl úspěšně změněn.");
        setErrorEmail("");
        props.setCurrentUser((e) => ({
          ...e,
          email: result.email,
        }));
        setEmailPassword("");
      }
    } catch (error) {
      console.log("Při změně emailu došlo k chybě", error);
    }
  }

  // 🟧 Funkce pro změnu hesla
  async function handlePasswordChange() {
    setSuccessPassword("");
    setErrorPassword("");

    const data = { oldPassword, newPassword, newPasswordRepeat };

    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/profile_option/password_change.php",
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

      if (!result.success) {
        setSuccessPassword("");
        setErrorPassword("Něco se pokazilo.");
        console.log(result.message);
        return;
      }

      if (result.success) {
        setErrorPassword("");
        setSuccessPassword("Heslo bylo úspěšně změněno.");
        setOldPassword("");
        setNewPassword("");
        setNewPasswordRepeat("");
      }
    } catch (error) {
      console.log("Něco se nepovedlo při změně hesla", error);
    }
  }

  async function handleCancel() {
    setErrorCancel("");
    setSuccessCancel("");

    const data = { cancelPassword, agree };

    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/profile_option/account_delete.php",
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
      console.log(result.message);
      if (!result.success) {
        setErrorCancel("Něco se pokazilo.");
        return;
      }

      if (result.success) {
        setSuccessCancel("Účet je úspěšně odstraněn.");

        let time = 3;
        setCountdown(time);

        const interval = setInterval(() => {
          time -= 1;
          setCountdown(time);

          if (time <= 0) {
            clearInterval(interval);
            props.setCurrentUser(null);
          }
        }, 1000);
      }
    } catch (error) {
      console.log("Při smazání účtu došlo k chybě", error);
    }
  }

  return (
    <section className="d-flex justify-content-center mt-5 mb-5">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        {/* 🟩 Blok: Úprava údajů */}
        <div className="card shadow border-0 mb-4 pt-4">
          {/* 🟩 Hlavní nadpis + ikonka */}
          <div className="text-center mb-4">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="register-icon mb-3"
            />
            <h2 className="mb-0">Nastavení účtu</h2>
          </div>

          <div className="card-body">
            <h4 className="mb-4 text-center">Úprava údajů</h4>

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
              {successMessage && (
                <p className="text-success">{successMessage}</p>
              )}

              <button
                type="button"
                className="btn btn-primary w-100 mt-3"
                onClick={handleChangeData}
              >
                Změnit
              </button>
            </form>
          </div>
        </div>

        {/* 🟩 Blok: Změna emailu */}
        <div className="card shadow border-0 mb-4">
          <div className="card-body">
            <h4 className="mb-4 text-center">Změna emailu</h4>

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

        {/* 🟩 Blok: Změna hesla */}
        <div className="card shadow border-0 mb-4">
          <div className="card-body">
            <h4 className="mb-4 text-center">Změna hesla</h4>

            <form>
              {/* 🟩 Old Password */}
              <div className="mb-3 text-center">
                <label
                  htmlFor="option_old_change_password"
                  className="form-label fs-5 fw-semibold"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  id="option_old_change_password"
                  className="form-control text-center"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              {/* 🟩 New Password */}
              <div className="mb-3 text-center">
                <label
                  htmlFor="option_new_change_password"
                  className="form-label fs-5 fw-semibold"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="option_new_change_password"
                  className="form-control text-center"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              {/* 🟩 New Password Again */}
              <div className="mb-3 text-center">
                <label
                  htmlFor="option_new_change_password_repeat"
                  className="form-label fs-5 fw-semibold"
                >
                  New Password Again
                </label>
                <input
                  type="password"
                  id="option_new_change_password_repeat"
                  className="form-control text-center"
                  value={newPasswordRepeat}
                  onChange={(e) => setNewPasswordRepeat(e.target.value)}
                />
              </div>

              {/* 🟩 Error / Success messages */}
              {errorPassword && <p className="text-danger">{errorPassword}</p>}
              {successPassword && (
                <p className="text-success">{successPassword}</p>
              )}

              <button
                type="button"
                className="btn btn-primary w-100 mt-3"
                onClick={handlePasswordChange}
              >
                Změnit heslo
              </button>
            </form>
          </div>
        </div>

        {/* 🟩 Blok: Zrušení účtu */}
        <div className="card shadow border-0 mb-4">
          <div className="card-body">
            <h4 className="mb-4 text-center text-danger">Zrušit účet</h4>

            <form>
              {/* 🟩 Password */}
              <div className="mb-3 text-center">
                <label
                  htmlFor="option_input_password_cancel"
                  className="form-label fs-5 fw-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="option_input_password_cancel"
                  className="form-control text-center"
                  value={cancelPassword}
                  onChange={(e) => setCancelPassword(e.target.value)}
                />
                <div className="form-check d-flex justify-content-center align-items-center gap-2 text-center">
                  <input
                    type="checkbox"
                    className="form-check-input border border-danger"
                    id="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <label
                    htmlFor="checkbox"
                    className="form-check-label text-danger fw-bold"
                  >
                    Účet bude nenávratně zrušen!
                  </label>
                </div>
              </div>

              {/* 🟩 Error / Success */}
              {errorCancel && <p className="text-danger text-center">{errorCancel}</p>}
              {successCancel && <p className="text-success text-center">{successCancel}</p>}
              {countdown && (
                <p className="text-danger">Budete odhlášen za: {countdown}</p>
              )}

              <button
                type="button"
                className="btn btn-danger w-100 mt-3"
                onClick={handleCancel}
              >
                Zrušit účet
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

Option.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
};

export default Option;
