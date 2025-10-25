import React from "react";

export const Select = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

export const SelectContent = ({ className, children, ...props }) => (
  <div
    className={`bg-white border rounded-md shadow-lg ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const SelectItem = ({ className, children, ...props }) => (
  <div
    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const SelectTrigger = ({ className, children, ...props }) => (
  <button
    className={`w-full px-3 py-2 border rounded-md text-left ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const SelectValue = ({ className, children, ...props }) => (
  <span className={className} {...props}>
    {children}
  </span>
);
