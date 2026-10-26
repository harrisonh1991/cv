export default function PointDescriptions({ lists }: { lists: string[] }) {
  return (
    <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-400 marker:text-cyber-magenta">
      {lists.map((d, di) => (
        <li key={di}>{d}</li>
      ))}
    </ul>
  );
}
