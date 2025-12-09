import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Card from "../recipe_card/Card";

// 🟩 Komponenta pro recepty uživatele v profilu
function MyRecept(props) {
  // 🟩 Počet receptů na jednu page
  const count_of_recipes_on_page = 10;

  const [recipes, setRecipes] = useState([]);
  
  const [endPage, setEndPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const { setProfilePage } = props;

  useEffect(() => {
    if (page === 1) {
      setProfilePage("/profile");
    } else {
      setProfilePage(`/profile?page=${page}`);
    }
  }, [page, setProfilePage]);

  // 🟩 odvozené start a end pro backend
  const startList = (page - 1) * count_of_recipes_on_page + 1;
  const endList = page * count_of_recipes_on_page;

  useEffect(() => {
    async function getMyRecipes() {
      try {
        const request = await fetch(
          `http://localhost/projekty/MyRecipeApp/backend/handle_card/get_my_recipe.php?start=${startList}&end=${endList}`,
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
    getMyRecipes();
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
          state={{ from: "profile" }}
          key={recipe.id}
          className="text-decoration-none text-dark"
        >
          <Card recipe={recipe} mode="profile" />
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

MyRecept.propTypes = {
  setProfilePage: PropTypes.func,
};

export default MyRecept;
