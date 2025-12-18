import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import AppRouter from "./router/AppRouter";
import { useEffect, useState } from "react";
import FlashMessage from "./components/partials/FlashMessage";

// 🟩 Hlavní funkční část aplikace
function App() {
  // 🟦 State, odesílám pro zjištění, zda už je někdo přihlášen
  const [currentUser, setCurrentUser] = useState(null);

  const [lastPage, setLastPage] = useState("/");
  const [profilePage, setProfilePage] = useState(null);

  // 🟩 FlashMessage, ukáže se v případě smazání receptu, apod
  const [flashMessage, setFlashMessage] = useState(null);

  // 🟧 Zjištění přihlášeného uživatele
  useEffect(() => {
    async function getUser() {
      try {
        const request = await fetch(
          "http://localhost/projekty/MyRecipeApp/backend/auth/check.php",
          {
            method: "POST",
            credentials: "include",
          }
        );
        const result = await request.json();
        console.log(result);

        // 🟩 pokud už uživatel je púřihlášen
        if (result.isUser) {
          console.log("Uživatel je přihlášen");
          setCurrentUser(result.userData);
        }
      } catch (error) {
        console.log("Chyba při komunikaci při přihlášení: ", error);
      }
    }
    getUser();
  }, []);

  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        lastPage={lastPage}
        setLastPage={setLastPage}
      />

      <main>
        <FlashMessage flashMessage={flashMessage} />
        <AppRouter
          profilePage={profilePage}
          setProfilePage={setProfilePage}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          lastPage={lastPage}
          setLastPage={setLastPage}
          setFlashMessage={setFlashMessage}
        />
      </main>

      <Footer />
    </>
  );
}

export default App;
