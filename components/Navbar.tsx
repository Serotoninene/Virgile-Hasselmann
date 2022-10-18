import React from "react";
import Link from "next/link";

const links = [
  { title: "Videos", href: "/videos" },
  { title: "Photos", href: "/photos" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <div className="flex justify-between py-2 px-4 sm:py-4 sm:px-6">
      <h1 className="font-icon">VH</h1>
      <ul className="hidden sm:flex">
        {links.map((link, idx) => (
          <li key={idx} className="ml-14 text-lg font-light">
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
