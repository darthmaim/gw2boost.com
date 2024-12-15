import { unstable_rethrow as rethrow } from "next/navigation";
import { z, type ZodSchema } from "zod";
import { type formData } from 'zod-form-data';

type FormDataZodSchema = ReturnType<typeof formData>;

export type ActionState =
  | { success?: undefined }
  | { success: true }
  | { success: false }

export function createAction<Schema extends FormDataZodSchema>(schema: Schema, action: (data: z.infer<Schema>) => Promise<never | { success: boolean }>) {
  return async (_previousState: ActionState, formData: FormData): Promise<ActionState> => {
    schema
    const parsed = await schema.safeParseAsync(formData);

    if(!parsed.success) {
      console.warn(parsed.error);
      return { success: false };
    }

    try {
      return action(parsed);
    } catch(e) {
      rethrow(e);

      return { success: false };
    }
  };
}
