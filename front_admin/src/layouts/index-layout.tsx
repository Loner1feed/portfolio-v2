import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const IndexLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token");
    if (token && !pathname.includes("main")) {
      navigate("/main");
    } else if (!token && pathname.includes("main")) {
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="indexLayout">
      <Outlet />
    </div>
  );
};
