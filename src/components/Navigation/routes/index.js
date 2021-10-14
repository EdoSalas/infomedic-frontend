import mainRoutes from "./main";

const ROUTES = {
  Main: mainRoutes,
};

export const getRoutes = (loginType) => ROUTES[loginType] || [];

export default ROUTES;
