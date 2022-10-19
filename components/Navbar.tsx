import React, { useState } from "react";
// Nextjs
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { title: "Videos", href: "/videos" },
  { title: "Photos", href: "/photos" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<boolean>(false);

  return (
    <div className="flex justify-between py-2 px-4 sm:py-4 sm:px-6">
      <h1 className="font-icon">VH</h1>
      <ul className="hidden sm:flex">
        {links.map((link, idx) => (
          <li
            key={idx}
            className={`ml-14 text-lg ${
              router.pathname === link.href ? "font-bold" : "font-light"
            }`}
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
