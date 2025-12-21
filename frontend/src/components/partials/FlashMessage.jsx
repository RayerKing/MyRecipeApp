import PropTypes from "prop-types";


// 🟩 Komponenta pro flash message, udává stav akcí
function FlashMessage(props) {
  
  if (!props.flashMessage) return null;

  const type = props.flashMessage.type;

  let colorBorder;

  if(type == "delete"){
    colorBorder = "danger";
  } else if(type == "add"){
    colorBorder = "success";
  } else {
    colorBorder = "info";
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 9999 }}
    >
      <div
        className={`bg-${colorBorder} border border-${colorBorder} shadow-lg rounded`}
        role="alert"
      >
        <div className="fs-5 fw-semibold text-center px-4 py-3 text-white">
          {props.flashMessage.message}
        </div>
      </div>
    </div>
  );
}

FlashMessage.propTypes = {
  flashMessage: PropTypes.string,
};

export default FlashMessage;
