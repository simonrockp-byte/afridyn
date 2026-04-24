export function Section({
  children,
  background = "white",
  id,
  className = "",
}: {
  children: React.ReactNode;
  background?: "white" | "slate" | "navy";
  id?: string;
  className?: string;
}) {
  const bg = {
    white: "bg-white",
    slate: "bg-[#F8FAFC]",
    navy: "bg-[#0A1628]",
  }[background];

  return (
    <section id={id} className={`section-pad relative overflow-hidden ${bg} ${className}`}>
      {children}
    </section>
  );
}
