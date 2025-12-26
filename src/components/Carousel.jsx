import React, { useEffect, useRef, useState } from "react";
function Carousel({ slides = [], interval = 4e3 }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    resetTimeout();
    if (slides.length > 1) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prev2) => (prev2 + 1) % slides.length);
      }, interval);
    }
    return () => resetTimeout();
  }, [index, slides, interval]);
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  function goTo(i) {
    setIndex(i % slides.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }
  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }
  return /* @__PURE__ */ React.createElement("div", { className: "relative w-full rounded-lg overflow-hidden bg-slate-100" }, /* @__PURE__ */ React.createElement("div", { ref: containerRef, className: "w-full h-56 md:h-72 lg:h-80 relative" }, slides.map((s, i) => {
    const slide = typeof s === "string" ? { src: s } : s;
    const src = slide.src || "";
    const title = slide.title || "";
    const subtitle = slide.subtitle || "";
    const cta = slide.cta || null;
    return /* @__PURE__ */ React.createElement("div", { key: i, className: `absolute left-0 top-0 w-full h-full transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}` }, /* @__PURE__ */ React.createElement("img", { src, alt: title || `slide-${i}`, className: "w-full h-full object-cover" }), (title || subtitle || cta) && /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-end" }, /* @__PURE__ */ React.createElement("div", { className: "w-full bg-gradient-to-t from-black/60 to-transparent p-6 md:p-8 text-white" }, title && /* @__PURE__ */ React.createElement("h3", { className: "text-lg md:text-2xl font-semibold" }, title), subtitle && /* @__PURE__ */ React.createElement("p", { className: "text-sm md:text-base text-white/90 mt-1" }, subtitle), cta && /* @__PURE__ */ React.createElement("div", { className: "mt-3" }, /* @__PURE__ */ React.createElement("a", { href: cta.href, className: "inline-block px-4 py-2 bg-brand text-white rounded" }, cta.text)))));
  })), slides.length > 1 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: prev, className: "absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-1 rounded shadow" }, "\u2039"), /* @__PURE__ */ React.createElement("button", { onClick: next, className: "absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-1 rounded shadow" }, "\u203A"), /* @__PURE__ */ React.createElement("div", { className: "absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2" }, slides.map((_, i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => goTo(i), className: `w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/60"}`, "aria-label": `Go to slide ${i + 1}` })))));
}
export {
  Carousel as default
};
