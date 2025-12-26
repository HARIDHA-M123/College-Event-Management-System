import { create } from "zustand";
const persistedUser = (() => {
  try {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
})();
const useStore = create((set) => ({
  theme: "light",
  toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
  user: persistedUser || { id: "u1", name: "Alex Student", role: "admin", interests: ["tech", "music"] },
  setUser: (u) => {
    const newUser = u ? { ...useStore.getState().user, ...u } : null;
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    set({ user: newUser });
  },
  events: [],
  setEvents: (events) => set({ events }),
  notifications: [],
  addNotification: (n) => set((state) => ({ notifications: [n, ...state.notifications] })),
  likes: {},
  // Search & filters
  filters: {
    query: "",
    date: "",
    type: "All",
    department: "All"
  },
  setFilter: (patch) => set((state) => ({ filters: { ...state.filters, ...patch } })),
  getFilteredEvents: () => {
    return (get) => {
      const events = get().events || [];
      const f = get().filters || {};
      return events.filter((e) => {
        if (f.query && !`${e.title} ${e.desc}`.toLowerCase().includes(f.query.toLowerCase())) return false;
        if (f.date && e.date !== f.date) return false;
        if (f.type && f.type !== "All" && e.type !== f.type) return false;
        if (f.department && f.department !== "All" && e.department !== f.department) return false;
        return true;
      });
    };
  }
}));
var stdin_default = useStore;
export {
  stdin_default as default
};
