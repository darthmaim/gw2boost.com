import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: Promise<Record<string, string>> }) {
  const { id } = await params;
  const { userId } = await requireSession();

  const project = await db.project.findUnique({
    where: { id, members: { some: { userId }}}
  });

  if(!project) {
    notFound();
  }

  return (
    <div>
      <h1>{project.name}</h1>
    </div>
  );
}
