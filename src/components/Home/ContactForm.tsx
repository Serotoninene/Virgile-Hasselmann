import Image from "next/image";
import React, { FormEvent } from "react";

interface InputProps {
  field: string;
  type?: string;
}

// optionnal prop to be added !
const Input = ({ type = "text", field }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={field}
      className="outline-none bg-transparent border-b-light border-b-[0.5px] text-xl placeholder-light w-full mb-2 px-2 py-2 focus:text-blue focus:border-b-blue focus:placeholder:text-blue "
    />
  );
};

const Button = () => {
  return (
    <div className="flex justify-center">
      <input
        type="submit"
        className="outline-none bg-transparent text-xl mb-2 pt-2 border-b-[0.5px] border-light"
      />
    </div>
  );
};

export default function ContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
      <div className="px-2 sm:px-0 sm:flex sm:flex-col sm:justify-center sm:items-center">
        <div id="ContactText" className="mb-6">
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
        <form onSubmit={(e) => handleSubmit(e)} className="mb-6">
          <Input field="Prenom" />
          <Input field="Nom" />
          <Input field="Mail" type="mail" />
          <Input field="Telephone" type="number" />
          <Input field="Message" />
          <Button />
        </form>
        <div className="flex justify-between mb-2">
          <p>Instagram</p>
          <p>@VirgileHasselman, 2022</p>
        </div>
      </div>
    </div>
  );
}
