import PropTypes from "prop-types";

// 🟩 Komponenta pro blok konkrétního receptu
function Card(props) {

  // 🟩 Zda je recept soukromý, nebo veřejný
  const is_private = (bol) => {
    if (bol == 0) {
      return (
        <div className="position-absolute top-0 end-0 mt-2 me-2 p-3">
          <span className="badge bg-success p-2 fs-6">Veřejné</span>
        </div>
      );
    } else {
      return (
        <div className="position-absolute top-0 end-0 mt-2 me-2 p-3">
          <span className="badge bg-danger p-2 fs-6">Soukromé</span>
        </div>
      );
    }
  };

  return (
    <section className="text-decoration-none text-dark">
      <div className="card shadow mb-2 mx-auto p-3" style={{ maxWidth: "80%" }}>
        <div className="card-body">
          {/* 🟩 Nadpis */}
          <h3 className="card-title fw-bold">{props.recipe.title}</h3>

          {/* 🟩 Popis */}
          <p className="card-text mt-2">{props.recipe.description}</p>

          { /* 🟩 Vložení private/public */ }
          {props.mode === "profile" && is_private(props.recipe.is_private)}

          {/* 🟩 Autor + Datum */}
          <div className="d-flex justify-content-end flex-column text-end mt-3">
            {props.mode !== "profile" && (
              <small className="text-muted">Autor: {props.recipe.author}</small>
            )}
            <small className="text-muted">
              Přidáno: {props.recipe.created_at}
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}

Card.propTypes = {
  recipe: PropTypes.object,
  mode: PropTypes.string,
};

export default Card;
