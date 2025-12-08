import { useEffect, useState } from "react";
import Card from "./recipe_card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// 🟩 Komponenta hlavní stránky
function Home() {

    // 🟩 State proměnných pro recepty a stránkování
  const [startList, setStartList] = useState(1);
  const [endList, setEndList] = useState(10);
  const [newList, setNewList] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [countList, setCountList] = useState("");
  const [endPage, setEndPage] = useState("");

  // 🟩 Volání pro načtení všech receptů
  useEffect(() => {
    async function handleLoadingRecipes(start, end) {
      try {
        const request = await fetch(
          `http://localhost/projekty/MyRecipeApp/backend/handle_card/get_all_recipe.php?start=${start}&end=${end}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await request.json();

        setRecipes(result.data);
        setCountList(result.count);
        setEndPage(Math.ceil(result.count / 10));

        console.log(result);
      } catch (error) {
        console.log("Něco se pokazilo při načítání receptů.", error);
      }
    }
    handleLoadingRecipes(startList, endList);
  }, [startList, endList]);

  // 🟩 Funkce pro další stránku
  const newListUp = () => {
    if (endList > countList) return;
    setStartList((prev) => prev + 10);
    setEndList((prev) => prev + 10);
    setNewList((prev) => prev + 1);
  };

  // 🟩 Funkce pro předchozí stránku
  const newListDown = () => {
    if (newList == 1) return;
    setStartList((prev) => prev - 10);
    setEndList((prev) => prev - 10);
    setNewList((prev) => prev - 1);
  };

  return (
    <section className="mt-4">
      {recipes.map((recipe) => (
        <Card key={recipe.id} recipe={recipe} />
      ))}

      <div className="d-flex justify-content-center align-items-center gap-5 my-4">
        {/* 🟩 ← předchozí stránka */}
        <button
          type="button"
          onClick={newListDown}
          disabled={newList === 1}
          className="btn btn-outline-secondary btn-sm"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* 🟩 číslo stránky */}
        <span className="fw-semibold">
          {newList}
          <span className="text-muted"> / {endPage}</span>
        </span>

        {/* 🟩 → další stránka */}
        <button
          type="button"
          onClick={newListUp}
          disabled={newList >= endPage}
          className="btn btn-outline-secondary btn-sm"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
}

export default Home;
