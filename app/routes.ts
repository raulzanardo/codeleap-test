import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/signup.tsx"),
  { path: "home", file: "routes/main.tsx" },
] satisfies RouteConfig;
