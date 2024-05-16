import flatCache from "flat-cache";

const cacheDir = process.env.NODE_ENV === "production" ? "/cache" : ".cache";

const cache = flatCache.load("geocoding", cacheDir);

export async function getGeocoding(
  address: string
): Promise<{ lat?: number; lng?: number }> {
  const cached = await cache.getKey(address);
  if (cached) {
    return cached as { lat: number; lng: number };
  } else {
    console.log(`geocoding cache miss for address "${address}"`);
  }

  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

  try {
    const response = await fetch(geocodingUrl);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;

      cache.setKey(address, { lat: latitude, lng: longitude });
      // persist cache to disk, noPrune = true in order to not delete old
      // entries
      cache.save(true);
      console.log(
        `address cached: latitude: ${latitude}, longitude: ${longitude}`
      );

      return { lat: latitude, lng: longitude };
    } else {
      console.error("error converting to coordinates:", data.status);
      return {};
    }
  } catch (error) {
    console.error("error requesting geocode:", error);
    return {};
  }
}
