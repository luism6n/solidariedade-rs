export const PWAHeaders = () => {
  // reference: https://www.npmjs.com/package/next-pwa
  return (
    <>
      <meta name="application-name" content="Social List" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Social List" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="/icon.png" />
      <link rel="apple-touch-startup-image" href="/icon.png" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta name="twitter:card" content="An app for building lists socially" />
      <meta name="twitter:url" content="https://social-list.up.railway.app" />
      <meta name="twitter:title" content="Social List" />
      <meta
        name="twitter:description"
        content="An app for building lists socially"
      />
      <meta
        name="twitter:image"
        content="https://social-list.up.railway.app/icon.png"
      />
      <meta name="twitter:creator" content="@luism6n" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Social List" />
      <meta
        property="og:description"
        content="An app for building lists socially"
      />
      <meta property="og:site_name" content="Social List" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta
        property="og:image"
        content="https://social-list.up.railway.app/icon.png"
      />
    </>
  );
};
