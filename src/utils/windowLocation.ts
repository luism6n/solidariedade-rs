export function getUrlTo(path: string) {
  const currentWebsiteUrl = getCurrentWebsiteUrl();

  const url = new URL(path, currentWebsiteUrl);

  return url.href;
}

function getCurrentWebsiteUrl() {
  const url = new URL(window.location.href);
  return url.origin;
}
