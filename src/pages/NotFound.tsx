import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className=" flex-1 flex items-center justify-center flex-col">
      <div className="logo h-20">
        <img
          src="https://auto1-homepage.prod.mp.auto1.cloud/2.36.0-53/images/logo.svg"
          alt="auto-one-logo"
        />
      </div>
      <h1 className="text-6xl font-bold text-text-dark mb-4">
        404 - Not Found
      </h1>
      <p className="text-lg text-text-dark mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <p className="text-text-dark mb-6">
        You can always go back to the{" "}
        <Link
          to="/"
          className="text-primary font-semibold transition cursor-pointer"
        >
          homepage
        </Link>
        .
      </p>
    </div>
  );
};
