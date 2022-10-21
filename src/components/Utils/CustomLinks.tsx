import React from "react";
import Link from "next/link";

interface Props {
  children: string;
  href: string;
}

export default function CustomLinks({ children, href }: Props) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}
