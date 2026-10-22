/* UI/UX: nav behaviour (mark current page) */
document.querySelectorAll(".nav-list a").forEach(function (a) {
  if (a.href === location.href) a.setAttribute("aria-current", "page");
});
