/**
 * Shell for all persona routes. Session/capability verification is TBD
 * (docs/decisions, WEB-03); route placement here does not grant access —
 * every server action, handler and backend operation must recheck.
 */
export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}
