// src/hooks/useMedia.ts
import { useState, useEffect } from "react";

const useMedia = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export const useIsMobile = (): boolean => {
  return useMedia("(max-width: 1023px)");
};

export default useMedia;
