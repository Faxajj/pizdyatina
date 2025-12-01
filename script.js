const CVU = "12943498574082042";
const NAME = "PEdik pedrito";

const BANKS = {

  mercadopago: {
    scheme: `mercadopago://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=mercadopago;package=com.mercadopago.wallet;end`,
    uni: `https://www.mercadopago.com.ar/money-transfer?cvu=${CVU}`,
    site: "https://www.mercadopago.com.ar"
  },

  uala: {
    scheme: `uala://pay?cvu=${CVU}`,
    intent: `intent://pay?cvu=${CVU}#Intent;scheme=uala;package=ar.com.uala;end`,
    uni: `https://uala.com.ar/transfer?cvu=${CVU}`,
    site: "https://www.uala.com.ar"
  },

  brubank: {
    scheme: `brubank://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=brubank;package=com.brubank.app;end`,
    uni: `https://www.brubank.com/transfer?cvu=${CVU}`,
    site: "https://www.brubank.com"
  },

  naranjax: {
    scheme: `naranjax://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=naranjax;package=com.naranjax.app;end`,
    uni: `https://www.naranjax.com`,
    site: "https://www.naranjax.com"
  },

  cuentadni: {
    scheme: `baprocuentadni://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=baprocuentadni;package=ar.com.bapro.cuentadni;end`,
    uni: `https://www.bancoprovincia.bancainternet.com.ar`,
    site: "https://www.bancoprovincia.com.ar"
  },

  santander: {
    scheme: `santander://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=santander;package=ar.com.santander.rio.mbanking;end`,
    uni: `https://www.santander.com.ar`,
    site: "https://www.santander.com.ar"
  },

  bbva: {
    scheme: `bbva://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=bbva;package=com.bbva.monic.app;end`,
    uni: `https://www.bbva.com.ar`,
    site: "https://www.bbva.com.ar"
  },

  galicia: {
    scheme: `galicia://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=galicia;package=ar.com.banco.galicia.mobile.bank;end`,
    uni: `https://www.galicia.ar`,
    site: "https://www.galicia.ar"
  },

  macro: {
    scheme: `macro://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=macro;package=ar.com.macro.bank;end`,
    uni: `https://www.macro.com.ar`,
    site: "https://www.macro.com.ar"
  },

  reba: {
    scheme: `reba://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=reba;package=ar.rebank;end`,
    uni: `https://www.reba.com.ar`,
    site: "https://www.reba.com.ar"
  },

  icb: {
    scheme: `icb://transfer?cvu=${CVU}`,
    intent: `intent://transfer?cvu=${CVU}#Intent;scheme=icb;package=com.icb.mobilebanking;end`,
    uni: `https://icb.com.ar`,
    site: "https://icb.com.ar"
  }

};


function openBank(bankName) {
  const bank = BANKS[bankName];
  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.includes("android");
  const isTelegram = window.Telegram && Telegram.WebApp;

  let opened = false;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) opened = true;
  });

  // iOS работает идеально через scheme → universal link
  if (!isAndroid) {
    window.location = bank.scheme;

    setTimeout(() => {
      if (!opened) window.location = bank.uni;
    }, 900);
    return;
  }

  // ANDROID (Telegram WebView = iframe fallback)
  if (isAndroid && isTelegram) {
    const iframe = document.createElement("iframe");
    iframe.src = bank.scheme;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    setTimeout(() => {
      if (!opened) location.href = bank.intent;
    }, 800);

    setTimeout(() => {
      if (!opened) location.href = bank.uni;
    }, 1400);

    return;
  }

  // Android обычный browser – intent работает как у plata-al22
  location.href = bank.intent;

  setTimeout(() => {
    if (!opened) location.href = bank.uni;
  }, 1200);
}
