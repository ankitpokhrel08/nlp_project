import ButtonSvg from "../assets/svg/ButtonSvg";

const Button = ({ className, href, onClick, children, px, white }) => {
  const classes = `button group relative inline-flex items-center justify-center h-12 transition-all duration-300 border rounded-xl font-medium text-base shadow-lg hover:shadow-xl overflow-hidden ${
    px || "px-8"
  } ${
    white
      ? "text-brand-primary bg-white hover:bg-brand-primary hover:text-white border-brand-primary/20 hover:border-brand-primary"
      : "text-white bg-brand-primary hover:bg-brand-secondary border-transparent"
  } ${className || ""}`;
  const spanClasses = "relative z-10 transition-transform duration-300";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className={spanClasses}>{children}</span>
    </button>
  );

  const renderLink = () => (
    <a href={href} className={classes}>
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className={spanClasses}>{children}</span>
    </a>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
