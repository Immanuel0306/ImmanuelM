AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 120 });

// Navbar shrink
const navbar = document.querySelector('.navbar');
document.addEventListener('scroll', () => {
    if (window.scrollY > 80) navbar.classList.add('shrink');
    else navbar.classList.remove('shrink');
});

// Dark mode
const toggle = document.getElementById('darkModeToggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.textContent = '☀️';
    toggle.setAttribute('aria-pressed', 'true');
}
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '☀️' : '🌙';
    toggle.setAttribute('aria-pressed', String(isDark));
});

// Loader
window.addEventListener("load", () => {
    document.getElementById("loader").classList.add("hidden");
});

// Project modal
const projectModal = document.getElementById('projectModal');
projectModal.addEventListener('hidden.bs.modal', () => {
    const videoFrame = projectModal.querySelector('#projectVideo');
    if (videoFrame) videoFrame.src = "";
});

projectModal.addEventListener('show.bs.modal', e => {
    const btn = e.relatedTarget;
    const title = btn.getAttribute('data-title');
    const desc = btn.getAttribute('data-desc');
    const imgs = JSON.parse(btn.getAttribute('data-imgs') || "[]");

    projectModal.querySelector('.modal-title').textContent = title;
    projectModal.querySelector('#projectModalDesc').innerHTML = desc;


    const carouselInner = projectModal.querySelector('#projectCarouselInner');
    carouselInner.innerHTML = "";

    imgs.forEach((src, index) => {
        const div = document.createElement('div');
        div.classList.add('carousel-item');
        if (index === 0) div.classList.add('active');

        const img = document.createElement('img');
        img.src = src;
        img.className = 'd-block w-100';
        img.style.objectFit = 'contain';
        img.style.maxHeight = '430px';

        div.appendChild(img);
        carouselInner.appendChild(div);
    });
    const videoWrapper = projectModal.querySelector('#projectVideoWrapper');
    const videoFrame = projectModal.querySelector('#projectVideo');

    const videoUrl = btn.getAttribute('data-video');

    if (videoUrl) {
        videoFrame.src = videoUrl;
        videoWrapper.classList.remove('d-none');
    } else {
        videoFrame.src = "";
        videoWrapper.classList.add('d-none');
    }

});

// Copy email
const emailBtn = document.getElementById("copyEmail");

emailBtn.addEventListener("click", e => {
    // Cek apakah clipboard API tersedia
    if (navigator.clipboard && window.isSecureContext) {
        e.preventDefault(); // hentikan mailto
        navigator.clipboard.writeText("immanuelmanihuruk03@gmail.com")
            .then(() => {
                emailBtn.classList.add("text-success");
                setTimeout(() => emailBtn.classList.remove("text-success"), 1200);

                // alert("Email disalin!");
            })
            .catch(() => {
                window.location.href = emailBtn.href;
            });
    }
    // kalau tidak secure → otomatis mailto jalan
});
