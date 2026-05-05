// ============================================
// MGA ELEMENTO NG PAGE
// Kinukuha ang mga HTML element gamit ang
// getElementById para magamit sa JS.
// ============================================

const messagesContainer = document.getElementById("messages"); // div kung saan lalabas ang mga mensahe
const userInput = document.getElementById("userInput");         // input field ng user
const sendBtn = document.getElementById("sendBtn");             // send button

// Dito itatago ang data mula sa backend (pangalan, edad, hobbies, etc.)
let knowledgeBase = {};

// ============================================
// LISTAHAN NG MGA SUGGESTION
// Mga tanong na ipinoproprose sa user sa
// suggestion bar. Mas maraming options =
// mas bihirang ulitin.
// ============================================
const suggestions = [
  // BASIC INFO
  "Ilang taon si Navi? ",
  "Ano ang full name ni Navi?",
  "Ano ang nickname niya?",
  "Saan siya pinanganak? ",
  "Saan siya nakatira ngayon?",
  "Ano ang zodiac sign niya?",
  "Ano ang nationality ni Navi?",

  // SCHOOL
  "Saan siya nag-aaral?",
  "Ano ang course niya sa college?",
  "Anong strand niya nung senior high?",
  "Student pa ba si Navi?",
  "Saan siya nag elementary?",
  "Saan siya nag high school?",

  // FAVORITES
  "Ano ang paboritong kulay niya? ",
  "Ano ang paboritong pagkain niya? ",
  "Ano ang hobbies ni Navi?",
  "Ano ang paboritong laro niya?",
  "Ano ang paboritong movie niya?",
  "Ano ang favorite place niya?",

  // NOT FAVORITES
  "Ano ang ayaw niyang pagkain?",
  "Ano ang ayaw niyang kulay?",
  "Anong klase ng tao ang ayaw niya?",

  // FRIENDS
  "Sino ang mga tropa ni Navi?",
  "Sino ang mga kaibigan niyang babae?",
  "May kaibigan ba siyang lalaki?",
  
  // PERSONALITY
  "Ano ang personality ni Navi?",
  "Ano ang strengths at weaknesses niya?",
  "Ano ang pet peeves niya?",

  // CRUSH / TYPE
  "Sino ang crush ni Navi?",
  "Ano ang tipo niya sa babae?",
  "Single ba si Navi?",
  "Seloso ba siya?",
  "Paano siya magmahal?",

  // EMOTIONS
  "Kailan siya masaya? ",
  "Ano nagpapalungkot sa kanya?",
  "Paano siya magalit?",
  "Paano siya mag handle ng stress?",

  // MINDSET
  "Ano ang pananaw niya sa buhay?",
  "Ano ang meaning ng success para sa kanya?",
  "Naniniwala ba siya sa love?",
  "Madali ba siya magtiwala?",

  // ROUTINE
  "Ano ang daily routine niya?",


  // GOALS
  "Ano ang goals ni Navi?",
  "Ano ang pangarap niya?",
  "Ano plano niya sa future?",

  // FEARS
  "Ano ang kinakatakutan niya?",
  "May insecurities ba siya?",
  "Overthinker ba siya?",

  // SOCIAL
  "Paano siya sa public?",
  "Paano siya sa kaibigan?",
  "Paano siya sa strangers?",

  // GAMING
  "Paano siya maglaro?",
  "Nagagalit ba siya sa games?",

  // MUSIC
  "Ano ang music taste ni Navi?",
  "Anong music niya kapag sad?",
  "Anong music niya kapag masaya?",

  // MEMORIES
  "Ano ang pinaka masayang moment niya?",
  "Ano ang pinaka malungkot na moment niya?",
  "Ano ang unforgettable experience niya?",

  // DECISIONS
  "Paano siya magdesisyon?",
  "Risk taker ba si Navi?",

  // RANDOM
  "Ano ang talent ni Navi?",
  "Ano ang skills niya?",
  "Ano ang habits niya?",

  // OPINIONS
  "Naniniwala ba siya sa love at first sight?",
  "Pera o love para sa kanya?",
  "Ano ang priority niya sa buhay?",

  // FUN
  "May fun facts ba tungkol kay Navi?",
  "Ano ang favorite quotes niya?"
];

// ============================================
// SUGGESTION POOL SYSTEM
// Gumagamit ng "shuffled pool" para hindi
// paulit-ulit ang mga suggestion hangga't
// hindi pa natapos ang lahat ng items.
// Parang mag-shuffle ng baraha — lahat
// lalabas nang isang beses bago ulitin.
// ============================================
let suggestionPool = [];       // nandito ang mga index na hindi pa nagagamit
let lastSuggestionIndex = -1;  // itinatago ang pinakahuli para hindi ulitin agad

function getNextSuggestion() {
  // Kapag ubos na ang pool, i-refill at i-shuffle ulit
  if (suggestionPool.length === 0) {
    suggestionPool = suggestions.map((_, i) => i).sort(() => Math.random() - 0.5);
  }
  // Kung ang susunod ay katulad ng huli, i-swap para hindi maulit agad
  if (suggestionPool.length > 1 && suggestionPool[suggestionPool.length - 1] === lastSuggestionIndex) {
    suggestionPool.unshift(suggestionPool.pop());
  }
  // Kunin ang pinakahuli sa array (katulad ng mag-deal ng baraha)
  lastSuggestionIndex = suggestionPool.pop();
  return suggestions[lastSuggestionIndex];
}

// ============================================
// SUGGESTION BAR — AUTO-ROTATING
// Gumagawa ng bar sa ibabaw ng input na
// nagbabago every 3 seconds. May fade +
// slide animation kapag nagpapalit.
// Clickable din — kapag na-click, mapupunta
// ang suggestion sa input field.
// ============================================
function startSuggestionBar() {
  const bar = document.getElementById("suggestionBar");
  if (!bar) return;

  function updateBar() {
    const next = getNextSuggestion();
    bar.style.opacity = "0";
    bar.style.transform = "translateY(6px)";
    setTimeout(() => {
      bar.textContent = "💬 " + next;
      bar.style.opacity = "1";
      bar.style.transform = "translateY(0)";
    }, 300);
  }

  updateBar();
  setInterval(updateBar, 3000);

  bar.addEventListener("click", () => {
    userInput.value = bar.textContent.replace("💬 ", "");
    userInput.focus();
  });
}

// ============================================
// LOAD KNOWLEDGE BASE
// Kinukuha ang data ng AI mula sa backend
// server (localhost:5000). Habang hindi pa
// nalo-load, naka-disable ang send button.
// ============================================
sendBtn.disabled = true;

async function loadKnowledgeBase() {
  // Direktang ilagay ang data dito (galing sa iyong data.js)
  knowledgeBase = {
  "greet": {
  "hi": "Hi Magandang araw sayo. Nandito ka ngayon sa website na gawa ni Navi, may mga katanungan ka ba na gusto mo itanong sa kanya? Maaari kitang tulungan kung kailangan mo ng tulong mag-sabi ka lang. ",
  "hello": "Hello Magandang araw sayo. Nandito ka ngayon sa website na gawa ni Navi, may mga katanungan ka ba na gusto mo itanong sa kanya? Maaari kitang tulungan kung kailangan mo ng tulong mag-sabi ka lang. ",
  "yo": "Yo mah g! magandang araw sayo man. Nandito ka ngayon sa website na gawa ni Navi, may mga katanungan ka ba na gusto itanong sa kanya? Hayaan mong tulungan kita san mo ba gusto mag simula g?.",
  "yow": "Yow mah g! magandang araw sayo man. Nandito ka ngayon sa website na gawa ni Navi, may mga katanungan ka ba na gusto itanong sa kanya? Hayaan mong tulungan kita san mo ba gusto mag simula g?."
  },
  "name":{
    "nickname": "Navi",
    "first": "Cristopher Ivan",
    "middle": "Licayan",
    "last": "Gavarra"
    
  },
  "aboutme": "Hi si Navi ang gumawa nitong website at sya ang nag set-up sakin upang sagutin ang mga bagay na gusto mo malaman tungkol sa kanya, pwede kita bigyan ng guide kung saan ka pwede magstart sa pagtatanong like\n(Ilang taon, Anong paboritong kulay,pagkain at hoobies ni Navi, Mga pangalan ng kabigan nya, Saan syang School nag-aral).\n Hayaan mokong tulungan ka  ",
  "zodiac": "Aquarius",
  "age": 23,
  "height": "5'3",
  "nationality": "Filipino",
  "student": true,
  "bday": "January 22",
  "born": "January 22 2003",
  "placeofbirth": "Valenzuela",
  "currenthome": "Pook United, Loma De Gato, Marilao, Bulacan",
  "school": {
    "elementary": "Loma De Gato Elementary School",
    "highschool": "Prenza National High School",
    "seniorHigh": {
      "school": "Prenza National High School",
      "strand": "GAS (General Academic Strand)"
    },
    "college": "PDM/Pambayang Dalubhasaan ng Marilao",
    "course": "Computer Science"
  },
  "personality": {
  "traits": ["Tahimik", "Observant", "Direkta magsalita"],
  "strengths": ["Honest", "Loyal"],
  "weaknesses": ["Minsan overthinker", "Madaling mairita"],
  "examples": {
    "strength": "Kapag kailangan ng payo, tapat siyang magsabi ng totoo kahit mahirap pakinggan",
    "weakness": "Kapag may mali, madali syang mairita at mag-overthink"
  }
  },
  "petpeeves": 
    ["Maingay habang nagfofocus","Bossy","Paulit-ulit","Pasikat pag may babae","Sinungaling!!"]
    ,
  "faveplace":{
    "country": ["Japan"]
  },
  "favorites": {
    "movies": ["Action", "Sci-Fi", "Horror"],
    "games": ["Joan of Arc", "Dota", "Guitar Hero", "Mobile Legends", "PUBG"],
    "colors": [
      {
        "name": "Black",
        "reason": "Sobrang na aastigan si Navi sa kulay na black. Ito yung pinaka unang naging paborito nyang kulay kasi sobrang presko lang sa mata" 
      },
      {
        "name": "Purple",
        "reason": "Ito yung pinaka last na nagustuhan ni Navi na kulay. kasi sobrang kalmado nito tignan parang bulaklak lang na lavender yang bulaklak na yan yung pinaka dahilan kung bat nagustugan ni Navi ang purple."
      },
      {
        "name": "Red",
        "reason": "dito naman kung bat pula ang isa sa mga paboritong kulay ni navi kasi, ito ay sumisimbulo sa puso o pagmamahal yun lang naman wala ng iba pang rason."
      },
      {
        "name": "Cyan",
        "reason":"Itong kulay na to kaya nagustuhan ni Navi kasi parang katulad sya ng kalangitan sa tuwing natatakpan ng ulap ang araw, nagiging kalmado si Navi kapag nakikita nya ang kulay na to at tila pang parang ang gaan ng pakiramdam nya. Kaya pag nakita mo si Navi na nakatingin sa langit sobrang kalmado nyan."
      }],
    "hobbies": ["Making music", "Basketball", "Listening Music"],
    "food": ["Adobo", "Sinigang","Pritong manok"]
  },
  "friendgender": {
    "girl":  "Madaming kaibigang babae si Navi pero hindi ibig sabihin na gusto niya lahat. Nasasanay lang siya makipagkaibigan sa babae. Pero ako alam ko naman na isa lang taong gusto ni Navi pero di na nya muna priority yan.",
    "boy": "Bilang lang tropa/kaibigan ni Navi alam nya na yon kung sino nakikita mong kasama nya sa mga post nya sa IG, FB o kahit saang social platform matic tropa nyang malupit yon."

  },
  "listoffriend": {
    "boys": ["Adam", "Ryan", "Ibrahim", "Alnabe", "Sherwil", "Paul"],
    "girls": ["Alliah", "Mariel", "Shane"]
  },

  "notfavorite": {
    "colors": [
      { 
        "name": "Yellow", 
        "reason": "Sobrang nakakairita sa mata, at nahihilo si Navi kapag nakakakita" 
      }
      ],
        "food": [
      { "name": "Chocolate Bar, Cherry Flavor",  
        "reason": "Masyadong naiirita kapag dumidikit sa ngipin"
      }
      ],
    "person": [
      {
        "type": "Plastic at Sinungaling",
        "behavior": "Ayaw ni Navi ng plastic na tao. Malakas makaramdam si Navi kung hindi ka totoo.",
        "attitude": "Kung masyado kang dudero/dudera, matic huli mo inis ni Navi at papansinin ka nya."
      }
    ]
  },

    "crush": {
      "name": "Secret",
      "Yes": {
        "clues": [
          "Nung Pandemic nya lang nakilala",
          "Nakakausap naman sya pero bihira na",
          "Mahilig sa volleyball",
          "May buhok at mata"
        ],
        "nextStep": "Gusto mo pa ng hint tungkol sa personality niya?"
      },
      "No": "Okay, naiintindihan, puwede ka pa magtanong ng ibang bagay tungkol kay Navi."
    },

  "funfacts": [
  "Si Navi ay sobrang bait",
  "Mahilig siya sa Anime",
  "Mahilig siya sa Japanese culture",
  "Ayaw na ayaw ni Navi ng kape "
],
"quotes": [
  "Honesty is the best policy.",
  "Work hard, play hard."
],

  "stupidmessage":{
    "bobo": "Wow makabobo matalino ka bai??",
    "tanga": "Mas tnga ka siguro kesa sakin ya!",
    "gago": "Keep Barking dog!",
    "tanginamo": "Sagad mura gusto, ligo ayaw?",
    "ulol": " Ulol ka rin ya!! monggi monggi yarn?",
    "./.": "Kainin mo oh!"
  }
  
}
  
  
  sendBtn.disabled = false;
  startSuggestionBar();
}

loadKnowledgeBase();

// ============================================
// MEMORY SYSTEM
// Nagtatago ng impormasyon tungkol sa
// kasalukuyang conversation:
// - lastMessage: yung huling sinabi ng user
// - repeatCount: ilang beses na niya ulit-ulitin
// - userName: kung nagpakilala ang user
// ============================================
let memory = {
  lastMessage: "",
  repeatCount: 0,
  userName: ""
};

// ============================================
// CONVERSATION STATE
// Nagtatago ng estado ng multi-step
// conversations tulad ng crush reveal o
// color reason system.
// ============================================
let conversationState = {
  currentTopic: null,
  stepIndex: 0,
  showingReason: false,
  awaitingReasonChoice: false
};

// ============================================
// INITIAL AI MESSAGE
// Yung unang mensahe na lumalabas kapag
// binuksan ang page — parang greeting ng AI.
// ============================================
function initialAIMessage() {
  const initialMessage = "Hi, ako nga pala ang AIbot na gawa ni Navi! Maari kang magtanong ng mga bagay na gusto mo itanong at ang mga pwede mo lang itanong ay mga impormasyon na gusto mo malaman tungkol kay Navi. Salamat!";
  const aiMsg = document.createElement("div");
  aiMsg.classList.add("message", "ai");
  aiMsg.textContent = initialMessage;
  messagesContainer.appendChild(aiMsg);
  scrollToBottom();
}

// ============================================
// INTENTS — LISTAHAN NG MGA KEYWORD
// Bawat key ay may listahan ng mga salitang
// nagta-trigger ng ganung uri ng tanong.
// ============================================
const intents = {
  // === BASIC INFO ===
  owner:        ["may ari", "may-ari", "owner", "sino gumawa", "who made", "kanino to", "gawa ni sino"],
  fullname:     ["buong pangalan", "full name", "real name", "ano name ni", "pangalan niya"],
  lastname:     ["apelyido", "last name", "surname"],
  nickname:     ["nickname", "palayaw", "anong tawag", "anong pangalan"],
  about:        ["sino si navi", "ano si navi", "about navi", "kwento tungkol", "tell me about", "ipakilala"],
  age:          ["ilang taon", "edad", "age", "how old", "gulang"],
  height:       ["height", "taas", "tangkad", "gaano katangkad"],
  nationality:  ["nasyonalidad", "nationality", "pilipino ba"],
  zodiac:       ["zodiac", "zodiac sign", "birthday sign", "anong sign"],
  bday:         ["kaarawan", "birthday", "bday", "birth date", "kailan birthday"],
  placeofbirth: ["saan pinanganak", "san pinanganak", "birth place", "where born", "saan ipinanganak"],
  born:         ["kailan ipinanganak", "petsa ng kapanganakan"],
  currenthome:  ["saan nakatira", "tirahan", "nakatira saan", "where do you live", "address"],

  // === SCHOOL ===
  school:   ["school", "paaralan", "education", "nag-aral", "pinasukan"],
  elem:     ["elementary", "elem", "grade school", "primary school"],
  high:     ["high school", "junior high", "secondary school"],
  strand:   ["strand", "track", "academic strand", "senior high strand"],
  college:  ["college", "kolehiyo", "university", "course", "kurso", "degree"],
  student:  ["nag-aaral pa ba", "may school pa ba", "pumapasok pa ba", "student pa ba"],

  // === FAVORITES ===
  favecolor:        ["paboritong kulay", "favorite color", "gustong kulay", "anong kulay niya"],
  food:             ["paboritong pagkain", "favorite food", "gustong kainin", "ulam", "anong pagkain"],
  hobbies:          ["hobbies", "hilig", "libangan", "free time", "interest", "ginagawa"],
  faveplace:        ["paboritong lugar", "favorite place", "gustong puntahan", "dream destination", "travel"],
  favorites_movies: ["paboritong pelikula", "favorite movie", "movies", "film", "anong pelikula"],
  favorites_games:  ["paboritong laro", "favorite games", "games", "gaming", "anong laro"],

  // === HINDI PABORITO ===
  notfavecolor:  ["ayaw na kulay", "hindi gusto kulay", "di paboritong kulay", "not favorite color", "ayaw niyang kulay"],
  sweet:         ["ayaw na pagkain", "hindi gusto pagkain", "ayaw kainin", "not favorite food", "di gusto pagkain", "ayaw niyang pagkain"],
  notfaveperson: ["ayaw na tao", "hindi type ng tao", "di gusto tao", "ayaw na klase ng tao",  "Anong klase ng tao ang ayaw niya?"],

  // === MGA KAIBIGAN ===
  friendboy:          ["tropa", "aport", "kaibigan niya", "male friends", "kaibigan lalaki"],
  friendgirl:         ["kaibigan babae", "female friends", "babaeng kaibigan","Sino ang mga kaibigan niyang babae?"],
  listoffriend_boys:  ["sino mga tropa", "listahan ng tropa", "pangalan ng kaibigan lalaki", "mga tropa"],
  listoffriend_girls: ["sino mga kaibigan babae", "listahan ng kaibigan babae", "pangalan ng kaibigan babae"],

  // === PERSONALIDAD ===
  personality: ["personality", "ugali", "character", "traits", "strengths", "weaknesses", "ano bang klase ng tao"],
  petpeeves:   ["pet peeves", "kinaiinisan", "inis", "nakakainis sa kanya", "ayaw niya gawin ng tao"],

  // === CRUSH / TYPE ===
  // "type" ay nasa crush din kaya nauna ang types para hindi ma-intercept ng crush
  types: ["tipo sa babae", "gusto sa babae", "tipo ni", "type niya sa babae", "hinahanap niya sa babae"],
  crush: ["crush", "sino crush", "sinong gusto", "type niya", "gusto niyang tao"],

  // === EMOTIONS ===
  feeling_happy: ["kailan siya masaya", "ano nagpapasaya", "what makes him happy", "happy ba siya", "saan siya sumasaya"],
  feeling_sad:   ["kailan siya malungkot", "ano nagpapalungkot", "what makes him sad", "sad ba siya", "malungkot ba siya"],
  feeling_angry: ["paano siya magalit", "kapag galit siya", "ano ginagawa niya pag galit", "galit ba siya"],
  stress:        ["paano siya mag handle ng stress", "stress niya", "paano siya mag relax", "ano ginagawa niya pag stress", "stressed ba siya"],

  // === MINDSET ===
  mindset_life:    ["pananaw niya sa buhay", "view niya sa buhay", "ano tingin niya sa buhay", "life perspective"],
  mindset_success: ["ano ang success para sa kanya", "definition of success niya", "success niya"],
  mindset_love:    ["pananaw niya sa love", "belief niya sa pag ibig", "love para sa kanya", "paano siya tumingin sa love"],
  trust:           ["madali ba siya magtiwala", "trust issues niya", "nag titiwala ba siya agad", "mapagtiwala ba siya"],

  // === ROUTINE ===
  routine:   ["daily routine niya", "araw araw niya", "routine niya", "ginagawa niya araw araw"],
  // === GOALS ===
  goals:  ["goals niya", "mga plano niya", "targets niya", "ano gusto niya ma achieve", "ano plano niya"],
  dream:  ["pangarap niya", "dream niya", "ano gusto niya sa future"],
  future: ["future plans niya", "balak niya sa buhay", "plano niya sa buhay"],

  // === FEARS ===
  fear:        ["kinakatakutan niya", "fear niya", "ano kinakatakutan niya", "takot siya sa ano"],
  insecurities:["insecurities niya", "ano kinaka insecure niya", "insecure ba siya"],
  overthink:   ["nag ooverthink ba siya", "overthinker ba siya", "nagdadala ba siya ng problema"],

  // === SOCIAL ===
  social_public:    ["paano siya sa public", "ugali niya sa labas", "behavior niya sa labas", "paano siya sa maraming tao"],
  social_friends:   ["paano siya sa kaibigan", "ugali niya sa tropa", "paano siya sa close niya"],
  social_strangers: ["paano siya sa hindi kilala", "ugali niya sa strangers", "paano siya sa bagong tao"],

  // === LOVE STYLE ===
  relationship_status: ["single ba siya", "may jowa ba siya", "taken ba siya", "may girlfriend ba siya"],
  love_style:          ["paano siya magmahal", "love language niya", "style niya sa love", "paano siya mag-express"],
  jealous:             ["seloso ba siya", "nagseselos ba siya", "jealous ba siya"],
  ex:                  ["may ex ba siya", "past relationship niya", "nagka-relationship na ba siya"],

  // === GAMING ===
  gaming_style:    ["paano siya maglaro", "gaming style niya", "laro style niya"],
  gaming_attitude: ["ugali niya sa laro", "nagagalit ba siya sa laro", "mainitin ba ulo niya pag laro"],

  // === MUSIC ===
  music_type: ["anong music trip niya", "genre ng music niya", "music taste niya", "anong musika gusto niya"],
  music_mood: ["music niya pag sad", "music niya pag masaya", "music depende sa mood niya"],

  // === MEMORIES ===
  happy_memory:  ["pinaka masayang memory", "happiest moment niya", "pinaka masaya niya"],
  sad_memory:    ["pinaka malungkot na moment niya", "pinaka sad niya", "malungkot na memory"],
  unforgettable: ["unforgettable moment niya", "di makakalimutan na experience", "unforgettable memory"],

  // === DECISIONS ===
  decision: ["paano siya mag decide", "decision making niya", "paano siya pumili"],
  risk:     ["risk taker ba siya", "mahilig ba siya sumugal", "impulsive ba siya"],

  // === RANDOM PERSONAL ===
  habits: ["ugali niya araw araw", "bad habits niya", "good habits niya", "habits ni navi"],
  talent: ["talent niya", "anong kaya niyang gawin", "talented ba siya"],
  skills: ["skills niya", "abilities niya", "magaling siya sa ano"],

  // === OPINIONS ===
  opinion_love:  ["naniniwala ba siya sa love at first sight", "love at first sight"],
  opinion_money: ["mas importante ba pera o love", "pera o love"],
  opinion_life:  ["ano mas mahalaga sa kanya sa buhay", "priority niya sa buhay"],

  // === FUN / MISC ===
  funfacts: ["fun facts", "alam mo ba", "interesting facts", "trivia"],
  quotes:   ["paboritong quote", "favorite quote", "kasabihan", "sabi niya"],
  greet:    ["hi", "hello", "yo", "yow", "hey", "kumusta", "sup"],

  // === MGA INSULTO ===
  bobo:         ["bobo", "vovo", "8080", "slow", "hindi matalino"],
  tanga:        ["tanga", "tnga", "t4nga", "fool", "dummy"],
  gago:         ["gago", "ogag", "idiot"],
  tangina:      ["tangina", "taena", "tang-ina", "taina"],
  stupidmessage:["ulol", "joke", "stupid", "bastos"]
};

// ============================================
// CLEAN TEXT
// Inaalis ang mga special characters at
// extra spaces para mas madaling i-compare
// ang input ng user sa mga keywords.
// Halimbawa: "Ano ang AGE??" → "ano ang age"
// ============================================
function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "") // alisin ang mga special characters
    .replace(/\s+/g, " ")     // gawing isang space ang maraming spaces
    .trim();
}

// ============================================
// MATCH INTENT
// Tinitingnan kung may keyword na naglalabas
// sa query ng user.
// Ginagamit ang .includes() (hindi regex \b)
// para gumana sa Filipino words na may gitling
// tulad ng "nag-aaral" at "may-ari".
// ============================================
function matchIntent(query, keywords) {
  const cleanedQuery = cleanText(query);
  return keywords.some(word => cleanedQuery.includes(cleanText(word)));
}

// ============================================
// UPDATE MEMORY
// Tinitingnan kung paulit-ulit na nagtatanong
// ang user ng parehong tanong.
// ============================================
function updateMemory(query) {
  const cleanedQuery = cleanText(query);
  if (memory.lastMessage === cleanedQuery) {
    memory.repeatCount++;
  } else {
    memory.repeatCount = 0;
  }
  memory.lastMessage = cleanedQuery;
}

// ============================================
// DETECT NAME
// Kapag nagsabi ang user ng "ako si [pangalan]",
// itatago ang kanyang pangalan at gagamitin
// sa mga susunod na sagot para mas personal.
// ============================================
function detectName(query) {
  const q = query.toLowerCase();
  if (q.includes("ako si")) {
    const name = query.split("ako si")[1].split(" ")[0].trim();
    memory.userName = name;
    return `Ah si ${name} pala kausap ko 😏`;
  }
  return null;
}

// ============================================
// GET ITEMS FOR TOPIC
// Kinukuha ang listahan ng items para sa
// isang topic (halimbawa: lahat ng paboritong
// kulay na may kasamang reason).
// ============================================
function getItemsForTopic(topicKey) {
  switch (topicKey) {
    case "favorites_colors":
      return knowledgeBase.favorites?.colors || [];
    default:
      return [];
  }
}

// ============================================
// PROMPT REASON FOR TOPIC
// Kapag nagtanong ang user ng paboritong kulay,
// ipinakita muna ang listahan tapos tinatanong
// kung gusto niya malaman ang reason bawat isa.
// ============================================
function promptReasonForTopic(topicKey) {
  let items = getItemsForTopic(topicKey);
  if (!items || items.length === 0) return "Wala pang available na item sa topic na ito.";

  let response = `Ito ang mga ${topicKey.replace("_", " ")} ni Navi:\n`;
  items.forEach((c, idx) => {
    response += `${idx + 1}. ${c.name}\n`;
  });
  response += "\nGusto mo bang malaman kung bakit niya nagustuhan ang isa sa mga kulay na ito? Sagot ng 'Yes' o 'No'.";

  conversationState.currentTopic = topicKey;
  conversationState.stepIndex = 0;
  conversationState.showingReason = false;
  conversationState.awaitingReasonChoice = true;

  return response;
}

// ============================================
// HANDLE REASON TOPIC
// Hawak ang Yes/No conversation para sa
// color reason system.
// ============================================
function handleReasonTopic(userInput) {
  const topicKey = conversationState.currentTopic;
  if (!topicKey || !conversationState.awaitingReasonChoice) return null;

  const items = getItemsForTopic(topicKey);
  if (!Array.isArray(items) || items.length === 0) return `Walang data para sa "${topicKey}".`;

  const answer = userInput.toLowerCase().trim();

  if (!conversationState.showingReason) {
    if (/^yes$/i.test(answer)) {
      conversationState.showingReason = true;
      let list = items.map((c, idx) => `${idx + 1}. ${c.name}`).join("\n");
      return `Alin sa mga ito ang gusto mong malaman ang reason?\n${list}`;
    } else if (/^no$/i.test(answer)) {
      conversationState.currentTopic = null;
      conversationState.awaitingReasonChoice = false;
      return "Sige, hindi na ipapakita ang reasons.";
    } else {
      return "Paki sagot ng 'Yes' o 'No'.";
    }
  } else {
    const idx = parseInt(answer) - 1;
    if (!isNaN(idx) && idx >= 0 && idx < items.length) {
      const reasonText = items[idx].reason || "Walang available na reason.";
      conversationState.currentTopic = null;
      conversationState.showingReason = false;
      conversationState.awaitingReasonChoice = false;
      return `${items[idx].name}: ${reasonText}`;
    } else {
      return "Paki-type ang tamang number mula sa listahan.";
    }
  }
}

// ============================================
// HANDLE MULTI-STEP (CRUSH REVEAL)
// Step 0: Gusto mo bang malaman ang clues?
// Step 1: Gusto mo bang malaman ang personality hint?
// Step 2: Tiyak ka bang gusto mong malaman?
// Step 3: Final reveal
// ============================================
function handleMultiStep(query) {
  if (!conversationState.currentTopic) return null;

  const topic = conversationState.currentTopic;
  const q = query.toLowerCase().trim();

  if (topic === "crush") {
    const data = knowledgeBase.crush;
    const isYes = /^yes$/i.test(q);
    const isNo = /^no$/i.test(q);

    if (!isYes && !isNo) return "Paki sagot ng 'Yes' o 'No'.";

    if (conversationState.stepIndex === 0) {
      if (isYes) {
        conversationState.stepIndex = 1;
        return (data.Yes?.clues?.join("\n") || "") + "\n\n" + (data.Yes?.nextStep || "");
      } else {
        conversationState.currentTopic = null;
        conversationState.stepIndex = 0;
        return data.No?.message || "Okay 👍";
      }
    }

    if (conversationState.stepIndex === 1) {
      if (isYes) {
        conversationState.stepIndex = 2;
        return data.Yes?.firstYes?.message || "Walang data.";
      } else {
        conversationState.currentTopic = null;
        conversationState.stepIndex = 0;
        return data.Yes?.firstNo?.message || "Okay, naiintindihan!";
      }
    }

    if (conversationState.stepIndex === 2) {
      if (isYes) {
        conversationState.stepIndex = 3;
        return data.Yes?.secondYes?.message || "Walang data.";
      } else {
        conversationState.currentTopic = null;
        conversationState.stepIndex = 0;
        return data.Yes?.secondNo?.message || "Okay!";
      }
    }

    if (conversationState.stepIndex === 3) {
      if (isYes) {
        conversationState.currentTopic = null;
        conversationState.stepIndex = 0;
        return data.Yes?.secondYes?.last?.message || "Tapos na.";
      } else {
        conversationState.currentTopic = null;
        conversationState.stepIndex = 0;
        return data.Yes?.secondNo?.message || "Okay!";
      }
    }
  }

  return null;
}

// ============================================
// GET RESPONSE
// Pangunahing function na naghahanap ng tamang
// sagot batay sa intent ng tanong ng user.
// Nagbabalik ng null kapag walang nahanap —
// ginagamit ito ng sendMessage para malaman
// na kailangan ng "Sorry" + suggestion.
//
// AYOS SA ORDER:
// - Mas specific na intents ay nauna
//   (halimbawa: types bago crush, elem bago school)
//   para hindi ma-intercept ng maling intent
// ============================================
function getResponse(query) {
  const queryLower = query.toLowerCase();
  let response = null;

  if (matchIntent(queryLower, intents.greet)) {
    for (let key in knowledgeBase.greet) {
      if (queryLower.includes(key)) {
        response = knowledgeBase.greet[key];
        break;
      }
    }
    if (response === null) response = "Hi! Kumusta? 😊";

  } else if (matchIntent(queryLower, intents.owner)) {
    response = `Ang may-ari ng website na ito ay si ${knowledgeBase.name?.nickname}.\n\nBinuo nya ang system na to para masagot ng mas madalian ang mga tanong na gusto mong malaman tungkol sa kanya.\n\nKaya kung may katanungan ka, halina at atin nating sagutin.`;

  } else if (matchIntent(queryLower, intents.fullname)) {
    response = `Ang buong pangalan ni ${knowledgeBase.name?.nickname} ay\n\n${knowledgeBase.name?.first} ${knowledgeBase.name?.middle} ${knowledgeBase.name?.last}.`;

  } else if (matchIntent(queryLower, intents.lastname)) {
    response = `Ang apelyido ni ${knowledgeBase.name?.nickname} ay\n\n${knowledgeBase.name?.last}.`;

  } else if (matchIntent(queryLower, intents.nickname)) {
    response = `Ang palayaw ni ${knowledgeBase.name?.first} ay\n\n"${knowledgeBase.name?.nickname}".`;

  } else if (matchIntent(queryLower, intents.about)) {
    response = knowledgeBase.aboutme || "Walang available na info.";

  } else if (matchIntent(queryLower, intents.zodiac)) {
    response = `Ang Zodiac sign ni ${knowledgeBase.name?.nickname} ay\n\n${knowledgeBase.zodiac}.`;

  } else if (matchIntent(queryLower, intents.age)) {
    response = `Si ${knowledgeBase.name?.nickname} ay kasalukuyang ${knowledgeBase.age} taong gulang.`;

  } else if (matchIntent(queryLower, intents.height)) {
    response = `Ang height ni ${knowledgeBase.name?.nickname} ay ${knowledgeBase.height}.`;

  } else if (matchIntent(queryLower, intents.nationality)) {
    response = `Siya ay ${knowledgeBase.nationality}. Dito siya ipinanganak sa Pilipinas.`;

  } else if (matchIntent(queryLower, intents.student)) {
    response = knowledgeBase.student
      ? `Oo si ${knowledgeBase.name?.nickname} ay kasalukuyang nag-aaral pa sa ${knowledgeBase.school?.college}.`
      : `${knowledgeBase.name?.nickname} ay hindi na nag-aaral.`;

  } else if (matchIntent(queryLower, intents.bday)) {
    response = `Ang kaarawan ni ${knowledgeBase.name?.nickname} ay tuwing ${knowledgeBase.bday}.`;

  } else if (matchIntent(queryLower, intents.born)) {
    response = `Si ${knowledgeBase.name?.nickname} ay pinanganak noong ${knowledgeBase.born} sa ${knowledgeBase.placeofbirth}.`;

  } else if (matchIntent(queryLower, intents.placeofbirth)) {
    response = `Si ${knowledgeBase.name?.nickname} ay ipinanganak sa ${knowledgeBase.placeofbirth}.`;

  } else if (matchIntent(queryLower, intents.currenthome)) {
    response = `Si ${knowledgeBase.name?.nickname} ay kasalukuyang nakatira sa ${knowledgeBase.currenthome}.`;

  // Specific school queries nauna bago general "school"
  } else if (matchIntent(queryLower, intents.elem)) {
    response = `Ang elementary school ni ${knowledgeBase.name?.nickname} ay ${knowledgeBase.school?.elementary}.`;

  } else if (matchIntent(queryLower, intents.high)) {
    response = `Ang high school ni ${knowledgeBase.name?.nickname} ay ${knowledgeBase.school?.highschool}.`;

  } else if (matchIntent(queryLower, intents.strand)) {
    response = `Ang strand ni ${knowledgeBase.name?.nickname} ay ${knowledgeBase.school?.seniorHigh?.strand} sa ${knowledgeBase.school?.seniorHigh?.school}.`;

  } else if (matchIntent(queryLower, intents.college)) {
    response = `Si ${knowledgeBase.name?.nickname} ay nag-aaral ng ${knowledgeBase.school?.course} sa ${knowledgeBase.school?.college}.`;

  } else if (matchIntent(queryLower, intents.school)) {
    response = `Ito ang mga paaralan na pinasukan ni ${knowledgeBase.name?.nickname}:\n1. ${knowledgeBase.school?.elementary}\n2. ${knowledgeBase.school?.highschool}\n3. ${knowledgeBase.school?.seniorHigh?.strand} sa ${knowledgeBase.school?.seniorHigh?.school}\n4. ${knowledgeBase.school?.college}, kursong ${knowledgeBase.school?.course}`;

  } else if (matchIntent(queryLower, intents.favecolor)) {
    response = promptReasonForTopic("favorites_colors");

  } else if (matchIntent(queryLower, intents.hobbies)) {
    response = `Ang mga hilig ni ${knowledgeBase.name?.nickname} ay:\n\n${knowledgeBase.favorites?.hobbies?.join(", ")}.`;

  } else if (matchIntent(queryLower, intents.food)) {
    response = `Ang mga paboritong pagkain ni ${knowledgeBase.name?.nickname} ay:\n\n${knowledgeBase.favorites?.food?.join(", ")}.`;

  } else if (matchIntent(queryLower, intents.faveplace)) {
    response = `Ang dream na pupuntahan ni ${knowledgeBase.name?.nickname} ay\n\n${knowledgeBase.faveplace?.country?.join(", ")}.`;

  } else if (matchIntent(queryLower, intents.favorites_movies)) {
    response = `Ang mga paboritong genre ng pelikula ni ${knowledgeBase.name?.nickname} ay:\n\n${knowledgeBase.favorites?.movies?.join(", ")}.`;

  } else if (matchIntent(queryLower, intents.favorites_games)) {
    response = `Ang mga paboritong laro ni ${knowledgeBase.name?.nickname} ay:\n\n${knowledgeBase.favorites?.games?.join(", ")}.`;

  } else if (matchIntent(queryLower, intents.notfavecolor)) {
    const c = knowledgeBase.notfavorite?.colors?.[0];
    response = `Ang hindi paboritong kulay ni ${knowledgeBase.name?.nickname} ay:\n\n${c?.name}. Bakit? ${c?.reason}`;

  } else if (matchIntent(queryLower, intents.sweet)) {
    const f = knowledgeBase.notfavorite?.food?.[0];
    response = `Ang hindi gusto ni ${knowledgeBase.name?.nickname} na pagkain ay:\n\n${f?.name}. Bakit? ${f?.reason}`;

  } else if (matchIntent(queryLower, intents.notfaveperson)) {
    const p = knowledgeBase.notfavorite?.person?.[0];
    response = `Ayaw ni ${knowledgeBase.name?.nickname} ng taong\n\n${p?.type}.\n${p?.behavior}\n${p?.attitude}`;

  // List queries nauna sa general friend queries
  } else if (matchIntent(queryLower, intents.listoffriend_boys)) {
    response = `Ang mga tropa ni ${knowledgeBase.name?.nickname}:\n\n${knowledgeBase.listoffriend?.boys?.join(", ")}.`;

  } else if (matchIntent(queryLower, intents.listoffriend_girls)) {
    response = `Ang mga kaibigan niyang babae ni ${knowledgeBase.name?.nickname}:\n\n${knowledgeBase.listoffriend?.girls?.join(", ")}.`;

  } else if (matchIntent(queryLower, intents.friendboy)) {
    response = knowledgeBase.friendgender?.boy || "Walang data.";

  } else if (matchIntent(queryLower, intents.friendgirl)) {
    response = knowledgeBase.friendgender?.girl || "Walang data.";

  } else if (matchIntent(queryLower, intents.personality)) {
    const p = knowledgeBase.personality;
    response = `Personality ni ${knowledgeBase.name?.nickname}:\n`
      + `Traits: ${p?.traits?.join(", ")}\n`
      + `Strengths: ${p?.strengths?.join(", ")}\n`
      + `Weaknesses: ${p?.weaknesses?.join(", ")}\n\n`
      + `Halimbawa:\n`
      + `Strength — ${p?.examples?.strength}\n`
      + `Weakness — ${p?.examples?.weakness}`;

  } else if (matchIntent(queryLower, intents.petpeeves)) {
    response = `Ang mga pet peeves ni ${knowledgeBase.name?.nickname}:\n- ` + (knowledgeBase.petpeeves?.join("\n- ") || "Walang data.");

  // === EMOTIONS ===
  } else if (matchIntent(queryLower, intents.feeling_happy)) {
    response = knowledgeBase.emotions?.happy || "Walang data.";

  } else if (matchIntent(queryLower, intents.feeling_sad)) {
    response = knowledgeBase.emotions?.sad || "Walang data.";

  } else if (matchIntent(queryLower, intents.feeling_angry)) {
    response = knowledgeBase.emotions?.angry || "Walang data.";

  } else if (matchIntent(queryLower, intents.stress)) {
    response = knowledgeBase.emotions?.stress || "Walang data.";

  // === MINDSET ===
  } else if (matchIntent(queryLower, intents.mindset_life)) {
    response = knowledgeBase.mindset?.life || "Walang data.";

  } else if (matchIntent(queryLower, intents.mindset_success)) {
    response = knowledgeBase.mindset?.success || "Walang data.";

  } else if (matchIntent(queryLower, intents.mindset_love)) {
    response = knowledgeBase.mindset?.love || "Walang data.";

  } else if (matchIntent(queryLower, intents.trust)) {
    response = knowledgeBase.mindset?.trust || "Walang data.";

  // === ROUTINE ===
  } else if (matchIntent(queryLower, intents.routine)) {
    response = `Daily routine ni ${knowledgeBase.name?.nickname}:\n\n`
      + `☀️ Umaga: ${knowledgeBase.routine?.morning}\n`
      + `🌤️ Hapon: ${knowledgeBase.routine?.afternoon}\n`
      + `🌙 Gabi: ${knowledgeBase.routine?.night}`;

  // === GOALS ===
  // Mas specific (dream, future) nauna bago general "goals"
  } else if (matchIntent(queryLower, intents.dream)) {
    response = `Ang pangarap ni ${knowledgeBase.name?.nickname}:\n\n`
      + `Personal: ${knowledgeBase.goals?.personal}`;

  } else if (matchIntent(queryLower, intents.future)) {
    response = `Ang future plans ni ${knowledgeBase.name?.nickname}:\n\n`
      + `Long-term: ${knowledgeBase.goals?.longTerm}`;

  } else if (matchIntent(queryLower, intents.goals)) {
    response = `Mga goals ni ${knowledgeBase.name?.nickname}:\n\n`
      + `Short-term: ${knowledgeBase.goals?.shortTerm}\n`
      + `Long-term: ${knowledgeBase.goals?.longTerm}\n`
      + `Personal: ${knowledgeBase.goals?.personal}`;

  // === FEARS ===
  } else if (matchIntent(queryLower, intents.insecurities)) {
    // Mas specific nauna bago general "fear"
    response = knowledgeBase.fears?.insecurity || "Walang data.";

  } else if (matchIntent(queryLower, intents.overthink)) {
    response = `Overthinker ba si ${knowledgeBase.name?.nickname}? ${knowledgeBase.fears?.insecurity || "Walang data."}`;

  } else if (matchIntent(queryLower, intents.fear)) {
    response = `Ang pinakanakatakot para kay ${knowledgeBase.name?.nickname}:\n\n${knowledgeBase.fears?.biggest}\n\nSa social: ${knowledgeBase.fears?.social}`;

  // === SOCIAL ===
  } else if (matchIntent(queryLower, intents.social_friends)) {
    response = `Si ${knowledgeBase.name?.nickname} sa mga kaibigan niya:\n\n${knowledgeBase.social?.friends}`;

  } else if (matchIntent(queryLower, intents.social_strangers)) {
    response = `Si ${knowledgeBase.name?.nickname} sa mga hindi niya kilala:\n\n${knowledgeBase.social?.strangers}`;

  } else if (matchIntent(queryLower, intents.social_public)) {
    response = `Si ${knowledgeBase.name?.nickname} sa public:\n\n${knowledgeBase.social?.public}`;

  // === LOVE STYLE ===
  } else if (matchIntent(queryLower, intents.relationship_status)) {
    // Kinukuha mula sa friendgender data — kung may sinasabing "isa lang taong gusto"
    response = `Based sa mga alam ko, ${knowledgeBase.friendgender?.girl?.includes("isa lang") ? `may isang espesyal na tao para kay ${knowledgeBase.name?.nickname} pero hindi pa priority ngayon. 😏` : `Si ${knowledgeBase.name?.nickname} ay currently single. 💁`}`;

  } else if (matchIntent(queryLower, intents.jealous)) {
    response = `Seloso ba si ${knowledgeBase.name?.nickname}? ${knowledgeBase.loveStyle?.jealousy}`;

  } else if (matchIntent(queryLower, intents.ex)) {
    response = `Tungkol sa past relationship ni ${knowledgeBase.name?.nickname}, wala akong sapat na impormasyon doon. Baka si Navi mismo ang makakapagsagot niyan. 😅`;

  } else if (matchIntent(queryLower, intents.love_style)) {
    response = `Love style ni ${knowledgeBase.name?.nickname}:\n\n`
      + `💬 Approach: ${knowledgeBase.loveStyle?.approach}\n`
      + `💪 Effort: ${knowledgeBase.loveStyle?.effort}\n`
      + `❤️ Loyalty: ${knowledgeBase.loveStyle?.loyalty}\n`
      + `😤 Jealousy: ${knowledgeBase.loveStyle?.jealousy}`;

  // === GAMING ===
  } else if (matchIntent(queryLower, intents.gaming_attitude)) {
    // Mas specific nauna bago gaming_style
    response = `Ugali ni ${knowledgeBase.name?.nickname} sa laro:\n\n${knowledgeBase.gaming?.attitude}\n\nNagra-rage ba? ${knowledgeBase.gaming?.rage}`;

  } else if (matchIntent(queryLower, intents.gaming_style)) {
    response = `Gaming style ni ${knowledgeBase.name?.nickname}:\n\n${knowledgeBase.gaming?.style}`;

  // === MUSIC ===
  } else if (matchIntent(queryLower, intents.music_mood)) {
    // Mas specific nauna bago music_type
    response = `Music ni ${knowledgeBase.name?.nickname} depende sa mood:\n\n`
      + `😊 Pag masaya: ${knowledgeBase.music?.happy}\n`
      + `😢 Pag malungkot: ${knowledgeBase.music?.sad}`;

  } else if (matchIntent(queryLower, intents.music_type)) {
    response = `Music taste ni ${knowledgeBase.name?.nickname}:\n\n${knowledgeBase.music?.vibe}`;

  // === MEMORIES ===
  } else if (matchIntent(queryLower, intents.happy_memory)) {
    response = `Pinaka masayang memory ni ${knowledgeBase.name?.nickname}:\n\n${knowledgeBase.memories?.happy}`;

  } else if (matchIntent(queryLower, intents.sad_memory)) {
    response = `Pinaka malungkot na moment ni ${knowledgeBase.name?.nickname}:\n\n${knowledgeBase.memories?.sad}`;

  } else if (matchIntent(queryLower, intents.unforgettable)) {
    response = `Di makakalimutang moment ni ${knowledgeBase.name?.nickname}:\n\n${knowledgeBase.memories?.unforgettable}`;

  // === DECISIONS ===
  } else if (matchIntent(queryLower, intents.risk)) {
    // Mas specific nauna bago decision
    response = `Risk taker ba si ${knowledgeBase.name?.nickname}? ${knowledgeBase.decisions?.risk}`;

  } else if (matchIntent(queryLower, intents.decision)) {
    response = `Paano nagde-decide si ${knowledgeBase.name?.nickname}:\n\n`
      + `${knowledgeBase.decisions?.style}\n`
      + `Kapag nagkamali: ${knowledgeBase.decisions?.mistake}`;

  // === RANDOM PERSONAL ===
  } else if (matchIntent(queryLower, intents.habits)) {
    response = `Random facts tungkol kay ${knowledgeBase.name?.nickname}:\n- `
      + (knowledgeBase.randomFacts?.join("\n- ") || "Walang data.");

  } else if (matchIntent(queryLower, intents.talent)) {
    response = `Ang mga talent ni ${knowledgeBase.name?.nickname} ay nakabase sa kanyang hobbies:\n\n${knowledgeBase.favorites?.hobbies?.join(", ")}.`;

  } else if (matchIntent(queryLower, intents.skills)) {
    response = `Si ${knowledgeBase.name?.nickname} ay nag-aaral ng Computer Science kaya magaling siya sa tech. Bukod doon: ${knowledgeBase.favorites?.hobbies?.join(", ")}.`;

  // === OPINIONS ===
  } else if (matchIntent(queryLower, intents.opinion_love)) {
    response = knowledgeBase.mindset?.love || "Walang data.";

  } else if (matchIntent(queryLower, intents.opinion_money)) {
    response = `Para kay ${knowledgeBase.name?.nickname}, ang sagot dyan ay nasa kanyang mindset sa buhay:\n\n"${knowledgeBase.mindset?.life}"`;

  } else if (matchIntent(queryLower, intents.opinion_life)) {
    response = `Ang pinaka-importante para kay ${knowledgeBase.name?.nickname} sa buhay:\n\n"${knowledgeBase.mindset?.life}"\n\nAt ang success para sa kanya: "${knowledgeBase.mindset?.success}"`;

  // === TYPES — nauna bago CRUSH para hindi ma-intercept ng "type niya" keyword ===
  } else if (matchIntent(queryLower, intents.types)) {
    response = `Ang tipo ni ${knowledgeBase.name?.nickname} sa babae:\n- ` + (knowledgeBase.types?.type?.join("\n- ") || "Walang data.");

  // === CRUSH ===
  } else if (matchIntent(queryLower, intents.crush)) {
    if (knowledgeBase.crush?.name === "Secret") {
      conversationState.currentTopic = "crush";
      conversationState.stepIndex = 0;
      conversationState.showingReason = false;
      conversationState.awaitingReasonChoice = false;
      response = `Ah, ang crush ni ${knowledgeBase.name?.nickname} ay isang secret! Gusto mo bang malaman ang mga clues? Sagot lang ng 'Yes' para magsimula.`;
    } else {
      response = `Ang crush ni ${knowledgeBase.name?.nickname} ay si\n\n${knowledgeBase.crush?.name}.`;
    }

  } else if (matchIntent(queryLower, intents.funfacts)) {
    response = `Fun facts tungkol kay ${knowledgeBase.name?.nickname}:\n- ` + (knowledgeBase.funfacts?.join("\n- ") || "Walang data.");

  } else if (matchIntent(queryLower, intents.quotes)) {
    response = `Mga kasabihan ni ${knowledgeBase.name?.nickname}:\n- ` + (knowledgeBase.quotes?.join("\n- ") || "Walang data.");

  // === MGA INSULTO ===
  } else if (matchIntent(queryLower, intents.bobo)) {
    response = knowledgeBase.stupidmessage?.bobo || "Wow ha!";

  } else if (matchIntent(queryLower, intents.tanga)) {
    response = knowledgeBase.stupidmessage?.tanga || "Ikaw nga!";

  } else if (matchIntent(queryLower, intents.gago)) {
    response = knowledgeBase.stupidmessage?.gago || "Keep barking!";

  } else if (matchIntent(queryLower, intents.tangina)) {
    response = knowledgeBase.stupidmessage?.tanginamo || "Ligo ka muna!";

  } else if (matchIntent(queryLower, intents.stupidmessage)) {
    for (let key in knowledgeBase.stupidmessage) {
      if (queryLower.includes(key)) {
        response = knowledgeBase.stupidmessage[key];
        break;
      }
    }
  }

  return response;
}

// ============================================
// DISPLAY AI MESSAGE
// Gumagawa ng bagong div para sa AI message
// at nagdadagdag nito sa messages container.
// ============================================
function displayAIMessage(text) {
  const aiMsg = document.createElement("div");
  aiMsg.classList.add("message", "ai");
  messagesContainer.appendChild(aiMsg);
  typeWriter(text, aiMsg, 20); // 20ms bawat character
  scrollToBottom();
}

// ============================================
// TYPEWRITER EFFECT
// Nagpapakita ng text nang isa-isang letra
// para parang nagta-type ang AI.
// speed = milliseconds bawat letra
// ============================================
function typeWriter(text, container, speed = 50) {
  container.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      container.textContent += text.charAt(i);
      container.scrollTop = container.scrollHeight;
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// ============================================
// SEND MESSAGE
// Pangunahing function na tumatakbo kapag
// nag-send ang user ng mensahe. Dumadaan
// sa mga checks sa sumusunod na order:
// 1. Non-topic short replies (nice, wow, etc.)
// 2. Multi-step conversation (crush reveal)
// 3. Awaiting Yes/No (color reason system)
// 4. Repeat detection (paulit-ulit na tanong)
// 5. Name detection (ako si ...)
// 6. Regular intent matching
// ============================================
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user");
  userMsg.textContent = text;
  messagesContainer.appendChild(userMsg);
  scrollToBottom();
  userInput.value = "";

  updateMemory(text);

  // === CHECK 1: Non-topic short replies ===
  const nonTopicResponses = {
    "nice":    "Nice!! 😎",
    "edi wow": "Edi Wowers",
    "wow":     "Wow na wow nga 😲",
    "haha":    "Hahahaha funny yarn? 😄",
    "hahaha":  "Hahaha happy sya oh! 😂",
    "sige":    "ge man 👍",
    "okay":    "Ocsicakes! 👌",
    "mhm":     "Mhm 🙂",
    "cool":    "Coolangot 😎",
    "ty":      "Walang anuman",
    "thanks":  "Walang anuman",
    "salamat": "Walang anuman",
    "baliw ka ba":  "Hindi ah nandito lang ako para sagutin yung tanong mo",
    "adik ka ba":   "nope hindi ako adik safe to!",
    "oa":          "maka oa ah?"
  };

  const lowerText = text.toLowerCase();
  const matchedKey = Object.keys(nonTopicResponses).find(word =>
    new RegExp(`\\b${word}\\b`, "i").test(lowerText)
  );

  if (matchedKey) {
    const baseReply = nonTopicResponses[matchedKey];
    displayAIMessage(`${baseReply}\n\n👉 Ito pa ang iba pwede mong itanong about kay boss Navi:\n\n ${getNextSuggestion()}`);
    return;
  }

  // === CHECK 2: Multi-step conversation (crush reveal) ===
  if (conversationState.currentTopic && !conversationState.awaitingReasonChoice) {
    const response = handleMultiStep(text);
    if (response) { displayAIMessage(response); return; }
  }

  // === CHECK 3: Awaiting Yes/No (color reason system) ===
  if (conversationState.awaitingReasonChoice) {
    const response = handleReasonTopic(text);
    if (response) { displayAIMessage(response); return; }
  }

  // === CHECK 4: Repeat memory check ===
  if (!conversationState.currentTopic && !conversationState.awaitingReasonChoice) {
    if (memory.repeatCount === 1) {
      const msg = memory.userName
        ? `${memory.userName}, natanong mo na yan ah 😏`
        : `Parang natanong mo na yan 😏\n\n👉 Pwede mong itanong: ${getNextSuggestion()}`;
      displayAIMessage(msg);
      return;
    } else if (memory.repeatCount === 2) {
      const msg = memory.userName
        ? `${memory.userName}, pa ulit ulit?? wala na bang ibang tanong? 😂`
        : `Pa ulit ulit?? wala na bang ibang tanong 😂\n\n👉 Pwede mong itanong: ${getNextSuggestion()}`;
      displayAIMessage(msg);
      return;
    } else if (memory.repeatCount >= 3) {
      const msg = memory.userName
        ? `${memory.userName}, kulit neto oh, balakajan! 😂`
        : `Kulit neto oh, balakajan! 😂`;
      displayAIMessage(msg);
      return;
    }
  }

  // === CHECK 5: Name detection ===
  const nameResponse = detectName(text);
  if (nameResponse) { displayAIMessage(nameResponse); return; }

  // === CHECK 6: Regular intent matching ===
  let response = getResponse(text);
  if (response === null) {
    response = `Sorry, hindi ko maintindihan ang tanong mo. 😅\n\n👉 Pero pwede mo itong itanong kung gusto mo pa magkaroon ng kaalaman about kay boss Navi:\n\n ${getNextSuggestion()}`;
  }
  displayAIMessage(response);
}

// ============================================
// SCROLL TO BOTTOM
// Awtomatikong nag-s-scroll pababa ang
// messages container kapag may bagong mensahe.
// ============================================
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ============================================
// EVENT LISTENERS
// - "load" = kapag natapos mag-load ang page
// - "click" sa sendBtn = kapag pinindot ang send
// - "keypress" sa input = kapag pinindot ang Enter
// ============================================
window.addEventListener("load", initialAIMessage);
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
