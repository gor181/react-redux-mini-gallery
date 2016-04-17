export function openURL (url, newTab = true) {
  if (newTab) {
    return window.open(url, '_blank');
  }

  window.open(url);
}
