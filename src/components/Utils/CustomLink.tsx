import React, { useContext } from "react";
import Link from "next/link";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
interface Props {
  children: string;
  href: string;
}

export default function CustomLink({ children, href }: Props) {
  const { setCursorType } = useContext(CursorContext);

  return (
    <Link href={href}>
      <a
        onMouseEnter={() => setCursorType("hover")}
        onMouseLeave={() => setCursorType("pointer")}
      >
        {children}
      </a>
    </Link>
  );
}
