import { toBn } from "@/lib/api";
export default function Badge({ v }) {
  const up = v > 0,
    dn = v < 0;
  const t = `${up ? "▲" : dn ? "▼" : "—"} ${toBn(Math.abs(v).toFixed(1))}%`;
  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-red-50 text-up" : dn ? "bg-green-50 text-down" : "bg-gray-100 text-gray-500"}`}
    >
      {t}
    </span>
  );
}
