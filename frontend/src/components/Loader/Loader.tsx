import "./loader.css";

const Loader = () => {
  return (
    <div className="w-screen h-screen relative bg-white/30">
      {/* Background Blur Filter */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>

      {/* Centered Loader */}
      <div className="absolute inset-0 overflow-hidden flex justify-center items-center">
        <div className="three-body z-50">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
