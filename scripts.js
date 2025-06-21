let selectedProduct = null;
let currentTab = 'all';

function switchTab(tab) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Show/hide product sections
    const specialProducts = document.getElementById('special-products');
    const diamondProducts = document.getElementById('diamond-products');
    
    if (tab === 'special') {
        specialProducts.style.display = 'grid';
        diamondProducts.style.display = 'none';
    } else if (tab === 'diamond') {
        specialProducts.style.display = 'none';
        diamondProducts.style.display = 'grid';
    } else {
        specialProducts.style.display = 'grid';
        diamondProducts.style.display = 'grid';
    }
    
    currentTab = tab;
}

function selectProduct(element) {
    // Remove selected class from all products
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked product
    element.classList.add('selected');
    selectedProduct = element;
    
    // Add animation effect
    element.style.transform = 'scale(1.05)';
    setTimeout(() => {
        element.style.transform = '';
    }, 200);
    
    // Update order summary (you can implement this)
    updateOrderSummary();
}

function updateOrderSummary() {
    const summary = document.getElementById('order-summary-content');
    const paymentSection = document.getElementById('payment-section');
    const paymentPrices = document.querySelectorAll('.payment-price-display');

    if (selectedProduct && summary) {
        const productName = selectedProduct.querySelector('.product-name').textContent;
        const productPrice = selectedProduct.querySelector('.product-price').textContent;

        summary.innerHTML = `
            <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${productName}</div>
            <div style="color: #ffd700; font-size: 18px;">${productPrice}</div>
        `;

        // Enable pembayaran & update harga
        paymentSection.classList.remove("disabled");
        paymentPrices.forEach(price => {
            price.textContent = productPrice;
        });
    } else {
        summary.innerHTML = `Belum ada item produk yang dipilih.`;

        // Disable metode pembayaran
        paymentSection.classList.add("disabled");
        paymentPrices.forEach(price => {
            price.textContent = "Rp -";
        });
    }
}

function submitOrder() {
    if (!selectedProduct) {
        alert("Silakan pilih item terlebih dahulu!");
        return;
    }

    alert("Pesanan kamu berhasil ditambahkan!");
    // Di sini bisa arahkan ke halaman pembayaran atau lanjut step berikutnya.
}


function applyPromo() {
    const promoCode = event.target.parentElement.querySelector('input').value;
    if (promoCode) {
        alert('Kode promo "' + promoCode + '" telah diaplikasikan!');
        // Add promo logic here
    } else {
        alert('Masukkan kode promo terlebih dahulu!');
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
    });
});

// Add floating animation to character card
setInterval(() => {
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(element => {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'float 3s ease-in-out infinite';
        }, 10);
    });
}, 3000);

// Form validation
function validateForm() {
    const userId = document.getElementById('userId').value;
    const server = document.getElementById('server').value;
    
    if (!userId || !server) {
        alert('Mohon lengkapi ID Pengguna dan Server!');
        return false;
    }
    
    if (!selectedProduct) {
        alert('Mohon pilih produk terlebih dahulu!');
        return false;
    }
    
    return true;
}

// Add some particle effects
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#00bcd4';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 2000);

// Hamburger menu functionality
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navDropdown = document.querySelector('.nav-dropdown');

    hamburger.classList.toggle('active');
    navDropdown.classList.toggle('active');
}

// Close mobile menu when clicking on a nav link
function handleMobileNavClick() {
    document.querySelector('.hamburger')?.classList.remove('active');
    document.querySelector('.nav-dropdown')?.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-topup');
    const stepsList = document.getElementById('topup-steps');
    const icon = document.getElementById('toggle-icon');
    let isExpanded = false;

    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        if (isExpanded) {
            stepsList.style.maxHeight = stepsList.scrollHeight + "px";
            icon.textContent = "▲";
        } else {
            stepsList.style.maxHeight = "0";
            icon.textContent = "▼";
        }
        switchTab('all')
    });
    const quantityInput = document.getElementById('quantity-input');
    const plusButton = document.getElementById('btn-plus');
    const minusButton = document.getElementById('btn-minus');

    plusButton.addEventListener('click', () => {
        let current = parseInt(quantityInput.value) || 1;
        quantityInput.value = current + 1;
    });

    minusButton.addEventListener('click', () => {
        let current = parseInt(quantityInput.value) || 1;
        if (current > 1) {
        quantityInput.value = current - 1;
        }
    });
    const promoInput = document.getElementById('promo-code-input');
    const promoBtn = document.getElementById('apply-promo-btn');

    promoBtn.addEventListener('click', function () {
    const kode = promoInput.value.trim().toUpperCase(); // biar gak case sensitive

    if (kode === "DM-MURAH") {
      alert("Kode promo berhasil diterapkan!");
      // Optional: bisa tambahkan logika diskon di sini
    } else {
      alert("Kode Promo Salah, coba lagi");
    }
  });
  document.getElementById('payment-section').classList.add('disabled');
});

const paymentLogos = {
  qris: [
    { name: "QRIS All Payment", logo: "qris.png" }
  ],
  ewallet: [
    { name: "DANA", logo: "dana.png" },
    { name: "ShopeePay", logo: "shopeepay.png" },
    { name: "GoPay", logo: "gopay.png" },
    { name: "OVO", logo: "ovo.png" }
  ],
  va: [
    { name: "BCA", logo: "bca.png" },
    { name: "Mandiri", logo: "mandiri.png" },
    { name: "BNI", logo: "bni.png" }
  ],
  minimarket: [
    { name: "Alfamart", logo: "alfamart.png" },
    { name: "Indomaret", logo: "indomaret.png" }
  ],
  pulsa: [
    { name: "Telkomsel", logo: "telkomsel.png" },
    { name: "Tri", logo: "tri.png" },
    { name: "Indosat", logo: "indosat.png" },
    { name: "XL", logo: "xl.png" }
  ]
};

document.getElementById("paymentCategory").addEventListener("change", function () {
  const category = this.value;
  const container = document.getElementById("paymentOptions");
  container.innerHTML = "";

  if (paymentLogos[category]) {
    paymentLogos[category].forEach((item) => {
      const card = document.createElement("div");
      card.className = "payment-option-card";
      card.innerHTML = `
        <img src="assets/payments/${item.logo}" alt="${item.name}" />
        <div>${item.name}</div>
      `;
      container.appendChild(card);
    });
  }
});

function toggleMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navDropdown = document.querySelector('.nav-dropdown');
  hamburger.classList.toggle('active');
  navDropdown.classList.toggle('active');
}

function handleMobileNavClick() {
  document.querySelector('.hamburger')?.classList.remove('active');
  document.querySelector('.nav-dropdown')?.classList.remove('active');
}

document.addEventListener('click', function(e) {
  const hamburger = document.querySelector('.hamburger');
  const navDropdown = document.querySelector('.nav-dropdown');

  if (!hamburger.contains(e.target) && !navDropdown.contains(e.target)) {
    hamburger.classList.remove('active');
    navDropdown.classList.remove('active');
  }
});


function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const isActive = header.classList.contains('active');

  // Tutup semua accordion
  document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
  document.querySelectorAll('.accordion-content').forEach(c => {
    c.classList.remove('open');
    c.style.maxHeight = null;
  });

  // Jika belum aktif, buka
  if (!isActive) {
    header.classList.add('active');
    content.classList.add('open');
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

