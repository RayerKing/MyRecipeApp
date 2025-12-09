import { useEffect, useState } from "react";
import Card from "./recipe_card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";


// 🟩 Komponenta hlavní stránky
function Home(props) {

  // 🟩 Počet receptů na jednu stránku
  const count_of_recipes_on_page = 10;

  const [recipes, setRecipes] = useState([]);
  
  const [endPage, setEndPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  // 🟩 odvozené hodnoty
  const startList = (page - 1) * count_of_recipes_on_page + 1;
  const endList   = page * count_of_recipes_on_page;

  // 🟩 nastavení lastPage
  useEffect(() => {
    if (!props.setLastPage) return;

    if (page === 1) {
      props.setLastPage("/");
    } else {
      props.setLastPage(`/?page=${page}`);
    }
  }, [page, props]);

  // 🟩 načtení receptů
  useEffect(() => {
    async function handleLoadingRecipes() {
      try {
        const request = await fetch(
          `http://localhost/projekty/MyRecipeApp/backend/handle_card/get_all_recipe.php?start=${startList}&end=${endList}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await request.json();

        setRecipes(result.data);
        
        setEndPage(Math.ceil(result.count / count_of_recipes_on_page));
      } catch (error) {
        console.log("Něco se pokazilo při načítání receptů.", error);
      }
    }

    handleLoadingRecipes();
  }, [startList, endList]);

  // 🟩 další stránka
  const newListUp = () => {
    if (page >= endPage) return;
    setSearchParams({ page: page + 1 });
  };

  // 🟩 předchozí stránka
  const newListDown = () => {
    if (page <= 1) return;
    setSearchParams({ page: page - 1 });
  };

  return (
    <section className="mt-4">
      {recipes.map((recipe) => (
        <Link
          to={`/recipe/${recipe.id}`}
          className="text-decoration-none text-dark"
          key={recipe.id}
          state={{ from: "home"}}
        >
          <Card recipe={recipe} mode="home" />
        </Link>
        
      ))}

      <div className="d-flex justify-content-center align-items-center gap-5 my-4">
        <button
          type="button"
          onClick={newListDown}
          disabled={page === 1}
          className="btn btn-outline-secondary btn-sm"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <span className="fw-semibold">
          {page}
          <span className="text-muted"> / {endPage}</span>
        </span>

        <button
          type="button"
          onClick={newListUp}
          disabled={page >= endPage}
          className="btn btn-outline-secondary btn-sm"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

    </section>
  );
}


Home.propTypes = {
  lastPage: PropTypes.string,
  setLastPage: PropTypes.func,
}

export default Home;
