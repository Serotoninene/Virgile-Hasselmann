import React from "react";
import Link from "next/link";
interface Props {
  children: string;
  href: string;
}

export default function CustomLink({ children, href }: Props) {
  return (
    <div className="group cursor-pointer relative">
      <Link href={href} className="">
        <a className="opacity-100 group-hover:opacity-0"> {children}</a>
      </Link>
      <Link href={href}>
        <a className="font-bold opacity-0 absolute left-0 group-hover:opacity-100">
          {children}
        </a>
      </Link>
    </div>
  );
}
