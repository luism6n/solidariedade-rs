import { useEffect, useState } from "react";

export function useScript({
  name,
  enabled = true,
}: {
  name: keyof typeof allScripts;
  enabled?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const promise = new Promise((resolve, reject) => {
    if (isLoaded) {
      resolve(undefined);
    } else if (error) {
      reject(error);
    }
  });

  useEffect(() => {
    if (enabled) {
      void loadScript(name)
        ?.then(() => {
          setIsLoaded(true);
        })
        .catch((e: Error) => {
          setError(e);
        });
    }
  }, [enabled, name]);

  return { isLoaded, error, promise };
}

const allScripts = {
  googleMaps: {
    src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=initGoogleMaps`,
    globalCallbackName: "initGoogleMaps",
  },
};

const loadedScriptPromises: Map<string, Promise<unknown>> = new Map();

export const loadScript = (name: keyof typeof allScripts): Promise<unknown> => {
  const promise = loadedScriptPromises.get(name);
  if (promise) {
    return promise;
  } else {
    const promise = new Promise((resolve, reject) => {
      const scriptSpec = allScripts[name];

      const script = document.createElement("script");
      script.src = scriptSpec.src;
      script.async = true;

      const callback = () => {
        resolve(undefined);
      };

      script.onload = callback;

      script.onerror = (error) => {
        reject(error);
      };

      document.body.appendChild(script);
    });
    loadedScriptPromises.set(name, promise);
    return promise;
  }
};
