const rankHierarchy = [
  "master4",
  "master3",
  "master2",
  "master1",
  "gm5",
  "gm4",
  "gm3",
  "gm2",
  "gm1",
  "epic5",
  "epic4",
  "epic3",
  "epic2",
  "epic1",
  "legend5",
  "legend4",
  "legend3",
  "legend2",
  "legend1",
  "mythic",
  "mhonor",
  "mglory",
  "mimmortal",
];

const rankPrices = {
  master4: 3000,
  master3: 3000,
  master2: 3000,
  master1: 3000,
  gm5: 4000,
  gm4: 4000,
  gm3: 4000,
  gm2: 4000,
  gm1: 4000,
  epic5: 5000,
  epic4: 5000,
  epic3: 5000,
  epic2: 5000,
  epic1: 5000,
  legend5: 7000,
  legend4: 7000,
  legend3: 7000,
  legend2: 7000,
  legend1: 7000,
  mythic: 10000,
  mhonor: 15000,
  mglory: 20000,
  mimmortal: 30000,
};

const allRanks = [
  { label: "Master 4", value: "master4" },
  { label: "Master 3", value: "master3" },
  { label: "Master 2", value: "master2" },
  { label: "Master 1", value: "master1" },
  { label: "Grand Master 5", value: "gm5" },
  { label: "Grand Master 4", value: "gm4" },
  { label: "Grand Master 3", value: "gm3" },
  { label: "Grand Master 2", value: "gm2" },
  { label: "Grand Master 1", value: "gm1" },
  { label: "Epic 5", value: "epic5" },
  { label: "Epic 4", value: "epic4" },
  { label: "Epic 3", value: "epic3" },
  { label: "Epic 2", value: "epic2" },
  { label: "Epic 1", value: "epic1" },
  { label: "Legend 5", value: "legend5" },
  { label: "Legend 4", value: "legend4" },
  { label: "Legend 3", value: "legend3" },
  { label: "Legend 2", value: "legend2" },
  { label: "Legend 1", value: "legend1" },
  { label: "Mythic Romawi", value: "mythic" },
  { label: "Mythical Honor", value: "mhonor" },
  { label: "Mythical Glory", value: "mglory" },
  { label: "Mythical Immortal", value: "mimmortal" },
];

function calculatePrice() {
  const currentRank = document.getElementById("currentRank").value;
  const targetRank = document.getElementById("targetRank").value;
  const currentStarInput = document.getElementById("currentStar");
  const targetStarInput = document.getElementById("targetStar");
  const currentError = document.getElementById("currentError");
  const targetError = document.getElementById("targetError");

  const currentStar = parseInt(currentStarInput.value.trim(), 10);
  const targetStar = parseInt(targetStarInput.value.trim(), 10);

  currentError.textContent = "";
  targetError.textContent = "";

  const [minCur, maxCur] = starLimits[currentRank] || [0, 0];
  const [minTar, maxTar] = starLimits[targetRank] || [0, 0];

  let errorFound = false;

  if (isNaN(currentStar) || currentStar < minCur || currentStar > maxCur) {
    if (
      ["mythic", "mhonor", "mglory", "mimmortal"].includes(currentRank) &&
      currentStar < minCur
    ) {
      currentError.textContent = `Minimal bintang ${getRankLabel(
        currentRank
      )} adalah ${minCur}`;
    } else {
      currentError.textContent = `Bisa diisi hanya dari rentang ${minCur} - ${maxCur}`;
    }
    errorFound = true;
  }

  if (isNaN(targetStar) || targetStar < minTar || targetStar > maxTar) {
    if (
      ["mythic", "mhonor", "mglory", "mimmortal"].includes(targetRank) &&
      targetStar < minTar
    ) {
      targetError.textContent = `Minimal bintang ${getRankLabel(
        targetRank
      )} adalah ${minTar}`;
    } else {
      targetError.textContent = `Bisa diisi hanya dari rentang ${minTar} - ${maxTar}`;
    }
    errorFound = true;
  }

  if (!currentRank || !targetRank || errorFound) {
    return;
  }

  const currentIndex = rankHierarchy.indexOf(currentRank);
  const targetIndex = rankHierarchy.indexOf(targetRank);

  if (
    targetIndex < currentIndex ||
    (targetIndex === currentIndex && targetStar <= currentStar)
  ) {
    alert(
      "Rank tujuan harus lebih tinggi dari rank sekarang, atau bintang tujuan lebih besar jika rank sama."
    );
    return;
  }

  // 🎯 Mulai hitung per bintang
  let totalPrice = 0;

  for (let i = currentIndex; i <= targetIndex; i++) {
    const rank = rankHierarchy[i];
    const [min, max] = starLimits[rank];
    const pricePerStar = rankPrices[rank];

    // ⬇️ Hitung jumlah bintang dari rank ini
    if (i === currentIndex && i === targetIndex) {
      // Sama rank → selisih bintang
      totalPrice += (targetStar - currentStar) * pricePerStar;
    } else if (i === currentIndex) {
      totalPrice += (max - currentStar + 1) * pricePerStar;
    } else if (i === targetIndex) {
      totalPrice += (targetStar - min + 1) * pricePerStar;
    } else {
      totalPrice += (max - min + 1) * pricePerStar;
    }
  }

  alert(`Estimasi harga: Rp ${totalPrice.toLocaleString("id-ID")}`);
}

// Add click animations to package cards
document.addEventListener("DOMContentLoaded", function () {
  const packageCards = document.querySelectorAll(".package-card");

  packageCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector(".package-title").textContent;
      const price = this.querySelector(".package-price").textContent;

      // Add selection effect
      packageCards.forEach((c) => c.classList.remove("selected"));
      this.classList.add("selected");

      alert(`Paket dipilih: ${title}\nHarga: ${price}`);
    });
  });

  // Add selected state CSS
  const style = document.createElement("style");
  style.textContent = `
    .package-card.selected {
    transform: scale(1.05);
        }
    `;
  document.head.appendChild(style);
});

// Handle navbar dropdown navigation
document.addEventListener("DOMContentLoaded", function () {
  // Handle dropdown item click
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const game = this.dataset.game;
      if (game === "mlbb") {
        console.log("Already on MLBB Joki page");
      } else if (game === "mcgg") {
        alert("Redirecting to MCGG Joki page...");
        // window.location.href = '/joki/mcgg';
      }
    });
  });

  // Handle toggle for price list
  const togglePriceList = document.getElementById("togglePriceList");
  const rankListContainer = document.getElementById("rankListContainer");

  if (togglePriceList && rankListContainer) {
    let isVisible = true;

    togglePriceList.addEventListener("click", () => {
      isVisible = !isVisible;
      rankListContainer.classList.toggle("hidden");
      togglePriceList.textContent = isVisible ? "LIST HARGA ▼" : "LIST HARGA ▲";
    });
  }
});

// Add hover effects to rank items
document.addEventListener("DOMContentLoaded", function () {
  const rankItems = document.querySelectorAll(".rank-item");

  rankItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.background = "rgba(255, 255, 255, 0.2)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.background = "rgba(255, 255, 255, 0.1)";
    });
  });
});

// Add floating animation to hero card
document.addEventListener("DOMContentLoaded", function () {
  const heroCard = document.querySelector(".hero-card");
  let floatDirection = 1;

  setInterval(() => {
    const currentTransform = heroCard.style.transform || "translateY(0px)";
    const currentY = parseFloat(
      currentTransform.match(/translateY\(([^)]+)px\)/) || [0, 0]
    )[1];

    if (currentY >= 10) floatDirection = -1;
    if (currentY <= -10) floatDirection = 1;

    heroCard.style.transform = `translateY(${currentY + floatDirection}px)`;
  }, 100);
  const currentRank = document.getElementById("currentRank");
  const targetRank = document.getElementById("targetRank");

  currentRank.addEventListener("change", function () {
    if (this.value === "" || this.value === "Pilih Rank Kamu Saat Ini") {
      targetRank.disabled = true;
    } else {
      targetRank.disabled = false;
    }
  });
  setupStarValidation("currentRank", "currentStar", "currentError");
  setupStarValidation("targetRank", "targetStar", "targetError");
});

const currentRank = document.getElementById("currentRank");
const targetRank = document.getElementById("targetRank");

currentRank.addEventListener("change", function () {
  const selectedRank = this.value;

  if (!selectedRank) {
    targetRank.disabled = true;
    return;
  }

  // Aktifkan dropdown tujuan
  targetRank.disabled = false;

  // Hapus semua opsi dulu
  targetRank.innerHTML = "";

  // Dapatkan index rank sekarang
  const currentIndex = rankHierarchy.indexOf(selectedRank);

  // Tambahkan opsi: RANK SETARA atau LEBIH TINGGI dari currentRank
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Pilih Rank Tujuan Kamu";
  targetRank.appendChild(defaultOption);

  allRanks.forEach((rank) => {
    const targetIndex = rankHierarchy.indexOf(rank.value);
    if (targetIndex >= currentIndex) {
      const option = document.createElement("option");
      option.value = rank.value;
      option.textContent = rank.label;
      targetRank.appendChild(option);
    }
  });
});

// Batas bintang per rank
const starLimits = {
  master4: [1, 4],
  master3: [1, 4],
  master2: [1, 4],
  master1: [1, 4],
  gm5: [1, 5],
  gm4: [1, 5],
  gm3: [1, 5],
  gm2: [1, 5],
  gm1: [1, 5],
  epic5: [1, 5],
  epic4: [1, 5],
  epic3: [1, 5],
  epic2: [1, 5],
  epic1: [1, 5],
  legend5: [1, 5],
  legend4: [1, 5],
  legend3: [1, 5],
  legend2: [1, 5],
  legend1: [1, 5],
  mythic: [1, 24],
  mhonor: [25, 49],
  mglory: [50, 99],
  mimmortal: [100, 9999],
};

function getRankLabel(value) {
  const labelMap = {
    master4: "Master",
    master3: "Master",
    master2: "Master",
    master1: "Master",
    gm5: "Grand Master",
    gm4: "Grand Master",
    gm3: "Grand Master",
    gm2: "Grand Master",
    gm1: "Grand Master",
    epic5: "Epic",
    epic4: "Epic",
    epic3: "Epic",
    epic2: "Epic",
    epic1: "Epic",
    legend5: "Legend",
    legend4: "Legend",
    legend3: "Legend",
    legend2: "Legend",
    legend1: "Legend",
    mythic: "Mythic",
    mhonor: "Mythical Honor",
    mglory: "Mythical Glory",
    mimmortal: "Mythical Immortal",
  };
  return labelMap[value] || value;
}

function setupStarValidation(rankSelectId, starInputId, errorId) {
  const rankSelect = document.getElementById(rankSelectId);
  const starInput = document.getElementById(starInputId);
  const errorText = document.getElementById(errorId);

  let timeout;

  function validateStar() {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const rank = rankSelect.value;
      const value = parseInt(starInput.value.trim(), 10);

      if (!rank || isNaN(value)) {
        errorText.textContent = "";
        return;
      }

      const [min, max] = starLimits[rank] || [0, 0];
      const resetRanks = [
        "master1",
        "master2",
        "master3",
        "master4",
        "gm1",
        "gm2",
        "gm3",
        "gm4",
        "gm5",
        "epic1",
        "epic2",
        "epic3",
        "epic4",
        "epic5",
        "legend1",
        "legend2",
        "legend3",
        "legend4",
        "legend5",
      ];

      const shouldReset = resetRanks.includes(rank);

      if (value < min || value > max) {
        errorText.textContent = `Rank ${getRankLabel(
          rank
        )} hanya memiliki range ${min} - ${max}`;

        if (shouldReset) {
          starInput.value = 0;
        }
      } else {
        errorText.textContent = "";
      }
    }, 300);
  }

  starInput.addEventListener("input", validateStar);
  rankSelect.addEventListener("change", validateStar);
}

// Toggle hamburger menu
function toggleMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navDropdown = document.querySelector(".nav-dropdown");
  hamburger.classList.toggle("active");
  navDropdown.classList.toggle("active");
}

// Close menu when clicking nav links
function handleMobileNavClick() {
  document.querySelector(".hamburger")?.classList.remove("active");
  document.querySelector(".nav-dropdown")?.classList.remove("active");
}

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const hamburger = document.querySelector(".hamburger");
  const navDropdown = document.querySelector(".nav-dropdown");

  if (!hamburger.contains(e.target) && !navDropdown.contains(e.target)) {
    hamburger.classList.remove("active");
    navDropdown.classList.remove("active");
  }
});
