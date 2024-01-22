import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Spinner = () => {
  const [count, setcount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setcount((precount) => --precount);
    }, 1000);
    count === 0 && navigate("/login",{
        state:location.pathname
    });
    return () => clearInterval(interval);
  }, [count, navigate,location]);

  return (
    <>
      <div
        className="  d-flex flex-column align-items-center justify-content-center   "
        style={{ height: "70vh" }}
      >
        <h2 className="">redirected in {count} sec</h2>
        <div className="col-12 spinner-border " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
