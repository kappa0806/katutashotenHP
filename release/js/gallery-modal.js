// ギャラリー画像モーダル機能
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const galleryImages = document.querySelectorAll('.gallery-image img');

    // 各ギャラリー画像にクリックイベントを追加
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImage.src = this.src;
            modalImage.alt = this.alt || '拡大画像';
            
            // body のスクロールを無効化
            document.body.style.overflow = 'hidden';
        });
    });

    // 閉じるボタンのクリック
    modalClose.addEventListener('click', function() {
        closeModal();
    });

    // モーダル背景をクリックして閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // モーダルを閉じる関数
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});