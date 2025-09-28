import Image from "next/image";
import { JSX, ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  wrapperClassName?: string;
  contentClassName?: string;
  fancy?: boolean; // adds gradient corner border
}

const Title = ({
  children,
  tag,
  wrapperClassName = "",
  contentClassName = "",
  fancy = false,
}: TitleProps) => {
  const Tag = tag || "h2";
  //   const classes = ["font-semibold", fancy && "fancy-title", className]
  const wrapperClasses = ["font-semibold", wrapperClassName]
    .filter(Boolean)
    .join(" ");
  const contentClasses = [fancy && "relative inline-flex m-0", contentClassName]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={wrapperClasses}>
      <div className={contentClasses}>
        {children}
        {fancy && (
          <>
            <Image
              src="./corner/top-right.svg"
              alt="top-right"
              width={72}
              height={72}
              className="corner top-right"
            />
            <Image
              src="./corner/bottom-left.svg"
              alt="bottom-left"
              width={72}
              height={72}
              className="corner bottom-left"
            />
          </>
        )}
      </div>
    </Tag>
  );
};

export default Title;
