import { Navigate, Outlet, useLocation } from "react-router-dom";

// TODO: сделать хук для проверки авторизации. Если юзер авторизован, то кидать его на ветку "/main". Если не авторизован, то кидать на верку "/auth"

export const IndexLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className="indexLayout">
      {/* Пока что по дефолту кидаю на /main */}
      {pathname === "/" && <Navigate to="/main" />}
      <Outlet />
    </div>
  );
};
