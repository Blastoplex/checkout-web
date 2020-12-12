import React from "react";
import Link from "./Link";

export default { title: "Link", component: Link };

export const withText: React.FC = () => <Link>This is an anchor</Link>;
