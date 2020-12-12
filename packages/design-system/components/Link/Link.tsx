import React, { ReactNode } from "react";

export interface LinkProps {
  children?: ReactNode;
  href?: string;
}

const Link: React.FC = ({ children, href }: LinkProps) => (
  <a href={href}>{children}</a>
);

export default Link;
