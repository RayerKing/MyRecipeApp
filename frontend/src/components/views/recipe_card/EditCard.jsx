import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMinus,
  faPen,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

// 🟩 Kompononenta pro editování konkrétního receptu
function EditCard(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();

  // 🟩 Detail = drží popis, nadpis, instrukce
  const [detail, setDetail] = useState({});
  // 🟩 Ingredience = drží ingredience a jejich pořadí
  const [ingredients, setIngredients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const units = [
    "g",
    "kg",
    "hrnek",
    "lžička",
    "lžíce",
    "l",
    "ml",
    "ks",
    "podle chuti",
  ];

  // 🟧 Asynchornní funkce pro získání informací o receptu
  useEffect(() => {
    async function get_detail() {
      setErrorMessage("");
      setSuccessMessage("");
      const data = { id };

      try {
        const request = await fetch(
          "http://localhost/projekty/MyRecipeApp/backend/handle_card/get_edit_recipe.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          }
        );
        const result = await request.json();

        if (!result.success) {
          setErrorMessage(result.message);
          return;
        }

        if (result.success) {
          //console.log(result.ingredient);
          setDetail(result.data);
          setIngredients(result.ingredient);
        }
      } catch (error) {
        console.log("Při editu se něco pokazilo", error);
      }
    }
    get_detail();
  }, [id]);

  const handleCancelEdit = () => {
    navigate(`/recipe/${id}`);
    setDetail({});
    setIngredients([]);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // 🟧 Asynchornní funkce, která ukládá změny při editu do databáze
  async function handleEditRecipe() {
    setErrorMessage("");
    setSuccessMessage("");

    const data = JSON.stringify({ detail: detail, ingredients: ingredients });

    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/handle_card/edit_recipe.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      );
      const result = await request.json();

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      if (result.success) {
        setSuccessMessage(result.message);
      }
    } catch (error) {
      console.log("Něco se pokazilo při editu", error);
    }
  }

  // 🟩 Funkce pro získání všech ingrediencí
  const handleIngredientEdit = (e) => {
    const rowId = e.target.dataset.id;
    const column = e.target.name;
    const value = e.target.value;

    const updateRow = ingredients.map((ingredient) => {
      const currentRowId = ingredient.id ?? ingredient.tempId;
      if (currentRowId == rowId) {
        return { ...ingredient, [column]: value };
      }
      return ingredient;
    });

    setIngredients(updateRow);
  };

  // 🟩 Funkce pro smazání ingredience
  const handleDeleteIngredient = (e) => {
    const rowId = e.currentTarget.dataset.id;

    const updateRow = ingredients.filter((ingredient) => {
      const currentRowId = ingredient.id ?? ingredient.tempId;
      return currentRowId != rowId;
    });

    setIngredients(updateRow);
  };

  const handleBack = () => {
    navigate(`/recipe/${id}`, {
      state: location.state,
    });
    setDetail({});
    setIngredients([]);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // 🟩 Funkce pro přidání nové ingredience
  const handleNewIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        id: null,
        tempId: crypto.randomUUID(),
        recipe_id: id,
        name: "",
        amount_value: "",
        amount_unit: "g",
      },
    ]);
  };

  const from = location.state?.from;

  // 🟧 Funkce pro smazání receptu
  async function handleDeleteRecipe() {
    setDeleteErrorMessage("");

    const idRecipe = id;

    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/handle_card/delete_recipe.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(idRecipe),
        }
      );

      const result = await request.json();
      console.log(result.message);
      if (!result.success) {
        setDeleteErrorMessage(result.message);
        return;
      }

      if (result.success) {
        setSuccessMessage(result.message);
        props.setFlashMessage(result.message);
        if (from === "profile" && props.profilePage) {
          navigate(props.profilePage);
        } else if (props.lastPage) {
          navigate(props.lastPage);
        } else {
          navigate("/");
        }
        setTimeout(() => {
          props.setFlashMessage(null);
        }, 2000);
      }
    } catch (error) {
      console.log("Při smazání došlo k chybě", error);
    }
  }

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
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "980px" }}>
        <div className="card-body px-3 px-md-4 py-4">
          {/* 🟩 Nadpis formuláře */}
          <h2 className="mb-3 text-center">
            <FontAwesomeIcon icon={faPen} className="fs-3 me-2" />
            Úprava receptu
          </h2>

          <form>
            {/* 🟩 Nadpis */}
            <div className="mb-3">
              <label htmlFor="titleEdit" className="form-label">
                <h5>Nadpis</h5>
              </label>
              <input
                type="text"
                id="titleEdit"
                className="form-control form-control-sm"
                value={detail.title || ""}
                onChange={(e) =>
                  setDetail((d) => ({ ...d, title: e.target.value }))
                }
              />
            </div>

            {/* 🟩 Popis */}
            <div className="mb-4">
              <label htmlFor="descriptionEdit" className="form-label">
                <h5>Popis</h5>
              </label>
              <input
                type="text"
                id="descriptionEdit"
                className="form-control form-control-sm"
                value={detail.description || ""}
                onChange={(e) =>
                  setDetail((d) => ({ ...d, description: e.target.value }))
                }
              />
            </div>

            {/* 🟩 Ingredience */}
            <div className="mb-3">
              <label className="form-label fw-bold mb-2">Ingredience</label>

              <div className="mx-auto" style={{ maxWidth: "760px" }}>
                {ingredients.map((ingredient) => {
                  const rowId = ingredient.id ?? ingredient.tempId;

                  return (
                    <div
                      className="row g-2 align-items-center mb-2"
                      key={rowId}
                    >
                      {/* Název */}
                      <div className="col-12 col-md-5">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Název"
                          value={ingredient.name}
                          data-id={rowId}
                          name="name"
                          onChange={handleIngredientEdit}
                        />
                      </div>

                      {/* Množství */}
                      <div className="col-6 col-md-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Množství"
                          value={ingredient.amount_value}
                          data-id={rowId}
                          name="amount_value"
                          onChange={handleIngredientEdit}
                        />
                      </div>

                      {/* Jednotka */}
                      <div className="col-6 col-md-4">
                        <select
                          className="form-select form-select-sm"
                          value={ingredient.amount_unit}
                          data-id={rowId}
                          name="amount_unit"
                          onChange={handleIngredientEdit}
                        >
                          {units.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Mazání */}
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          data-id={rowId}
                          onClick={handleDeleteIngredient}
                          title="Smazat ingredienci"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* + Přidat */}
            <div className="d-flex justify-content-end mb-4">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm rounded-2 d-flex align-items-center justify-content-center"
                style={{ width: "38px", height: "38px" }}
                onClick={handleNewIngredient}
                title="Přidat ingredienci"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            {/* 🟩 Postup */}
            <div className="mb-4">
              <label htmlFor="instructions" className="form-label">
                <h5>Postup</h5>
              </label>
              <textarea
                id="instructions"
                className="form-control"
                rows="4"
                value={detail.instructions || ""}
                onChange={(e) =>
                  setDetail((d) => ({ ...d, instructions: e.target.value }))
                }
              />
            </div>

            {/* 🟩 Buttons - cancel / potvrdit změny */}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancelEdit}
              >
                <FontAwesomeIcon icon={faXmark} /> Zrušit
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleEditRecipe}
              >
                <FontAwesomeIcon icon={faCheck} /> Uložit změny
              </button>
            </div>

            {/* 🟩 Výsledné messages */}
            <div className="text-center fs-5 mt-3">
              {errorMessage && (
                <p className="text-danger mb-0">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-success mb-0">{successMessage}</p>
              )}
            </div>
          </form>
          {/* 🟥 Smazání receptu */}
          <hr className="my-4" />
          <div className="d-flex flex-column align-items-center">
            <small className="text-muted mb-2">
              Nebezpečná akce (nelze vrátit)
            </small>

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleDeleteRecipe}
            >
              <FontAwesomeIcon icon={faTrash} className="me-2" />
              Smazat recept
            </button>
          </div>
          <div className="text-center fs-5 mt-3">
            {deleteErrorMessage && (
              <p className="text-danger mb-0">{deleteErrorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

EditCard.propTypes = {
  lastPage: PropTypes.string,
  setFlashMessage: PropTypes.func,
  profilePage: PropTypes.string,
};

export default EditCard;
