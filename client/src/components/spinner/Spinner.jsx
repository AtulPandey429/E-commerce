import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./Spinner.css"; // Import your custom CSS for styling

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      navigate("/login", { state: location.pathname });
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <>
      {count > 0 && (
        <div className="spinner-container">
          <div className="spinner-content">
            <h2 className="countdown-text">Redirecting in {count} seconds</h2>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Spinner;
