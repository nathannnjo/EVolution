import React from "react";

export const Badge = ({ className, children, ...props }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ${className}`}
    {...props}
  >
    {children}
  </span>
);
