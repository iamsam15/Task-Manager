import React from "react";

interface IconDeleteAllProps {
  strokeColor?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

const IconDeleteAll: React.FC<IconDeleteAllProps> = ({
  strokeColor = "#D32F2F",
  width = 24,
  height = 24,
  backgroundColor = "#FFEBEE",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none">
      <circle cx="13" cy="13" r="12" fill={backgroundColor} />
      <path
        d="M8 6H18M10 10V16M14 10V16M6 6H20V20H6V6Z"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconDeleteAll;
