// 🟩 Komponenta pro footer
function Footer() {

  
  const date = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-3 border-top border-secondary">
      <div className="container text-center">
        <p className="mb-1">
          &copy; {date} <span className="fw-bold">MyRecipeApp</span>
        </p>
        <p className="mb-0 text-secondary">Portfolio projekt</p>
        
      </div>
    </footer>
  );
}

export default Footer;
