import React from "react";
import Image from "next/image";

export const Spinner = () => {
  return (
    <div>
      <Image
        alt="Loading"
        src="./images/loader.svg"
        width={100}
        height={100}
        priority={true}
        style={{
          margin: "50% auto",
          display: "block",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
};
