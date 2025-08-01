import TagLine from "./Tagline";

const Heading = ({ className, title, text, tag }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-n-1">{title}</h2>
      )}
      {text && (
        <p className="text-base mt-4 text-n-4 leading-relaxed">{text}</p>
      )}
    </div>
  );
};

export default Heading;
