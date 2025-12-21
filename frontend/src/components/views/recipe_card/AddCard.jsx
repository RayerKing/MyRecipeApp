import {
  faCheck,
  faMinus,
  faPen,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// 🟩 Komponenta pro přidání receptu
function AddCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isPrivate, setIsPrivate] = useState("0");
  const [errorMessage, setErrorMessage] = useState("");

  const [ingredients, setIngredients] = useState([]);

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

  const navigate = useNavigate();

  // 🟩 Funkce pro tlačítko zpět
  const handleBack = () => {
    setTitle("");
    setDescription("");
    setInstructions("");
    navigate(-1);
  };

  // 🟧 Asynchronní volání pro vložení receptu
  async function handleAddRecipe() {
    setErrorMessage("");

    const data = {
      title,
      description,
      instructions,
      isPrivate,
      ingredients: ingredients.map(ingredient => ({
        name: ingredient.name.trim(),
        amount_value: ingredient.amount_value,
        amount_unit: ingredient.amount_unit
      }))
    };

    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/handle_card/add_recipe.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        props.setFlashMessage({ message: result.message, type: "add" });
        navigate(`/recipe/${result.id}`);
        setTimeout(() => {
          props.setFlashMessage(null);
        }, 2000);
      }
    } catch (error) {
      console.log("Při přidání receptu se něco pokazilo", error);
    }
  }

  // 🟩 Funkce pro přidání ingrediencí
  const handleIngredientChange = (e) => {
    const id = e.target.dataset.id;
    const name = e.target.name;
    const value = e.target.value;

    const updateRow = ingredients.map((ingredient) => {
      if(ingredient.tempId == id){
        return {...ingredient, [name]: value};
      }
      return ingredient;
    });

    setIngredients(updateRow);

  };

  // 🟩 Funkce pro smazání ingredience
  const handleDeleteIngredient = (e) => {
    const id = e.currentTarget.dataset.id;

    const updateRow = ingredients.filter((ingredient) => {
      return ingredient.tempId != id;
    });

    setIngredients(updateRow);
  };

  // 🟩 Funkce pro přidání nové ingredience
  const handleNewIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        tempId: crypto.randomUUID(),
        name: "",
        amount_value: "",
        amount_unit: units[0],
      },
    ]);
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
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "980px" }}>
        <div className="card-body px-3 px-md-4 py-4">
          {/* 🟩 Nadpis formuláře */}
          <h2 className="mb-3 text-center">
            <FontAwesomeIcon icon={faPen} className="fs-3 me-2" />
            Přidat recept
          </h2>

          <form>
            {/* 🟩 Nadpis */}
            <div className="mb-3">
              <label htmlFor="titleAdd" className="form-label">
                <h5>Nadpis</h5>
              </label>
              <input
                type="text"
                id="titleAdd"
                className="form-control form-control-sm"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 🟩 Popis */}
            <div className="mb-4">
              <label htmlFor="descriptionAdd" className="form-label">
                <h5>Popis</h5>
              </label>
              <input
                type="text"
                id="descriptionAdd"
                className="form-control form-control-sm"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* 🟩 Ingredience */}
            <div className="mb-3">
              <label className="form-label fw-bold mb-2">Ingredience</label>

              {ingredients.map((ingredient) => {
                return (
                  <div
                    className="row g-2 align-items-center mb-2"
                    key={ingredient.tempId}
                  >
                    {/* Název */}
                    <div className="col-12 col-md-5">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Název"
                        data-id={ingredient.tempId}
                        name="name"
                        onChange={handleIngredientChange}
                        value={ingredient.name}
                      />
                    </div>

                    {/* Množství */}
                    <div className="col-6 col-md-2">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Množství"
                        data-id={ingredient.tempId}
                        name="amount_value"
                        onChange={handleIngredientChange}
                        value={ingredient.amount_value}
                      />
                    </div>

                    {/* Jednotka */}
                    <div className="col-6 col-md-4">
                      <select
                        className="form-select form-select-sm"
                        data-id={ingredient.tempId}
                        name="amount_unit"
                        onChange={handleIngredientChange}
                        value={ingredient.amount_unit}
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
                        data-id={ingredient.tempId}
                        onClick={handleDeleteIngredient}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  </div>
                );
              })}
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
              <label htmlFor="instructionsAdd" className="form-label">
                <h5>Postup</h5>
              </label>
              <textarea
                id="instructionsAdd"
                className="form-control"
                rows="4"
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            {/* 🟩 Výběr veřejné/sopukromé */}
            <div className="d-flex justify-content-center gap-2">
              <input
                type="radio"
                className="btn-check"
                name="is_private"
                id="is_private_1"
                value="1"
                checked={isPrivate == "1"}
                onChange={(e) => setIsPrivate(e.target.value)}
              />
              <label
                className={`btn ${
                  isPrivate == "1" ? "btn-danger" : "btn-outline-secondary"
                }`}
                htmlFor="is_private_1"
              >
                Soukromé
              </label>

              <input
                type="radio"
                className="btn-check"
                name="is_private"
                id="is_private_0"
                value="0"
                checked={isPrivate == "0"}
                onChange={(e) => setIsPrivate(e.target.value)}
              />
              <label
                className={`btn ${
                  isPrivate == "0" ? "btn-success" : "btn-outline-secondary"
                }`}
                htmlFor="is_private_0"
              >
                Veřejné
              </label>
            </div>

            {/* 🟩 Buttons - cancel / potvrdit změny */}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleBack}
              >
                <FontAwesomeIcon icon={faXmark} /> Zrušit
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddRecipe}
              >
                <FontAwesomeIcon icon={faCheck} /> Přidat
              </button>
            </div>

            {/* 🟩 Výsledné messages */}
            <div className="text-center fs-5 mt-3"></div>
          </form>
          {/* 🟩 Výsledné messages */}
          <div className="text-center fs-5 mt-3">
            {errorMessage && <p className="text-danger mb-0">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

AddCard.propTypes = {
  setFlashMessage: PropTypes.func,
};

export default AddCard;
