export default function PublicHomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-8">
      <h1 className="text-2xl font-semibold">OptiAdvance HR</h1>
      <p className="text-sm text-neutral-500">
        Public entry point. Session and routing policy are TBD — see docs/decisions.
      </p>
    </main>
  );
}
