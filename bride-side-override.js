/*
  Bride-side settings layered on top of Version 57's config.js.
  Crucially this does not change WEDDING.photos or WEDDING.music, so using
  these files over a COPY of the latest groom-side repo preserves its exact
  uploaded desktop/mobile photographs and audio.
  Google Calendar needs an end time. Since none was specified for these new
  ceremonies, the links use an EDITABLE one-hour placeholder, NOT a declared
  actual event ending time. The displayed event times remain 'onwards'.
  Countdown remains 2026-12-13 20:00 IST as explicitly requested.
*/
(() => {
  const w = window.WEDDING;
  if (!w) throw new Error('Load config.js before bride-side-override.js');
  w.events = [
    {
      title: 'Mehandi',
      date: '11 DECEMBER 2026',
      time: '6:00 p.m. onwards',
      message: '“An evening of henna, laughter, and cherished moments as our celebrations begin.”',
      venue: 'Own Residence, Mahananda Pally, Malda',
      mapsUrl: '', // No View Directions button for this event
      googleCalendarTitle: 'Malika & Sourav - Mehandi',
      googleCalendarStart: '20261211T180000',
      googleCalendarEnd: '20261211T190000', // editable 1-hour placeholder
      googleCalendarDescription: 'Mehandi on Friday, 11 December 2026 from 6:00 PM IST onwards. Join our celebration! Event ending time is not specified; please adjust the calendar end time if needed.',
      googleCalendarLocation: 'Own Residence, Mahananda Pally, Malda, West Bengal, India'
    },
    {
      title: 'Haldi',
      date: '13 DECEMBER 2026',
      time: '11:00 a.m. onwards',
      message: '“Join us for a sunlit celebration of turmeric, laughter, love, and blessings.”',
      venue: 'Mahananda Pally, Malda',
      mapsUrl: 'https://maps.app.goo.gl/CpzfpoBqnjp4r3gaA',
      googleCalendarTitle: 'Malika & Sourav - Haldi',
      googleCalendarStart: '20261213T110000',
      googleCalendarEnd: '20261213T120000', // editable 1-hour placeholder
      googleCalendarDescription: 'Haldi on Sunday, 13 December 2026 from 11:00 AM IST onwards. Celebrate with Malika and Sourav! Event ending time is not specified; please adjust the calendar end time if needed. Map: https://maps.app.goo.gl/CpzfpoBqnjp4r3gaA',
      googleCalendarLocation: 'Mahananda Pally, Malda, West Bengal, India'
    },
    {
      title: 'The Wedding',
      date: '13 DECEMBER 2026',
      time: '7:00 p.m. onwards',
      message: '“With love and blessings, join us as Malika and Sourav begin their forever.”',
      venue: 'Sukanta Smriti Sangha Club, Mahananda Pally',
      mapsUrl: 'https://maps.app.goo.gl/CpzfpoBqnjp4r3gaA',
      googleCalendarTitle: 'Malika & Sourav - The Wedding',
      googleCalendarStart: '20261213T190000',
      googleCalendarEnd: '20261213T200000', // editable 1-hour placeholder
      googleCalendarDescription: 'Wedding on Sunday, 13 December 2026 from 7:00 PM IST onwards. Celebrate Malika and Sourav! Event ending time is not specified; please adjust the calendar end time if needed. Map: https://maps.app.goo.gl/CpzfpoBqnjp4r3gaA',
      googleCalendarLocation: 'Sukanta Smriti Sangha Club, Mahananda Pally, Malda, West Bengal, India'
    }
  ];
})();
