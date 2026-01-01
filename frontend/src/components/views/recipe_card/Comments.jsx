import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

// 🟩 Komponenta pro komentáře

function Comments(props) {
  const { recipe_id } = props;

  const [comments, setComments] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // 🟧 API volání pro získání komentářů
    async function readComments() {
      try {
        const request = await fetch(
          `http://localhost/projekty/MyRecipeApp/backend/handle_card/comments/get_comments.php?recipe_id=${recipe_id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await request.json();
        console.log(result.message);

        if (!result.success) {
          setErrorMessage(result.message);
          return;
        }

        if (result.success) {
          setComments(result.data);
        }
      } catch (error) {
        console.log("Něco se pokazilo při fetchi komentářů", error);
      }
    }

    readComments();
  }, [recipe_id]);

  async function handleDelete(id) {
    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/handle_card/comments/delete_comment.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        }
      );

      const result = await request.json();
      console.log(result.message);
      if (!result.success) {
        props.setFlashMessage({ message: result.message, type: "delete" });

        setTimeout(() => {
          props.setFlashMessage(null);
        }, 2000);
        return;
      }

      if (result.success) {
        props.setFlashMessage({ message: result.message, type: "delete" });
        setComments((prev) => prev.filter((c) => c.id !== id));
        setTimeout(() => {
          props.setFlashMessage(null);
        }, 2000);
        return;
      }
    } catch (error) {
      console.log("Něco senepovedlo při mazání", error);
    }
  }

  return (
    <div className="mt-5 pt-2">
      {/* 🟩 Komentáře */}
      <div className="border rounded shadow-sm bg-white p-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4 className="mb-0">Komentáře</h4>
          <span className="badge text-bg-secondary">{comments.length}</span>
        </div>
        {errorMessage && (
          <div className="alert alert-light border mb-0">{errorMessage}</div>
        )}
        {comments.length === 0 ? (
          <div className="alert alert-light border mb-0">
            Zatím žádné komentáře.
          </div>
        ) : (
          <div className="list-group list-group-flush">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="list-group-item px-0 py-4 border-bottom"
              >
                {/* 🟩 Autor komentáře */}
                <div className="d-flex justify-content-between align-items-center bg-light border rounded px-3 py-2 mb-2">
                  <span className="fw-semibold text-dark">
                    {comment.author}
                  </span>
                  {/* 🟩 Datum vytvoření */}
                  <div className="d-flex align-items-center gap-3">
                    <small className="text-muted fst-italic">
                      {comment.created_at}
                    </small>
                    {/* 🟦 Buttons */}
                    {/* 🟩 Edit */}
                    {(props.currentUser?.id == comment.user_id ||
                      props.currentUser?.role == "admin") && (
                      <button
                        className="btn btn-sm btn-link text-muted p-0"
                        title="Upravit komentář"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    )}

                    {/* 🟩 Delete */}
                    {(props.currentUser?.id == comment.user_id ||
                      props.currentUser?.role == "admin") && (
                      <button
                        className="btn btn-sm btn-link text-muted p-0"
                        title="Smazat komentář"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    )}
                  </div>
                </div>

                {/* 🟩 Tělo komentáře */}
                <div className="text-body ps-1">{comment.comment_body}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Comments.propTypes = {
  recipe_id: PropTypes.number,
  setFlashMessage: PropTypes.func,
};

export default Comments;
