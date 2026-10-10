const BASE = process.env.NEXT_PUBLIC_API_URL || "https://openapi.programming-hero.com/api/bazardor";

export async function get(p) { try { 
    const r = await fetch(BASE + p, { cache: "no-store" }); 
    if (!r.ok) return null; 
    return await r.json() } catch { return null } }

const list = d => Array.isArray(d) ? d : d?.data || d?.products || d?.categories || [];

export const toBn = n => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
export const fmt = n => toBn(Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 }));

const U = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

export const fmt2 = n => toBn(Number.isInteger(n) ? n.toLocaleString("en-IN") : n.toFixed(2));

export function norm(p) {
    const mk = (p.markets || []).map(m => ({ ...m, avg: (m.min + m.max) / 2 })).sort((a, b) => a.avg - b.avg); 
    const u = U[p.unit] || p.unit;
    return {
        id: p.id, 
        slug: p.slug, 
        name: p.nameBn, 
        emoji: p.image || p.categoryIcon, 
        unitShort: u, 
        unit: "প্রতি " + u, 
        category: p.category, 
        catName: p.categoryNameBn,
        price: p.today, 
        yesterday: p.yesterday, 
        change: Number(p.change?.pct || 0), 
        markets: mk,
        min: mk.length ? Math.min(...mk.map(m => m.min)) : p.today, 
        max: mk.length ? Math.max(...mk.map(m => m.max)) : p.today
    }
}
export const getProducts = async q => list(await get("/products" + (q || ""))).map(norm);
export const getCategories = async () => list(await get("/categories")).map(c => ({ 
    slug: c.slug || c.id, 
    name: c.nameBn, 
    emoji: c.icon || "" }));
