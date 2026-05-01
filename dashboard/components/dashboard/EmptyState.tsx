export default function EmptyState({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Icon circle */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{
          background: "rgba(233,193,118,0.08)",
          border: "1px solid rgba(233,193,118,0.15)",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 28,
            color: "#e9c176",
            fontVariationSettings: "'FILL' 0,'wght' 200,'GRAD' 0,'opsz' 24",
          }}
        >
          {icon}
        </span>
      </div>

      <h2 className="font-headline text-xl text-on-surface mb-2">{title}</h2>
      <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed opacity-70">
        {description}
      </p>

      {/* Placeholder ileride içerik gelecek */}
      <div
        className="mt-8 px-4 py-2 rounded-full text-[10px] font-label tracking-widest uppercase"
        style={{
          background: "rgba(233,193,118,0.06)",
          border: "1px solid rgba(233,193,118,0.12)",
          color: "rgba(233,193,118,0.5)",
        }}
      >
        Yakında
      </div>
    </div>
  );
}
