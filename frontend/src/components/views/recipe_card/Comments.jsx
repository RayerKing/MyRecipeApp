import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faTrashCan,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// 🟩 Komponenta pro komentáře

function Comments(props) {
  const { recipe_id } = props;

  const [comments, setComments] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [editingCommentId, setEditingCommentId] = useState(null);

  const [editingText, setEditingText] = useState("");

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

  async function handleDeleteComment(id) {
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

  // 🟩 funkce pro zahájení editu komentáře
  const handleEditComment = (id, text) => {
    setEditingCommentId(id);
    setEditingText(text);
  };

  // 🟩 Zrušení změny komentáře
  const handleCancelEdit = (comment) => {
    if (comment.isNew) {
      console.log("Komentář je nový, mažu");
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
    }
    setEditingCommentId(null);
    setEditingText("");
  };

  // 🟩 Přidání komentáře
  const handleAddComment = () => {
    if (comments.some((c) => c.isNew)) {
      props.setFlashMessage({
        message: "Již máte otevřený komentář.",
        type: "delete",
      });

      setTimeout(() => {
        props.setFlashMessage(null);
      }, 2000);
      return;
    }

    const tempId = crypto.randomUUID();

    setComments((prev) => [
      {
        id: tempId,
        comment_body: "",
        user_id: props.currentUser.id,
        author: props.currentUser.nickname,
        isNew: true,
      },
      ...prev,
    ]);

    setEditingCommentId(tempId);
    setEditingText("");
  };

  // 🟧 Funkce pro uložení nového komentáře do databáze
  async function handleSaveNewComment(comment) {
    console.log(comment);
    const data = { text: editingText, recipe_id };
    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/handle_card/comments/add_comment.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await request.json();

      if (!result.success) {
        setComments((prev) => prev.filter((c) => c.id !== comment.id));

        setEditingText("");
        setEditingCommentId(null);
        props.setFlashMessage({ message: result.message, type: "delete" });

        setTimeout(() => {
          props.setFlashMessage(null);
        }, 2000);
        return;
      }

      if (result.success) {
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === comment.id) {
              return {
                ...c,
                id: result.data.id,
                comment_body: editingText,
                isNew: false,
                created_at: result.data.created_at,
              };
            } else {
              return c;
            }
          })
        );

        setEditingCommentId(null);
        setEditingText("");
      }
    } catch (err) {
      console.log("Něco se nepovedlo při přidání komentáře.", err);
    }
  }

  // 🟧 Uložení změn
  async function handleSaveEditComment(comment) {
    if (comment.isNew) {
      handleSaveNewComment(comment);
      return;
    }

    const id = comment.id;

    const data = {
      comment_id: id,
      comment_text: editingText,
    };

    try {
      const request = await fetch(
        "http://localhost/projekty/MyRecipeApp/backend/handle_card/comments/edit_comment.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await request.json();

      if (!result.success) {
        props.setFlashMessage({ message: result.message, type: "delete" });

        setTimeout(() => {
          props.setFlashMessage(null);
        }, 2000);
        return;
      }

      if (result.success) {
        setComments((prev) =>
          prev.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                comment_body: editingText.trim(),
              };
            } else {
              return comment;
            }
          })
        );

        setEditingCommentId(null);
        setEditingText("");
      }
    } catch (err) {
      console.log("Při změně komentáře se něco nepovedlo", err);
    }
  }

  return (
    <div className="mt-5 pt-2">
      {/* 🟩 Komentáře */}
      <div className="border rounded shadow-sm bg-white p-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4 className="mb-0">Komentáře</h4>
          <div className="d-flex align-items-center gap-2">
            {props.currentUser?.nickname && (
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={handleAddComment}
              >
                <FontAwesomeIcon icon={faPlus} /> Přidat komentář
              </button>
            )}

            <span className="badge rounded-pill text-bg-secondary">
              {comments.length}
            </span>
          </div>
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
            {comments.map((comment) => {
              const rights =
                comment.isNew ||
                props.currentUser?.id == comment.user_id ||
                props.currentUser?.role == "admin";

              const isEditing = comment.id === editingCommentId;

              const oldText = comment.comment_body.trim();
              const newText = editingText.trim();
              const disabled =
                isEditing && (newText.length === 0 || newText === oldText);

              return (
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
                      {rights && !isEditing && (
                        <button
                          className="btn btn-sm btn-link text-muted p-0"
                          title="Upravit komentář"
                          onClick={() =>
                            handleEditComment(comment.id, comment.comment_body)
                          }
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      )}

                      {/* 🟩 Delete */}
                      {rights && !isEditing && (
                        <button
                          className="btn btn-sm btn-link text-muted p-0"
                          title="Smazat komentář"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      )}

                      {rights && isEditing && (
                        <button
                          className="btn btn-sm btn-link text-muted p-0"
                          title="Zrušit změny"
                          onClick={() => handleCancelEdit(comment)}
                        >
                          <FontAwesomeIcon icon={faXmark} /> Zrušit
                        </button>
                      )}

                      {rights && isEditing && (
                        <button
                          className="btn btn-sm btn-link text-muted p-0"
                          title="Uložit změny"
                          onClick={() => handleSaveEditComment(comment)}
                          disabled={disabled}
                        >
                          <FontAwesomeIcon icon={faCheck} /> Uložit
                        </button>
                      )}
                    </div>
                  </div>
                  {/* 🟩 Tělo komentáře */}
                  {comment.id === editingCommentId ? (
                    <div className="text-body ps-1">
                      <textarea
                        className="form-control w-100"
                        name="editComment"
                        rows={3}
                        id={comment.id}
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      ></textarea>
                    </div>
                  ) : (
                    <div className="text-body ps-1">{comment.comment_body}</div>
                  )}
                </div>
              );
            })}
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
