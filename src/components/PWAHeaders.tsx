export const PWAHeaders = () => {
  // reference: https://www.npmjs.com/package/next-pwa

  const url = process.env.NEXT_PUBLIC_URL;
  const icon = process.env.NEXT_PUBLIC_URL + "/icon.png";
  const name = process.env.NEXT_PUBLIC_SITE_NAME;
  const description = process.env.NEXT_PUBLIC_SITE_DESC;

  return (
    <>
      <meta
        name="application-name"
        content={name}
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta
        name="apple-mobile-web-app-title"
        content={name}
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href={icon} />
      <link rel="apple-touch-startup-image" href={icon} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta
        name="twitter:card"
        content={description}
      />
      <meta name="twitter:url" content={url} />
      <meta
        name="twitter:title"
        content={name}
      />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        name="twitter:image"
        content={icon}
      />
      <meta name="twitter:creator" content="@luism6n" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={name}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:site_name"
        content={name}
      />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content={icon}
      />
    </>
  );
};
