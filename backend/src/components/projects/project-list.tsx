import { getUserProjects } from "@/lib/data";
import Link from "next/link";

export default async function ProjectList() {
  const projects = await getUserProjects();

  return projects.map((item) => (
    <Link key={item.id} href="" className="flex gap-2 hover:text-blue-500">
      {/* <ChevronRightIcon className="w-4" /> */}
      <p>{item.project_name}</p>
    </Link>
  ));
}
