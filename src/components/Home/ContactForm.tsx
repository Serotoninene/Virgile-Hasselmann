import Image from "next/image";
import React from "react";

interface InputProps {
  field: string;
  type?: string;
}

const Input = ({ type = "text", field }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={field}
      className="outline-none mb-2 bg-transparent border-b-light w-full px-2 pb-2 focus:text-blue focus:border-b-blue focus:placeholder:text-blue "
    />
  );
};

export default function ContactForm() {
  return (
    <div className="relative px-2 pt-12 grid gap-8 sm:gap-0 sm:grid-cols-2 sm:px-6 sm:pt-16 sm:pb-6 sm:h-screen">
      {/* left part */}
      <div className="relative w-full h-[35vh] sm:h-full">
        <Image
          layout="fill"
          src="/assets/hands_praying.png"
          objectFit="cover"
        />
      </div>
      {/* right part */}
      <div className="px-2 sm:px-0 sm:flex sm:justify-center sm:items-center">
        <div id="ContactText" className="mb-6 sm:w-4/5">
          <h2 className="text-3xl font-thin mb-2 sm:text-5xl">
            Travaillons <span className="font-black">ensemble</span>
          </h2>
          <p className="font-thin">
            If you liked what you saw, do not hesitate to reach for me. I’m
            cool, fun and nice and I’m a workaholic, love working, evey day all
            the day you know. It’s just like a drug. So let’s work together.
            Please 🙏
          </p>
        </div>
        <form>
          <Input field="Prenom" />
          <Input field="Nom" />
          <Input field="Mail" type="mail" />
          <Input field="Telephone" type="number" />
          <Input field="Message" />
        </form>
      </div>
    </div>
  );
}
