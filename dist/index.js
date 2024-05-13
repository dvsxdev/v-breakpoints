import { ref as e, watch as O, watchEffect as x, inject as v } from "vue";
const P = {
  xs: 0,
  // 0px - 639px
  sm: 640,
  // 640px - 767px
  md: 768,
  // 768px - 1023px
  lg: 1024,
  // 1024px - 1279px
  xl: 1280,
  // 1280px - 1535px
  "2xl": 1536
  // 1536px - Above
}, A = {
  phone: 0,
  // 0px - 767px
  tablet: 768,
  // 768px - 1199px
  laptop: 1200,
  // 1200px - 1600px
  desktop: 1601,
  // 1601px - 1920px
  largeDesktop: 1921
  // 1921px - Above
}, R = {
  install(n, o = {}) {
    let s = {
      ...P,
      ...o.breakpoints
    }, c = {
      ...A,
      ...o.screens
    };
    o.override && o.override.breakpoint && o.breakpoints && (s = o.breakpoints), o.override && o.override.screen && o.screens && (c = o.screens);
    const E = {
      ...Object.fromEntries(
        Array.from(Object.keys(s), (r) => [r, !1])
      ),
      ...Object.fromEntries(
        Array.from(Object.keys(c), (r) => [r, !1])
      )
    }, l = e(""), u = e(""), k = e(0), f = e(0), w = e(0), p = e(0), g = e(null), _ = e(E), m = e({}), z = (r) => {
      let t = "", i = "";
      const d = window.innerWidth, h = window.innerHeight;
      g.value = d === h ? "square" : d > h ? "landscape" : "portrait";
      for (const a in s)
        s.hasOwnProperty(a) && d >= s[a] && (!t || s[a] > s[t]) && (t = a);
      for (const a in c)
        c.hasOwnProperty(a) && d >= c[a] && (!i || c[a] > c[i]) && (i = a);
      l.value = t, u.value = i, k.value = d, f.value = h, w.value = t ? s[t] : 0, p.value = i ? c[i] : 0, m.value = r, t && i && (_.value = {
        ...E,
        [t]: !0,
        [i]: !0
      });
    };
    O(
      [l, u, g],
      ([r, t, i], [d, h, a]) => {
        const W = {
          breakpoint: r,
          breakpointWidth: w.value,
          screen: t,
          screenWidth: p.value,
          orientation: i,
          width: k.value,
          height: f.value
        };
        if (r !== d) {
          const b = new Event("breakpoint:change");
          b.payload = W, window.dispatchEvent(b);
        }
        if (t !== h) {
          const b = new Event("screen:change");
          b.payload = W, window.dispatchEvent(b);
        }
        if (i !== a) {
          const b = new CustomEvent("orientation:change");
          b.payload = W, window.dispatchEvent(b);
        }
      }
    );
    const y = (r) => ({
      beforeMount(t, i) {
        const d = (h) => {
          i.value && i.value(h);
        };
        r && window.addEventListener(r, d), t.__cleanup__ = () => {
          r && window.removeEventListener(r, d);
        };
      },
      unmounted(t) {
        t.__cleanup__ && t.__cleanup__();
      }
    });
    n.directive("breakpoint-change", y("breakpoint:change")), n.directive("screen-change", y("screen:change")), n.directive("orientation-change", y("orientation:change")), n.provide("vb:breakpoints", s), n.provide("vb:screens", c), n.provide("vb:breakpoint", l), n.provide("vb:screen", u), n.provide("vb:width", k), n.provide("vb:height", f), n.provide("vb:breakpointWidth", w), n.provide("vb:screenWidth", p), n.provide("vb:orientation", g), n.provide("vb:is", _), n.provide("vb:resizeEvent", m);
    const L = () => {
      window.addEventListener("resize", z), window.dispatchEvent(new Event("resize"));
    }, j = () => {
      window.removeEventListener("resize", z);
    };
    L(), x(() => () => {
      j();
    });
  }
};
function T() {
  const n = v("vb:breakpoints", {}), o = v("vb:screens", {}), s = e(v("vb:breakpoint", "")), c = e(v("vb:screen", "")), E = e(v("vb:width", 0)), l = e(v("vb:height", 0)), u = e(
    v("vb:breakpointWidth", 0)
  ), k = e(
    v("vb:screenWidth", 0)
  ), f = e(
    v("vb:orientation", null)
  ), w = e(v("vb:is", {})), p = e(v("vb:resizeEvent", {}));
  return {
    breakpoint: s,
    screen: c,
    width: E,
    height: l,
    breakpointWidth: u,
    screenWidth: k,
    orientation: f,
    breakpoints: n,
    screens: o,
    is: w,
    event: p
  };
}
export {
  R as breakpoints,
  T as useBreakpoints
};
