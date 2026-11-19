/**
 * Yellow band of service codes that scrolls sideways. The list is drawn twice so the loop is
 * seamless; the copy is hidden from screen readers. Stops on hover and for reduced motion.
 */
export function Ticker({
  items,
}: {
  items: { code: string; label: string }[];
}) {
  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((t) => (
        <li
          key={t.code}
          className="flex items-center gap-2 whitespace-nowrap pr-6 text-on-yellow"
        >
          <span className="text-[11px] font-semibold">{t.code}</span>
          <span className="text-[15px] font-bold">{t.label}</span>
          <span aria-hidden="true" className="pl-4 text-[15px]">
            /
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Services" className="ticker overflow-hidden bg-yellow">
      <div className="ticker__track flex h-12 w-max items-center pl-6">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
