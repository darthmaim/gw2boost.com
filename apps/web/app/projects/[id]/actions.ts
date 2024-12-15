'use server';

import { createAction } from "@/lib/action";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const createProjectSchema = zfd.formData({
  id: zfd.text(z.string().uuid()),
});

export const deleteProjectAction = createAction(createProjectSchema, async ({ id }) => {
  const { userId } = await requireSession();

  await db.project.delete({
    where: { id, members: { some: { userId, type: 'Owner' }}}
  });

  redirect(`/dashboard`);
});
