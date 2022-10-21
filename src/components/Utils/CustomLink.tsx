import React, { useContext } from "react";
import Link from "next/link";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
interface Props {
  children: string;
  href: string;
}

export default function CustomLink({ children, href }: Props) {
  const { changeCursorType } = useContext(CursorContext);

  return (
    <Link href={href}>
      <a
        onMouseEnter={() => changeCursorType("hover")}
        onMouseLeave={() => changeCursorType("pointer")}
      >
        {children}
      </a>
    </Link>
  );
}
