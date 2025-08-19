// Instagram Feed機能
class InstagramFeed {
    constructor(username) {
        this.username = username;
        this.apiUrl = 'https://www.instagram.com/';
        this.init();
    }

    init() {
        // 実際のAPIを使用する場合は、Instagram Basic Display APIを使用
        // 現在はプレースホルダーデータを表示
        this.loadPlaceholderData();
    }

    loadPlaceholderData() {
        const placeholderPosts = [
            {
                id: 1,
                caption: "本日入荷の新鮮なマグロ🐟 脂がのって最高の状態です！",
                image: "placeholder1.jpg",
                permalink: `${this.apiUrl}${this.username}/`
            },
            {
                id: 2,
                caption: "職人の技で丁寧に三枚おろし✨ お客様のご要望にお応えします",
                image: "placeholder2.jpg", 
                permalink: `${this.apiUrl}${this.username}/`
            },
            {
                id: 3,
                caption: "お客様の笑顔が一番です😊 今日もありがとうございました",
                image: "placeholder3.jpg",
                permalink: `${this.apiUrl}${this.username}/`
            },
            {
                id: 4,
                caption: "季節の特選魚介類🦐 今が旬の美味しさをお届け",
                image: "placeholder4.jpg",
                permalink: `${this.apiUrl}${this.username}/`
            }
        ];

        this.renderPosts(placeholderPosts);
    }

    renderPosts(posts) {
        const container = document.getElementById('instagram-posts');
        const placeholderContainer = container.querySelector('.instagram-placeholder');
        
        if (placeholderContainer && posts.length > 0) {
            // プレースホルダーのテキストを更新
            const placeholderItems = placeholderContainer.querySelectorAll('.placeholder-item');
            
            placeholderItems.forEach((item, index) => {
                if (posts[index]) {
                    const textElement = item.querySelector('.placeholder-text');
                    if (textElement) {
                        textElement.textContent = posts[index].caption;
                    }
                    
                    // クリックイベントを追加
                    item.style.cursor = 'pointer';
                    item.addEventListener('click', () => {
                        window.open(posts[index].permalink, '_blank');
                    });
                }
            });
        }
    }

    // 実際のInstagram Basic Display APIを使用する場合の実装例
    async loadInstagramPosts(accessToken) {
        try {
            const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`);
            const data = await response.json();
            
            if (data.data) {
                this.renderRealPosts(data.data.slice(0, 4)); // 最新4件を表示
            }
        } catch (error) {
            console.error('Instagram API error:', error);
            // エラーの場合はプレースホルダーを表示
            this.loadPlaceholderData();
        }
    }

    renderRealPosts(posts) {
        const container = document.getElementById('instagram-posts');
        
        // プレースホルダーを削除
        container.innerHTML = '';
        
        // 実際の投稿を表示
        const postsGrid = document.createElement('div');
        postsGrid.className = 'instagram-real-posts';
        postsGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        `;
        
        posts.forEach(post => {
            if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
                const postElement = document.createElement('div');
                postElement.className = 'instagram-post';
                postElement.style.cssText = `
                    background-color: #f8f9fa;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                `;
                
                postElement.innerHTML = `
                    <img src="${post.media_url}" alt="Instagram post" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 20px;">
                        <p style="font-size: 16px; color: #555; text-align: center; line-height: 1.5;">
                            ${post.caption ? post.caption.substring(0, 80) + '...' : ''}
                        </p>
                    </div>
                `;
                
                postElement.addEventListener('click', () => {
                    window.open(post.permalink, '_blank');
                });
                
                postElement.addEventListener('mouseenter', () => {
                    postElement.style.transform = 'translateY(-5px)';
                    postElement.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                });
                
                postElement.addEventListener('mouseleave', () => {
                    postElement.style.transform = 'translateY(0)';
                    postElement.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                });
                
                postsGrid.appendChild(postElement);
            }
        });
        
        container.appendChild(postsGrid);
    }
}

// Instagram機能の初期化
document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロール
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

    // Instagram フィードの初期化
    const instagramFeed = new InstagramFeed('katsuta2011');
    
    // 実際のAPIを使用する場合は、アクセストークンを設定してください
    // const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
    // instagramFeed.loadInstagramPosts(accessToken);
});