"use client";

import {
  BellIcon,
  FolderOpenIcon,
  HomeIcon,
  UserGroupIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    icon: <RectangleGroupIcon className="w-6" />,
    href: "/dashboard",
    title: "Dashboard",
  },
  {
    icon: <BellIcon className="w-6" />,
    href: "/dashboard/notifications",
    title: "Notifications",
  },
  {
    icon: <FolderOpenIcon className="w-6" />,
    href: "/dashboard/projects",
    title: "Projects",
  },
  {
    icon: <UserGroupIcon className="w-6" />,
    href: "/dashboard/users",
    title: "Users",
  },
];

export default function NavIcon() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-[5rem] transition-all bg-white ">
      <div className="w-full h-full bg-slate-200 rounded flex flex-col items-center">
        <div className="w-[80%] my-4 h-14 rounded-2xl bg-white">
          <Image
            src="/images/task_complition_remove.png"
            alt="DutyDirective icon"
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-6 w-[90%] self-end">
          {links.map((item, key) => (
            <Link
              key={key}
              href={item.href}
              title={item.title}
              className={`${
                pathname == item.href && "bg-white"
              } w-full flex justify-center py-4 rounded-l-xl`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
