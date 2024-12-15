import { requireUser } from "@/lib/session";

export default async function DashboardRoute() {
  const user = await requireUser();

  return (
    <div>Hello {user.name}.</div>
  );
}
