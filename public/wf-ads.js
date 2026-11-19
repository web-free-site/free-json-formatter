/* web-free.site ad loader for static guide/legal pages (Adsterra). Own keys for this site only. */
(function () {
  "use strict";
  if (window.__wfAds) return;
  window.__wfAds = 1;
  var C = {
      "pop": "https://abscloud.org/1/5ed401d7cd9ef534be7edc87e4d6512a",
      "social": "https://bauval.org/14/f2dcb9fc5a98fc6ae645545af1871f9c",
      "native": "https://bauval.org/21/0a7902acc3c2957ed37de2bee915addc",
      "nativeId": "container-0a7902acc3c2957ed37de2bee915addc",
      "smart": "https://araplhn.org/4/50c723bd243249c05ed5ef10eee13b59",
      "bannerBase": "https://bauval.org/22/{k}",
      "banners": {
        "728x90": "8b72b1ae6aa109f3f2d9122fc88093e6",
        "468x60": "e98a740965458d3823926ccbe86ecbc0",
        "320x50": "9ed9adfb19b4808c1d0b14293d473653",
        "300x250": "d76a21ef9cdcddcde75038a58b38484a",
        "160x600": "b1e97cf939eaac946fa3ca7cc130fe1e",
        "160x300": "aed23f5eda0883821babff385dc25cc1"
      }
    };
  var d = document;
  /* what is already on the page: body markup + every script src (inline config blocks in <head> do not count) */
  var html = (d.body ? d.body.innerHTML : "") + [].map.call(d.scripts, function (s) { return s.src || ""; }).join(" ");
  function has(k) { return html.indexOf(k) > -1; }
  function keyOf(u) { var m = /[0-9a-f]{32}/.exec(u); return m ? m[0] : u; }
  function addScript(src, parent) {
    if (has(keyOf(src))) return;
    var s = d.createElement("script");
    s.src = src;
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    (parent || d.body).appendChild(s);
  }
  function bannerUrl(k) { return C.bannerBase.replace("{k}", k); }
  function banner(size, extraStyle) {
    var k = C.banners[size];
    if (!k) return null;
    var wh = size.split("x"), w = +wh[0], h = +wh[1];
    var box = d.createElement("div");
    if (window.__ADFIX) {
      /* this site's worker loads banners inline (adfix): give it a slot to fill */
      box.className = "wf-ad wf-ad-" + size;
      box.setAttribute("aria-label", "Advertisement");
      box.setAttribute("data-adfix-size", size);
      box.setAttribute("data-adfix-key", k);
      box.style.cssText = "margin:1.25rem auto;max-width:100%;width:" + w + "px;min-height:" + h + "px;" + (extraStyle || "");
      return box;
    }
    box.className = "wf-ad wf-ad-" + size;
    box.setAttribute("aria-label", "Advertisement");
    box.style.cssText = "margin:1.25rem auto;text-align:center;max-width:100%;overflow:hidden;" + (extraStyle || "");
    var f = d.createElement("iframe");
    f.title = "Advertisement";
    f.width = w; f.height = h;
    f.setAttribute("scrolling", "no");
    f.setAttribute("frameborder", "0");
    f.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation");
    f.style.cssText = "border:0;display:block;margin:0 auto;width:" + w + "px;height:" + h + "px;max-width:100%";
    f.srcdoc = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>' +
      "<script>atOptions={'key':'" + k + "','format':'iframe','height':" + h + ",'width':" + w + ",'params':{}};</scr" + "ipt>" +
      '<script src="' + bannerUrl(k) + '"></scr' + "ipt></body></html>";
    box.appendChild(f);
    return box;
  }
  function after(ref, node) { if (ref && node && ref.parentNode) ref.parentNode.insertBefore(node, ref.nextSibling); }
  function run() {
    var vw = window.innerWidth || d.documentElement.clientWidth || 1024;
    var root = d.querySelector("article") || d.querySelector("main") || d.body;
    var kids = [];
    for (var i = 0; i < root.children.length; i++) {
      var t = root.children[i].tagName;
      if (t !== "SCRIPT" && t !== "STYLE") kids.push(root.children[i]);
    }
    var h1 = root.querySelector("h1");
    var firstP = h1 ? h1.nextElementSibling : null;
    var topRef = (firstP && firstP.tagName === "P") ? firstP : (h1 || null);
    var topSize = vw >= 780 ? "728x90" : (vw >= 500 ? "468x60" : "320x50");
    var top = has(C.banners[topSize]) ? null : banner(topSize);
    if (top) { if (topRef) after(topRef, top); else root.insertBefore(top, root.firstChild); }
    if (!has(C.nativeId)) {
      var nb = d.createElement("div");
      nb.className = "wf-ad wf-ad-native";
      nb.style.cssText = "margin:1.5rem 0";
      var nc = d.createElement("div");
      nc.id = C.nativeId;
      nb.appendChild(nc);
      var mid = kids.length > 3 ? kids[Math.floor(kids.length / 2)] : null;
      if (mid && mid !== topRef && mid !== h1) root.insertBefore(nb, mid); else root.appendChild(nb);
      addScript(C.native, nb);
    }
    if (!has(C.banners["300x250"])) { var b3 = banner("300x250"); if (b3) root.appendChild(b3); }
    if (vw >= 780 && !has(C.banners["468x60"]) && topSize !== "468x60") { var b4 = banner("468x60"); if (b4) root.appendChild(b4); }
    if (C.smart && !has(keyOf(C.smart))) {
      var p = d.createElement("p");
      p.className = "wf-ad wf-sponsored";
      p.style.cssText = "font-size:.8rem;opacity:.75;text-align:center;margin:1rem 0";
      var a = d.createElement("a");
      a.href = C.smart; a.target = "_blank"; a.rel = "sponsored nofollow noopener";
      a.textContent = "Sponsored: recommended offers";
      p.appendChild(a);
      root.appendChild(p);
    }
    var adfix = window.__ADFIX || d.querySelector('script[src*="/__adfix/"]');
    if (vw >= 1300 && !adfix) {
      var rails = [["160x600", "left"], ["160x300", "right"]];
      for (var r = 0; r < rails.length; r++) {
        if (has(C.banners[rails[r][0]])) continue;
        var rb = banner(rails[r][0], "position:fixed;top:110px;" + rails[r][1] + ":12px;margin:0;z-index:5;");
        if (rb) d.body.appendChild(rb);
      }
    }
    addScript(C.social, d.body);
    addScript(C.pop, d.body);
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", run); else run();
})();
