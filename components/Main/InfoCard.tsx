import { ReactNode } from "react";

export interface InfoCardProps {
  children: ReactNode;
  className?: string;
}

// Reverted to original straightforward glass style
const InfoCard = ({ children, className }: InfoCardProps) => {
  return (
    <div
      className={`gradient-border-mask bg-white/5 backdrop-blur-md ${className}`}
    >
      <div className="">{children}</div>
    </div>
  );
};

export default InfoCard;
