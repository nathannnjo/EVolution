import React from "react";

export const Tabs = ({ className, children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const TabsList = ({ className, children, ...props }) => (
  <div
    className={`flex space-x-1 bg-gray-100 p-1 rounded-lg ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const TabsTrigger = ({ className, children, ...props }) => (
  <button className={`px-3 py-1 rounded-md ${className}`} {...props}>
    {children}
  </button>
);

export const TabsContent = ({ className, children, ...props }) => (
  <div className={`mt-4 ${className}`} {...props}>
    {children}
  </div>
);
