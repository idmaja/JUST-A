import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

const ScrollTopButton = ({ onClick }) => {
  const handleScrollTop = () => {
    onClick(); // Call the onClick function passed as props
  };

  return (
    <button
      onClick={handleScrollTop}
      className="fixed text-lg transition-all bg-opacity-0 rounded-full shadow-xl bottom-7 right-11 text-color-dark hover:bg-color-yellow"
    >
      <ArrowUp size={64} weight="bold" color="white" className="rounded-full outline outline-offset-0 outline-color-secondary"/>
    </button>
  );
};

export default ScrollTopButton;
