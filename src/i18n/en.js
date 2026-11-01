// The interface words in English, the site's first language. Each language file in this folder has the same keys, plus
// its translation of src/content.js (experiences, journeys, destinations and alts, by slug or photo name).
import { brand } from '../content.js';

export default {
  name: 'English', locale: 'en_GB',
  ui: {
    skip: 'Skip to content',
    chat: `Chat with ${brand.name} on WhatsApp (${brand.phone})`,
    language: 'Language',
    slogan: brand.slogan,
    description: brand.description,
    nav: {main: 'Main navigation', mobile: 'Mobile navigation', destinations: 'Destinations', experiences: 'Experiences', journeys: 'Our journeys'},
    startPlanning: 'Start planning',
    hero: {title: 'Tunisia, with a local host.', subtitle: 'Private days and tailor-made trips, from the Tunis medina to the Sahara.', button: 'Plan your private journey', scroll: 'Let your curiosity lead', place: 'The Sahara, Tunisia'},
    discover: 'Discover Tunisia',
    instruction: 'Click on a place. Follow what moves you.',
    atlas: {
      title: 'Interactive map of Tunisia',
      desc: 'Illustrated Tunisia with Algeria to the west, Libya to the southeast, and the Mediterranean along the north and east. Six selectable destinations: Tunis, the Mediterranean coast, Kairouan and El Jem, Tozeur, the Sahara, and Djerba.',
      algeria: 'ALGERIA', libya: 'LIBYA', north: 'N', heading: ['Discover', 'Tunisia.'],
      // Each destination's label, one array item per line; `mobile` replaces a label on the narrow map.
      names: {north: ['Tunis &', 'the North'], coast: ['The Mediterranean', 'Coast'], history: ['The Historic Heart', 'Kairouan & El Jem'], oasis: ['Tozeur &', 'the Oases'], sahara: ['The Sahara'], island: ['Djerba &', 'the South']},
      mobile: {coast: ['The', 'Mediterranean', 'Coast']},
    },
    explore: name => `Explore ${name.replace(/^The /, 'the ')}`,
    interlude: {title: 'Some places stay<br/>in your photographs.<br/>Others stay<br/>in your soul.', text: 'Tunisia is the second kind.', signature: 'The sense of a place.'},
    feel: {title: 'Don’t just see Tunisia.<br/>Feel it.', text: ['The scent of jasmine in a medina lane. The first bite of a family recipe. The silence after a Saharan sunset.', 'Go a little deeper. Meet the people. Follow what moves you.']},
    journeys: {label: `${brand.name} signature days`, title: 'A little inspiration.', text: 'Every journey starts with a spark. Here are a few of ours. <br/>Made to inspire. Always made your own.', of: duration => `${duration} of discovery`, card: (title, duration) => `Explore ${title}, ${duration} of discovery`, explore: 'Explore this journey', note: 'A starting point, never a fixed itinerary. Every detail can be shaped around you.'},
    planner: {
      label: 'A journey, made personal', title: 'What does your<br/>Tunisia look like?', text: 'Tell us a little about your kind of escape, and we’ll shape the journey with you.',
      name: 'Your name', namePlaceholder: 'First name', email: 'Email address', emailPlaceholder: 'you@example.com', month: 'When would you like to go?',
      // The first item of each pair is the saved value, the same in every language, so a brief saved in one reads back in another.
      travelers: 'Who’s coming?', travelerOptions: ['Just me', 'Two travelers', 'Family', 'A group of friends'],
      interests: 'What’s calling you?', interestsPlaceholder: 'Desert nights, local food, a place by the sea…',
      consent: `I agree that ${brand.name} keeps these details to plan my trip with me.`,
      submit: 'Send my trip brief', note: 'We use your details only to plan your trip. A copy stays in this browser, and you can download or delete it at any time.',
    },
    closeDialog: 'Close dialog',
    footer: {home: `${brand.name} home`, discover: 'Discover:', ourTunisia: 'Our Tunisia', destinations: 'Destinations:', contact: 'Contact:', where: 'Tunisia, North Africa', plan: 'Plan your journey', privacy: 'Privacy & your data', curious: 'Made for the curious.'},
    back: {journey: 'All journeys', destination: 'Back to the atlas', experience: 'All experiences', home: 'Back home'},
    pageNav: 'More pages like this', previous: 'Previous', next: 'Next',
    exploreMore: 'Explore more', experiencesHere: 'Experiences here',
    experience: {eyebrow: count => `Experience Tunisia · ${count}`, cta: 'Make this part of my trip'},
    journey: {eyebrow: (duration, count) => `A ${brand.name} signature day · ${duration} · ${count}`, hours: 'See the day, hour by hour', cta: 'Make this day mine', steps: 'The day, step by step.', service: 'The service, in detail.', outline: 'An illustrative outline. Final arrangements, availability, and pricing are confirmed when we shape the day around you.'},
    destination: {eyebrow: count => `Discover Tunisia · ${count}`, cta: 'Plan a journey here', sense: name => `The sense of ${name}`, deeper: 'Go deeper.<br/>Stay curious.', local: 'Local experiences', personal: 'Your Tunisia, made personal', story: 'Let this place become part of your story.', plan: 'Plan my journey'},
    offer: 'Starting price per person, based on two guests',
    home: {title: `${brand.name} | Private Tours & Tailor-Made Trips`, description: `${brand.name} designs private, host-led days and tailor-made trips across Tunisia: the Tunis medina, Carthage, Sidi Bou Saïd, the Sahara and Djerba.`},
    greet: {home: `Hi ${brand.name}, I’d like to plan a trip to Tunisia.`, experience: title => `Hi ${brand.name}, I’m interested in the ${title} experience.`, page: title => `Hi ${brand.name}, I’m interested in ${title}.`},
    notFound: {title: 'Page not found', description: 'This page wandered off. Find your way back to the atlas of Tunisia, our signature days and every experience from the medina to the Sahara.', h1: 'This path wandered off.', lead: 'The page you were looking for isn’t here.', text: 'Choose a place on the atlas, or start from one of our signature days.', button: 'Explore the atlas'},
    // main.js reads these from the home page; {name} is the visitor's name.
    app: {
      openMenu: 'Open menu', closeMenu: 'Close menu',
      briefIntro: `Hi ${brand.name}, here is my Tunisia trip brief.`, send: 'Send my brief on WhatsApp',
      briefName: 'Name', briefEmail: 'Email', briefMonth: 'Month', briefTravelers: 'Travelers', briefInterests: 'Interests', flexible: 'Flexible', open: 'Open to discovery',
      unsavedTitle: 'Your browser couldn’t save this brief.', unsavedText: 'Allow local storage and try again, or send the brief to us on WhatsApp now.',
      savedTitle: 'Your Tunisia is taking shape.', savedText: 'Your trip brief is saved on this device, {name}. Send it to us on WhatsApp to start planning together.', sentText: 'Thank you, {name}: your trip brief has reached us, and we’ll be in touch soon. To start planning right away, send it on WhatsApp too.',
      when: 'When', travelers: 'Travelers', inspiration: 'Your inspiration', flexibleDates: 'Flexible dates',
      download: 'Download my brief', edit: 'Edit my brief', delete: 'Delete saved brief',
      fileTitle: 'SENSE — YOUR TUNISIA TRIP BRIEF', fileNote: 'This is your trip brief, not a confirmed booking.', fileName: 'my-tunisia-trip-brief.txt',
      deletedTitle: 'Your brief has been deleted.', deletedText: 'The saved trip details have been removed from this browser.', newBrief: 'Start a new brief',
      privacyTitle: 'Your data, handled with care.',
      privacyText: [`When you send your trip brief, ${brand.name} keeps it only to plan your trip with you, and no reservation is made. A copy stays in local storage on this device. To have us delete your brief, just ask on WhatsApp.`, 'There are no cookies or advertising trackers: we only measure anonymous page views and loading speed. All photography and fonts are served from this website. You can remove your saved details below.'],
      clear: 'Delete my saved details', cleared: `All saved ${brand.name} details have been removed from this browser.`,
    },
  },
};
