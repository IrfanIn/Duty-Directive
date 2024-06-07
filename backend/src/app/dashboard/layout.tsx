import NavIcon from "@/components/dashboard/nav-icon";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex">
      <NavIcon />
      <div className="flex-1">{children}</div>
    </div>
  );
}
