import React from "react";
import { IUser } from "./backend";

export const userContext = React.createContext<IUser>({
  name: "Anônimo",
  email: "",
});
