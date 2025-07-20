// === Initial theme preference from localStorage or checkbox ===
let isDark = localStorage.getItem('theme') === 'dark';

// If no saved theme, fall back to checkbox (initial load)
if (localStorage.getItem('theme') === null) {
  isDark = document.getElementById('theme-switch').checked;
}

//check theme switch status, it is true initially by default
console.log(document.getElementById('theme-switch').checked)

//stop propagetion for theme dropdowm item when touched
document.getElementById('theme-switch-parent').addEventListener('click', function(event){
  event.stopPropagation();
})

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
  applyThemeClass();
  //dynamically update theme texts
const themeText = document.getElementById('theme');
themeText.innerText = isDark?'Dark Mood':'Light Mood';

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

   if (imageName === 'vclawd-Logo.png' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("vclawd-Logo", "images", "", "png");
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

   if (imageName === 'download thumbnail.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("download thumbnail", "icons", "", "svg");
  }

    if (imageName === 'copy icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("copy icon", "icons", "", "svg");
  }

   if (imageName === 'share_2_u_sq.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("share_2_u_sq", "icons", "", "svg");
  }

    if (imageName === 'dash icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("dash icon", "icons", "", "svg");
  }

   if (imageName === 'live icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("live icon", "icons", "", "svg");
  }

    if (imageName === 'record scren icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("record scren icon", "icons", "", "svg");
  }

   if (imageName === 'video-camera.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("video-camera", "icons", "", "svg");
  }

    if (imageName === 'project icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("project icon", "icons", "", "svg");
  }

   if (imageName === 'media icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("media icon", "icons", "", "svg");
  }

    if (imageName === 'email icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("email icon", "icons", "", "svg");
  }

   if (imageName === 'integration icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("integration icon", "icons", "", "svg");
  }

    if (imageName === 'setting icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("setting icon", "icons", "", "svg");
  }

   if (imageName === 'agency icons.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("agency icons", "icons", "", "svg");
  }

    if (imageName === 'help icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("help icon", "icons", "", "svg");
  }

   if (imageName === 'bonus icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("bonus icon", "icons", "", "svg");
  }
     if (imageName === 'video to gif.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("video to gif", "icons", "", "svg");
  }

   if (imageName === 'analysis icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("analysis icon", "icons", "", "svg");
  }

    if (imageName === 'notification bell.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("notification bell", "icons", "", "svg");
  }

   if (imageName === 'move icon.svg' && parentHasTransparentBg(parent)) {
    img.src = themedAsset("move icon", "icons", "", "svg");
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

function applyThemeClass() {
  document.body.classList.remove('toggle-light', 'toggle-dark');
  document.body.classList.add(isDark ? 'toggle-dark' : 'toggle-light');
}

function handleThemeToggle() {
  const themeSwitch = document.getElementById('theme-switch');
  isDark = themeSwitch.checked;

  // Save to localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  applyThemeClass();
  updateThemeAssets();
}

// === Listen to theme switch toggle
document.getElementById('theme-switch').addEventListener('change', handleThemeToggle);

// === Initial update ===
document.addEventListener("DOMContentLoaded", () => {
  const themeSwitch = document.getElementById('theme-switch');
  
  // Set checkbox state based on saved preference
  themeSwitch.checked = isDark;

  applyThemeClass();
  updateThemeAssets();
});
