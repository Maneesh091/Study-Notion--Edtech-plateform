const HighlightText = ({ text }) => {
  return (
    <span className="font-bold bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
      {" "}
      {text}
      {" "}
    </span>
  );
};

export default HighlightText;