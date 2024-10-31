import { getTextAlign } from "../utils/helper";

const Content = ({ className = "", alignment, children }) => {
  const alignClass = getTextAlign(alignment);

  return (
    <div
      className={`content text-base lg:text-xl max-w-3xl text-black ${
        className && className
      } ${alignClass && alignClass}`}
    >
      {children}
    </div>
  );
};

export default Content;
