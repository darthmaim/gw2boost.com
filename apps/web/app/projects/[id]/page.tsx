import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { notFound } from "next/navigation";
import { deleteProjectAction } from "./actions";

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

      <Form action={deleteProjectAction}>
        <input type="hidden" name="id" value={project.id}/>
        <Button type="submit" appearance="delete">Delete Project</Button>
      </Form>
    </div>
  );
}
