import React, { useEffect, useState } from "react";
// Nextjs
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { title: "Videos", href: "/videos" },
  { title: "Photos", href: "/photos" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { pathname } = useRouter();
  const [isLinks, setIsLinks] = useState<boolean>(false);

  // the NavLinks are invisible when you're on the homepage
  useEffect(() => {
    pathname === "/" ? setIsLinks(false) : setIsLinks(true);
  }, [pathname]);

  return (
    <div className="flex justify-between py-2 px-4 sm:py-4 sm:px-6">
      <h1 className="font-icon">
        <Link href="/">VH</Link>
      </h1>
      <ul className="hidden sm:flex">
        {isLinks &&
          links.map((link, idx) => (
            <li
              key={idx}
              className={`ml-14 text-lg hover:font-bold ${
                pathname === link.href ? "font-bold" : "font-light"
              }`}
            >
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
