// banner/banner.js
function initPolicyBanner() {
  const banner = document.getElementById('policyBanner');
  const closeBtn = document.getElementById('policyBannerClose');

  if (!banner) return;

  if (localStorage.getItem('policyBannerClosed') === '1') {
    banner.classList.add('hidden');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
      localStorage.setItem('policyBannerClosed', '1');
    });
  }

  // Apply current language to newly added elements if applyLanguage exists
  if (typeof applyLanguage === 'function') {
    const currentLang = document.body.getAttribute('data-lang') || 'en';
    applyLanguage(currentLang, false);
  }
}

const bannerContainer = document.querySelector('div[include-html="banner/banner.html"]');
if (bannerContainer) {
  bannerContainer.addEventListener('html-included', initPolicyBanner);
  if (bannerContainer.innerHTML.trim() !== '') {
    initPolicyBanner();
  }
}
