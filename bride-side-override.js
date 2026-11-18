/*
  Bride-side settings layered on top of Version 57's config.js.
  Crucially this does not change WEDDING.photos or WEDDING.music, so using
  these files over a COPY of the latest groom-side repo preserves its exact
  uploaded desktop/mobile photographs and audio.
  Google Calendar links use the confirmed start/end times for each event,
  in Asia/Kolkata (IST). Visible event-card times remain 'onwards'.
  Countdown is 2026-12-13 19:00 IST (7:00 p.m.).
*/
(() => {
  const w = window.WEDDING;
  if (!w) throw new Error('Load config.js before bride-side-override.js');
  w.countdownTarget = '2026-12-13T19:00:00+05:30'; // 13 Dec 2026, 7:00 PM IST
  w.events = [
    {
      title: 'Mehandi',
      date: '11 DECEMBER 2026',
      time: '6:00 p.m. onwards',
      message: '“An evening of henna, music, dance and cherished moments as our celebrations begin.”',
      venue: 'Own Residence, Mahananda Pally, Malda',
      venueLines: ['Own Residence, Mahananda Pally', 'Malda'],
      mapsUrl: '', // No View Directions button for this event
      googleCalendarTitle: 'Malika & Sourav - Mehandi',
      googleCalendarStart: '20261211T180000',
      googleCalendarEnd: '20261211T220000', // 10:00 PM IST
      googleCalendarDescription: 'Mehandi on Friday, 11 December 2026, from 6:00 PM to 10:00 PM IST. Join our celebration!',
      googleCalendarLocation: 'Own Residence, Mahananda Pally, Malda, West Bengal, India'
    },
    {
      title: 'Haldi',
      date: '13 DECEMBER 2026',
      time: '11:00 a.m. onwards',
      message: '“Join us for a sunlit celebration of turmeric, laughter, love, and blessings.”',
      venue: 'Own Residence, Mahananda Pally, Malda',
      venueLines: ['Own Residence, Mahananda Pally', 'Malda'],
      mapsUrl: '', // Hide View Directions button for Haldi
      googleCalendarTitle: 'Malika & Sourav - Haldi',
      googleCalendarStart: '20261213T110000',
      googleCalendarEnd: '20261213T140000', // 2:00 PM IST
      googleCalendarDescription: 'Haldi on Sunday, 13 December 2026, from 11:00 AM to 2:00 PM IST. Celebrate with Malika and Sourav!',
      googleCalendarLocation: 'Own Residence, Mahananda Pally, Malda, West Bengal, India'
    },
    {
      title: 'The Wedding',
      date: '13 DECEMBER 2026',
      time: '7:00 p.m. onwards',
      message: '“Join us as we exchange our vows and start our new journey together forever.”',
      venue: 'Sukanta Smriti Sangha Club, Mahananda Pally, Malda',
      venueLines: ['Sukanta Smriti Sangha Club', 'Mahananda Pally, Malda'],
      mapsUrl: 'https://maps.app.goo.gl/CpzfpoBqnjp4r3gaA',
      googleCalendarTitle: 'Malika & Sourav - The Wedding',
      googleCalendarStart: '20261213T190000',
      googleCalendarEnd: '20261213T230000', // 11:00 PM IST
      googleCalendarDescription: 'Wedding on Sunday, 13 December 2026, from 7:00 PM to 11:00 PM IST. Celebrate Malika and Sourav! Map: https://maps.app.goo.gl/CpzfpoBqnjp4r3gaA',
      googleCalendarLocation: 'Sukanta Smriti Sangha Club, Mahananda Pally, Malda, West Bengal, India'
    }
  ];
})();
