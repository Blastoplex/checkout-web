import React, { ReactNode } from "react";

export interface ButtonProps {
  children?: ReactNode;
}

const Button: React.FC = ({ children }: ButtonProps) => (
  <button>{children}</button>
);

export default Button;
