const Spinner = require("../assets/spinner.gif")

const ShowLoading = () => {
  return (
    <div className="w-full mt-4 flex items-center justify-center">
      <img src={Spinner} alt="Loading" />
    </div>
  );
};

export default ShowLoading;
