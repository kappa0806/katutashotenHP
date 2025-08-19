// メインJavaScript
document.addEventListener('DOMContentLoaded', function() {
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
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ヘッダーのスクロール効果
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
    });
    
    // ハンバーガーメニューの制御
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // ナビリンクをクリックした時にメニューを閉じる
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // お客様の声スライダー
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showNextTestimonial() {
        if (testimonials.length > 1) {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }
    }
    
    // 5秒ごとに証言を切り替え
    if (testimonials.length > 1) {
        setInterval(showNextTestimonial, 5000);
    }
    
    // スクロールアニメーション（Intersection Observer）
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素にオブザーバーを適用
    document.querySelectorAll('.feature-item, .gallery-item, .contact-item, .testimonial').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
    
    // ギャラリーアイテムのホバー効果強化
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // パララックス効果（軽量版）
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ページ読み込み時のフェードイン効果
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    });
    
    // セクションタイトルのアニメーション
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 0.8s ease-out';
        observer.observe(title);
    });
    
    // フォーム要素がある場合のバリデーション（将来的な拡張用）
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // ここにフォームバリデーションロジックを追加
            console.log('フォームが送信されました');
        });
    });
});