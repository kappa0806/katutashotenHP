// Professional Website JavaScript
class ProfessionalSite {
    constructor() {
        this.initVideo();
        this.init();
    }

    initVideo() {
        // 動画の自動再生を確実にする
        const heroVideo = document.getElementById('hero-video');
        if (heroVideo) {
            // ページ読み込み後に動画再生を開始
            heroVideo.addEventListener('canplay', function() {
                heroVideo.play().catch(function(error) {
                    console.log('動画の自動再生に失敗しました:', error);
                });
            });
            
            // 手動で再生を試行
            heroVideo.play().catch(function(error) {
                console.log('動画の再生に失敗しました:', error);
            });
            
            // ユーザーのクリックで再生を再試行
            document.addEventListener('click', function() {
                if (heroVideo.paused) {
                    heroVideo.play().catch(function(error) {
                        console.log('動画の再生に失敗しました:', error);
                    });
                }
            }, { once: true });
        }
    }

    init() {
        this.setupNavigation();
        this.setupGalleryFilters();
        this.setupTestimonialSlider();
        this.setupScrollEffects();
        this.setupVideoFallback();
    }

    // ナビゲーション設定
    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // ハンバーガーメニュー
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // スムーススクロール
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // 外部リンクの場合はスクロール処理をスキップ
                if (targetId.startsWith('http') || targetId.startsWith('//')) {
                    return;
                }
                
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // モバイルメニューを閉じる
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // スクロール時のナビゲーションスタイル変更
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(13, 13, 13, 0.98)';
            } else {
                navbar.style.background = 'rgba(13, 13, 13, 0.95)';
            }
        });
    }

    // ギャラリーフィルター設定
    setupGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // アクティブボタンの切り替え
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // アニメーション付きフィルタリング
                galleryItems.forEach(item => {
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.transform = 'scale(1)';
                                item.style.opacity = '1';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 200);
                });
            });
        });

        // ギャラリーアイテムのクリックイベント
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // ライトボックスを開く（実装は省略）
                console.log('Gallery item clicked:', item.querySelector('h4')?.textContent);
            });
        });
    }

    // お客様の声スライダー設定
    setupTestimonialSlider() {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        let currentTestimonial = 0;

        if (testimonialItems.length > 1) {
            setInterval(() => {
                testimonialItems[currentTestimonial].classList.remove('active');
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                testimonialItems[currentTestimonial].classList.add('active');
            }, 5000); // 5秒ごとに切り替え
        }
    }

    // スクロールエフェクト設定
    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // アニメーション対象要素を監視
        const animateElements = document.querySelectorAll('.section-header, .about-content, .product-card, .gallery-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // パララックス効果
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-bg-video');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // ビデオフォールバック設定
    setupVideoFallback() {
        const video = document.querySelector('.hero-bg-video');
        const videoContainer = document.querySelector('.video-container');

        if (video) {
            video.addEventListener('error', () => {
                // ビデオ読み込みエラー時のフォールバック
                videoContainer.style.background = `
                    linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)),
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23000000" width="1200" height="800"/><text x="600" y="400" text-anchor="middle" fill="%23666666" font-size="48">🎬</text></svg>')
                `;
                videoContainer.style.backgroundSize = 'cover';
                videoContainer.style.backgroundPosition = 'center';
            });

            // ビデオが読み込まれない場合のタイムアウト
            setTimeout(() => {
                if (video.readyState === 0) {
                    videoContainer.style.background = `
                        linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)
                    `;
                }
            }, 3000);
        }
    }
}

// DOM読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalSite();
});

// アニメーション用CSS追加
const animationStyles = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .section-header,
    .about-content,
    .product-card,
    .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .section-header.animate-in,
    .about-content.animate-in,
    .product-card.animate-in,
    .gallery-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* モバイルナビゲーション */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 80px;
            flex-direction: column;
            background-color: rgba(13, 13, 13, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            backdrop-filter: blur(10px);
            height: calc(100vh - 80px);
            padding-top: 60px;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 20px 0;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
    
    /* ギャラリーアイテムの遷移効果 */
    .gallery-item {
        transition: all 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
    }
    
    /* プロダクトカードのホバーエフェクト強化 */
    .product-card {
        position: relative;
        overflow: hidden;
    }
    
    .product-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
        transition: left 0.5s;
    }
    
    .product-card:hover::before {
        left: 100%;
    }
`;

// スタイルを追加
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);