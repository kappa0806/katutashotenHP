// Modern Instagram Feed
class ModernInstagramFeed {
    constructor(username) {
        this.username = username;
        this.init();
    }

    init() {
        this.loadPlaceholderData();
    }

    loadPlaceholderData() {
        const placeholderPosts = [
            {
                id: 1,
                caption: "Fresh catch of the day 🐟 Premium quality fish from local markets",
                tag: "#freshfish"
            },
            {
                id: 2,
                caption: "Expert preparation ✨ Skilled craftsmanship in every cut",
                tag: "#craftmanship"
            },
            {
                id: 3,
                caption: "Happy customers 😊 Your satisfaction is our priority",
                tag: "#satisfaction"
            },
            {
                id: 4,
                caption: "Seasonal selection 🦐 Best picks for this time of year",
                tag: "#seasonal"
            }
        ];

        this.renderPosts(placeholderPosts);
    }

    renderPosts(posts) {
        const container = document.getElementById('instagram-posts');
        const placeholderContainer = container.querySelector('.instagram-placeholder');
        
        if (placeholderContainer) {
            const postCards = placeholderContainer.querySelectorAll('.modern-post-card');
            
            postCards.forEach((card, index) => {
                if (posts[index]) {
                    const contentElement = card.querySelector('.modern-post-content p');
                    const tagElement = card.querySelector('.post-tag');
                    
                    if (contentElement) {
                        contentElement.textContent = posts[index].caption;
                    }
                    if (tagElement) {
                        tagElement.textContent = posts[index].tag;
                    }
                    
                    card.style.cursor = 'pointer';
                    card.addEventListener('click', () => {
                        window.open(`https://www.instagram.com/${this.username}/`, '_blank');
                    });
                }
            });
        }
    }
}

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
    const instagramFeed = new ModernInstagramFeed('katsuta2011');

    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});