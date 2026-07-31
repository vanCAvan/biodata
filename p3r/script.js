document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const mainMenuScreen = document.getElementById("mainMenuScreen");
    const contentPanels = document.querySelectorAll(".content-panel");
    const backButtons = document.querySelectorAll(".back-button");

    // 1. Efek Interaksi Hover & Memilih Menu Menggunakan Mouse/Click
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            // Hilangkan status aktif dari item menu lama
            menuItems.forEach(i => i.classList.remove("active"));

            // Atur item yang diklik menjadi aktif
            item.classList.add("active");

            // Menggeser posisi Menu Utama agar memberi ruang untuk panel info
            mainMenuScreen.classList.add("shifted");

            // Ambil ID panel target dari atribut 'data-target'
            const targetPanelId = item.getAttribute("data-target");

            // Sembunyikan panel lama dan munculkan panel baru
            contentPanels.forEach(panel => {
                panel.classList.remove("active");
                if (panel.id === targetPanelId) {
                    panel.classList.add("active");
                }
            });
        });
    });

    // 2. Logika untuk Tombol Kembali (Close Menu)
    backButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Sembunyikan seluruh panel konten yang sedang terbuka
            contentPanels.forEach(panel => panel.classList.remove("active"));

            // Kembalikan posisi Menu Utama ke tengah asal
            mainMenuScreen.classList.remove("shifted");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("p3rVideo");

    if (video) {
        // Force video untuk selalu mulai dari detik 0 saat halaman di-load / di-refresh
        video.currentTime = 0;

        // Aktifkan loop agar saat didiamkan, animasinya terus berjalan seamless tanpa mati
        video.loop = true;

        // Jalankan video
        video.play().catch(error => {
            console.log("Autoplay diblokir browser, mematikan suara agar lancar:", error);
            video.muted = true;
            video.play();
        });
    }
});

// ==========================================
// LOGIKA PIRINGAN HITAM & AUDIO PLAYER
// ==========================================
const bgMusic = document.getElementById("bgMusic");
const audioToggleBtn = document.getElementById("audioToggleBtn");
const playIcon = document.getElementById("playIcon");
const vinylDisc = document.getElementById("vinylDisc");
const tonearm = document.getElementById("tonearm");
const songBanner = document.getElementById("songBanner"); // Deklarasi di luar agar dibaca Play & Pause

if (bgMusic && audioToggleBtn) {
    audioToggleBtn.addEventListener("click", () => {
        if (bgMusic.paused) {
            // === KONDISI PLAY ===
            bgMusic.play().then(() => {
                vinylDisc.classList.add("playing");
                tonearm.classList.add("playing");
                if (songBanner) songBanner.classList.add("show"); // MUNCULKAN BANNER
                playIcon.textContent = "❚❚";
                playIcon.style.marginLeft = "0px";
            }).catch(error => {
                console.error("Audio gagal diputar, cek nama file mp3 kamu:", error);
            });
        } else {
            // === KONDISI PAUSE ===
            bgMusic.pause();
            vinylDisc.classList.remove("playing");
            tonearm.classList.remove("playing");
            if (songBanner) songBanner.classList.remove("show"); // SEMBUNYIKAN BANNER
            playIcon.textContent = "▶";
            playIcon.style.marginLeft = "2px";
        }
    });
}