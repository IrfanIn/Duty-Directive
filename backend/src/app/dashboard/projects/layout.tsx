import ProjectList from "@/components/projects/project-list";
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 bg-slate-50">
      <div className="w-1/6 p-4 bg-white h-screen ">
        <button className="font-semibold flex justify-between items-center w-full px-3 py-2 bg-slate-100 rounded-lg mb-3">
          active
          <ChevronRightIcon className="w-4" />
        </button>
        <div className="space-y-3">
          <ProjectList />
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
