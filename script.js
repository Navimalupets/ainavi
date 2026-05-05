// ============================================
// INTRO OVERLAY LOGIC
// Kapag nag-load ang page, tinitingnan kung
// nakapasok na ang user dati (gamit ang
// localStorage). Kung oo, laktawan ang intro.
// ============================================

window.addEventListener("load", () => {
  // localStorage = nag-iimbak ng data sa browser ng user
  // (nananatili kahit i-refresh o isara ang tab)
  const entered = localStorage.getItem("userEntered");

  if (entered === "true") {
    // Nakapasok na dati — itago ang intro overlay agad
    document.getElementById("intro-overlay").style.display = "none";

    // Ipakita ang naka-save na pangalan kung mayroon
    const storedName = localStorage.getItem("userName") || "";
    const helloUser = document.getElementById("hello-user");
    if (helloUser && storedName) {
      helloUser.innerText = `Hello ulit, ${storedName}! 😀`;
    }
  } else {
    // First time visitor — ipakita ang intro overlay
    document.getElementById("intro-overlay").style.display = "flex";
  }
});

// ============================================
// ENTER KEY SUPPORT
// Kapag pinindot ang Enter sa loob ng isang
// input field, awtomatikong tinatawag ang
// katumbas na button ng kasalukuyang step.
//
// Paano gumagana:
// - Nakikinig sa "keydown" event sa bawat input
// - Tinitingnan kung "Enter" ang pinindot (e.key === "Enter")
// - Kung oo, tinatawag ang function ng button ng step na iyon
// ============================================

// Reason input (step 2) → tinatawag ang nextToName()
document.getElementById("reason").addEventListener("keydown", function(e) {
  if (e.key === "Enter") nextToName();
});

// Name input (step 3) → tinatawag ang enterSite()
document.getElementById("username").addEventListener("keydown", function(e) {
  if (e.key === "Enter") enterSite();
});

// Birthday input (step 4) → tinatawag ang checkBirthday()
document.getElementById("birthday").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkBirthday();
});

// Step 1 → Step 4 (kakilala ng user si Navi → birthday check)
function knownYes() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step4").style.display = "block";
}

// Step 1 → Step 2 (hindi kakilala → tanong kung bakit nandito)
function knownNo() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

// ============================================
// BIRTHDAY CHECKER
// Tinitingnan kung tama ang birthday na
// inilagay ng user. Ang date input ng browser
// ay nagbibigay ng YYYY-MM-DD format, kaya
// kailangan i-convert sa MM-DD-YYYY format
// para ma-compare sa naviBirthday.
// ============================================
const naviBirthday = "01-22-2003"; // MM-DD-YYYY format

function checkBirthday() {
  const input = document.getElementById("birthday").value; // YYYY-MM-DD mula sa browser

  if (input === "") {
    alert("Pakilagay ang birthday ni Navi.");
    return;
  }

  // I-convert mula YYYY-MM-DD → MM-DD-YYYY para ma-compare
  const parts = input.split("-");          // ["2003", "01", "22"]
  const formattedInput = `${parts[1]}-${parts[2]}-${parts[0]}`; // "01-22-2003"

  if (formattedInput !== naviBirthday) {
    alert("Mali ang birthday. Subukan ulit.");
    return;
  }

  // Tama! — pumunta sa step 3 (name input)
  document.getElementById("step4").style.display = "none";
  document.getElementById("step3").style.display = "block";
}

// ============================================
// REASON VALIDATOR
// Tinitingnan kung valid ang reason na
// inilagay ng user (hindi kakilala na path).
// Tatlong validation:
// 1. Minimum 3 na salita
// 2. Minimum 2 characters bawat salita
// 3. May Tagalog na salita
// ============================================
function nextToName() {
  const reason = document.getElementById("reason").value.trim();
  const words = reason.split(" ").filter(Boolean); // hatiin sa salita, alisin ang blanks

  // Validation 1: Minimum 3 salita
  if (words.length < 3) {
    alert("Pakilagay ang mas malinaw na rason.");
    return;
  }

  // Validation 2: Minimum 2 characters bawat salita
  const validWords = words.filter(w => w.length >= 2);
  if (validWords.length < 3) {
    alert("Mukhang hula-hula lang ang nilagay mo, pakilagay ang totoong rason.");
    return;
  }

  // Validation 3: May Tagalog na salita para tiyak na may sinasabi
  const tagalogWords = ["ako","ikaw","siya","kami","kayo","sila","gusto","dahil","alam","mo","ni","ay","trip","ewan","secret","malay","ko","i","dont","wala","lang"];
  const hasTagalog = words.some(w => tagalogWords.includes(w.toLowerCase()) && w.length >= 2);
  if (!hasTagalog) {
    alert("Pakilagay ang totoong dahilan gamit ang Tagalog na salita.");
    return;
  }

  // Passed lahat ng validation — pumunta sa step 3
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
}

// ============================================
// ENTER SITE
// Ini-save ang pangalan ng user sa localStorage
// at ipinapakita ang welcome message (step 5).
// ============================================
function enterSite() {
  const name = document.getElementById("username").value.trim();

  if (name !== "") {
    // I-save sa localStorage — mananatili kahit i-refresh
    localStorage.setItem("userEntered", "true");
    localStorage.setItem("userName", name);

    // Pumunta sa step 5 at ipakita ang personalized greeting
    document.getElementById("step3").style.display = "none";
    document.getElementById("hello-user").innerText = `Hello, ${name}! magandang araw 😀`;
    document.getElementById("step5").style.display = "block";
  }
}

// ============================================
// GO TO HOME
// Ititatago ang intro overlay gamit ang
// fade-out animation bago tuluyang itago.
// ============================================
function goToHome() {
  const overlay = document.getElementById("intro-overlay");
  // Unti-unting mawala (0.5 seconds)
  overlay.style.transition = "opacity 0.5s ease";
  overlay.style.opacity = "0";
  // Pagkatapos ng 500ms (kapag naka-fade out na), itago talaga
  setTimeout(() => {
    overlay.style.display = "none";
    overlay.style.opacity = "1"; // i-reset para hindi masira kung ipapakita ulit
  }, 500);
}

// ============================================
// MUSIC SLIDER
// Awtomatikong gumagalaw na carousel ng
// Spotify embeds. Gumagamit ng
// requestAnimationFrame para smooth animation.
//
// FIX para walang flash:
// - translate3d() = naglalagay ng slider sa
//   sariling GPU composite layer
// - Ang background GIF ay nasa sariling layer
//   din (.bg-layer), kaya hindi na sila
//   nag-aaffect sa isa't isa
// ============================================

(function initSlider() {
  const track = document.getElementById("sliderTrack");
  if (!track) return; // tumigil kung wala ang element

  const songs = Array.from(track.children); // i-convert ang HTMLCollection sa array
  const GAP = 20; // pixels na espasyo sa pagitan ng mga card

  // I-clone ang lahat ng card at i-append sa dulo para
  // seamless ang loop — kapag natapos ang original set,
  // na-reset ang position at mukhang walang jump
  songs.forEach(song => {
    track.appendChild(song.cloneNode(true));
  });

  // Kabuuang lapad ng isang set ng mga card
  const songWidth = songs[0].offsetWidth + GAP;
  const totalWidth = songWidth * songs.length;

  let pos = 0;       // kasalukuyang position ng slider (pixels)
  let paused = false; // true kapag naka-hover ang user
  const SPEED = 0.6;  // pixels na gumagalaw bawat frame — baguhin para mas mabilis/mabagal

  function step() {
    if (!paused) {
      pos += SPEED; // gamitin pababa
      // Kapag naabot ang dulo ng original set, i-reset sa simula
      // (dahil may clone, hindi makikita ang jump)
      if (pos >= totalWidth) pos -= totalWidth;
      // translate3d = GPU-accelerated transform, hindi nag-aapekto sa ibang layers
      track.style.transform = `translate3d(-${pos}px, 0, 0)`;
    }
    requestAnimationFrame(step); // ulitin bago ang susunod na frame ng browser
  }

  requestAnimationFrame(step); // simulan ang animation loop

  // I-pause ang slider kapag naka-hover ang user
  // para magkaroon sila ng pagkakataon na mag-click ng card
  track.addEventListener("mouseenter", () => paused = true);
  track.addEventListener("mouseleave", () => paused = false);
})(); // IIFE = Immediately Invoked Function Expression — tumatakbo agad

// ============================================
// CUSTOM CURSOR
// Dalawang bahagi ang custom cursor:
// 1. .cursor-dot = instant na sumusunod sa mouse
// 2. .cursor = malaking circle na may "lag" effect
//    (hindi agad sumusunod — mas malambot ang feel)
//
// cursor: none sa CSS = natatago ang default cursor
// ============================================

const cursor    = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

let mouseX = 0, mouseY = 0; // aktwal na position ng mouse
let curX = 0, curY = 0;     // kasalukuyang position ng malaking circle

// Kapag gumagalaw ang mouse, i-update ang target positions
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX; // X coordinate ng mouse
  mouseY = e.clientY; // Y coordinate ng mouse
  // Ang dot ay instant na sumusunod
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top  = mouseY + "px";
});

// Ang malaking circle ay sumusunod nang may "lerp" (linear interpolation)
// 0.15 = 15% ng distansya sa mouse ang tinatahak bawat frame
// = nagbibigay ng malambot na lag effect
function animateCursor() {
  curX += (mouseX - curX) * 0.15; // lumipat ng 15% patungo sa target
  curY += (mouseY - curY) * 0.15;
  cursor.style.left = curX + "px";
  cursor.style.top  = curY + "px";
  requestAnimationFrame(animateCursor); // ulitin bawat frame
}
animateCursor(); // simulan ang cursor animation loop

// Kapag nag-hover sa clickable elements, palakihin ang cursor
// at palitan ng magenta ang kulay para malinaw na clickable ito
document.querySelectorAll("a, button, .song, input").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.6)"; // palakihin
    cursor.style.borderColor = "#ff00ff"; // magenta
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"; // balik sa normal
    cursor.style.borderColor = "#00ffff"; // cyan
  });
});