function toggleChat() {

    const chatBox = document.getElementById("chatBox");

    chatBox.classList.toggle("show");

}


function sendMessage() {

    const input = document.getElementById("userInput");
    const messages = document.getElementById("chatMessages");

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    const userMessage = document.createElement("div");

    userMessage.className = "user-message";
    userMessage.textContent = text;

    messages.appendChild(userMessage);

    input.value = "";

    setTimeout(() => {

        const botMessage = document.createElement("div");

        botMessage.className = "bot-message";
        botMessage.textContent = getBotResponse(text);

        messages.appendChild(botMessage);

        messages.scrollTop = messages.scrollHeight;

    }, 500);

}


function getBotResponse(text) {

    const message = text.toLowerCase();


    if (
        message.includes("siapa") ||
        message.includes("renn") ||
        message.includes("takahashi")
    ) {

        return "Renn adalah seorang pelajar yang sedang belajar mengembangkan kemampuan di bidang otomotif dan website.";

    }


    if (
        message.includes("jurusan") ||
        message.includes("otomotif")
    ) {

        return "Renn mengambil jurusan Otomotif.";

    }


    if (
        message.includes("pendidikan") ||
        message.includes("sekolah")
    ) {

        return "Renn bersekolah di Sekolah SMKN 1 Paron dengan jurusan Otomotif.";

    }


    if (
        message.includes("keahlian") ||
        message.includes("skill")
    ) {

        return "Beberapa keahliannya adalah dasar otomotif serta dasar HTML dan CSS.";

    }


    if (
        message.includes("galeri") ||
        message.includes("foto")
    ) {

        return "Kamu bisa melihat koleksi foto di halaman Galeri Foto 📷";

    }


    if (
        message.includes("halo") ||
        message.includes("hai") ||
        message.includes("hello")
    ) {

        return "Halo juga! 👋 Senang kamu mampir ke website Renn Cuy";

    }


    return "Hmm, aku belum tahu jawaban untuk itu 🤔 Coba tanyakan tentang Renn, pendidikan, jurusan, keahlian, atau galeri.";

}


/* =========================
   MUSIC PLAYER
========================= */

const music = document.getElementById("music");
const vinyl = document.getElementById("vinyl");
const playMusic = document.getElementById("playMusic");
const lyricsElement = document.getElementById("lyrics");
const typingCursor = document.getElementById("typingCursor");

const currentTimeElement = document.getElementById("currentTime");
const durationElement = document.getElementById("duration");


/* =========================
   MUSIC PLAYER CHECK
========================= */

if (
    music &&
    vinyl &&
    playMusic &&
    lyricsElement
) {


    /* =========================
       LIRIK
    ========================= */

    const lyrics = [
        {
            time: 2,
            speed: 70,
            text: "LIRIK PERTAMA"
        },

        {
            time: 12,
            speed: 100,
            text: "LIRIK KEDUA"
        },

        {
            time: 20,
            speed: 150,
            text: "LIRIK KETIGA"
        }
    ];


    let currentLyric = -1;
    let typingTimer = null;


    /* =========================
       FORMAT WAKTU
    ========================= */

    function formatTime(seconds) {

        if (!isFinite(seconds)) {
            return "00:00";
        }

        const minutes = Math.floor(seconds / 60);

        const secs = Math.floor(seconds % 60);

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0")
        );

    }


    /* =========================
       DURASI MUSIK
    ========================= */

    music.addEventListener("loadedmetadata", function () {

        if (durationElement) {

            durationElement.textContent =
                formatTime(music.duration);

        }

    });


    /* =========================
       PLAY / PAUSE
    ========================= */

    playMusic.addEventListener("click", function () {

        if (music.paused) {

            music.play()
                .then(() => {

                    vinyl.classList.add("playing");

                    playMusic.textContent = "❚❚";

                })
                .catch((error) => {

                    console.error(
                        "Musik gagal diputar:",
                        error
                    );

                });

        } else {

            music.pause();

            vinyl.classList.remove("playing");

            playMusic.textContent = "▶";

        }

    });


    /* =========================
       TIMING MUSIK + LIRIK
    ========================= */

    music.addEventListener("timeupdate", function () {

        /* Waktu berjalan */

        if (currentTimeElement) {

            currentTimeElement.textContent =
                formatTime(music.currentTime);

        }


        /* Cek lirik */

        for (let i = 0; i < lyrics.length; i++) {

            if (
                music.currentTime >= lyrics[i].time &&
                currentLyric < i
            ) {

                currentLyric = i;

                showLyric(
                    lyrics[i].text,
                    lyrics[i].speed
                );

                break;

            }

        }

    });


    /* =========================
       EFEK MENGETIK
    ========================= */

    function showLyric(text, speed) {

        clearInterval(typingTimer);

        lyricsElement.textContent = "";


        /* Tampilkan kursor */

        if (typingCursor) {

            typingCursor.classList.add("show");

        }


        let index = 0;


        typingTimer = setInterval(function () {

            if (index < text.length) {

                lyricsElement.textContent +=
                    text[index];

                index++;

            } else {

                clearInterval(typingTimer);

            }

        }, speed);

    }


    /* =========================
       LAGU SELESAI
    ========================= */

    music.addEventListener("ended", function () {

        vinyl.classList.remove("playing");

        playMusic.textContent = "▶";

        currentLyric = -1;

        clearInterval(typingTimer);

        lyricsElement.textContent = "";


        if (typingCursor) {

            typingCursor.classList.remove("show");

        }


        if (currentTimeElement) {

            currentTimeElement.textContent = "00:00";

        }

    });

}

/* =========================
   IMAGE PREVIEW
========================= */

function openImage(image) {

    const preview = document.getElementById("imagePreview");
    const previewImage = document.getElementById("previewImage");

    previewImage.src = image.src;
    previewImage.alt = image.alt;

    preview.classList.add("show");

}


function closeImage() {

    const preview = document.getElementById("imagePreview");

    preview.classList.remove("show");

}