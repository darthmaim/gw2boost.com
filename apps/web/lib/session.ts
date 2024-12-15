import { cookies } from "next/headers";
import { db } from "./db";
import { Prisma } from "@gw2boost/database";
import { cache } from "react";
import { redirect, unauthorized } from "next/navigation";

export const getSessionId = cache(async function getSessionId() {
  const cookieStore = await cookies();
  return cookieStore.get('session')?.value;
});

export const getSession = cache(async function getSession() {
  const sessionId = await getSessionId();

  if(!sessionId) {
    return undefined;
  }

  const session = await getSessionFromDb(sessionId);

  return session ?? undefined;
});

export async function requireSession() {
  const session = await getSession();

  if(!session) {
    unauthorized();
  }

  return session;
}

export const getUser = cache(async function getUser() {
  const session = await getSession();

  if(!session) {
    return undefined;
  }

  const user = await db.user.findUnique({
    where: { id: session.userId },
  });

  return user ?? undefined;
});

export async function requireUser() {
  const user = await getUser();

  if(!user) {
    unauthorized();
  }

  return user;
}

export async function logoutAction() {
  'use server';

  const cookieStore = await cookies();
  cookieStore.delete('session');

  redirect('/');
}

async function getSessionFromDb(sessionId: string) {
  try {
    // try to update session in db
    const session = await db.session.update({
      where: { id: sessionId },
      data: { usedAt: new Date() },
      select: { id: true, userId: true },
    });

    return session;
  } catch(error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      // session not found
      return undefined;
    }

    // rethrow all other errors
    throw error;
  }
}
