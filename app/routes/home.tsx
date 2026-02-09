import type { Route } from "./+types/home";
import { SignUp } from "../signup/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CodeLeap Engineering Test - Sign Up" },
    { name: "description", content: "CodeLeap Engineering Test - Sign Up" },
  ];
}

export default function Home() {
  return <SignUp />;
}
