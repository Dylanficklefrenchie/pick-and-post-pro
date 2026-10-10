/* PICK & POST PRO — affiliate helpers shared by Page 1, the affiliate picker and the affiliate character pages. Reads affiliate-config.js. */
(function(){
  var C = window.PPP_AFFILIATE_CONFIG, KEY = 'ppp_referral_link';
  var CODE = new RegExp(C.codePattern);
  function get(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  /* normalise any accepted input to the canonical link https://ficklefrenchiecoffeeclub.com/?ref=CODE, or null */
  function normalize(input){
    var s = String(input || '').trim(); if(!s) return null;
    if(!/^https?:\/\//i.test(s)) s = 'https://' + s;
    var u; try{ u = new URL(s); }catch(e){ return null; }
    if(C.allowedHosts.indexOf(u.hostname.toLowerCase()) < 0) return null;
    var code = u.searchParams.get('ref');
    return fromCode(code);
  }
  function fromCode(code){ code = String(code || '').trim(); return CODE.test(code) ? C.linkBase + code : null; }
  function getLink(){ return normalize(get()); }          // a stored link that no longer validates counts as "no link"
  function setLink(link){ var n = normalize(link); if(!n) return false; try{ localStorage.setItem(KEY, n); return true; }catch(e){ return false; } }
  function clear(){ try{ localStorage.removeItem(KEY); localStorage.removeItem('ppp_welcome_seen'); }catch(e){} }
  function charCfg(key){ return (C.characters && C.characters[key]) || {}; }
  function footerFor(key, link){
    var cc = charCfg(key);
    if(C.footerIncludeLink){ var t = cc.footerWithLink || C.footerWithLink; return t.replace('{link}', link || ''); }
    return cc.footer || C.footer;
  }
  function disclosureFor(key){ var cc = charCfg(key); return cc.hasOwnProperty('disclosure') ? cc.disclosure : C.disclosure; }
  /* affiliate caption = disclosure first + the unchanged brand caption + footer */
  function caption(key, base, link){
    if(base === null || base === undefined) return base;
    var d = disclosureFor(key), f = footerFor(key, link);
    return (d ? d + C.disclosureSeparator : '') + base + (f ? C.footerSeparator + f : '');
  }
  function legacyCopy(text){
    var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.top = '-1000px';
    document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, ta.value.length); var ok = false; try{ ok = document.execCommand('copy'); }catch(e){}
    document.body.removeChild(ta); return ok;
  }
  function copyText(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
      try{ return navigator.clipboard.writeText(text).catch(function(){ if(legacyCopy(text)) return; throw new Error('copy failed'); }); }catch(e){}
    }
    return legacyCopy(text) ? Promise.resolve() : Promise.reject(new Error('copy failed'));
  }
  function showInPicker(key){ var cc = charCfg(key); return cc.hasOwnProperty('showInPicker') ? !!cc.showInPicker : true; }
  window.PPP = {config: C, KEY: KEY, normalize: normalize, fromCode: fromCode, getLink: getLink, setLink: setLink, clear: clear,
    caption: caption, footerFor: footerFor, disclosureFor: disclosureFor, copyText: copyText, showInPicker: showInPicker};
})();
