import ButtonSvg from "../assets/svg/ButtonSvg";

const Button = ({ className, href, onClick, children, px, white }) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-white border rounded-lg font-medium text-base ${
    px || "px-7"
  } ${
    white
      ? "text-brand-primary bg-white hover:bg-brand-primary hover:text-white border-brand-primary"
      : "text-white bg-brand-primary hover:bg-brand-secondary border-brand-primary hover:border-brand-secondary"
  } ${className || ""}`;
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
    </button>
  );

  const renderLink = () => (
    <a href={href} className={classes}>
      <span className={spanClasses}>{children}</span>
    </a>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
