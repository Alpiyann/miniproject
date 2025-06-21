        // Toggle hamburger menu
        function toggleMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navDropdown = document.querySelector('.nav-dropdown');
            hamburger.classList.toggle('active');
            navDropdown.classList.toggle('active');
        }

        // Close menu when clicking nav links
        function handleMobileNavClick() {
            document.querySelector('.hamburger')?.classList.remove('active');
            document.querySelector('.nav-dropdown')?.classList.remove('active');
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const hamburger = document.querySelector('.hamburger');
            const navDropdown = document.querySelector('.nav-dropdown');
            
            if (!hamburger.contains(e.target) && !navDropdown.contains(e.target)) {
                hamburger.classList.remove('active');
                navDropdown.classList.remove('active');
            }
        });

        // Slider functionality
        document.addEventListener('DOMContentLoaded', () => {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');

            let currentIndex = 0;
            const totalSlides = slides.length;

            function updateSlidePosition() {
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlidePosition();
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlidePosition();
            });

            // Auto slide every 5 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlidePosition();
            }, 5000);
        });

        // Service cards and buttons functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Service cards click functionality
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform = 'translateY(-8px)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-5px)';
                    }, 200);
                });
            });

            // Order buttons functionality
            const orderBtns = document.querySelectorAll('.order-btn');
            orderBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.textContent === 'Lihat Semua') {
                        alert('Menampilkan semua akun yang tersedia...');
                    } else {
                        alert('Mengarahkan ke halaman pemesanan...');
                    }
                });
            });

            // Account cards click functionality
            const accountCards = document.querySelectorAll('.account-card');
            accountCards.forEach(card => {
                card.addEventListener('click', function() {
                    const accountName = this.querySelector('h4').textContent;
                    const price = this.querySelector('.account-price').textContent;
                    alert(`Tertarik dengan akun: ${accountName}\nHarga: ${price}\n\nSilakan hubungi customer service untuk pembelian.`);
                });
            });
        });