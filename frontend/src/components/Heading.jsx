import TagLine from "./Tagline";

const Heading = ({ className, title, text, tag }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && (
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
      )}
      {text && (
        <p className="text-lg mt-6 text-gray-600 leading-relaxed max-w-2xl mx-auto">
          {text}
        </p>
      )}
    </div>
  );
};

export default Heading;
