import React from "react";
import Link from "next/link";
interface Props {
  children: string;
  href: string;
}

export default function CustomLink({ children, href }: Props) {
  return (
    <Link href={href}>
      <a className="cursor-pointer">{children}</a>
    </Link>
  );
}
