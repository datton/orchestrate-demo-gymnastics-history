/* UI/UX: nav behaviour (mark current page) and scroll-triggered text animation */
(function () {
  function clean(p) { return p.replace(/index\.html$/, "").replace(/\/$/, ""); }
  document.querySelectorAll(".nav-list a").forEach(function (a) {
    if (clean(a.pathname) === clean(location.pathname)) a.setAttribute("aria-current", "page");
  });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js");

  // Big headings: split into words that slide up one by one. Screen readers get the full text.
  document.querySelectorAll(".big-text, main h2").forEach(function (el) {
    var text = el.textContent.trim();
    if (el.children.length) return;
    el.setAttribute("aria-label", text);
    el.textContent = "";
    text.split(/\s+/).forEach(function (w, i) {
      var outer = document.createElement("span"), inner = document.createElement("span");
      outer.className = "word"; outer.setAttribute("aria-hidden", "true");
      outer.style.setProperty("--i", i);
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      el.appendChild(document.createTextNode(" "));
    });
    el.setAttribute("data-split", "");
  });

  // Paragraphs and lists fade up as they scroll into view.
  document.querySelectorAll("main p, main li, main blockquote").forEach(function (el) { el.setAttribute("data-reveal", ""); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll("[data-split], [data-reveal]").forEach(function (el) { io.observe(el); });
})();
