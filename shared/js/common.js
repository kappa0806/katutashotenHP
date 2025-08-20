// 共通JavaScript機能

document.addEventListener('DOMContentLoaded', function() {
    
    // トップへ戻るボタン
    const backToTopBtn = document.createElement('a');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.href = '#';
    backToTopBtn.setAttribute('aria-label', 'ページトップへ戻る');
    document.body.appendChild(backToTopBtn);
    
    // スクロール時の表示制御
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // クリック時のスムーススクロール
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ローディング画面
    const loaderWrapper = document.createElement('div');
    loaderWrapper.className = 'loader-wrapper';
    loaderWrapper.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loaderWrapper);
    
    // ページ読み込み完了時にローダーを非表示
    window.addEventListener('load', function() {
        setTimeout(function() {
            loaderWrapper.classList.add('fade-out');
        }, 500);
    });
    
    // 電話番号クリック処理（PCの場合はコピー）
    const telLinks = document.querySelectorAll('a[href^="tel:"]');
    telLinks.forEach(function(link) {
        // モバイルデバイスの判定を改善
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (!isMobile) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                
                // Clipboard APIをサポートしているかチェック
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(phoneNumber).then(function() {
                        showNotification('電話番号をコピーしました: ' + phoneNumber);
                    }).catch(function(err) {
                        // フォールバック：テキスト選択
                        selectText(phoneNumber);
                    });
                } else {
                    // 古いブラウザ用フォールバック
                    selectText(phoneNumber);
                }
            });
        }
    });
    
    // 通知表示関数
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideInFromRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.style.animation = 'slideOutToRight 0.3s ease';
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // テキスト選択関数
    function selectText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('電話番号をコピーしました: ' + text);
        } catch (err) {
            showNotification('電話番号: ' + text);
        }
        document.body.removeChild(textArea);
    }
    
    // キーボードナビゲーション対応
    document.addEventListener('keydown', function(e) {
        // Escキーでモーダルやメニューを閉じる
        if (e.key === 'Escape') {
            const activeMenu = document.querySelector('.nav-menu.active');
            if (activeMenu) {
                activeMenu.classList.remove('active');
                document.querySelector('.hamburger.active')?.classList.remove('active');
            }
        }
        
        // Tabキーでフォーカス可能な要素に移動
        if (e.key === 'Tab') {
            const focusableElements = document.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    // ハンバーガーメニュー機能
    const hamburger = document.querySelector('.hamburger, .menu-toggle');
    // 複数の可能なナビゲーション要素を検索
    const possibleNavs = [
        '.nav-menu',
        '.nav-list', 
        '.nav ul',
        'nav ul',
        '.header-inner nav ul',
        '.nav-container ul',
        '.header-content nav ul'
    ];
    
    let navMenu = null;
    for (const selector of possibleNavs) {
        const element = document.querySelector(selector);
        if (element && element.children.length > 0) {
            navMenu = element;
            console.log('ナビゲーションメニュー発見:', selector);
            break;
        }
    }
    
    // .navが見つからない場合、すべてのul要素を検索
    if (!navMenu) {
        const allUls = document.querySelectorAll('nav ul, .nav ul, .header ul');
        for (const ul of allUls) {
            if (ul.children.length > 0) {
                navMenu = ul;
                console.log('ナビゲーションメニュー発見(fallback):', ul);
                break;
            }
        }
    }
    
    const navLinks = document.querySelectorAll('.nav-link, .nav a, nav a, .header-inner nav a');
    
    console.log('ハンバーガーメニュー初期化:', {
        hamburger: hamburger,
        navMenu: navMenu,
        navMenuTagName: navMenu ? navMenu.tagName : 'なし',
        navMenuClasses: navMenu ? navMenu.className : 'なし',
        navLinksCount: navLinks.length,
        currentURL: window.location.pathname
    });
    
    // サンプル4,5専用デバッグ
    if (window.location.pathname.includes('sample4') || window.location.pathname.includes('sample5')) {
        console.log('サンプル4または5検出 - 詳細デバッグ:');
        const allNavMenus = document.querySelectorAll('.nav-menu');
        console.log('すべての.nav-menu要素:', allNavMenus);
        allNavMenus.forEach((menu, index) => {
            console.log(`nav-menu[${index}]:`, {
                element: menu,
                computedStyles: window.getComputedStyle(menu),
                currentDisplay: window.getComputedStyle(menu).display,
                currentPosition: window.getComputedStyle(menu).position,
                currentLeft: window.getComputedStyle(menu).left,
                currentRight: window.getComputedStyle(menu).right
            });
        });
    }
    
    if (hamburger && navMenu) {
        // 強制的にモバイルスタイルを適用（サンプル4,5対応）
        function applyMobileStyles() {
            if (window.innerWidth <= 768) {
                // サンプル4,5はダークテーマなので背景色を調整
                const isDarkTheme = window.location.pathname.includes('sample4') || window.location.pathname.includes('sample5');
                const backgroundColor = isDarkTheme ? 'rgba(13, 13, 13, 0.98)' : 'rgba(255, 255, 255, 0.95)';
                const textColor = isDarkTheme ? '#ffffff' : '#333333';
                
                navMenu.style.setProperty('position', 'fixed', 'important');
                navMenu.style.setProperty('right', '-100%', 'important');
                navMenu.style.setProperty('left', 'auto', 'important');
                navMenu.style.setProperty('top', '0', 'important');
                navMenu.style.setProperty('width', '80%', 'important');
                navMenu.style.setProperty('max-width', '300px', 'important');
                navMenu.style.setProperty('height', '100vh', 'important');
                navMenu.style.setProperty('background', backgroundColor, 'important');
                navMenu.style.setProperty('display', 'flex', 'important');
                navMenu.style.setProperty('flex-direction', 'column', 'important');
                navMenu.style.setProperty('align-items', 'center', 'important');
                navMenu.style.setProperty('justify-content', 'center', 'important');
                navMenu.style.setProperty('z-index', '9999', 'important');
                navMenu.style.setProperty('transition', 'right 0.3s ease', 'important');
                navMenu.style.setProperty('box-shadow', '-5px 0 15px rgba(0, 0, 0, 0.1)', 'important');
                
                // リンクの色も調整
                const links = navMenu.querySelectorAll('a');
                links.forEach(link => {
                    link.style.setProperty('color', textColor, 'important');
                });
                
                console.log('モバイルスタイル適用完了:', {
                    isDarkTheme: isDarkTheme,
                    backgroundColor: backgroundColor,
                    linksCount: links.length
                });
            }
        }
        
        // 初期状態のリセット
        function resetInitialState() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navMenu.style.setProperty('right', '-100%', 'important');
            navMenu.style.setProperty('left', 'auto', 'important');
            document.body.style.overflow = '';
            console.log('初期状態をリセット:', {
                hamburgerClasses: hamburger.className,
                navMenuClasses: navMenu.className,
                rightStyle: navMenu.style.right
            });
        }
        
        // 初期化時とリサイズ時にスタイル適用
        applyMobileStyles();
        resetInitialState(); // 初期状態を強制リセット
        window.addEventListener('resize', applyMobileStyles);
        
        // メニュー状態を管理する変数
        let isMenuOpen = false;
        
        // ハンバーガーボタンクリック時
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('ハンバーガーボタンクリック開始 - 現在の状態:', isMenuOpen);
            
            // トグル操作
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // メニューを開く
                hamburger.classList.add('active');
                navMenu.classList.add('active');
                
                // 画面右端にぴったり合わせる
                navMenu.style.setProperty('right', '0', 'important');
                navMenu.style.setProperty('left', 'auto', 'important');
                navMenu.style.setProperty('display', 'flex', 'important');
                navMenu.style.setProperty('z-index', '9999', 'important');
                
                // サンプル4,5のダークテーマ対応
                const isDarkTheme = window.location.pathname.includes('sample4') || window.location.pathname.includes('sample5');
                const backgroundColor = isDarkTheme ? 'rgba(13, 13, 13, 0.98)' : 'rgba(255, 255, 255, 0.95)';
                navMenu.style.setProperty('background', backgroundColor, 'important');
                
                document.body.style.overflow = 'hidden';
                console.log('メニューを開く - 画面右端にぴったり表示');
            } else {
                // メニューを閉じる
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navMenu.style.setProperty('right', '-100%', 'important');
                navMenu.style.setProperty('left', 'auto', 'important');
                document.body.style.overflow = '';
                console.log('メニューを閉じる');
            }
            
            // アクセシビリティ対応
            hamburger.setAttribute('aria-expanded', isMenuOpen);
            
            console.log('クリック後の最終状態:', {
                isMenuOpen: isMenuOpen,
                navMenuClasses: navMenu.className,
                rightStyle: navMenu.style.right,
                computedRight: window.getComputedStyle(navMenu).right,
                computedDisplay: window.getComputedStyle(navMenu).display
            });
        });
        
        // メニューリンククリック時にメニューを閉じる
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('ナビリンククリック - メニューを閉じる');
                isMenuOpen = false;
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navMenu.style.setProperty('right', '-100%', 'important');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // メニュー外クリック時にメニューを閉じる
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                isMenuOpen = false;
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navMenu.style.setProperty('right', '-100%', 'important');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.log('ハンバーガーメニュー初期化失敗:', {
            hamburgerFound: !!hamburger,
            navMenuFound: !!navMenu
        });
    }
    
    // 画像の遅延読み込み
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
        });
    }
});