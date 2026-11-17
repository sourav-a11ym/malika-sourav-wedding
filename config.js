/*
  Sourav & Malika wedding invitation — edit these values as details arrive.
  The countdown targets 8:00 PM on 13 December 2026 in India (IST), matching the wedding ceremony time.
  Event venues and starting times are supplied by the couple.
  Verify Google Maps place pins before sending to guests; spelling in public listings may vary.
*/
window.WEDDING = {
  groomFirst: 'Sourav',
  brideFirst: 'Malika',
  groomFull: 'Sourav Mondal',
  brideFull: 'Malika Mandal',
  groomParents: 'Son of Late Chandi Charan Mondal and Mrs. Bela Rani Mondal',
  brideParents: 'Daughter of Mr. Madhusudan Mandal and Mrs. Sima Mandal',
  groomQuote: '“To love and be loved is to feel the sun from both sides. Join us as we begin our forever.”',
  brideQuote: '“Two souls with but a single thought, two hearts that beat as one.”',
  weddingDay: '2026-12-13',
  countdownTarget: '2026-12-13T20:00:00+05:30', // wedding countdown target in IST
  thankYou: '“Your presence and blessings will make our celebrations truly special.”',
  invitationMessage: 'As two hearts become one, it would be an honour to have you beside us. Together with our families, we invite you to share in our joy and grace our wedding with your love, laughter, and blessings as we begin our new chapter.',
  music: 'assets/wedding-background.mp3', // New uploaded wedding invitation music; starts when OPEN INVITATION is tapped
  // Our Moments: provide separate desktop and mobile crops for each photo.
  // Replace each placeholder with its matching filename in /assets.
  photos: {
    main: {
      desktop: 'assets/couple-main-desktop.jpg', // e.g. assets/couple-main-desktop.jpg
      mobile: 'assets/couple-main-mobile.jpg'   // e.g. assets/couple-main-mobile.jpg
    },
    second: {
      desktop: 'assets/couple-second-desktop.jpg', // e.g. assets/couple-second-desktop.jpg
      mobile: 'assets/couple-second-mobile.jpg'   // e.g. assets/couple-second-mobile.jpg
    },
    third: {
      desktop: 'assets/couple-third-desktop.jpg', // e.g. assets/couple-third-desktop.jpg
      mobile: 'assets/couple-third-mobile.jpg'   // e.g. assets/couple-third-mobile.jpg
    }
  },
  events: [
    {
      title: 'Gaye Holud',
      date: '12 DECEMBER 2026',
      time: '10:00 a.m. onwards',
      message: '“A morning filled with laughter, love, and the vibrant hues of yellow”',
      venue: 'Hotel Rajeswari, Rupnarayanpur',
      mapQuery: 'Hotel Rajeswari, Rupnarayanpur, West Bengal, India',
      directionsQuery: 'Hotel Rajeswari, Rupnarayanpur, West Bengal, India',
      mapsUrl: 'https://maps.app.goo.gl/3vjf57obmkW1v1sS6',
      googleCalendarTitle: 'Sourav & Malika - Gaye Holud',
      googleCalendarStart: '20261212T100000',
      googleCalendarEnd: '20261212T140000', // confirmed event end: 2:00 PM IST
      googleCalendarDescription: 'Gaye Holud on 12 December 2026, 10:00 AM–2:00 PM IST. Please join us!\nLocation: https://maps.app.goo.gl/3vjf57obmkW1v1sS6',
      googleCalendarLocation: 'Hotel Rajeswari, Rupnarayanpur, West Bengal, India'
    },
    {
      title: 'The Wedding',
      date: '13 DECEMBER 2026',
      time: '8:00 p.m. onwards',
      message: '“Join us as we exchange our vows and start our new journey together forever.”',
      venue: 'Malda, West Bengal',
      mapQuery: 'Sukanta Smrity Sangha, Mahananda Pally, Malda, West Bengal 732102, India',
      directionsQuery: 'Sukanta Smriti Sangha Club, Malda, West Bengal, India',
      mapsUrl: 'https://maps.app.goo.gl/3X3SJCGxn1JZmqJu7',
      googleCalendarTitle: 'Sourav & Malika - The Wedding',
      googleCalendarStart: '20261213T200000',
      googleCalendarEnd: '20261213T230000', // confirmed event end: 11:00 PM IST
      googleCalendarDescription: 'Wedding ceremony on 13 December 2026, 8:00–11:00 PM IST. We look forward to celebrating with you!\nMap location: https://maps.app.goo.gl/3X3SJCGxn1JZmqJu7',
      googleCalendarLocation: 'Sukanta Smriti Sangha Club, Malda, West Bengal, India',
    },
    {
      title: 'Reception',
      date: '15 DECEMBER 2026',
      time: '7:00 p.m. onwards',
      message: '“Celebrate a beautiful new beginning with us.”',
      venue: 'Rajeswari Palace, Rupnarayanpur',
      mapQuery: 'Rajeswari Palace, West Rangamatia, Rupnarayanpur, Paschim Bardhaman, West Bengal 713364, India',
      directionsQuery: 'Rajeswari Palace, Rupnarayanpur, West Bengal, India',
      mapsUrl: 'https://maps.app.goo.gl/fCmybTgS9mjhGtnt6',
      googleCalendarTitle: 'Sourav & Malika - Reception',
      googleCalendarStart: '20261215T190000',
      googleCalendarEnd: '20261215T230000', // confirmed event end: 11:00 PM IST
      googleCalendarDescription: 'Reception on 15 December 2026, 7:00–11:00 PM IST. We look forward to celebrating with you!\nMap location: https://maps.app.goo.gl/fCmybTgS9mjhGtnt6',
      googleCalendarLocation: 'Rajeswari Palace, Rupnarayanpur, West Bengal, India',
    }
  ]
};
