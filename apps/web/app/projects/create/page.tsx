import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { requireSession } from "@/lib/session";
import { createProjectAction } from "./actions";
import { Form } from "@/components/Form";

export default async function CreateProjectRoute() {
  await requireSession();

  return (
    <div>
      <h1>Create project</h1>

      <Form action={createProjectAction}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <label htmlFor="name">Name</label>
          <TextInput name="name" id="name"/>
          <Button type="submit">Create project</Button>
        </div>
      </Form>
    </div>
  );
}
