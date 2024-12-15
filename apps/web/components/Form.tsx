'use client';

import type { ActionState } from '@/lib/action';
import { type FC, type ReactNode, useActionState } from 'react';

export interface FormProps<State> {
  action: (state: State, payload: FormData) => Promise<State>,
  initialState?: State,
  children: ReactNode;
  id?: string;
}

export const Form: FC<FormProps<ActionState>> = ({ action, initialState, children, id }) => {
  const [state, formAction] = useActionState(action, initialState ?? {});

  return (
    <form action={formAction} id={id}>
      {state.success === false && (<div>Error!</div>)}
      {state.success === true && (<div>Success!</div>)}

      {children}
    </form>
  );
};
