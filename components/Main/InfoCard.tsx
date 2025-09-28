import { ReactNode } from "react";

export interface InfoCardProps {
  children: ReactNode;
  className?: string;
}

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
