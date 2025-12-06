import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faCircleUser,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 🟩 Komponenta pro registraci
function Register() {

  // 🟦 State pro formulář registrace
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  // 🟦 State pro vypsání zpráv
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // 🟦 State pro přesměrování
  const [countdown, setCountdown] = useState(null);

  // 🟧 Asynchornní funkce, která dotazuje backend pro registraci
  async function handleRegister() {

    // 🟩 Data, co odesílám
    const data = {
      firstName,
      lastName,
      email,
      nickname,
      password,
      passwordRepeat,
    };

    try {
      const response = await fetch(
        "backend/auth/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      //console.log("Fetch dat: " + result.message);

      // 🟩 Pole, které vykresluje zprávy podle odpovědi z backendu
      const errorArray = {
        "Different passwords": "Hesla se neshodují.",
        "Data missing": "Nejsou vyplněny všechny údaje.",
        "Email exists": "Tento email už je používán.",
        "Nickname exists": "Toto uživatelské jméno se už používá.",
        "Short password": "Heslo má mít minimálně 8 znaků.",
      };

      // 🟩 pokud registrace selže
      if (!result.success) {
        setErrorMessage(errorArray[result.message] || "Neznámá chyba.");
        return;
      }

      // 🟩 pokud registrace bude úspěšná
      if (result.success) {
        setErrorMessage("");
        setSuccessMessage("Registrace proběhla úspěšně.");
        setCountdown(3);

        // 🟩 Spuštění Intervalu pro přesměrování na login
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev == 1) {
              clearInterval(interval);
            }
            return prev - 1;
          });
        }, 1000);

        setTimeout(() => {
          navigate("/login");
        }, 3000);

        return;
      }
    } catch (error) {
      console.log("Chyba při komunikaci při registraci: ", error);
    }
  }

  return (
    <section className="d-flex justify-content-center mt-5 mb-5">
      <div className="card shadow border-0 w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center">
          {/* 🟩 Ikonka nad nadpisem */}
          <FontAwesomeIcon icon={faCircleUser} className="register-icon mb-3" />

          <h2 className="mb-4">Registrace</h2>

          {/* 🟩 Register formulář */}

          <form>
            {/* 🟩 First Name */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="input_first_name" className="form-label">
                  <FontAwesomeIcon icon={faUser} /> FirstName
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="input_first_name"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* 🟩 Last Name */}
              <div className="col-md-6">
                <label htmlFor="input_last_name" className="form-label">
                  <FontAwesomeIcon icon={faUser} /> LastName
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="input_last_name"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* 🟩 Email */}
            <div className="mb-3">
              <label htmlFor="input_email" className="form-label">
                <FontAwesomeIcon icon={faEnvelope} /> E-Mail
              </label>
              <input
                type="email"
                className="form-control text-center"
                id="input_email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            { /* 🟩 Nickname */ }
            <div className="mb-3">
              <label htmlFor="input_nickname" className="form-label">
                <FontAwesomeIcon icon={faUser} /> Nickname
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="input_nickname"
                placeholder="john.doe"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            {/* 🟩 Password */}
            <div className="mb-3">
              <label htmlFor="input_password" className="form-label">
                <FontAwesomeIcon icon={faKey} /> Password
              </label>
              <input
                type="password"
                className="form-control text-center"
                id="input_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* 🟩 Password again */}
            <div className="mb-4">
              <label htmlFor="input_password_again" className="form-label">
                <FontAwesomeIcon icon={faKey} /> Password Repeat
              </label>
              <input
                type="password"
                className="form-control text-center"
                id="input_password_again"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
            </div>

            { /* 🟩 Vykreslení zprávy */ }
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
            {countdown !== null && (
              <p className="text-center">Budete přesměrování za {countdown}…</p>
            )}

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleRegister}
            >
              Registrovat se
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
