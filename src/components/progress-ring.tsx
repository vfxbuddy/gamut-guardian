type ProgressRingProps = {
  value: number;
  label: string;
};

export function ProgressRing({ value, label }: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(value, 100));

  return (
    <div className="grid place-items-center">
      <div
        className="grid size-36 place-items-center rounded-full shadow-[0_0_44px_rgba(50,230,255,0.16)]"
        style={{
          background: `conic-gradient(#40f6ff ${clamped * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
        }}
      >
        <div className="grid size-28 place-items-center rounded-full border border-white/10 bg-[#080b12] text-center">
          <strong className="pixel text-3xl text-cyan-100">{clamped}%</strong>
          <span className="text-xs font-bold text-white/55">{label}</span>
        </div>
      </div>
    </div>
  );
}
