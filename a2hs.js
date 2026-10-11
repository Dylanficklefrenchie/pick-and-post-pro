/* Pick & Post Pro — "Add to your Home Screen" banner (approved 11 Oct 2026). Self-contained: injects its own CSS.
   Shown only on iPhone/iPad/Android, only when NOT already running as an installed Home Screen app,
   and not within 7 days of being dismissed (localStorage ppp_a2hs_dismissed_until). In-flow card at the top of the
   page (never fixed over the POST / picker controls). Touches nothing else: no ref link, caption or posting code. */
(function(){
  try {
    var KEY = 'ppp_a2hs_dismissed_until', DAYS = 7;
    var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    if (standalone) return;
    var q = location.search;
    var force = /[?&]a2hs=(ios|ios-inapp|android)\b/.exec(q);           /* testing aid: ?a2hs=ios | ios-inapp | android */
    if (!force) { try { var until = +localStorage.getItem(KEY) || 0; if (until > Date.now()) return; } catch(e) {} }
    var ua = navigator.userAgent || '';
    var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    var android = /Android/i.test(ua);
    var inApp = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|GSA\/|GoogleGmail|Gmail|CriOS|FxiOS|EdgiOS|OPiOS|Line\/|Snapchat|Pinterest|LinkedInApp|Twitter/i.test(ua) || (ios && !/Safari\//.test(ua));
    if (force) { ios = force[1] !== 'android'; android = !ios; inApp = force[1] === 'ios-inapp'; }
    if (!ios && !android) return;

    var me = document.currentScript && document.currentScript.src;
    var icon = me ? new URL('icons/icon-192.png', me).href : 'icons/icon-192.png';
    var css = '#ppp-a2hs{position:relative;display:flex;gap:10px;align-items:center;margin:0 0 10px;padding:9px 34px 9px 10px;background:#FFFDF8;border:1.5px solid #D9C38E;border-radius:14px;box-shadow:inset 0 0 0 3px #FFFDF8,inset 0 0 0 4px rgba(184,145,58,.35),0 2px 8px rgba(31,27,22,.08);color:#302B25;font-family:"EB Garamond",Georgia,serif;text-align:left}'
      + '#ppp-a2hs img{flex:0 0 auto;width:42px;height:42px;border-radius:10px;border:1.5px solid #B8913A;box-shadow:0 1px 4px rgba(31,27,22,.18)}'
      + '#ppp-a2hs .a2-t{margin:0 0 2px;font-family:Cinzel,Georgia,serif;font-weight:700;font-size:14px;line-height:1.2;letter-spacing:0;color:#8F1127}'
      + '#ppp-a2hs .a2-s{margin:0;font-size:15px;line-height:1.28;font-weight:500;color:#302B25}'
      + '#ppp-a2hs .a2-s strong{font-weight:600;color:#1F1B16}'
      + '#ppp-a2hs .a2-x{position:absolute;top:3px;right:3px;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:transparent;color:#6B6257;font:400 20px/32px Georgia,serif;cursor:pointer}'
      + '#ppp-a2hs .a2-x:focus-visible{outline:2px solid #B8913A}'
      /* Page 1 (/affiliate/ welcome) only: slightly smaller hero icon while the banner shows, so ENTER stays on screen at 390x844 */
      + 'html.ppp-a2hs-on #hero{margin-bottom:6px}html.ppp-a2hs-on #hero img{width:118px;height:118px;border-radius:25px}html.ppp-a2hs-on #hero .fleur{width:44px;height:44px}'
      + '@media (max-height:700px){html.ppp-a2hs-on #hero img{width:76px;height:76px;border-radius:17px}html.ppp-a2hs-on #hero .fleur{width:30px;height:30px}}'
      + '#ppp-a2hs .a2-b{display:none;margin:7px 0 0;padding:8px 13px;border:1.5px solid #B8913A;border-radius:10px;background:linear-gradient(#A3192F,#8F1127 55%,#740B1D);color:#FFFFFF;font:700 15px/1.1 Cinzel,Georgia,serif;cursor:pointer}';
    var steps = ios
      ? (inApp ? 'Open this page in <strong>Safari</strong> first: tap <strong>&#8943;</strong> or the compass icon, then <strong>Open in Safari</strong>.'
               : 'Tap the <strong>Share</strong> button, then <strong>Add to Home Screen</strong>, then <strong>Add</strong>.')
      : 'Tap <strong>&#8942;</strong> in Chrome, then <strong>Add to Home screen</strong>.';
    var deferred = null;
    function el(){
      var d = document.createElement('div'); d.id = 'ppp-a2hs'; d.setAttribute('role', 'region'); d.setAttribute('aria-label', 'Add Pick & Post Pro to your Home Screen');
      d.innerHTML = '<img alt="" src="' + icon + '"><div><p class="a2-t">Add Pick &amp; Post Pro to your&nbsp;Home&nbsp;Screen</p><p class="a2-s">' + steps + '</p>'
        + '<button type="button" class="a2-b">Add to Home Screen</button></div><button type="button" class="a2-x" aria-label="Dismiss">&#10005;</button>';
      d.querySelector('.a2-x').addEventListener('click', function(){
        try { localStorage.setItem(KEY, String(Date.now() + DAYS * 864e5)); } catch(e) {}
        d.parentNode && d.parentNode.removeChild(d); off(); relayout();
      });
      d.querySelector('.a2-b').addEventListener('click', function(){
        if (!deferred) return; deferred.prompt();
        (deferred.userChoice || Promise.resolve()).then(function(r){ if (r && r.outcome === 'accepted') { d.parentNode && d.parentNode.removeChild(d); off(); relayout(); } });
        deferred = null;
      });
      return d;
    }
    function relayout(){ try { window.dispatchEvent(new Event('resize')); } catch(e) {} }   /* pages that size to the viewport re-fit */
    var node = null;
    function off(){ document.documentElement.classList.remove('ppp-a2hs-on'); }
    function mount(){
      if (node || document.getElementById('ppp-a2hs')) return;
      var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
      document.documentElement.classList.add('ppp-a2hs-on');
      node = el(); document.body.insertBefore(node, document.body.firstChild);
      if (deferred) node.querySelector('.a2-b').style.display = 'inline-block';
      relayout(); setTimeout(relayout, 400);
    }
    window.addEventListener('beforeinstallprompt', function(ev){
      ev.preventDefault(); deferred = ev;
      if (node) node.querySelector('.a2-b').style.display = 'inline-block';
    });
    window.addEventListener('appinstalled', function(){ if (node && node.parentNode) { node.parentNode.removeChild(node); off(); relayout(); } });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  } catch(e) { /* never break the page */ }
})();
