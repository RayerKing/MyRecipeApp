import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

// 🟩 Komponenta uživatele, zobrazuje info o uživateli
function Profile_Info(props) {

  // 🟩 Vytvoření nového data pro rozkouskování
  const createdDate = new Date(props.currentUser.created);

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card shadow-sm border-0 w-100" style={{ maxWidth: "700px" }}>
        <div className="card-body">
          {/* 🟩 Ikona + nickname */}
          <div className="text-center mb-4">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="mb-3"
              size="4x"
            />
            <h2 className="mb-2">{props.currentUser.nickname}</h2>

            {props.currentUser.isActive == 0 && (
              <p className="text-danger mb-0">
                <FontAwesomeIcon icon={faTriangleExclamation} /> Účet ještě nebyl ověřen. Některé funkce mohou být omezeny.
              </p>
            )}
          </div>

          {/* 🟩 Tabulka s údaji */}
          <table className="table table-borderless mx-auto" style={{maxWidth: "400px"}}>
            <tbody>
              <tr>
                <th scope="row" className="text-muted w-100">
                  E-mail
                </th>
                <td>{props.currentUser.email}</td>
              </tr>
              <tr>
                <th scope="row" className="text-muted">
                  First Name
                </th>
                <td>{props.currentUser.firstName}</td>
              </tr>
              <tr>
                <th scope="row" className="text-muted">
                  Last Name
                </th>
                <td>{props.currentUser.lastName}</td>
              </tr>
              {props.currentUser.role == "admin" && (
                <tr>
                  <th scope="row" className="text-muted">
                    Role
                  </th>
                  <td>{props.currentUser.role}</td>
                </tr>
              )}
              <tr>
                <th scope="row" className="text-muted">
                  Účet vytvořen
                </th>
                <td>
                  {createdDate.getDate()}. {createdDate.getMonth() + 1}.{" "}
                  {createdDate.getFullYear()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Profile_Info.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
};

export default Profile_Info;
