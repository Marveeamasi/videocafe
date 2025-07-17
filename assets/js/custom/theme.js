// === Detect if system prefers dark mode ===
let isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

console.log('Theme.js loaded ✅');
console.log('Initial isDark:', isDark);

// === Determine path prefix based on how deep the current file is ===
const pathDepth = window.location.pathname.split("/").filter(Boolean).length;
const pathPrefix = "../".repeat(pathDepth);

// === Utility: Get full path for an asset based on theme ===
function themedAsset(fileBase,folder,subFolder, ext = "png") {
  const themeSuffix = isDark ? "" : "-light";
  return `${pathPrefix}assets/${folder}${subFolder}/${fileBase}${themeSuffix}.${ext}`;
  // if there is a subfolder add a stroke before it
}

// === Swap the src of given image elements ===
function updateThemeAssets() {
  //for logo
  const logo = document.querySelector('.logo-link img');
 if(logo) logo.src = themedAsset("vclawd-Logo","images","", "png");

   //for navlogo
  const navLogo = document.querySelector('.logo_output_link img');
 if(navLogo) navLogo.src = themedAsset("vclawd-Logo","images","", "png");

 //for others
 const imgs = document.querySelectorAll('img');

imgs.forEach((img) => {
  const imgSrc = img.getAttribute('src');
  const splitmagePth = imgSrc.split('/');
  const index = splitmagePth.length - 1;
  let imageName = splitmagePth[index];
  imageName = imageName.replace('-light', ''); // Normalize

  const parent = img.parentElement;

  function parentHasTransparentBg(el) {
    if (!el) return false;
    const bg = getComputedStyle(el).backgroundColor;
    return (
      bg === 'transparent' ||
      bg === 'white' ||
      bg === '#fff' ||
      bg === 'fffffff' ||
      bg === 'rgba(0, 0, 0, 0)' ||
      bg === 'inherit'
    );
  }

  if (imageName === 'exclamation_cr.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("exclamation_cr", "icons", "", "svg");
  }

  if (imageName === 'lock.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("lock", "icons", "", "svg");
  }

  if (imageName === 'search icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("search icon", "icons", "", "svg");
  }

  if (imageName === 'add icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("add icon", "icons", "", "svg");
  }

  if (imageName === 'delete_4.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("delete_4", "icons", "", "svg");
  }

  if (imageName === 'team icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("team icon", "icons", "", "svg");
  }
});



  //for user drop down icons
    const userDropIcons = document.querySelectorAll('img.user--dropdown-icon');
    userDropIcons.forEach((img)=> {
      currentSrc = img.getAttribute('src');
      if(!currentSrc) return;
    const parts = currentSrc.split('/');
    const filename = parts.pop();
    const dir = parts.join('/');
    const [nameBase, ext] = filename.split('.');
    const cleanBase = nameBase.replace('-light', '');
    const themedName = isDark ? cleanBase : `${cleanBase}-light`;
    img.src = `${dir}/${themedName}.${ext}`;
    })

    //for stat-item icons
    const statIcons = document.querySelectorAll('.stat-item .icon');
    statIcons.forEach((img)=> {
      currentSrc = img.getAttribute('src');
      if(!currentSrc) return;
    const parts = currentSrc.split('/');
    const filename = parts.pop();
    const dir = parts.join('/');
    const [nameBase, ext] = filename.split('.');
    const cleanBase = nameBase.replace('-light', '');
    const themedName = isDark ? cleanBase : `${cleanBase}-light`;
    img.src = `${dir}/${themedName}.${ext}`;
    })

}

// === Real-time system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  isDark = e.matches;
  updateThemeAssets();
});

// === Initial update ===
document.addEventListener("DOMContentLoaded", updateThemeAssets);
