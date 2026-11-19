import { ButtonLink } from "@/components/ui/ButtonLink";
import { notFound as copy } from "@/data/not-found";

/** 404, for any URL outside docs/ARCHITECTURE.md (and unpublished projects in production). */
export default function NotFound() {
  return (
    <section className="container-page py-20 lg:py-32">
      <p className="font-bold text-[96px] text-concrete leading-none tracking-[-0.04em] lg:text-[160px]">
        {copy.code}
      </p>
      <h1 className="mt-6 max-w-[20ch] font-bold text-[32px] leading-tight lg:text-[44px]">
        {copy.title}
      </h1>
      <p className="t-body-l mt-4 max-w-[52ch] text-muted">{copy.lead}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {copy.actions.map((a, i) => (
          <ButtonLink
            key={a.href}
            link={a}
            variant={i === copy.actions.length - 1 ? "primary" : "secondary"}
          />
        ))}
      </div>
    </section>
  );
}
