import { isNull } from "lodash";
import React, { FormEvent, PropsWithChildren } from "react";

interface Props {
  onClick?: (e: FormEvent) => Promise<void> | (() => void);
  className?: string;
}

export default function Button({
  className,
  children,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      onClick={onClick}
      className={`${className} mt-2 border border-gray-500 px-10 py-2 flex-none rounded w-fit hover:bg-gray-300/50 hover:border-gray-300/50 transition-all ease-out duration-300 active:bg-gray-400`}
    >
      {children}
    </button>
  );
}
