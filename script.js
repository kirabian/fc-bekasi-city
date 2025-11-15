document.addEventListener("DOMContentLoaded", function() {

    // 1. EFEK NAVBAR SAAT SCROLL (Ini sudah benar)
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // 2. COUNTDOWN TIMER (Ini sudah benar)
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const nextMatchDate = new Date("Nov 18, 2025 19:00:00").getTime();
        const interval = setInterval(function() {
            const now = new Date().getTime();
            const distance = nextMatchDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                ${days} <small>HARI</small> 
                ${hours} <small>JAM</small> 
                ${minutes} <small>MENIT</small> 
                ${seconds} <small>DETIK</small>
            `;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "PERTANDINGAN SEDANG BERLANGSUNG";
            }
        }, 1000);
    }

    // ===================================================================
    // 3. LOGIKA BARU: SKUAD (4 PEMAIN, LALU LIHAT SEMUA)
    // ===================================================================

    const players = [
        { name: "Bima Koto", number: 26, position: "GoalKeeper", photo: "assets/gk/bima-koto.png" },
        { name: "Abdul Rohim", number: 33, position: "GoalKeeper", photo: "assets/gk/a-rohim.png" },
        { name: "Ikram Al Giffari", number: 34, position: "GoalKeeper", photo: "assets/gk/ikram.png" },
        { name: "Zahid Amel", number: 20, position: "GoalKeeper", photo: "assets/gk/m-zahid.png" },
        { name: "Renan Silva", number: 7, position: "Gelandang", photo: "assets/gk/renan-silva.png" },
        { name: "Fikri Firdaus", number: 25, position: "Gelandang Tengah", photo: "assets/gk/fikri.png" },
        { name: "Ezechiel Ndouasel", number: 10, position: "Gelandang", photo: "assets/gk/ezechiel.png" },
        { name: "Derry Firdaus", number: 69, position: "Bek Kiri", photo: "assets/gk/derry.png" },
        { name: "Fachri Alhayani", number: 72, position: "Gelandang Bertahan", photo: "assets/gk/fachry.png" },
        { name: "Farhan Fadillah", number: 13, position: "Depan-Tengah", photo: "assets/gk/fadilah.png" },
        { name: "Muhammad Fadly", number: 12, position: "Sayap Kanan", photo: "assets/gk/fadly.png" },
        { name: "Fauzan Hanif", number: 15, position: "Gelandang Tengah", photo: "assets/gk/fauzan.png" },
        { name: "Hamka Hamza", number: 17, position: "sayap Kanan", photo: "assets/gk/hamka.png" },
        { name: "Muhammad Hamzaly", number: 55, position: "Bek Tengah", photo: "assets/gk/hamzaly.png" },
        { name: "Indra Feri", number: 28, position: "Gelandang Tengah", photo: "assets/gk/indra.png" },
        { name: "Mikhail Kalugin", number: 3, position: "Bek Tengah", photo: "assets/gk/kalugin.png" },
        { name: "Ramadhan", number: 90, position: "Depan-Tengah", photo: "assets/gk/madon.png" },
        { name: "Mirza Zakaria", number: 8, position: "Gelandang Tengah", photo: "assets/gk/mirza.png" },
        { name: "Nanda Maulana", number: 40, position: "Gelandang Bertahan", photo: "assets/gk/nanda.png" },
        { name: "Oky Kharisma", number: 30, position: "Bek Kiri", photo: "assets/gk/oky.png" },
        { name: "Tegar Pangestu", number: 6, position: "Gelandang Bertahan", photo: "assets/gk/pangestu.png" },
        { name: "Putra Qadafi", number: 16, position: "Gelandang Bertahan", photo: "assets/gk/putra.png" },
        { name: "Ragil Dimas", number: 23, position: "Bek tengah", photo: "assets/gk/ragil.png" },
        { name: "Rifael Salmon", number: 99, position: "Depan-Tengah", photo: "assets/gk/rifael.png" },
        { name: "Rizky Nasution", number: 27, position: "Gelandang Bertahan", photo: "assets/gk/rizki.png" },
        { name: "Rony Sugeng", number: 11, position: "Gelandang Serang", photo: "assets/gk/roni.png" },
        { name: "Saldi", number: 18, position: "Sayap Kiri", photo: "assets/gk/saldi.png" },
        { name: "Farhan Saviola", number: 77, position: "Gelandang Serang", photo: "assets/gk/saviola.png" },
        { name: "Sunni Hizbullah", number: 5, position: "Bek Tengah", photo: "assets/gk/sunni.png" },
        { name: "Muhammad Syukron", number: 29, position: "Bek Tengah", photo: "assets/gk/syukron.png" },
        { name: "Riki Togubu", number: 14, position: "Gelandang Bertahan", photo: "assets/gk/togobu.png" },
        { name: "Dias Angga", number: 22, position: "Bek Kanan", photo: "assets/gk/dias-angga.png" },
    ];

    // Definisikan IntersectionObserver untuk animasi scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi
            }
        });
    }, {
        threshold: 0.1 // Muncul saat 10% elemen terlihat
    });

    // Fungsi untuk membuat HTML kartu pemain
    function createPlayerCard(player) {
        // Kita tambahkan class 'animate-on-scroll' di sini
        return `
            <div class="col-lg-3 col-md-6 col-6 mb-4 animate-on-scroll">
                <div class="card player-card text-center">
                    <img src="${player.photo}" class="player-img" alt="${player.name}">
                    <div class="card-body">
                        <h5 class="player-number">${player.number}</h5>
                        <h4 class="player-name">${player.name}</h4>
                        <p class="player-position">${player.position}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Fungsi untuk setup skuad
    function setupSquad() {
        const initialSquadContainer = document.getElementById("initial-squad-list");
        const fullSquadContainer = document.getElementById("full-squad-list");
        const showSquadBtn = document.getElementById("show-all-squad-btn");
        const squadBtnContainer = document.getElementById("squad-btn-container");
        
        if (!initialSquadContainer || !fullSquadContainer || !showSquadBtn || !squadBtnContainer) {
            // Jika salah satu elemen tidak ada, hentikan fungsi
            return;
        }

        let initialHtml = '';
        let fullHtml = '';

        // Loop untuk membagi pemain
        players.forEach((player, index) => {
            const cardHtml = createPlayerCard(player);
            if (index < 4) {
                // 4 pemain pertama
                initialHtml += cardHtml;
            } else {
                // Sisa pemain
                fullHtml += cardHtml;
            }
        });

        // Masukkan HTML ke container
        initialSquadContainer.innerHTML = initialHtml;
        fullSquadContainer.innerHTML = fullHtml;

        // Tambahkan event listener ke tombol
        showSquadBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah link '#' melompat ke atas
            
            // Tampilkan sisa skuad dengan class 'show' untuk animasi
            fullSquadContainer.classList.add('show');

            // Sembunyikan tombol
            squadBtnContainer.style.display = 'none';

            // Amati elemen-elemen baru yang baru saja ditampilkan
            const newAnimatedElements = fullSquadContainer.querySelectorAll(".animate-on-scroll");
            newAnimatedElements.forEach(el => observer.observe(el));
        });
    }

    // Panggil fungsi setup skuad
    setupSquad();

    // ===================================================================
    // 4. ANIMASI SAAT SCROLL (SCROLL REVEAL)
    // ===================================================================
    
    // Ambil SEMUA elemen animasi yang ada di DOM saat ini
    const allAnimatedElements = document.querySelectorAll(".animate-on-scroll");

    // Loop dan amati HANYA yang TIDAK ada di dalam container tersembunyi
    allAnimatedElements.forEach(el => {
        if (!el.closest('.hidden-squad')) {
            observer.observe(el);
        }
    });

});