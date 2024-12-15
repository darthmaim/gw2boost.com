import { Button } from "@/components/Button";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import Link from "next/link";

export default async function DashboardRoute() {
  const user = await requireUser();
  const projects = await db.project.findMany({
    where: { members: { some: { userId: user.id }}}
  });

  return (
    <div>
      <div>Hello {user.name}.</div>

      <h1>Projects</h1>

      <ul>
        {projects.map((project) => (
          <li key={project.id}><Link href={`/projects/${project.id}`}>{project.name}</Link></li>
        ))}
      </ul>

      <Button type="link" href="/projects/create">Create project</Button>
    </div>
  );
}

