import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faCircleUser, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 🟩 Komponenta pro login
function Login(props) {

  // 🟦 State pro formulář přihlášení
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  // 🟦State pro ErrorMessage
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // 🟧 Asynchronní funkce, která dotazuje backendu pro přihlášení
  async function handleLogin() {
    // Data, která odesílám na backend
    const data = { nickname, password };

    try {
      //http://localhost/projekty/MyRecipeApp/backend/auth/login.php
      //backend/auth/login.php
      const response = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/auth/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      //console.log(result.message);

      // 🟩 pole, které drží zprávy z backendu, dle nich udává, který text se má vykreslit
      const arrayErrorMessage = {
        "Chybí data": "Nejsou vyplněny všechny údaje.",
        "Data nejsou": "Neplatné heslo nebo nickname.",
      };

      // 🟩 pokud login neproběhne
      if (!result.success) {
        setErrorMessage(arrayErrorMessage[result.message] || "Neznámá chyba");
        return;
      }

      // 🟩 pokud login proběhne
      if (result.success) {
        setErrorMessage("");
        console.log(result.userData);
        props.setCurrentUser(result.userData);
        navigate("/");
      }
    } catch (error) {
      console.log("Chyba při komunikaci při přihlášení: ", error);
    }
  }

  return (
    <section className="d-flex justify-content-center mt-5 mb-5">
      <div className="card shadow border-0 w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center">
          {/* 🟩 Ikonka nad nadpisem */}
          <FontAwesomeIcon icon={faCircleUser} className="register-icon mb-3" />

          <h2 className="mb-4">Přihlášení</h2>

          {/* 🟩 Register formulář */}

          <form>
            {/* 🟩 Nickname */}
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

            {/* 🟩 Vykreslení ErrorMessage */}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleLogin}
            >
              Přihlásit se
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
