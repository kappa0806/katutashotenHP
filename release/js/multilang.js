// 多言語対応JavaScript

// 言語切り替え機能
document.addEventListener('DOMContentLoaded', function() {
    // 現在の言語（デフォルトは日本語）
    let currentLang = localStorage.getItem('selectedLanguage') || 'ja';
    
    // 言語ボタンの初期化
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithLang = document.querySelectorAll('[data-ja][data-en][data-zh]');
    
    // 初期状態の設定
    setActiveLanguage(currentLang);
    switchLanguage(currentLang);
    
    // 言語ボタンのクリックイベント
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            setActiveLanguage(selectedLang);
            switchLanguage(selectedLang);
            
            // 選択した言語をローカルストレージに保存
            localStorage.setItem('selectedLanguage', selectedLang);
            
            console.log('言語切り替え:', selectedLang);
        });
    });
    
    // アクティブな言語ボタンの設定
    function setActiveLanguage(lang) {
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // HTML lang属性を更新
        document.documentElement.setAttribute('lang', lang);
        currentLang = lang;
    }
    
    // 言語の切り替え実行
    function switchLanguage(lang) {
        // すべての多言語要素のテキストを更新
        elementsWithLang.forEach(element => {
            const langText = element.getAttribute(`data-${lang}`);
            if (langText) {
                element.textContent = langText;
            }
        });
        
        // メタタグの更新
        updateMetaTags(lang);
        
        // ページタイトルの更新
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const titleText = titleElement.getAttribute(`data-${lang}`);
            if (titleText) {
                titleElement.textContent = titleText;
            }
        }
        
        console.log('言語切り替え完了:', lang);
    }
    
    // メタタグの更新
    function updateMetaTags(lang) {
        // description メタタグ
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
            const descText = descriptionMeta.getAttribute(`data-${lang}`);
            if (descText) {
                descriptionMeta.setAttribute('content', descText);
            }
        }
        
        // keywords メタタグ
        const keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta) {
            const keywordsText = keywordsMeta.getAttribute(`data-${lang}`);
            if (keywordsText) {
                keywordsMeta.setAttribute('content', keywordsText);
            }
        }
        
        // Open Graph タイトル
        const ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (ogTitleMeta) {
            const ogTitleText = ogTitleMeta.getAttribute(`data-${lang}`);
            if (ogTitleText) {
                ogTitleMeta.setAttribute('content', ogTitleText);
            }
        }
        
        // Open Graph description
        const ogDescMeta = document.querySelector('meta[property="og:description"]');
        if (ogDescMeta) {
            const ogDescText = ogDescMeta.getAttribute(`data-${lang}`);
            if (ogDescText) {
                ogDescMeta.setAttribute('content', ogDescText);
            }
        }
    }
    
    // URL変更時の言語保持（SPAの場合）
    window.addEventListener('popstate', function() {
        const savedLang = localStorage.getItem('selectedLanguage') || 'ja';
        if (savedLang !== currentLang) {
            setActiveLanguage(savedLang);
            switchLanguage(savedLang);
        }
    });
    
    // 動的に追加された要素の言語対応
    function updateDynamicContent() {
        const newElements = document.querySelectorAll('[data-ja][data-en][data-zh]:not([data-lang-updated])');
        newElements.forEach(element => {
            const langText = element.getAttribute(`data-${currentLang}`);
            if (langText) {
                element.textContent = langText;
                element.setAttribute('data-lang-updated', 'true');
            }
        });
    }
    
    // MutationObserverで動的コンテンツを監視
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                updateDynamicContent();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// 言語固有のフォーマット関数
function formatDate(date, lang) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    switch(lang) {
        case 'ja':
            return new Intl.DateTimeFormat('ja-JP', options).format(date);
        case 'en':
            return new Intl.DateTimeFormat('en-US', options).format(date);
        case 'zh':
            return new Intl.DateTimeFormat('zh-CN', options).format(date);
        default:
            return new Intl.DateTimeFormat('ja-JP', options).format(date);
    }
}

// 通貨フォーマット
function formatCurrency(amount, lang) {
    switch(lang) {
        case 'ja':
            return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
        case 'en':
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount * 0.0067); // 概算レート
        case 'zh':
            return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(amount * 0.048); // 概算レート
        default:
            return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
    }
}