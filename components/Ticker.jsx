import { fmt, toBn } from "@/lib/api";
export default function Ticker({ items }) {
  const l = [...items, ...items];
  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden text-sm">
      <div className="mq">
        {l.map((p, i) => (
          <span
            key={i}
            className="px-5 py-2 border-r border-gray-200 whitespace-nowrap"
          >
            {p.emoji} {p.name}{" "}
            <span className="text-gray-500">
              {fmt(p.price)} টাকা/{p.unitShort}
            </span>{" "}
            <b
              className={
                p.change > 0
                  ? "text-red-600"
                  : p.change < 0
                    ? "text-green-600"
                    : "text-gray-500"
              }
            >
              {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"}{" "}
              {toBn(Math.abs(p.change).toFixed(1))}%
            </b>
          </span>
        ))}
      </div>
    </div>
  );
}
