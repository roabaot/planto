import { FC, ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  iconOnly?: boolean;
}

const Button: FC<ButtonProps> = ({ children, className, iconOnly }) => {
  return (
    <button
      className={`relative z-20 border border-white/75 hover:border-white text-white/75 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out ${
        iconOnly ? "p-1" : "py-2 px-6"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
