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