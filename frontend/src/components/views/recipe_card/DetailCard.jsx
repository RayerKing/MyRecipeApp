import { useLocation, useNavigate, useParams } from "react-router-dom";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// 🟩 Komponenta pro detail karty
function DetailCard(props) {

  // 🟩 Načtení id z url
  const { id } = useParams();

  const navigate = useNavigate();

  const [details, setDetails] = useState([]);

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
      const request = await fetch(`http://localhost/projekty/MyRecipeApp/backend/handle_card/get_detail_recipe.php?id=${id}`, {
        method: "GET",
        credentials: "include",
      });

      const result = await request.json();
      
      setDetails(result.data);
    } catch (error) {
      console.log("Něco se pokazilo při detailu karty", error);
    }
        }
    
  
  getDetail();
  }, [id]);

  return (
    <section className="container my-4" style={{ maxWidth: "80%" }}>

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
  <div className="card shadow-sm p-4">
    
    {/* 🟩 Titulek */}
    <h2 className="mb-3 text-center">{details.title}</h2>

    {/* 🟩 Autor + datum */}
    <div className="d-flex justify-content-end text-muted mb-4">
      <div className="text-end">
        <div><strong>Autor:</strong> {details.author}</div>
        <div><small>Vytvořeno: {details.created_at}</small></div>
      </div>
    </div>

    {/* 🟩 Popis */}
    <h5>Popis</h5>
    <p className="mb-4">{details.description}</p>

    {/* 🟩 Instrukce */}
    <h5>Postup</h5>
    <p className="mb-0">{details.instructions}</p>

  </div>

</section>

  );
}

DetailCard.propTypes = {
  lastPage: PropTypes.string,
  setLastPage: PropTypes.func,
  profilePage: PropTypes.string,
  
};

export default DetailCard;
