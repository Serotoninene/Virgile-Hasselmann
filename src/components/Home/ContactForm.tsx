import React, { FormEvent, useState } from "react";
import Image from "next/image";
// framer motion
import { motion } from "framer-motion";

interface InputProps {
  field: string;
  type?: string;
  optionnal?: boolean;
}

// Anim variants
const duration = 0.5;
const ease = [0.6, 0.01, -0.05, 0.95];

const containerAnim = {
  hidden: {},
  visible: { transition: { delayChildren: 0.3, staggerChildren: 0.1 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 10, transition: { duration, ease } },
  visible: { opacity: 1, y: 0, transition: { duration, ease } },
};

const photoAnim = {
  hidden: { y: "100%", scale: 2, transition: { duration, ease } },
  visible: {
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.73, 0.15, 0.31, 0.94] },
  },
};

// optionnal prop to be added !
const Input = ({ type = "text", field, optionnal }: InputProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={field}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="border-b-light border-b-[0.5px] text-xl placeholder-light w-full mb-2 px-2 py-2 focus:text-blue focus:border-b-blue focus:placeholder:text-blue"
      ></input>
      {optionnal && !focus && (
        <div className="absolute top-1 right-1 text-xs">(optionnel)</div>
      )}
    </div>
  );
};

const Button = () => {
  return (
    <div className="flex justify-center cursor-pointer">
      <input
        type="submit"
        className="outline-none bg-transparent text-xl mb-2 pt-2 border-b-[0.5px] border-light"
      />
    </div>
  );
};

export default function ContactForm() {
  // HandleSubmit TBD
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="relative px-2 pt-10 grid gap-8 sm:gap-0 sm:grid-cols-2 sm:px-6 sm:pt-14 sm:pb-6 sm:h-screen">
      {/* left part */}
      <motion.div
        initial={{ scaleY: 0.5 }}
        whileInView={{ scaleY: 1 }}
        className="overflow-hidden"
      >
        <motion.div
          className="relative w-full h-[35vh] sm:h-full"
          variants={photoAnim}
          initial="hidden"
          whileInView="visible"
        >
          <Image
            layout="fill"
            src="/assets/hands_praying.png"
            objectFit="cover"
          />
        </motion.div>
      </motion.div>
      {/* right part */}
      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        className="px-2 sm:px-6 sm:flex sm:flex-col sm:justify-center sm:items-center 2xl:px-12"
      >
        <motion.div id="ContactText" className="mb-6" variants={itemAnim}>
          <h2 className="text-3xl font-thin mb-2 sm:text-5xl">
            Travaillons <span className="font-black">ensemble</span>
          </h2>
          <p className="font-thin">
            If you liked what you saw, do not hesitate to reach for me. I’m
            cool, fun and nice and I’m a workaholic, love working, evey day all
            the day you know. It’s just like a drug. So let’s work together.
            Please 🙏
          </p>
        </motion.div>
        <motion.form
          variants={itemAnim}
          onSubmit={(e) => handleSubmit(e)}
          className="mb-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:w-full"
        >
          <Input field="Prenom" />
          <Input field="Nom" />
          <Input field="Mail" type="mail" />
          <Input field="Telephone" type="phone" optionnal />
          <div className="sm:col-span-2">
            <Input field="Message" optionnal />
          </div>
          <div className="sm:col-span-2 sm:mt-2">
            <Button />
          </div>
        </motion.form>
        <motion.div
          variants={itemAnim}
          className="flex justify-between mb-2 sm:absolute sm:right-6 sm:bottom-6"
        >
          <p className="sm:hidden">Instagram</p>
          <p>@VirgileHasselman, 2022</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
