import React from "react";
import { AuthBackground } from "../../components/ui/auth-background/auth-background";
import { AuthForm } from "./common/_form";

export const AuthLogin = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <AuthBackground />
      <div
        style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}
      >
        <AuthForm />
      </div>
    </div>
  );
};
