/**
 * Placeholder shown while a slug page reads its URL (only for slugs that weren't prerendered;
 * every slug from generateStaticParams is already in the static HTML).
 */
export function PageSkeleton() {
  return (
    <div
      className="container-page animate-pulse pt-8 pb-20 lg:pt-12"
      aria-hidden="true"
    >
      <div className="h-3 w-48 bg-concrete/60" />
      <div className="mt-12 h-6 w-16 bg-concrete/60" />
      <div className="mt-4 h-12 w-full max-w-[640px] bg-concrete/60" />
      <div className="mt-5 h-4 w-full max-w-[520px] bg-concrete/40" />
      <div className="mt-2 h-4 w-full max-w-[420px] bg-concrete/40" />
    </div>
  );
}
