// ========================================
// FADQUL STUDENT IT
// script.js - Interaksi website portofolio
// ========================================

(function () {
    'use strict';


    // ========================================
    // HELPER
    // ========================================

    const $ = (selector, root) => (root || document).querySelector(selector);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function esc(text) {
        const div = document.createElement('div');

        div.textContent = text;

        return div.innerHTML;
    }

    function svgIcon(id, cls, size) {
        return `<svg class="${cls || 'ic'}" width="${size}" height="${size}" aria-hidden="true"><use href="#${id}"/></svg>`;
    }


    // ========================================
    // INTRO (AIR NAIK, LALU MUNCUL NAMA)
    // ========================================

    const intro = $('#intro');
    const page = document.documentElement;

    let introDone = false;

    function endIntro() {
        if (introDone) {
            return;
        }

        introDone = true;

        intro.classList.add('leave');

        setTimeout(() => {
            intro.remove();
            page.classList.add('ready');
            window.scrollTo(0, 0);
        }, 700);
    }

    function startProgress() {
        const label = $('#introPct');
        const duration = 1600;
        const begin = performance.now();

        function step(now) {
            const p = Math.min((now - begin) / duration, 1);
            const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            const percent = Math.round(eased * 100);

            intro.style.setProperty('--p', percent + '%');
            label.textContent = 'Memuat... ' + percent + '%';

            if (p < 1) {
                requestAnimationFrame(step);
            } else {
                setTimeout(endIntro, 200);
            }
        }

        requestAnimationFrame(step);
    }

    if (reduceMotion) {
        // Tanpa animasi: langsung tampilkan halaman
        intro.remove();
        page.classList.add('ready');
    } else {
        // 0 s     : air mulai naik
        // 0.8 s   : nama + loading bar muncul, bar terisi 0% -> 100%
        // selesai : layar intro bergeser ke atas
        setTimeout(() => {
            intro.classList.add('show');
            startProgress();
        }, 800);

        // Ketuk / klik untuk melewati intro
        intro.addEventListener('click', endIntro);
    }

    // Pengaman: halaman tidak pernah terkunci
    setTimeout(() => page.classList.add('ready'), 9000);


    // ========================================
    // DATA (EDIT DI SINI)
    // ========================================

    // Format: [ikon, label, isi]
    const ABOUT = [
        ['f-user', 'Nama', 'Fadqul Khoirul Mahmudin'],
        ['f-pin', 'Domisili', 'Indonesia'],
        ['f-cap', 'Pendidikan', 'SMP/SEDERAJAT'],
        ['f-heart', 'Minat', 'Web Development, UI/UX Design, Teknologi Informasi'],
        ['f-target', 'Tujuan', 'Mengembangkan keterampilan dan membangun produk digital yang bermanfaat']
    ];

    // Format: [ikon, teks]
    const FACTS = [
        ['b-code', 'Tertarik pada pengembangan web'],
        ['b-pen', 'Mendalami desain UI/UX'],
        ['b-chip', 'Tertarik pada prompt engineering'],
        ['b-bulb', 'Selalu ingin belajar hal baru']
    ];

    // level: teks kecil di bawah nama skill (ganti sesuai kemampuanmu)
    // contoh isi: "Dasar", "Menengah", "Mahir", atau kosongkan
    const SKILLS = [
        { name: 'HTML', icon: 'k-html', level: 'Dasar - Mahir' },
        { name: 'CSS', icon: 'k-css', level: 'Dasar - Mahir' },
        { name: 'JavaScript', icon: 'k-js', level: 'Dasar - Mahir' },
        { name: 'React', icon: 'k-react', level: 'Dasar - Mahir' },
        { name: 'Firebase', icon: 'k-firebase', level: 'Dasar - Mahir' },
        { name: 'UI/UX', icon: 'k-figma', level: 'Dasar - Mahir' },
        { name: 'Git', icon: 'k-git', level: 'Dasar - Mahir' },
        { name: 'Tailwind CSS', icon: 'k-tailwind', level: 'Dasar - Mahir' }
    ];

    // demo / source: isi dengan URL asli
    // kosong = tombol nonaktif
    // thumb: file gambar di folder assets/
    const PROJECTS = [
        {
            name: 'RenXChat',
            desc: 'Aplikasi chat modern dengan fitur real-time dan tampilan yang sederhana.',
            tech: ['Firebase', 'JavaScript', 'CSS'],
            thumb: 'assets/thumb-1.svg',
            demo: '',
            source: ''
        },
        {
            name: 'Website Portofolio',
            desc: 'Website portofolio pribadi untuk menampilkan informasi dan proyek saya.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            thumb: 'assets/thumb-2.svg',
            demo: '',
            source: ''
        },
        {
            name: 'Task Manager',
            desc: 'Aplikasi sederhana untuk mengelola tugas harian.',
            tech: ['JavaScript', 'CSS', 'Local Storage'],
            thumb: 'assets/thumb-3.svg',
            demo: '',
            source: ''
        }
    ];

    // Kosong = ditampilkan redup / "belum diisi"
    const CONTACT = {
        email: '',
        location: 'Indonesia',
        social: {
            github: '',
            instagram: '',
            youtube: '',
            linkedin: ''
        }
    };

    // Format: [kunci, ikon, nama]
    const SOCIAL_LIST = [
        ['github', 'b-github', 'GitHub'],
        ['instagram', 'i-instagram', 'Instagram'],
        ['youtube', 'b-youtube', 'YouTube'],
        ['linkedin', 'b-linkedin', 'LinkedIn']
    ];


    // ========================================
    // RENDER KONTEN
    // ========================================

    function renderAbout() {
        $('#aboutInfo').innerHTML = ABOUT.map((row) => `
            <li>
                ${svgIcon(row[0], 'fl', 18)}
                <b>${esc(row[1])}</b>
                <span>: ${esc(row[2])}</span>
            </li>
        `).join('');

        $('#factList').innerHTML = FACTS.map((fact) => `
            <li>
                ${svgIcon(fact[0], 'fl', 24)}
                <span>${esc(fact[1])}</span>
            </li>
        `).join('');
    }

    function renderSkills() {
        $('#skillGrid').innerHTML = SKILLS.map((skill) => `
            <div class="card skill">
                ${svgIcon(skill.icon, '', 44)}
                <strong>${esc(skill.name)}</strong>
                ${skill.level ? `<small>${esc(skill.level)}</small>` : ''}
            </div>
        `).join('');
    }

    function projectButton(label, url, cls, icon) {
        const inner = svgIcon(icon, 'ic', 14) + label;

        if (url) {
            return `<a class="btn ${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
        }

        return `<a class="btn ${cls}" aria-disabled="true" role="link" tabindex="-1">${inner}</a>`;
    }

    function renderProjects() {
        $('#projectGrid').innerHTML = PROJECTS.map((project) => `
            <article class="card proj">
                <img
                    src="${esc(project.thumb)}"
                    alt="Thumbnail ${esc(project.name)}"
                    width="320"
                    height="160"
                    loading="lazy"
                >

                <h3>${esc(project.name)}</h3>

                <p>${esc(project.desc)}</p>

                <div class="tags">
                    ${project.tech.map((tech) => `<span>${esc(tech)}</span>`).join('')}
                </div>

                <div class="acts">
                    ${projectButton('Demo', project.demo, 'primary', 'i-play')}
                    ${projectButton('Source Code', project.source, '', 'i-code')}
                </div>
            </article>
        `).join('');
    }

    function renderContact() {
        const emailHtml = CONTACT.email
            ? `<a href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a>`
            : '<span>belum diisi</span>';

        const socialHtml = SOCIAL_LIST.map((item) => {
            const url = CONTACT.social[item[0]];
            const cls = item[1].charAt(0) === 'b' ? 'fl' : 'ic';
            const icon = svgIcon(item[1], cls, 22);

            if (url) {
                return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="${item[2]}">${icon}</a>`;
            }

            return `<span title="${item[2]} (belum diisi)" aria-label="${item[2]} belum diisi">${icon}</span>`;
        }).join('');

        $('#contactInfo').innerHTML = `
            <div class="ci">
                <span class="ico">${svgIcon('f-mail', 'fl', 20)}</span>
                <div><b>Email</b>${emailHtml}</div>
            </div>

            <div class="ci">
                <span class="ico">${svgIcon('f-pin', 'fl', 20)}</span>
                <div><b>Lokasi</b>${esc(CONTACT.location)}</div>
            </div>

            <div class="ci">
                <span class="ico">${svgIcon('f-share', 'fl', 20)}</span>
                <div>
                    <b>Media Sosial</b>
                    <div class="soc">${socialHtml}</div>
                </div>
            </div>
        `;
    }

    renderAbout();
    renderSkills();
    renderProjects();
    renderContact();


    // ========================================
    // NAVIGASI
    // ========================================

    const burger = $('#burger');
    const menu = $('#menu');
    const navLinks = Array.from(document.querySelectorAll('.menu a'));

    function setMenu(open) {
        menu.classList.toggle('open', open);

        burger.setAttribute('aria-expanded', open);

        $('#burgerUse').setAttribute('href', open ? '#i-close' : '#i-menu');
    }

    burger.addEventListener('click', () => {
        setMenu(!menu.classList.contains('open'));
    });

    menu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            setMenu(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenu(false);
        }
    });

    // Menandai menu aktif sesuai section yang terlihat
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section').forEach((section) => {
        sectionObserver.observe(section);
    });


    // ========================================
    // TEMA GELAP / TERANG
    // ========================================

    const root = document.documentElement;

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);

        $('#themeUse').setAttribute('href', theme === 'dark' ? '#f-sun' : '#f-moon');
    }

    // Selalu mulai dari tema terang (sesuai desain).
    // Pilihan pengunjung diingat bila penyimpanan browser tersedia.
    let savedTheme = 'light';

    try {
        savedTheme = localStorage.getItem('fadqul-theme') === 'dark' ? 'dark' : 'light';
    } catch (error) {
        savedTheme = 'light';
    }

    setTheme(savedTheme);

    $('#theme').addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

        setTheme(next);

        try {
            localStorage.setItem('fadqul-theme', next);
        } catch (error) {
            // penyimpanan tidak tersedia, abaikan
        }
    });


    // ========================================
    // JUDUL HOME (HURUF BISA DIGESER)
    // ========================================

    const title = $('#title');
    const TITLE_LINES = ['FADQUL', 'STUDENT IT'];
    const letters = [];

    let dragging = null;

    function buildTitle() {
        TITLE_LINES.forEach((lineText) => {
            const line = document.createElement('span');

            line.className = 'ln';
            line.setAttribute('aria-hidden', 'true');

            lineText.split(' ').forEach((wordText, index) => {
                if (index > 0) {
                    line.appendChild(document.createTextNode(' '));
                }

                const word = document.createElement('span');

                word.className = 'w';

                wordText.split('').forEach((char) => {
                    const letter = document.createElement('span');

                    letter.className = 'l';
                    letter.style.setProperty('--i', letters.length);
                    letter.textContent = char;
                    letter.dataset.x = 0;
                    letter.dataset.y = 0;

                    word.appendChild(letter);
                    letters.push(letter);
                });

                line.appendChild(word);
            });

            title.appendChild(line);
        });
    }

    function onDragStart(event) {
        const target = event.target;

        if (!target.classList.contains('l')) {
            return;
        }

        dragging = {
            el: target,
            startX: event.clientX,
            startY: event.clientY,
            originX: Number(target.dataset.x),
            originY: Number(target.dataset.y)
        };

        target.classList.add('drag');
        target.setPointerCapture(event.pointerId);

        event.preventDefault();
    }

    function onDragMove(event) {
        if (!dragging || event.target !== dragging.el) {
            return;
        }

        const el = dragging.el;
        const curX = Number(el.dataset.x);
        const curY = Number(el.dataset.y);

        let x = dragging.originX + event.clientX - dragging.startX;
        let y = dragging.originY + event.clientY - dragging.startY;

        // Huruf tidak boleh keluar dari area Home
        const home = $('#home').getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        const dx = x - curX;
        const dy = y - curY;

        if (rect.left + dx < home.left || rect.right + dx > home.right) {
            x = curX;
        }

        if (rect.top + dy < Math.max(home.top, 0) || rect.bottom + dy > home.bottom) {
            y = curY;
        }

        el.dataset.x = x;
        el.dataset.y = y;
        el.style.transform = `translate(${x}px, ${y}px)`;
    }

    function onDragEnd() {
        if (!dragging) {
            return;
        }

        dragging.el.classList.remove('drag');
        dragging = null;
    }

    function resetLetters() {
        letters.forEach((letter) => {
            letter.dataset.x = 0;
            letter.dataset.y = 0;
            letter.style.transform = '';
        });
    }

    buildTitle();

    title.addEventListener('pointerdown', onDragStart);
    title.addEventListener('pointermove', onDragMove);
    title.addEventListener('pointerup', onDragEnd);
    title.addEventListener('pointercancel', onDragEnd);

    $('#resetLetters').addEventListener('click', resetLetters);


    // ========================================
    // ANIMASI LAUT & BEBEK (HANYA DI HOME)
    // ========================================

    const home = $('#home');
    const canvas = $('#sea');
    const ctx = canvas.getContext('2d');
    const duck = $('#duck');

    const DUCK_W = 52;
    const DUCK_H = 42;

    let width = 0;
    let height = 0;
    let visible = true;
    let frameId = 0;
    let lastFrame = 0;

    const startTime = performance.now();

    // Lapisan ombak: posisi, tinggi, frekuensi, kecepatan, warna
    const WAVES = [
        { y: 0.04, amp: 8, freq: 0.011, speed: 0.6, color: 'rgba(60, 190, 240, 0.35)' },
        { y: 0.14, amp: 11, freq: 0.008, speed: -0.8, color: 'rgba(90, 210, 245, 0.5)' },
        { y: 0.26, amp: 13, freq: 0.007, speed: 1, color: 'rgba(140, 228, 248, 0.7)' },
        { y: 0.37, amp: 10, freq: 0.010, speed: -1.2, color: 'rgba(225, 249, 253, 0.9)' },
        { y: 0.45, amp: 8, freq: 0.013, speed: 1.5, color: 'rgba(255, 255, 255, 0.95)' }
    ];

    const duckState = { x: 0, y: 0, targetX: 0, targetY: 0, dir: 1 };


    // ---------- Ukuran canvas ----------

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = canvas.clientWidth;
        height = canvas.clientHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        pickDuckTarget(true);
        pickGullRow();
        pickCrabTarget(true);
        drawSea(0);
        moveDuck(0, 0);
        moveGull(0, 0);
        moveCrab(0);
    }


    // ---------- Gambar laut ----------

    function drawSea(t) {
        ctx.clearRect(0, 0, width, height);

        // Lapisan ombak
        WAVES.forEach((wave) => {
            ctx.fillStyle = wave.color;
            ctx.beginPath();
            ctx.moveTo(0, height);

            for (let x = 0; x <= width; x += 8) {
                const main = Math.sin(x * wave.freq + t * wave.speed) * wave.amp;
                const detail = Math.sin(x * wave.freq * 2.3 + t * wave.speed * 1.4) * wave.amp * 0.3;

                ctx.lineTo(x, wave.y * height + main + detail);
            }

            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fill();
        });

        // Riak air
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.4;

        for (let i = 0; i < 4; i++) {
            const rx = ((i * 0.27 + t * 0.02 * (i + 1)) % 1) * width;
            const ry = height * (0.18 + i * 0.08);

            ctx.beginPath();
            ctx.ellipse(rx, ry, 18 + i * 6, 3.5, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Pasir
        const sand = ctx.createLinearGradient(0, height * 0.5, 0, height);

        sand.addColorStop(0, '#f9e8c0');
        sand.addColorStop(1, '#eccb8c');

        ctx.fillStyle = sand;
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 8) {
            ctx.lineTo(x, height * 0.53 + Math.sin(x * 0.008 + t * 0.7) * 6);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
    }


    // ---------- Gerakan bebek ----------

    function pickDuckTarget(instant) {
        const homeHeight = home.clientHeight;
        const minY = homeHeight * 0.5;
        const maxY = homeHeight * 0.62;

        duckState.targetX = Math.random() * Math.max(width - DUCK_W, 1);
        duckState.targetY = minY + Math.random() * (maxY - minY) - DUCK_H / 2;

        if (instant) {
            duckState.x = duckState.targetX;
            duckState.y = duckState.targetY;
        }
    }

    function moveDuck(dt, t) {
        const dx = duckState.targetX - duckState.x;

        // Sampai di tujuan: pilih tujuan baru
        if (Math.abs(dx) < 6) {
            pickDuckTarget(false);
        }

        // Kecepatan pelan dan halus (px per detik)
        const speed = Math.min(Math.abs(dx), 40) + 10;

        duckState.x += Math.sign(dx) * Math.min(speed * dt, Math.abs(dx));
        duckState.y += (duckState.targetY - duckState.y) * Math.min(dt * 0.8, 1);

        // Balik arah hadap sesuai arah gerak
        if (dx !== 0) {
            duckState.dir = dx > 0 ? 1 : -1;
        }

        const bob = Math.sin(t * 2) * 4;

        duck.style.transform =
            `translate(${duckState.x.toFixed(1)}px, ${(duckState.y + bob).toFixed(1)}px) scaleX(${duckState.dir})`;
    }


    // ---------- Gerakan camar ----------

    const gull = $('#gull');
    const GULL_W = 64;
    const gullState = { x: 0, baseY: 0, dir: 1, phase: Math.random() * 6 };

    function pickGullRow() {
        gullState.baseY = home.clientHeight * (0.14 + Math.random() * 0.2);
    }

    function moveGull(dt, t) {
        const s = gullState;

        s.x += s.dir * 45 * dt;

        // Sampai tepi layar: berbalik arah dan ganti ketinggian
        if (s.x > width + GULL_W) {
            s.dir = -1;
            pickGullRow();
        } else if (s.x < -GULL_W * 1.5) {
            s.dir = 1;
            pickGullRow();
        }

        const y = s.baseY + Math.sin(t * 1.1 + s.phase) * 10;

        gull.style.transform =
            `translate(${s.x.toFixed(1)}px, ${y.toFixed(1)}px) scaleX(${s.dir})`;
    }


    // ---------- Gerakan kepiting ----------

    const crab = $('#crab');
    const CRAB_W = 46;
    const crabState = { x: 0, targetX: 0, wait: 0 };

    function pickCrabTarget(instant) {
        crabState.targetX = Math.random() * Math.max(width - CRAB_W, 1);

        if (instant) {
            crabState.x = crabState.targetX;
        }
    }

    function moveCrab(dt) {
        const s = crabState;
        const y = home.clientHeight * 0.86;

        if (s.wait > 0) {
            s.wait -= dt;
            crab.classList.remove('walk');
        } else {
            const dx = s.targetX - s.x;

            if (Math.abs(dx) < 3) {
                // Berhenti sebentar, lalu pilih tujuan baru
                s.wait = 1 + Math.random() * 2.5;
                pickCrabTarget(false);
            } else {
                s.x += Math.sign(dx) * Math.min(26 * dt, Math.abs(dx));
                crab.classList.add('walk');
            }
        }

        crab.style.transform = `translate(${s.x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    }


    // ---------- Loop animasi ----------

    function loop(now) {
        if (!visible || document.hidden) {
            frameId = 0;

            return;
        }

        const t = (now - startTime) / 1000;
        const dt = Math.min((now - (lastFrame || now)) / 1000, 0.1);

        lastFrame = now;

        drawSea(t);
        moveDuck(dt, t);
        moveGull(dt, t);
        moveCrab(dt);

        frameId = requestAnimationFrame(loop);
    }

    function startAnimation() {
        if (frameId || reduceMotion) {
            return;
        }

        lastFrame = 0;
        frameId = requestAnimationFrame(loop);
    }

    // Menyesuaikan ukuran saat layar berubah
    new ResizeObserver(resizeCanvas).observe(home);

    // Animasi berhenti saat Home tidak terlihat
    new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;

        if (visible) {
            startAnimation();
        }
    }).observe(home);

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            startAnimation();
        }
    });

    resizeCanvas();
    startAnimation();


    // ========================================
    // CAROUSEL PROYEK
    // ========================================

    const track = $('#projectGrid');
    const dotsBox = $('#projectDots');

    let pages = 1;

    function maxScroll() {
        return track.scrollWidth - track.clientWidth;
    }

    function updateDots() {
        const max = maxScroll();
        const index = max > 0 ? Math.round((track.scrollLeft / max) * (pages - 1)) : 0;

        Array.from(dotsBox.children).forEach((dot, i) => {
            dot.classList.toggle('on', i === index);
        });
    }

    function buildDots() {
        const card = track.firstElementChild;

        if (!card) {
            return;
        }

        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const perView = Math.max(1, Math.round((track.clientWidth + gap) / (card.offsetWidth + gap)));

        pages = maxScroll() > 2 ? Math.ceil(PROJECTS.length / perView) : 1;

        dotsBox.innerHTML = '';
        dotsBox.hidden = pages <= 1;

        for (let i = 0; i < pages; i++) {
            const dot = document.createElement('button');

            dot.type = 'button';
            dot.setAttribute('aria-label', `Proyek halaman ${i + 1}`);

            dot.addEventListener('click', () => {
                track.scrollTo({
                    left: pages > 1 ? (maxScroll() * i) / (pages - 1) : 0,
                    behavior: reduceMotion ? 'auto' : 'smooth'
                });
            });

            dotsBox.appendChild(dot);
        }

        updateDots();
    }

    let dotTick = false;

    track.addEventListener('scroll', () => {
        if (dotTick) {
            return;
        }

        dotTick = true;

        requestAnimationFrame(() => {
            updateDots();
            dotTick = false;
        });
    }, { passive: true });

    new ResizeObserver(buildDots).observe(track);


    // ========================================
    // ANIMASI MUNCUL SAAT SCROLL
    // ========================================

    const REVEAL_SELECTORS = [
        '.sec .ttl-ic',
        '.sec h2',
        '.sec .sub',
        '.about-grid > *',
        '.skill',
        '.proj',
        '.dots',
        '.info-card',
        '#form'
    ];

    const revealItems = document.querySelectorAll(REVEAL_SELECTORS.join(','));

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('in'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);

                setTimeout(() => entry.target.classList.add('done'), 1100);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        revealItems.forEach((item, index) => {
            item.classList.add('reveal');
            item.style.setProperty('--d', `${(index % 4) * 0.08}s`);

            revealObserver.observe(item);
        });
    }


    // ========================================
    // NAVBAR SAAT SCROLL
    // ========================================

    window.addEventListener('scroll', () => {
        $('#nav').classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });


    // ========================================
    // KUNCI ZOOM (PINCH, CTRL+SCROLL, CTRL +/-)
    // ========================================

    ['gesturestart', 'gesturechange', 'gestureend'].forEach((name) => {
        document.addEventListener(name, (event) => event.preventDefault());
    });

    document.addEventListener('touchmove', (event) => {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('wheel', (event) => {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && ['+', '-', '=', '0'].includes(event.key)) {
            event.preventDefault();
        }
    });


    // ========================================
    // FORM KONTAK (VALIDASI SISI KLIEN)
    // ========================================

    const form = $('#form');
    const statusText = $('#status');

    function setError(selector, message) {
        $(selector).textContent = message;

        return !message;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        statusText.textContent = '';

        const name = form.nama.value.trim();
        const email = form.email.value.trim();
        const message = form.pesan.value.trim();

        const results = [
            setError('#en', name.length < 2 ? 'Nama minimal 2 karakter.' : ''),
            setError('#ee', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Masukkan email yang valid.'),
            setError('#em', message.length < 10 ? 'Pesan minimal 10 karakter.' : '')
        ];

        if (!results.every(Boolean)) {
            return;
        }

        // Belum ada backend: jangan tampilkan sukses palsu
        statusText.textContent =
            'Input valid, tetapi pesan BELUM terkirim: backend/layanan formulir belum dikonfigurasi.';
    });

})();
