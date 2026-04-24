export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
