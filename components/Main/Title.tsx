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
        <span className="text-white [text-shadow:0px_100px_80px_rgba(0,0,0,0.36),0px_50.0488px_40.0391px_rgba(0,0,0,0.27372),0px_30.1471px_24.1177px_rgba(0,0,0,0.234572),0px_19.3198px_15.4559px_rgba(0,0,0,0.205522),0px_12.5216px_10.0172px_rgba(0,0,0,0.18),0px_7.88218px_6.30574px_rgba(0,0,0,0.154478),0px_4.5288px_3.62304px_rgba(0,0,0,0.125428),0px_1.99324px_1.59459px_rgba(0,0,0,0.0862802)]">
          {children}
        </span>
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
