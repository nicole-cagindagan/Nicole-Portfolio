/* transition.js
   Adds a page fade-in on load and fade-out on internal link navigation.
   - Add class "page-transition" to <body> in pages
   - This script will add "ready" on load to trigger fade-in
   - On internal same-origin link clicks it prevents default, adds "fade-out" and navigates after the transition
*/
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    // trigger fade-in on next frame
    requestAnimationFrame(function () {
      body.classList.add('ready');
    });

    // Attach click handlers to internal links to animate fade-out
    var links = document.querySelectorAll('a[href]');
    Array.prototype.forEach.call(links, function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      // ignore anchors, mailto, tel, javascript, and links that open in new tab
      if (href.indexOf('#') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      if (link.target && link.target === '_blank') return;

      var url;
      try { url = new URL(href, location.href); } catch (e) { return; }
      // only handle same-origin navigation
      if (url.origin !== location.origin) return;
      // ignore same-page anchor links
      if (url.pathname === location.pathname && url.hash) return;

      link.addEventListener('click', function (ev) {
        ev.preventDefault();
        var dest = url.href;
        // start fade-out
        body.classList.remove('ready');
        body.classList.add('fade-out');
        // wait for the CSS transition to finish (match CSS 300-400ms)
        setTimeout(function () { window.location.href = dest; }, 400);
      });
    });
  });
})();
