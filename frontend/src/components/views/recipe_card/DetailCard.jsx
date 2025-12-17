import { useLocation, useNavigate, useParams } from "react-router-dom";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// 🟩 Komponenta pro detail karty
function DetailCard(props) {
  // 🟩 Načtení id z url
  const { id } = useParams();

  const navigate = useNavigate();

  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const location = useLocation();

  // 🟩 Určení, odkud přicházím: home / profile
  const from = location.state?.from;

  // 🟩 Určení cesty zpět podle toho, odkud přicházím
  const handleBack = () => {
    if (from === "profile" && props.profilePage) {
      navigate(props.profilePage);
    } else if (props.lastPage) {
      navigate(props.lastPage);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    async function getDetail() {
      try {
        const request = await fetch(
          `http://localhost/projekty/MyRecipeApp/backend/handle_card/get_detail_recipe.php?id=${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await request.json();

        setDetails(result.data);
        setIngredients(result.ingredient);
      } catch (error) {
        console.log("Něco se pokazilo při detailu karty", error);
      }
    }

    getDetail();
  }, [id]);

  const handleEditRecipe = () => {
    navigate(`/recipe/${id}/edit`);
  };

  return (
    <section className="container my-4" style={{ maxWidth: "900px" }}>
      {/* 🟩 Zpět tlačítko */}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleBack}
        >
          ← Zpět
        </button>
      </div>

      {/* 🟩 Hlavní karta */}
      <div className="card shadow-sm p-4 text-center">
        {/* 🟩 Titulek */}
        <h2 className="mb-3">{details.title}</h2>

        { /* 🟩 Edit button */ }
        {props.currentUser?.id == details.user_id && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleEditRecipe}
          >
            Upravit
          </button>
        )}

        {/* 🟩 Autor + datum */}
        <div className="text-muted mb-4 text-end">
          <strong>Autor:</strong> {details.author} <br />
          <small>Vytvořeno: {details.created_at}</small>
        </div>

        {/* 🟩 Omezená šířka obsahu */}
        <div className="mx-auto" style={{ maxWidth: "80%" }}>
          {/* 🟩 Popis */}
          <h5 className="text-start">Popis</h5>
          <p className="mb-4 text-start">{details.description}</p>

          {/* 🟩 Ingredience */}
          <h5 className="text-center">Ingredience</h5>
          {ingredients.length === 0 ? (
            <p className="text-center">Žádné ingredience</p>
          ) : (
            <table className="table ingredients-table text-center">
              <tbody>
                {ingredients.map((ingredient) => (
                  <tr key={ingredient.id}>
                    <td className="fw-bold text-start">{ingredient.name}</td>
                    <td className="text-center">
                      {ingredient.amount_value} {ingredient.amount_unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* 🟩 Instrukce */}
          <h5 className="text-start">Postup</h5>
          <p className="mb-0 text-start">{details.instructions}</p>
        </div>
      </div>
    </section>
  );
}

DetailCard.propTypes = {
  lastPage: PropTypes.string,
  setLastPage: PropTypes.func,
  profilePage: PropTypes.string,
  currentUser: PropTypes.object,
};

export default DetailCard;
