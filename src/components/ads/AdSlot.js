import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const DEFAULT_BANNER_BASE = "https://bauval.org/22";

let adsCache = null;

async function loadAds() {
  if (adsCache) return adsCache;
  try {
    const res = await fetch("/ads.json");
    adsCache = await res.json();
  } catch {
    adsCache = { enabled: false };
  }
  return adsCache;
}

function bannerIframeSrcDoc(key, width, height, scriptBase) {
  const atOptions = JSON.stringify({
    key,
    format: "iframe",
    height,
    width,
    params: {},
  });
  const src = `${scriptBase.replace(/\/$/, "")}/${key}`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer-when-downgrade"></head><body style="margin:0;padding:0;overflow:hidden;background:transparent"><script type="text/javascript">var atOptions = ${atOptions};</script><script type="text/javascript" src="${src}"><\/script></body></html>`;
}

function injectExternalScript(src, marker, target) {
  if (!src || document.querySelector(`script[data-ad="${marker}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.setAttribute("data-cfasync", "false");
  script.setAttribute("data-ad", marker);
  target.appendChild(script);
}

function BannerFrame({ def, scriptBase, slot, className, label }) {
  const srcDoc = useMemo(
    () => bannerIframeSrcDoc(def.key, def.width, def.height, scriptBase),
    [def.key, def.width, def.height, scriptBase],
  );

  return (
    <aside className={`ad-slot ${className}`} aria-label={label} data-ad-slot={slot}>
      <div className="ad-slot__label">{label}</div>
      <iframe
        title={`Advertisement ${slot}`}
        width={def.width}
        height={def.height}
        className="ad-slot__frame"
        style={{
          maxWidth: "100%",
          border: 0,
          height: def.height,
          overflow: "hidden",
        }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
        srcDoc={srcDoc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </aside>
  );
}

BannerFrame.propTypes = {
  def: PropTypes.shape({
    key: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  scriptBase: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
};

function NativeBanner({ cfg, className, label }) {
  useEffect(() => {
    injectExternalScript(cfg.src, `native-${cfg.containerId}`, document.body);
  }, [cfg.src, cfg.containerId]);

  return (
    <aside
      className={`ad-slot ${className}`}
      aria-label={label}
      data-ad-slot="nativeBelowResult"
    >
      <div className="ad-slot__label">{label}</div>
      <div id={cfg.containerId} className="ad-slot__native" />
    </aside>
  );
}

NativeBanner.propTypes = {
  cfg: PropTypes.shape({
    src: PropTypes.string.isRequired,
    containerId: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
};

function AdSlot({ slot, className = "", label = "Advertisement" }) {
  const [cfg, setCfg] = useState(null);

  useEffect(() => {
    let active = true;
    loadAds().then((loaded) => {
      if (active) setCfg(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!cfg?.enabled) return null;

  const mapped = cfg.slots?.[slot] ?? slot;

  if (mapped === "nativeBanner" || slot === "nativeBelowResult") {
    const native = cfg.nativeBanner;
    if (!native?.src || !native.containerId) return null;
    return <NativeBanner cfg={native} className={className} label={label} />;
  }

  const def = cfg.banners?.[mapped];
  if (!def?.key) return null;

  const scriptBase = cfg.bannerScriptBase || DEFAULT_BANNER_BASE;
  return (
    <BannerFrame
      def={def}
      scriptBase={scriptBase}
      slot={slot}
      className={className}
      label={label}
    />
  );
}

AdSlot.propTypes = {
  slot: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
};

export function useAdScripts() {
  useEffect(() => {
    loadAds().then((cfg) => {
      if (!cfg.enabled) return;
      if (cfg.socialBar?.trim() && !cfg.socialBar.trim().startsWith("<")) {
        injectExternalScript(cfg.socialBar.trim(), "social-bar", document.body);
      }
      if (cfg.popunder?.trim() && !cfg.popunder.trim().startsWith("<")) {
        injectExternalScript(cfg.popunder.trim(), "popunder", document.head);
      }
    });
  }, []);
}

export function SponsoredSmartlink({ className = "" }) {
  const [link, setLink] = useState(null);

  useEffect(() => {
    loadAds().then((cfg) => {
      if (cfg.enabled && cfg.smartlink?.url) {
        setLink({
          url: cfg.smartlink.url,
          label: cfg.smartlink.label || "Sponsored",
        });
      }
    });
  }, []);

  if (!link) return null;

  return (
    <p className={`ad-smartlink ${className}`}>
      <a href={link.url} target="_blank" rel="sponsored noopener noreferrer">
        {link.label}
      </a>
    </p>
  );
}

export default AdSlot;