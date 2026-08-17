export const birthdayConfig = {
  // 1. Personalization Placeholders
  birthdayPerson: "My Love",        // [BIRTHDAY_PERSON_NAME]
  senderName: "Your Name",           // [YOUR_NAME]
  birthdayDate: "2026-08-18",         // [BIRTHDAY_DATE] YYYY-MM-DD format (will be parsed in IST)
  specialNickname: "Sweetheart",      // [SPECIAL_NICKNAME]
  firstMemory: "Our first coffee date under the rain", // [OUR_FIRST_MEMORY]
  specialMessage: "You are the best chapter of my life.", // [SPECIAL_MESSAGE]
  finalMessage: "Thank you for being the highlight of my universe. I love you, always.", // [FINAL_MESSAGE]

  heroTitle: "Happy Birthday, My Love ❤️",
  heroSubtitle: "To the person who makes my world a little brighter every single day.",
  
  wishResponse: "I hope every wish you make today finds its way to you. And if I get one wish too... I would wish for many more birthdays by your side. ❤️",

  // 2. Music Configuration (Optional: will load from public/music/our-song.mp3)
  music: {
    title: "Our Special Song",
    artist: "Our Artist",
    file: "/music/our-song.mp3", // Put your mp3 file in public/music/our-song.mp3
  },

  // 3. Our Song Section Details
  ourSongSection: {
    title: "Our Song",
    subtitle: "The melody that will always remind me of us.",
    description: "Whenever this song plays, time slows down and I think of you. It's the background music to our greatest moments. It represents the quiet, deep, and comforting love we share.",
    lyrics: [
      "No matter where I go, I'm always looking for you.",
      "In every crowded room, in every quiet space.",
      "You are the rhythm to my heartbeat,",
      "And the light that guides me home. ❤️"
    ]
  },

  // 4. "Our Little Story" Timeline of memories
  memories: [
    {
      date: "The Beginning",
      title: "Where everything started...",
      description: "Our first meeting, when my world changed forever.",
      image: "/images/memory1.svg",
    },
    {
      date: "First Memorable Moment",
      title: "Our First Memory",
      description: "The moment I knew you were someone extremely special to me.",
      image: "/images/memory2.svg",
    },
    {
      date: "The Best Days",
      title: "Some of My Favorite Times",
      description: "Laughter, long walks, and endless talks that I will cherish forever.",
      image: "/images/memory3.svg",
    },
    {
      date: "Today & Beyond",
      title: "And Here We Are",
      description: "Still smiling, still in love, celebrating you today and every day after.",
      image: "/images/memory4.svg",
    }
  ],

  // 5. Photo Gallery with Captions
  gallery: [
    {
      url: "/images/gallery1.svg",
      caption: "That smile of yours...",
      date: "Spring"
    },
    {
      url: "/images/gallery2.svg",
      caption: "Holding your hand fits perfectly.",
      date: "Summer"
    },
    {
      url: "/images/gallery3.svg",
      caption: "Quiet mornings with you.",
      date: "Autumn"
    },
    {
      url: "/images/gallery4.svg",
      caption: "Every adventure is better with you.",
      date: "Winter"
    },
    {
      url: "/images/gallery5.svg",
      caption: "Celebrating small moments.",
      date: "New Year's Eve"
    },
    {
      url: "/images/gallery6.svg",
      caption: "My favorite photo of you.",
      date: "Recent Day"
    }
  ],

  // 6. Reasons I Love You (At least 10)
  reasons: [
    "Your laugh is my absolute favorite sound in the world.",
    "The way you make ordinary moments feel like magic.",
    "Because I can be completely myself around you without any filters.",
    "Your kindness and how deeply you care for everyone around you.",
    "The way you look at me and make me feel so safe and loved.",
    "How you support my dreams, even the silly ones.",
    "Your warmth, which makes the coldest days feel bright.",
    "The cute faces you make when you're thinking or focused.",
    "How you make me want to be a better person every single day.",
    "Because you are my home, my best friend, and my happy place."
  ],

  // 7. Things I Want To Do With You (Bucket List)
  bucketList: [
    { id: 1, text: "Watch a sunset on a quiet beach", checked: false },
    { id: 2, text: "Go on a spontaneous late-night road trip", checked: false },
    { id: 3, text: "Build a cozy blanket fort and watch movies all night", checked: false },
    { id: 4, text: "Cook a complex dinner together from scratch", checked: false },
    { id: 5, text: "Travel to a city we've never been to together", checked: false },
    { id: 6, text: "Take a rainy day walk sharing a single umbrella", checked: false }
  ],

  // 8. Interactive quiz questions
  quiz: {
    title: "One Little Game Before You Go... 😌❤️",
    questions: [
      {
        question: "Where did we first meet?",
        options: ["In a cozy cafe", "Online / Social Media", "Through a mutual friend", "At a sweet surprise place"],
        correctIndex: 2,
      },
      {
        question: "What was our first memorable moment?",
        options: ["A late-night walk under the stars", "Sharing a warm cup of coffee", "Getting caught in the rain together", "A long conversation until morning"],
        correctIndex: 0,
      },
      {
        question: "What is my absolute favorite thing about you?",
        options: ["Your cute smile", "Your beautiful soul", "Your contagious laughter", "Everything!"],
        correctIndex: 3,
      },
      {
        question: "Which memory would I choose to relive with you?",
        options: ["Our first date", "That one cozy evening trip", "Every single second I spend with you", "Our first kiss"],
        correctIndex: 2,
      },
      {
        question: "What do I call you most often when we're alone?",
        options: ["Babe", "My Love", "Sweetheart", "A secret cute nickname"],
        correctIndex: 1,
      }
    ]
  },

  // 9. Reasons You Are Special Floating Cards
  specialReasons: [
    "You make me smile without even trying.",
    "You make difficult days feel light and easy.",
    "You are my safe place in a chaotic world.",
    "You make ordinary moments memorable.",
    "You are the best thing that ever happened to me."
  ],

  // 10. Love Letter
  letter: {
    envelopeText: "You have a letter waiting for you...",
    buttonText: "Open Letter 💌",
    body: `To my favorite person,

Happy Birthday! 

Today is a celebration of you—the beautiful soul who entered my life and filled it with warmth, laughter, and an endless stream of happy memories. It's rare to find someone who fits so perfectly into your world, who understands your silences just as much as your jokes, and who supports you with a gentle, unwavering love.

Thank you for being my constant, my confidante, and my greatest adventure. I treasure every single memory we've made, and I look forward to the countless ones still waiting for us in the future.

May this year bring you all the joy, love, and magic you so richly deserve. I love you more than words can say.

Happy Birthday, my love. ❤️`
  },

  // 11. Birthday Surprise Box
  gift: {
    heading: "There is still one more surprise...",
    buttonText: "Open the Gift 🎁",
    message: "If I could give you one thing today, it would be the ability to see yourself through my eyes — so you could see just how incredibly special you are to me. ❤️",
    finalWishes: "Happy Birthday, My Love!"
  },

  // 12. Easter Egg Config
  easterEgg: {
    clickHeartCount: 5,
    secretMessage: "Psst... I still have one more thing to say... I will love you, always and forever. No matter what. You are my forever. ❤️"
  }
};
