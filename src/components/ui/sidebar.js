import React from "react";

export const SidebarProvider = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

export const Sidebar = ({ className, children, ...props }) => (
  <aside className={`w-64 bg-white border-r ${className}`} {...props}>
    {children}
  </aside>
);

export const SidebarContent = ({ className, children, ...props }) => (
  <div className={`flex-1 overflow-auto ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarHeader = ({ className, children, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarFooter = ({ className, children, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarGroup = ({ className, children, ...props }) => (
  <div className={`px-3 py-2 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarGroupLabel = ({ className, children, ...props }) => (
  <div className={`px-3 py-2 text-xs font-semibold ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarGroupContent = ({ className, children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const SidebarMenu = ({ className, children, ...props }) => (
  <nav className={className} {...props}>
    {children}
  </nav>
);

export const SidebarMenuItem = ({ className, children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const SidebarMenuButton = ({
  className,
  children,
  asChild,
  ...props
}) => {
  if (asChild) {
    return (
      <div className={`block px-3 py-2 rounded-md ${className}`}>
        {children}
      </div>
    );
  }
  return (
    <button
      className={`w-full text-left px-3 py-2 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const SidebarTrigger = ({ className, children, ...props }) => (
  <button className={`p-2 ${className}`} {...props}>
    {children || "☰"}
  </button>
);
