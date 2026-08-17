(function() {
    // Check if consent has already been registered
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
        return; // Already accepted or denied
    }

    // Create the consent banner container
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    // Style with Tailwind CSS classes to match the website's dark, mystical, coffee/gold theme
    banner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md p-6 bg-coffee-900 text-coffee-100 border border-gold-accent/40 rounded-none shadow-2xl z-50 transition-all duration-300 transform translate-y-0';
    
    banner.innerHTML = `
        <div class="flex flex-col gap-4">
            <div>
                <h4 class="font-semibold text-lg text-gold-accent tracking-wider font-cinzel mb-2 uppercase">Privacidade e Cookies</h4>
                <p class="text-xs text-coffee-200 leading-relaxed font-lora">
                    Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar anúncios do Google Ads de acordo com os termos da LGPD. Você pode aceitar todos ou continuar navegando recusando cookies não necessários.
                </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 justify-end text-xs font-bold uppercase tracking-widest mt-2">
                <button id="btn-decline-cookies" class="px-4 py-2 border border-coffee-400 text-coffee-300 hover:text-white hover:border-white transition-colors duration-200">
                    Apenas Necessários
                </button>
                <button id="btn-accept-cookies" class="px-6 py-2 bg-gold-accent text-coffee-900 hover:bg-white hover:text-coffee-900 transition-colors duration-200">
                    Aceitar Tudo
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    // Event handlers
    document.getElementById('btn-accept-cookies').addEventListener('click', function() {
        localStorage.setItem('cookie-consent', 'accepted');
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
        }
        hideBanner();
    });

    document.getElementById('btn-decline-cookies').addEventListener('click', function() {
        localStorage.setItem('cookie-consent', 'denied');
        // Kept denied as configured in default
        hideBanner();
    });

    function hideBanner() {
        banner.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => {
            banner.remove();
        }, 300);
    }
})();
