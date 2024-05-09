import { inject as p, reactive as l, onMounted as h, onUnmounted as k, toRefs as u } from "vue";
const c = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
}, f = {
  install(r, d) {
    const e = {
      ...c,
      ...d
    };
    r.provide("vb:breakpoints", e);
  }
};
function w(r = {}) {
  const e = {
    ...p(
      "vb:breakpoints",
      c
    ),
    ...r
  }, n = l({
    breakpoint: null,
    height: 0,
    width: 0,
    breakpointWidth: 0,
    orientation: null,
    breakpoints: e
  }), s = () => {
    let t = null;
    const i = window.innerWidth, a = window.innerHeight;
    i === a ? n.orientation = "square" : i > a ? n.orientation = "landscape" : n.orientation = "portrait";
    for (const o in e)
      e.hasOwnProperty(o) && i >= e[o] && (!t || e[o] > e[t]) && (t = o);
    n.breakpoint = t, n.width = i, n.height = a, n.breakpointWidth = t ? e[t] : 0;
  };
  return h(() => {
    s(), window.addEventListener("resize", s);
  }), k(() => {
    window.removeEventListener("resize", s);
  }), u(n);
}
export {
  f as breakpoints,
  w as useBreakpoints
};
