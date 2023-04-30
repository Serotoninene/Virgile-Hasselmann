import React, { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
import Link from "next/link";
// Framer motion
import { motion } from "framer-motion";
import bcrypt from "bcryptjs";

interface DateElements {
  weekday?: string;
  day?: string;
  month?: string;
  hour?: string;
}

function capitalizeWord(string: string) {
  const uppercasedString = [string].map(
    (element: string) =>
      element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
  );
  return uppercasedString.join();
}

export const DateFormatted = () => {
  const [dateState, setDateState] = useState(Date.now());
  const [formattedDate, setformattedDate] = useState<string>();
  let dateElements: DateElements = {};
  if (formattedDate) {
    const splitDate = formattedDate.split(" ");
    dateElements = {
      weekday: capitalizeWord(splitDate[0]),
      day: capitalizeWord(splitDate[1]),
      month: capitalizeWord(splitDate[2]),
      hour: capitalizeWord(splitDate[4]),
    };
  }

  useEffect(() => {
    setformattedDate(
      new Date(dateState).toLocaleDateString("fr-FR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setInterval(() => setDateState(Date.now()), 1000);
  }, [dateState]);

  if (!formattedDate) return <></>;
  return (
    <>
      {dateElements.weekday} {dateElements.day} {dateElements.month},{" "}
      {dateElements.hour}
    </>
  );
};

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="px-4 pt-6 sm:pt-16  md:pb-4 grid-cols-12 sm:px-6 md:grid   2xl:max-w-[1536px] xl:m-auto  snap-child-end"
    >
      {/* Virgile's presentation */}
      <div className="pb-6 col-span-3">
        <h3 className="font-black mb-4 md:mb-12">Virgile Hasselmann</h3>
        <p className="font-extralight">
          Je vous accompagne dans la création d’une histoire et d’une identité
          visuelle pour votre projet en restant à l’écoute de vos envies et
          besoins.
        </p>
      </div>
      <div className="col-span-1" />
      {/* NavLinks */}
      <div className="col-span-3 pb-6">
        <h3 className="font-black mb-4 md:mb-12">Projects</h3>
        <ul className="grid grid-cols-3 gap-1.5 md:grid-cols-1">
          <li>
            <Link href="/#Videos">Videos</Link>
          </li>
          <li>
            <Link href="/photos">Photos</Link>
          </li>
          <li>
            <Link href="/#Contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="col-span-1" />
      {/* Contacts */}
      <div className="pb-3 md:pb-6 col-span-4">
        <h3 className="font-black mb-4 md:mb-12">Contacts</h3>
        <ul>
          <li className="pb-2 cursor-pointer">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/v_hasselmann"
            >
              Instagram : v_hasselmann
            </a>
          </li>
          <li className="pb-2">Email : virgile.hasselmann@hotmail.fr</li>
        </ul>
      </div>
      {/* Footer of the footer */}
      <div className="hidden col-span-12 h-20 md:block"></div>
      <div className="hidden col-span-4 text-sm md:block">
        Made by @Serotoninene
      </div>
      <div className="hidden col-span-4 text-sm md:block">
        {/* Mardi 4 Octobre, 16:02 */}
        <DateFormatted />
      </div>
      <div className="hidden col-span-4 justify-between text-sm md:flex">
        <p>@VirgileHasselman, 2023</p>
        <div className="w-2 h-2 bg-light mt-1"></div>
      </div>
    </motion.div>
  );
}
