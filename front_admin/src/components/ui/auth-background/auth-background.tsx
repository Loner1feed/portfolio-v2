import React from "react";

import bg from "../../../assets/images/auth-background.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

//styles
import "./auth-background.style.scss";

export const AuthBackground = () => {
  return (
    <div className="authBackground">
      {/* <img src={bg} alt="bg" /> */}
      <LazyLoadImage src={bg} effect="opacity" />
    </div>
  );
};
