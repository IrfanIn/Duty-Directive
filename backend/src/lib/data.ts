import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function getUserProjects() {
  try {
    const data = await sql`
            SELECT * FROM project_roles
            JOIN projects ON projects.id = project_roles.project_id
            JOIN users ON users.id = project_roles.user_id
        `;

    console.log(data.rows);

    return data.rows;
  } catch (error) {
    console.log("Database error:", error);
    throw new Error("Failed to fetch projects");
  }
}
