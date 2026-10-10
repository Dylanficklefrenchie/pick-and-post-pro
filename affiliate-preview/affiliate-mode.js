/* PICK & POST PRO — AFFILIATE MODE for the character pages (PREVIEW, 10 Oct 2026).
   Loaded ONLY by the generated copies at /affiliate-preview/pages/<key>/ (deploy step). Those copies are the brand page HTML byte-for-byte
   plus <base href="../../../pages/<key>/"> and these scripts, so the caption lines, closers, images and swipe/POST mechanics come from the
   ONE brand source. This script only: wraps buildCaption (disclosure first + footer), blocks POST until a valid link is saved,
   adds Copy my link + a back-to-picker control, hides the debug log, and shows the closer exactly as it is copied. */
(function(){
  var P = window.PPP, C = P.config, $ = function(id){ return document.getElementById(id); };
  var KEYM = (document.baseURI.match(/\/pages\/([^\/]+)\/(?:[?#].*)?$/) || [])[1] || '';
  document.documentElement.setAttribute('data-mode', 'affiliate');
  /* 1. caption: same brand caption, wrapped (onPost calls the global buildCaption at tap time) */
  var brandCaption = window.buildCaption;
  window.buildCaption = function(id){ return P.caption(KEYM, brandCaption(id), P.getLink()); };
  window.PPP_BRAND_CAPTION = brandCaption;
  /* 2. closer display = what is copied (the brand page shows a differently-cased closer in #endText) */
  var et = $('endText');
  if(et && typeof ENDING === 'string'){
    var fix = function(){ if(et.textContent !== ENDING) et.textContent = ENDING; };
    fix(); new MutationObserver(fix).observe(et, {childList: true, characterData: true, subtree: true});
  }
  /* 3. back to the affiliate picker (above the header, never on the photo) */
  var back = document.createElement('a'); back.id = 'ppaBack'; back.className = 'ppa-back'; back.href = '../../affiliate-preview/picker/';
  back.innerHTML = '<span aria-hidden="true">\u2039</span> Choose another Frenchie';
  var h1 = document.querySelector('h1'); h1.parentNode.insertBefore(back, h1);
  /* 4. affiliate card: what the caption adds + Copy my link, or the friendly link prompt */
  var card = document.createElement('div'); card.id = 'affCard'; card.className = 'ppa-card';
  card.innerHTML =
    '<p class="ppa-h">Affiliate Caption</p>' +
    '<p class="ppa-note" id="affNote"></p>' +
    '<div id="affHas" class="hide"><p class="ppa-link" id="affLinkText"></p>' +
      '<button type="button" class="ppa-btn" id="affCopy">COPY MY LINK</button><p class="ppa-tip" id="affTip"></p></div>' +
    '<div id="affNone" class="hide"><p class="ppa-prompt" id="affPrompt"></p>' +
      '<input id="affInput" class="ppa-input" type="url" inputmode="url" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="https://ficklefrenchiecoffeeclub.com/?ref=YOURCODE" aria-label="Your affiliate link">' +
      '<button type="button" class="ppa-btn" id="affSave">SAVE MY LINK</button></div>' +
    '<p class="ppa-msg" id="affMsg" role="status"></p>';
  var howto = $('howto'); howto.parentNode.insertBefore(card, howto);
  $('affTip').textContent = C.copyLinkTip;
  $('affPrompt').textContent = C.noLinkPrompt;
  function paint(){
    var link = P.getLink(), d = P.disclosureFor(KEYM), f = P.footerFor(KEYM, link || 'your link');
    $('affNote').textContent = ''; 
    var n = $('affNote');
    if(d){ n.appendChild(document.createTextNode('Starts with ')); var b = document.createElement('b'); b.textContent = d; n.appendChild(b); n.appendChild(document.createTextNode(' \u00b7 ')); }
    n.appendChild(document.createTextNode('ends with: ')); var e = document.createElement('span'); e.id = 'affFooter'; e.textContent = f; n.appendChild(e);
    $('affHas').classList.toggle('hide', !link); $('affNone').classList.toggle('hide', !!link);
    $('affLinkText').textContent = link || '';
  }
  function msg(t, err){ var m = $('affMsg'); m.textContent = t; m.classList.toggle('err', !!err); }
  $('affCopy').addEventListener('click', function(){
    var link = P.getLink(); if(!link){ paint(); return; }
    P.copyText(link).then(function(){ msg('Link copied \u2713 Paste it in your bio or on a Story link sticker.'); }, function(){ msg('Could not copy \u2014 press and hold the link above to copy it.', true); });
  });
  $('affSave').addEventListener('click', function(){
    var v = $('affInput').value;
    if(!P.normalize(v)){ $('affInput').classList.add('bad'); msg(C.invalidLinkMessage, true); return; }
    if(!P.setLink(v)){ msg('Could not save on this device', true); return; }
    $('affInput').classList.remove('bad'); $('affInput').value = ''; msg('Saved \u2713 You can POST now.'); paint();
    var st = $('status'); if(st && /affiliate link/.test(st.textContent)) st.textContent = '';
  });
  $('affInput').addEventListener('input', function(){ $('affInput').classList.remove('bad'); msg(''); });
  /* 5. no valid link saved -> POST is blocked with a friendly prompt (runs before the page's own click handler) */
  document.addEventListener('click', function(ev){
    var t = ev.target && ev.target.closest && ev.target.closest('#post, #retry');
    if(!t || P.getLink()) return;
    ev.preventDefault(); ev.stopImmediatePropagation();
    paint(); msg('');
    var st = $('status'); if(st) st.textContent = 'Add your affiliate link first (below), then tap POST again.';
    card.classList.add('ppa-attn'); card.scrollIntoView({block: 'center', behavior: 'smooth'});
    setTimeout(function(){ var i = $('affInput'); if(i) i.focus({preventScroll: true}); }, 350);
  }, true);
  window.addEventListener('storage', function(e){ if(e.key === P.KEY) paint(); });
  paint();
})();
