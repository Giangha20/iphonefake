const apps=document.querySelectorAll('.app')
const appView=document.getElementById('appView')
const home=document.getElementById('home')
const safariApp=document.getElementById('safariApp')
const settingsApp=document.getElementById('settingsApp')
const appTitle=document.getElementById('appTitle')

apps.forEach(app=>{
  app.addEventListener('click',()=>{
    appView.classList.add('active')
    home.style.transform='scale(.92)'
    const name=app.dataset.app

    safariApp.classList.add('hidden')
    settingsApp.classList.add('hidden')
    appTitle.style.display='block'
    appTitle.innerText=name

    if(name==='Safari'){safariApp.classList.remove('hidden');appTitle.style.display='none'}
    if(name==='Settings'){settingsApp.classList.remove('hidden');appTitle.style.display='none'}
  })
})

document.querySelectorAll('.home-indicator').forEach(ind=>{
  ind.addEventListener('click',()=>{
    appView.classList.remove('active')
    home.style.transform='scale(1)'
  })
})

const wifiToggle=document.getElementById('wifiToggle')
const btToggle=document.getElementById('btToggle')
wifiToggle.onchange=()=>wifiStatus.innerText=wifiToggle.checked?'Đã bật':'Không'
btToggle.onchange=()=>btStatus.innerText=btToggle.checked?'Bật':'Tắt'
/* ===== KILL APP BẰNG VUỐT LÊN (IOS STYLE) ===== */
let cardStartY = 0;
let killing = false;

if (currentAppCard) {
  currentAppCard.addEventListener('touchstart', e => {
    cardStartY = e.touches[0].clientY;
  });

  currentAppCard.addEventListener('touchmove', e => {
    const diff = cardStartY - e.touches[0].clientY;
    if (diff > 0) {
      currentAppCard.style.transform = `translateY(-${diff}px) scale(${1 - diff / 600})`;
    }
  });

  currentAppCard.addEventListener('touchend', e => {
    const diff = cardStartY - e.changedTouches[0].clientY;

    // Vuốt mạnh → kill app
    if (diff > 120) {
      killCurrentApp();
    } else {
      // Trả về vị trí cũ
      currentAppCard.style.transform = '';
    }
  });
}

function killCurrentApp() {
  currentAppCard.style.transition = '0.3s';
  currentAppCard.style.transform = 'translateY(-600px) scale(0.7)';
  currentAppCard.style.opacity = '0';

  setTimeout(() => {
    appSwitcher.classList.remove('active');
    appView.classList.remove('active');
    home.style.transform = 'scale(1)';
    home.style.filter = 'none';

    // reset
    currentAppCard.style.transition = '';
    currentAppCard.style.transform = '';
    currentAppCard.style.opacity = '1';
  }, 300);
}
/* ===== ẨN APP SWITCHER KHI Ở SETTINGS ===== */
apps.forEach(app => {
  app.addEventListener('click', () => {
    if (app.dataset.app === 'Settings') {
      appView.classList.add('in-settings');
      appSwitcher.classList.remove('active');
    } else {
      appView.classList.remove('in-settings');
    }
  });
});
/* ===== FIX: CHỈ TẮT ĐA NHIỆM TRONG SETTINGS ===== */
apps.forEach(app => {
  app.addEventListener('click', () => {
    if (app.dataset.app === 'Settings') {
      appView.classList.add('in-settings');
    } else {
      // ⚠️ dòng này là mấu chốt
      appView.classList.remove('in-settings');
    }
  });
});
/* ===== CHẶN ĐA NHIỆM TRONG SETTINGS (CHUẨN IOS) ===== */
function showAppSwitcherSafe() {
  // nếu đang ở Settings → không cho hiện
  if (appView.classList.contains('in-settings')) return;

  if (!appOpen) return;
  appSwitcher.classList.add('active');
  switcherTitle.innerText = appTitle.innerText || 'Safari';
}

/* ghi đè an toàn, KHÔNG phá code cũ */
window.showAppSwitcher = showAppSwitcherSafe;
 /* ===== QUẢN LÝ TRẠNG THÁI SETTINGS ===== */
apps.forEach(app => {
  app.addEventListener('click', () => {
    if (app.dataset.app === 'Settings') {
      appView.classList.add('in-settings');
    } else {
      appView.classList.remove('in-settings');
    }
  });
});
