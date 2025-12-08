import PropTypes, { object } from "prop-types";

// 🟩 Komponenta pro blok konkrétního receptu
function Card(props) {
  return (
    <section>
      <div className="card shadow mb-2 mx-auto p-3" style={{ maxWidth: "80%" }}>
        <div className="card-body">
          {/* 🟩 Nadpis */}
          <h3 className="card-title fw-bold">{props.recipe.title}</h3>

          {/* 🟩 Popis */}
          <p className="card-text mt-2">{props.recipe.description}</p>

          {/* 🟩 Aautor + Datum */}
          <div className="d-flex justify-content-end flex-column text-end mt-3">
            <small className="text-muted">Autor: {props.recipe.author}</small>
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
  recipe: object,
};

export default Card;
