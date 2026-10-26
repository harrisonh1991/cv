import { useSyncExternalStore } from 'react';

const MOBILE_QUERY = '(max-width: 1024px)';

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

function useMedia() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useMedia;
