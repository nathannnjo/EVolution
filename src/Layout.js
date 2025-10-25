import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import {
  Home,
  Calculator,
  Leaf,
  Zap,
  BookOpen,
  User,
  Car,
  TrendingUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Savings Calculator",
    url: createPageUrl("Calculator"),
    icon: Calculator,
  },
  {
    title: "Environmental Impact",
    url: createPageUrl("Environmental"),
    icon: Leaf,
  },
  {
    title: "Charging Hub",
    url: createPageUrl("ChargingHub"),
    icon: Zap,
  },
  {
    title: "EV Care & Tips",
    url: createPageUrl("CareTips"),
    icon: BookOpen,
  },
  {
    title: "My Vehicle",
    url: createPageUrl("Vehicle"),
    icon: Car,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --primary: 22 163 74;
            --primary-foreground: 255 255 255;
            --secondary: 34 197 94;
            --accent: 6 182 212;
            --muted: 248 250 252;
            --muted-foreground: 100 116 139;
            --card: 255 255 255;
            --card-foreground: 15 23 42;
            --background: 248 250 252;
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(236, 253, 245) 50%, rgb(220, 252, 231) 100%);
          }
          
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          /* Remove focus outline from navigation buttons */
          .nav-button:focus {
            outline: none !important;
            box-shadow: none !important;
          }
          
          .nav-button:focus-visible {
            outline: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
      <div className="min-h-screen flex w-full gradient-bg">
        <Sidebar className="border-r border-green-100 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-green-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-lg">EVolution</h2>
                <p className="text-xs text-green-600 font-medium">
                  Your EV Companion
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`nav-button hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-xl mb-1 focus:outline-none focus-visible:outline-none ${
                          location.pathname === item.url
                            ? "bg-green-50 text-green-700 shadow-sm border border-green-200"
                            : "hover:shadow-sm border border-transparent"
                        }`}
                      >
                        <Link
                          to={item.url}
                          className="flex items-center gap-3 px-4 py-3 focus:outline-none focus-visible:outline-none"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-600 text-xs">Money Saved</p>
                      <p className="font-bold text-green-600">$690</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-600 text-xs">CO₂ Saved</p>
                      <p className="font-bold text-cyan-600">3,596 lbs</p>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-green-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">
                  EV Driver
                </p>
                <p className="text-xs text-slate-500 truncate">
                  Building a greener future
                </p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-green-50 p-2 rounded-lg transition-colors duration-200 focus:outline-none" />
              <h1 className="text-xl font-bold text-slate-800">EVolution</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
