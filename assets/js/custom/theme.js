// === Initial theme preference from localStorage or checkbox ===
let isDark = localStorage.getItem('theme') === 'dark';

const themeSwitchEl = document.getElementById('theme-switch');
if (localStorage.getItem('theme') === null && themeSwitchEl) {
  isDark = themeSwitchEl.checked;
}

// Stop propagation for theme dropdown item when touched
const themeCont = document.getElementById('theme-switch-parent');
if (themeCont) {
  themeCont.addEventListener('click', function (event) {
    event.stopPropagation();
  });
}

// === Detect path depth and build path prefix
const pathDepth = window.location.pathname.split("/").filter(Boolean).length;
const pathPrefix = "../".repeat(pathDepth);

// === Image Cache with preloaded Image objects ===
let themeImageCache = {};

// === Preload Theme Images as Image objects ===
function preloadThemeImages() {
  const themeImageMap = {
    'vclawd-Logo.png': ["vclawd-Logo", "images", "", ""],
    'exclamation_cr.svg': ["exclamation_cr", "icons", "", ""],
    'lock.svg': ["lock", "icons", ""],
    'search icon.svg': ["search icon", "icons", "", ""],
    'add icon.svg': ["add icon", "icons", "", ""],
    'delete_4.svg': ["delete_4", "icons", "", ""],
    'team icon.svg': ["team icon", "icons", "/Lost icons", ""],
    'download thumbnail.svg': ["download thumbnail", "icons", "", ""],
    'copy icon.svg': ["copy icon", "icons", "", ""],
    'share_2_u_sq.svg': ["share_2_u_sq", "icons", "", ""],
    'dash icon.svg': ["dash icon", "icons", "", ""],
    'live icon.svg': ["live icon", "icons", "", ""],
    'record scren icon.svg': ["record scren icon", "icons", "", ""],
    'video-camera.svg': ["video-camera", "icons", "", ""],
    'project icon.svg': ["project icon", "icons", "", ""],
    'media icon.svg': ["media icon", "icons", "", ""],
    'email icon.svg': ["email icon", "icons", "", ""],
    'integration icon.svg': ["integration icon", "icons", "", ""],
    'setting icon.svg': ["setting icon", "icons", "", ""],
    'agency icons.svg': ["agency icons", "icons", "", ""],
    'help icon.svg': ["help icon", "icons", "", ""],
    'bonus icon.svg': ["bonus icon", "icons", "", ""],
    'video to gif.svg': ["video to gif", "icons", "", ""],
    'analysis icon.svg': ["analysis icon", "icons", "", ""],
    'usage icon.svg': ["usage icon", "icons", "", ""],
    'notification bell.svg': ["notification bell", "icons", "", ""],
    'create perfect thumbail icon.svg': ["create perfect thumbail icon", "icons", "", ""],
    'move icon.svg': ["move icon", "icons", "", ""],
    'find music backgroud music icon.svg': ["find music backgroud music icon", "icons", "", ""],
    'text to specch icon.svg': ["text to specch icon", "icons", "", ""],
    'video footage icon.svg': ["video footage icon", "icons", "", ""]
  };

  // Preload all images in parallel
  const preloadPromises = Object.entries(themeImageMap).map(([imageName, [base, folder, sub, suber]]) => {
    return new Promise((resolve) => {
      const ext = imageName.split('.').pop();
      
      // Create dark version
      const darkImg = new Image();
      darkImg.src = themedAsset(base, folder, sub, suber, ext, false);
      
      // Create light version
      const lightImg = new Image();
      lightImg.src = themedAsset(base, folder, sub, suber, ext, true);
      
      // Store both in cache
      themeImageCache[imageName] = {
        dark: darkImg.src,
        light: lightImg.src,
        darkElement: darkImg,
        lightElement: lightImg
      };
      
      // Resolve when both are loaded
      Promise.all([
        new Promise(r => darkImg.onload = r),
        new Promise(r => lightImg.onload = r)
      ]).then(resolve);
    });
  });

  return Promise.all(preloadPromises);
}

// === Utility: Get full path for an asset based on theme ===
function themedAsset(fileBase, folder, subFolder, suberFolder, ext = "png", forceLight = isDark) {
  const themeSuffix = forceLight ? "-light" : "";
  return `${pathPrefix}assets/${folder}${subFolder}${suberFolder}/${fileBase}${themeSuffix}.${ext}`;
}

// === Apply Theme Class to <body>
function applyThemeClass() {
  document.body.classList.remove('toggle-light', 'toggle-dark');
  document.body.classList.add(isDark ? 'toggle-dark' : 'toggle-light');
}

// === Update assets based on theme ===
function updateThemeAssets() {
  applyThemeClass();

  // Update dynamic theme text
  const themeText = document.getElementById('theme');
  if (themeText) {
    themeText.innerText = isDark ? 'Dark Mood' : 'Light Mood';
  }

  // Batch DOM updates for better performance
  const updateBatch = [];

  // Process regular images
  const imgs = document.querySelectorAll('img');
  imgs.forEach((img) => {
    const imgSrc = img.getAttribute('src');
    if (!imgSrc) return;

    const parts = imgSrc.split('/');
    const filename = parts.pop();
    const dir = parts.join('/');
    const [nameBase, ext] = filename.split('.');
    const cleanBase = nameBase.replace('-light', '');
    const themedName = isDark ? cleanBase : `${cleanBase}-light`;
    const newSrc = `${dir}/${themedName}.${ext}`;

    // Check if the image is in themeImageCache to ensure it's themeable
    const imageName = `${cleanBase}.${ext}`;
    const parent = img.parentElement;
    const isNavItemImage = parent?.closest('.quick-nav .nav-item') !== null;

    function parentHasTransparentBg(el) {
      if (!el || isNavItemImage) return true;
      const bg = getComputedStyle(el).backgroundColor;
      return (
        bg === 'transparent' ||
        bg === 'white' ||
        bg === '#fff' ||
        bg === 'ffffff' ||
        bg === 'rgba(0, 0, 0, 0)' ||
        bg === 'inherit'
      );
    }

    const shouldReplace = parentHasTransparentBg(parent);

    if (themeImageCache[imageName] && (shouldReplace || isNavItemImage)) {
      if (img.src !== newSrc) {
        updateBatch.push(() => { img.src = newSrc; });
      }
    }
  });

  // Process user dropdown icons
  const userDropIcons = document.querySelectorAll('img.user--dropdown-icon');
  userDropIcons.forEach((img) => {
    const currentSrc = img.getAttribute('src');
    if (!currentSrc) return;

    const parts = currentSrc.split('/');
    const filename = parts.pop();
    const dir = parts.join('/');
    const [nameBase, ext] = filename.split('.');
    const cleanBase = nameBase.replace('-light', '');
    const themedName = isDark ? cleanBase : `${cleanBase}-light`;
    const newSrc = `${dir}/${themedName}.${ext}`;

    if (img.src !== newSrc) {
      updateBatch.push(() => { img.src = newSrc; });
    }
  });

  // Process stat-item icons
  const statIcons = document.querySelectorAll('.stat-item .icon');
  statIcons.forEach((img) => {
    const currentSrc = img.getAttribute('src');
    if (!currentSrc) return;

    const parts = currentSrc.split('/');
    const filename = parts.pop();
    const dir = parts.join('/');
    const [nameBase, ext] = filename.split('.');
    const cleanBase = nameBase.replace('-light', '');
    const themedName = isDark ? cleanBase : `${cleanBase}-light`;
    const newSrc = `${dir}/${themedName}.${ext}`;

    if (img.src !== newSrc) {
      updateBatch.push(() => { img.src = newSrc; });
    }
  });

  // Execute all updates in a single batch
  if (updateBatch.length > 0) {
    requestAnimationFrame(() => {
      updateBatch.forEach(update => update());
    });
  }
}

// === Handle toggle switch ===
function handleThemeToggle() {
  const themeSwitch = document.getElementById('theme-switch');
  if (!themeSwitch) return;

  isDark = themeSwitch.checked;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  // Use double requestAnimationFrame for smoother transitions
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updateThemeAssets();
    });
  });
}

// === Listen to toggle ===
if (themeSwitchEl) {
  themeSwitchEl.addEventListener('change', handleThemeToggle);
}

// === Initial setup ===
document.addEventListener("DOMContentLoaded", () => {
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) themeSwitch.checked = isDark;

  // Show initial theme immediately
  applyThemeClass();
  
  // Start preloading images but don't wait for them
  preloadThemeImages().then(() => {
    // Once images are loaded, do a full update
    updateThemeAssets();
  }).catch(console.error);
  
  // Initial update with fallback if images aren't preloaded yet
  updateThemeAssets();
});