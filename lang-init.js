/* Runs before first paint. The server-rendered URL language is authoritative;
   saved preferences never change a directly requested page. Kept external for CSP. */
(function () {
  // Research tabs progressively hide panels only when JavaScript runs.
  document.documentElement.setAttribute('data-js', '');
})();
