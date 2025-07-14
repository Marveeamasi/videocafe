// === Detect if system prefers dark mode ===
let isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

console.log('Theme.js loaded ✅');
console.log('Initial isDark:', isDark);

// === Determine path prefix based on how deep the current file is ===
const pathDepth = window.location.pathname.split("/").filter(Boolean).length;
const pathPrefix = "../".repeat(pathDepth);

// === Utility: Get full path for an asset based on theme ===
function themedAsset(fileBase, ext = "png") {
  const themeSuffix = isDark ? "" : "-light";
  return `${pathPrefix}assets/images/${fileBase}${themeSuffix}.${ext}`;
}

// === Swap the src of given image elements ===
function updateThemeAssets() {
  const logo = document.querySelector('.logo-link img');
  if (!logo) {
    console.warn('No logo found for .logo-link img');
    return;
  }
  logo.src = themedAsset("vclawd-Logo", "png");
  console.log('Updated logo to:', logo.src);
}

// === Initial update ===
document.addEventListener("DOMContentLoaded", updateThemeAssets);

// === Real-time system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  isDark = e.matches;
  updateThemeAssets();
});
