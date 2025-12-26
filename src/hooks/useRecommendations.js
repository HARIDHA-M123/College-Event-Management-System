import { useMemo } from "react";
function useRecommendations(events = [], user) {
  return useMemo(() => {
    const list = Array.isArray(events) ? events : [];
    if (!list.length) return [];
    const safeUser = user || {};
    const interests = Array.isArray(safeUser.interests) ? safeUser.interests : [];
    const lowered = interests.map((i) => (typeof i === "string" ? i.toLowerCase() : ""));
    return [...list]
      .map((e) => {
        const title = (e.title || "").toLowerCase();
        const desc = (e.desc || "").toLowerCase();
        const matches = lowered.some((i) => i && (title.includes(i) || desc.includes(i)));
        return {
          ...e,
          score: (matches ? 30 : 0) + (Number(e.popularity) || 0)
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [events, user]);
}
export {
  useRecommendations as default
};
