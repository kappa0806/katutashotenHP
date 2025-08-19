// Ocean Instagram Feed
class OceanInstagramFeed {
    constructor(username) {
        this.username = username;
        this.init();
    }

    init() {
        this.loadPlaceholderData();
        this.initSeasonalTabs();
    }

    loadPlaceholderData() {
        const oceanPosts = [
            {
                id: 1,
                caption: "今朝の水揚げ 🐟 新鮮な魚たちが到着しました",
                emoji: "🌊"
            },
            {
                id: 2,
                caption: "職人技の包丁さばき ✨ 一匹一匹丁寧に",
                emoji: "⚡"
            },
            {
                id: 3,
                caption: "お客様の笑顔 😊 今日も素敵な出会いに感謝",
                emoji: "💙"
            },
            {
                id: 4,
                caption: "季節の贈り物 🦐 今しか味わえない旬の味",
                emoji: "🦐"
            }
        ];

        this.renderPosts(oceanPosts);
    }

    renderPosts(posts) {
        const container = document.getElementById('instagram-posts');
        const placeholderContainer = container.querySelector('.instagram-placeholder');
        
        if (placeholderContainer) {
            const postCards = placeholderContainer.querySelectorAll('.ocean-post-card');
            
            postCards.forEach((card, index) => {
                if (posts[index]) {
                    const overlayElement = card.querySelector('.ocean-post-overlay p');
                    const waveElement = card.querySelector('.wave-animation');
                    
                    if (overlayElement) {
                        overlayElement.textContent = posts[index].caption;
                    }
                    if (waveElement) {
                        waveElement.textContent = posts[index].emoji;
                    }
                    
                    card.style.cursor = 'pointer';
                    
                    // Add click animation
                    card.addEventListener('click', () => {
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.transform = '';
                            window.open(`https://www.instagram.com/${this.username}/`, '_blank');
                        }, 150);
                    });

                    // Add ripple effect on click
                    card.addEventListener('click', this.createRipple);
                }
            });
        }
    }

    createRipple(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(card.offsetWidth, card.offsetHeight);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initSeasonalTabs() {
        const tabs = document.querySelectorAll('.tab');
        const seasonalData = {
            '春': [
                { emoji: '🐟', name: 'サヨリ', desc: '上品な味わい' },
                { emoji: '🦑', name: 'ホタルイカ', desc: '富山湾の宝石' },
                { emoji: '🐡', name: 'メバル', desc: '煮付けが絶品' },
                { emoji: '🦐', name: '桜エビ', desc: '駿河湾の春' }
            ],
            '夏': [
                { emoji: '🐟', name: 'アジ', desc: 'さっぱりとした味' },
                { emoji: '🦑', name: 'イカ', desc: '新鮮な甘み' },
                { emoji: '🐚', name: 'ハマグリ', desc: '潮の香り' },
                { emoji: '🦐', name: 'エビ', desc: 'プリプリ食感' }
            ],
            '秋': [
                { emoji: '🐟', name: 'サンマ', desc: '脂がのった旬' },
                { emoji: '🦑', name: 'イクラ', desc: 'プチプチ食感' },
                { emoji: '🐡', name: 'カツオ', desc: '戻りカツオ' },
                { emoji: '🦐', name: 'カニ', desc: '甘い身' }
            ],
            '冬': [
                { emoji: '🐟', name: 'ブリ', desc: '寒ブリの脂' },
                { emoji: '🦑', name: 'カキ', desc: '海のミルク' },
                { emoji: '🐡', name: 'フグ', desc: '冬の王様' },
                { emoji: '🦐', name: 'ズワイガニ', desc: '冬の味覚' }
            ]
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Update seasonal content
                const season = tab.textContent;
                const seasonItems = document.querySelectorAll('.season-item');
                const data = seasonalData[season] || seasonalData['春'];
                
                seasonItems.forEach((item, index) => {
                    if (data[index]) {
                        item.querySelector('.fish-emoji').textContent = data[index].emoji;
                        item.querySelector('h4').textContent = data[index].name;
                        item.querySelector('p').textContent = data[index].desc;
                    }
                });
            });
        });
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Instagram feed initialization
    const instagramFeed = new OceanInstagramFeed('katsuta2011');
});