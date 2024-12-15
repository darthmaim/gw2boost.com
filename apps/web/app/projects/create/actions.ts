'use server';

import { createAction } from "@/lib/action";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const createProjectSchema = zfd.formData({
  name: zfd.text(z.string().min(4)),
});

export const createProjectAction = createAction(createProjectSchema, async ({ name }) => {
  const session = await requireSession();

  // create project
  const project = await db.project.create({
    data: {
      name,
      members: { create: { userId: session.userId, type: 'Owner' }}
    },
    select: { id: true }
  });

  redirect(`/projects/${project.id}`);
});
