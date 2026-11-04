let hasCompletedInitialLoad = false;

export function markInitialLoadComplete() {
  hasCompletedInitialLoad = true;
}

export function shouldRunPageTransition() {
  return hasCompletedInitialLoad;
}
