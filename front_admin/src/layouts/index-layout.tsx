import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// TODO: сделать хук для проверки авторизации. Если юзер авторизован, то кидать его на ветку "/main". Если не авторизован, то кидать на верку "/auth"

export const IndexLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main");
    } else {
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="indexLayout">
      <Outlet />
    </div>
  );
};
