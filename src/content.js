// The site's words. src/templates.js renders them into static pages at build time (see vite.config.js); the browser
// bundle imports only `whatsapp` and `brand` from here, so none of the page text ships as JavaScript.
export const SITE = 'https://www.sensetunisia.com';
export const whatsapp = 'https://wa.me/21627757537';
// The brand, one way everywhere: page titles, structured data, the footer, llms.txt and the WhatsApp greetings. Add a
// profile to `sameAs` only once it is live.
export const brand = {
  name:'Sense Tunisia', alternateNames:['sensetunisia', 'Sense'], handle:'sensetunisia', slogan:'Extraordinary Tunisia', phone:'+216 27 757 537',
  instagram:'https://www.instagram.com/sensetunisia/', sameAs:['https://www.instagram.com/sensetunisia/'],
  description:'Sense Tunisia designs private days and tailor-made trips across Tunisia with local hosts, from the Tunis medina to the Sahara.',
};

// `index: false` keeps a page out of search results and the sitemap until its copy is ready for them. `where` is the
// destination an experience happens in, and `related` (journeys, destinations) lists [type, slug] pages to link to.
export const experiences = [
  {slug:'sahara-adventure', index:false, where:'sahara', title:'Adventure', image:'exp-adventure', kicker:'Out here, you feel everything.', subtitle:'Follow the dunes. Find your own way.', description:'Leave the road behind at Douz and head into the Grand Erg Oriental. Walk the dunes with a local guide, share a slow-cooked dinner at camp, and let the desert sky set the pace.', seo:{title:'Sahara Adventure: Dunes & Desert Camps', description:'Leave the road at Douz for the Grand Erg Oriental: dune walks with a local guide, a slow-cooked dinner at camp and a desert sky that sets the pace.'}},
  {slug:'food', index:false, where:'tunis', title:'Culinary', image:'exp-culinary', kicker:'Every flavor tells a story.', subtitle:'A generous table. A thousand stories.', description:'Taste Tunisia through its kitchens: crisp brik, fragrant couscous, local olive oil, and the gentle heat of harissa. Browse a market, meet the makers, and sit down to a meal that takes its time.', seo:{title:'Tunisian Food Experiences: Markets & Makers', description:'Crisp brik, fragrant couscous, local olive oil and the gentle heat of harissa: taste Tunisia through its kitchens, markets and makers.'}},
  {slug:'culture', index:false, where:'tunis', title:'Culture', image:'exp-culture', kicker:'Traditions that come alive.', subtitle:'Layers of history, lived every day.', description:'Follow the blue doors of Sidi Bou Saïd, explore the lanes of the Tunis medina, and stand among the remains of Carthage. Tunisia’s history is part of the everyday, from architecture to music and craft.', seo:{title:'Cultural Trips: Medinas & Craft', description:'The blue doors of Sidi Bou Saïd, the lanes of the Tunis medina and the remains of Carthage: Tunisian history and craft, lived every day.'}},
  {slug:'family', index:false, where:'sahara', title:'Family', image:'exp-family', kicker:'Little moments. Lifelong memories.', subtitle:'Small discoveries. Big memories.', description:'Camel tracks, sand dunes, ancient arenas, and time by the sea. Build a family journey around curiosity, with shorter travel days, welcoming places to stay, and plenty of room to play.', seo:{title:'Family Holidays', description:'Camel tracks, sand dunes, ancient arenas and time by the sea: a family journey through Tunisia built around curiosity, with shorter travel days.'}},
  {slug:'roman-tunisia', index:false, where:'kairouan-el-jem', title:'Ancient worlds', image:'exp-ancient-worlds', kicker:'Walk through centuries of history.', subtitle:'Take the long way back in time.', description:'Walk into the great amphitheatre at El Jem and imagine the scale of Roman Africa. Pair celebrated sites with quieter archaeological landscapes and guides who bring the details to life.', seo:{title:'Roman Tunisia: El Jem & Ancient Sites', description:'Walk into the great amphitheatre at El Jem and imagine Roman Africa, with quieter archaeological landscapes and guides who bring the details to life.'}},
  {slug:'local-life', index:false, where:'cap-bon-coast', title:'Go local', image:'exp-go-local', kicker:'Meet the people. Feel the place.', subtitle:'The people make the place.', description:'Spend time with ceramic makers, market traders, and guides who know their hometowns by heart. These are unhurried encounters, made with respect for people’s work and daily lives.', seo:{title:'Meet Local Makers & Hosts', description:'Time with ceramic makers, market traders and guides who know their hometowns by heart: unhurried encounters in Tunisia, made with respect.'}},
  {slug:'off-the-beaten-path', index:false, where:'djerba', title:'Off the beaten path', image:'exp-off-the-beaten-path', kicker:'Discover what others never see.', subtitle:'Let curiosity lead.', description:'Explore the remarkable earth-carved courtyards around Matmata, the hilltop villages of the south, and landscapes that seem to belong to another world.', seo:{title:'Off the Beaten Path: Matmata & the South', description:'The earth-carved courtyards around Matmata, the hilltop villages of the south and landscapes that seem to belong to another world.'}},
];
// `price` is the starting price per person in euros; `places` name the stops for search engines.
export const journeys = [
  {slug:'tunis-way-of-life', title:'The Tunisian way of life', duration:'A full day', image:'souk-medina', route:'Tunis · Medina · Sidi Bou Saïd', price:149, places:['Medina of Tunis','Sidi Bou Saïd'], related:[['destination','tunis'],['experience','culture'],['experience','food']], seo:{title:'Tunis Local Life Day: Medina & Sidi Bou Saïd', description:'A Sense Tunisia signature day: breakfast with a local host, the Tunis medina souks, lunch and Sidi Bou Saïd. Private, from €149 per person, meals included.'}, description:'For a day, don’t just visit — live it. Breakfast with a local host, the souks and courtyards of the Medina, a shared Tunisian lunch, then an afternoon of blue doors and sea air in Sidi Bou Saïd.', days:[
    ['Morning','Breakfast with your host','Begin the Tunisian way — coffee or mint tea, fresh bread, and the quiet conversation that opens every real day here. Hear your host’s stories, learn the shape of the city you’re about to walk, and let the pace find you.'],
    ['Late morning','Inside the Medina of Tunis','Follow winding alleyways through lively souks: the scent of spices, artisans still working with inherited techniques, hidden courtyards, and the stories behind familiar objects. When arranged, step inside a workshop for a hands-on moment with the maker.'],
    ['Midday','A traditional Tunisian lunch','Share an unhurried table — brik, couscous, or ojja — and learn why food in Tunisia is less a meal than a language. Taste, discuss, linger. The table is where strangers stop being strangers.'],
    ['Afternoon','Sidi Bou Saïd & the Mediterranean','Travel to the whitewashed village above the sea. Blue doors, winding streets, sweeping views. Pause for a traditional sweet and mint tea, and swap conversation about the customs, humour, and everyday realities of Tunisian life.'],
    ['Early evening','What stays with you','No landmarks ticked off a list, but a day genuinely lived: a conversation, a new taste, a shared laugh, a face. Tunisia stops being another country you have visited and becomes somewhere you have known.'],
  ], details:[
    ['How long is it?','Full day, approximately 7–8 hours — from morning breakfast to late afternoon in Sidi Bou Saïd.'],
    ['What is included?','Local breakfast with your host, guided exploration of the Medina with cultural encounters and craftsmanship moments, a traditional Tunisian lunch, the afternoon in Sidi Bou Saïd with tastings, and personal hosting throughout.'],
    ['How much is it?','€149 per person, based on two guests. Private hosting, meals, tastings, and local transfers included. Final pricing confirmed when the day is tailored to you.'],
    ['Can it be tailored?','Dietary needs, pace, workshop interests, and areas of the Medina to focus on — all adjusted after a short conversation before the day begins.'],
    ['How do I book?','Send us a message on WhatsApp. We shape the day with you, then confirm the details and the final price before it begins.'],
  ]},
  {slug:'carthage-sidi-bou-said', title:'The Carthage & Blue escape', duration:'A full day', image:'carthage', hero:'blue-way', route:'Carthage · Sidi Bou Saïd · Mediterranean', accent:'turquoise', price:129, places:['Archaeological Site of Carthage','Sidi Bou Saïd'], related:[['destination','tunis'],['experience','roman-tunisia'],['experience','culture']], seo:{title:'Carthage & Sidi Bou Saïd Private Day Tour', description:'A Sense Tunisia signature day: the ruins of Carthage, Sidi Bou Saïd’s blue lanes, lunch and mint tea by the sea. Private, 7–8 hours, from €129 per person.'}, description:'Where ancient history meets the Mediterranean soul. Walk the ruins of a civilisation that shaped the sea, then climb the hill to the blue-and-white village that painters never stopped returning to.', days:[
    ['Morning','The ancient world of Carthage','Step into one of the Mediterranean’s great civilisations. Among ruins and coastal viewpoints, hear the stories of the Phoenicians and the Romans — and how centuries of layered history still shape Tunisian life today.'],
    ['Late morning','The streets of Sidi Bou Saïd','Climb to the iconic blue-and-white village above the sea. Beyond the postcard, wander narrow alleys and hidden corners, read the traditional architecture, and feel the atmosphere that has drawn artists and travellers for generations.'],
    ['Midday','A Tunisian table','Settle into a carefully chosen local restaurant. Taste traditional dishes, hear the origins behind them, and let the meal take its time — as a Tunisian meal is meant to.'],
    ['Afternoon','Mint tea above the Mediterranean','Pause for traditional mint tea with a view of the sea. Perhaps a freshly made bambalouni, perhaps a conversation with a local craftsman — the afternoon unfolds at the village’s own pace.'],
    ['Early evening','What you carry home','Not just photographs of beautiful places, but the stories, flavours, and feelings of a Tunisia you have genuinely connected with — shared throughout the day by a host, not a script.'],
  ], details:[
    ['How long is it?','Full day, approximately 7–8 hours — from the ruins of Carthage to the sea views of Sidi Bou Saïd.'],
    ['What is included?','Guided visit to the Carthage archaeological sites and coastal viewpoints, exploration of Sidi Bou Saïd with cultural and architectural insights, a traditional Tunisian lunch, afternoon tastings (mint tea, bambalouni), and personal hosting throughout.'],
    ['How much is it?','€129 per person, based on two guests. Entries to the Carthage sites, meals, tastings, and local transfers included. Final pricing confirmed when the day is tailored to you.'],
    ['Can it be tailored?','Depth of history, walking pace, time among the ruins versus the village, and craft or art stops — all adjusted after a short conversation before the day begins.'],
    ['How do I book?','Send us a message on WhatsApp. We shape the day with you, then confirm the details and the final price before it begins.'],
  ]},
];
// `key` places a destination on the atlas (templates.js); `guide` is [heading, ...sentences] per section, run together as one paragraph.
export const destinations = [
  {key:'north', slug:'tunis', title:'Tunis & the North', tag:'Medinas, blue doors & ancient worlds', text:'Wander the medina, trace the history of Carthage, and watch the light change over Sidi Bou Saïd. A beautiful beginning.', image:'sidi-landscape', accent:'turquoise', experiences:['Tunis medina with a local storyteller','Carthage at the quietest hour','A slow afternoon in Sidi Bou Saïd'], culture:'Ottoman courtyards, Roman ruins and contemporary creative life meet in Tunisia’s layered capital.', gallery:['sidi-bou-said','souk-medina','carthage'], places:['Medina of Tunis','Archaeological Site of Carthage','Sidi Bou Saïd','Bardo National Museum','Dougga'], related:[['experience','culture'],['experience','food']], seo:{title:'Tunis, Carthage & Sidi Bou Saïd Trips', description:'Medina mornings, the ruins of Carthage and the blue village of Sidi Bou Saïd: how to experience Tunisia’s capital region, and when to go.'}, guide:[
    ['What to see?',
      '<strong>Medina of Tunis.</strong> UNESCO-listed old town of souks, mosques and palaces.',
      '<strong>Carthage.</strong> Punic and Roman ruins, from Byrsa Hill to the Antonine Baths by the sea.',
      '<strong>Sidi Bou Saïd.</strong> Blue-and-white village on a cliff above the Gulf of Tunis.',
      '<strong>Bardo Museum.</strong> One of the world’s great collections of Roman mosaics.',
      '<strong>Dougga.</strong> North Africa’s best-preserved small Roman town, a day trip west.'],
    ['When to go?','March to May and September to November. Summers are hot, winters mild.'],
    ['How to get there?','Tunis–Carthage airport is next to the city, and the TGM train runs to Carthage and Sidi Bou Saïd. Both our signature days start here: <a href="/journeys/tunis-way-of-life/">the Tunisian way of life</a> and <a href="/journeys/carthage-sidi-bou-said/">the Carthage & Blue escape</a>.'],
  ]},
  {key:'coast', slug:'cap-bon-coast', title:'The Mediterranean Coast', tag:'Sea air & slower days', text:'From the ceramics of Nabeul to long, sunlit lunches by the water, follow a coastline made for lingering.', image:'kelibia', accent:'turquoise', experiences:['Ceramics and markets in Nabeul','A private coastal picnic','Harbour walks and hidden coves'], culture:'Fishing towns, garden villas and generations of ceramic craft give the coast its easy, lived-in character.', gallery:['carpets','picnic','sidi-bou-said'], places:['Nabeul','Hammamet','Kerkouane','Kelibia','El Haouaria'], related:[['experience','local-life'],['experience','food']], seo:{title:'Cap Bon & the Mediterranean Coast', description:'Nabeul ceramics, the medina of Hammamet, Punic Kerkouane and the harbour at Kelibia: what to see on Cap Bon, when to go and how to get there.'}, guide:[
    ['What to see?',
      '<strong>Nabeul.</strong> Tunisia’s best-known pottery town, with a Friday market.',
      '<strong>Hammamet.</strong> A walled medina by the sea and a summer arts festival.',
      '<strong>Kerkouane.</strong> The only Punic town that survives, a UNESCO site.',
      '<strong>Kelibia.</strong> A fishing port below a hilltop fortress.',
      '<strong>El Haouaria.</strong> Seaside quarries that supplied stone for Carthage.'],
    ['When to go?','May to October for swimming. In March, Nabeul distils its orange blossom.'],
    ['How to get there?','Nabeul is about an hour’s drive from Tunis; Kelibia and Kerkouane about two.'],
  ]},
  {key:'history', slug:'kairouan-el-jem', title:'The Historic Heart Kairouan & El Jem', shortTitle:'The Historic Heart', tag:'Kairouan & El Jem', text:'Discover a quieter rhythm among monumental architecture, intricate craft, and one of the world’s great Roman amphitheatres.', image:'el-jem', experiences:['The Great Mosque of Kairouan','El Jem with an expert guide','Traditional weaving workshops'], culture:'Sacred architecture, scholarly traditions and Roman engineering reveal the depth of inland Tunisia.', gallery:['rouma','exp-ancient-worlds','workshop'], places:['Great Mosque of Kairouan','Aghlabid Basins','Amphitheatre of El Jem','El Jem Museum'], related:[['experience','roman-tunisia'],['experience','culture']], seo:{title:'Kairouan & El Jem, the Historic Heart', description:'The Great Mosque of Kairouan and El Jem’s Roman amphitheatre: what to see in Tunisia’s historic heart, when to go and how to get there.'}, guide:[
    ['What to see?',
      '<strong>Great Mosque of Kairouan.</strong> Founded in 670, with a prayer hall on hundreds of ancient columns.',
      '<strong>Kairouan medina.</strong> UNESCO-listed, known for carpets and makroudh, a date pastry.',
      '<strong>Aghlabid Basins.</strong> 9th-century reservoirs just outside the walls.',
      '<strong>El Jem.</strong> A Roman amphitheatre for 35,000 spectators, one of the best preserved anywhere.',
      '<strong>El Jem Museum.</strong> Roman mosaics from the ancient town.'],
    ['When to go?','Spring and autumn. Inland summers are very hot. Dress modestly for mosque visits.'],
    ['How to get there?','Each is about two hours’ drive from Tunis. El Jem is also about three hours by train.'],
  ]},
  {key:'oasis', slug:'tozeur', title:'Tozeur & the Oases', tag:'Palm groves & mountain springs', text:'Ochre brickwork, shaded date palms, and the dramatic oasis landscapes of Chebika. A different kind of desert discovery.', image:'tozeur', experiences:['Walk Tozeur’s palm groves','Mountain oases at Chebika','Sunset over Chott el Djerid'], culture:'Distinctive brickwork, date-palm agriculture and desert water traditions shape everyday life around the oases.', gallery:['chebika','7ssan','chott-sunset'], places:['Tozeur','Chebika','Tamerza','Chott el Djerid','Nefta'], related:[['experience','sahara-adventure'],['experience','off-the-beaten-path']], seo:{title:'Tozeur, Chebika & the Oases', description:'Patterned brick and palm groves in Tozeur, mountain oases at Chebika and Tamerza, sunset over Chott el Djerid: planning a trip to Tunisia’s oasis country.'}, guide:[
    ['What to see?',
      '<strong>Tozeur.</strong> A huge palm grove and an old quarter of patterned brick.',
      '<strong>Chebika, Tamerza and Mides.</strong> Mountain oases with springs, near the Algerian border.',
      '<strong>Chott el Djerid.</strong> The Sahara’s largest salt flat, crossed by a raised road.',
      '<strong>Nefta.</strong> A palm-filled hollow, the Corbeille, and many Sufi shrines.',
      '<strong>Mos Espa.</strong> The Star Wars set from The Phantom Menace, out in the dunes.'],
    ['When to go?','October to April. Summers are extremely hot.'],
    ['How to get there?','Tozeur is about 430 km from Tunis by road, or about an hour by plane. The Sahara at Douz is across the chott.'],
  ]},
  {key:'sahara', slug:'sahara', title:'The Sahara', tag:'Douz & the Grand Erg Oriental', text:'Beyond Douz, the road gives way to a sea of sand. Walk with a local guide, find a quiet camp, and look up after dark.', image:'sahara-dunes', experiences:['Dune walks with a local guide','A night beneath the stars','Tea and stories around the fire'], culture:'Nomadic knowledge, desert hospitality and an intimate understanding of the land guide every journey here.', gallery:['sahara-camp','etoile','sahara-camels'], places:['Douz','Grand Erg Oriental','Ksar Ghilane'], related:[['experience','sahara-adventure'],['experience','family']], seo:{title:'The Sahara from Douz: Dunes & Desert Camps', description:'Walk the Grand Erg Oriental from Douz with a local guide, sleep at a desert camp and see the stars: seasons, places and how to get there.'}, guide:[
    ['What to see?',
      '<strong>Douz.</strong> The gateway town, with a vast palm grove and a Thursday market.',
      '<strong>Grand Erg Oriental.</strong> Sand dunes that begin just outside Douz.',
      '<strong>Ksar Ghilane.</strong> An oasis with a warm spring and a Roman fort nearby.',
      '<strong>Festival of the Sahara.</strong> Camel races, music and poetry in Douz, late December.'],
    ['When to go?','October to April. Winter nights are cold; summer is too hot for desert walks.'],
    ['How to get there?','Douz is about seven hours’ drive from Tunis. Flying to Tozeur or Djerba cuts the journey.'],
  ]},
  {key:'island', slug:'djerba', title:'Djerba & the South', tag:'Island life & earth-carved villages', text:'Whitewashed villages, pottery workshops, and warm island light. Pair Djerba with the remarkable architecture of Matmata.', image:'djerba-island', accent:'turquoise', experiences:['Pottery in Guellala','Djerba’s villages by bicycle','Earth-carved homes around Matmata'], culture:'Island communities, Amazigh heritage and southern building traditions create a region unlike anywhere else.', gallery:['djerba','dolphin','guelala'], places:['Houmt Souk','El Ghriba Synagogue','Guellala','Matmata','Ksar Ouled Soltane','Chenini'], related:[['experience','off-the-beaten-path'],['experience','local-life']], seo:{title:'Djerba, Guellala & Matmata', description:'Island villages, Guellala pottery, the street art of Erriadh and the earth-carved homes of Matmata: what to see in Djerba and the south, and when to go.'}, guide:[
    ['What to see?',
      '<strong>Djerba.</strong> An island of white villages and farmsteads, UNESCO-listed since 2023.',
      '<strong>Houmt Souk.</strong> The main town, with markets and a harbour.',
      '<strong>Erriadh.</strong> El Ghriba, often called Africa’s oldest synagogue, and street art on the village walls.',
      '<strong>Guellala.</strong> A pottery village with a heritage museum.',
      '<strong>Matmata.</strong> Underground homes; one became Luke Skywalker’s house in Star Wars.',
      '<strong>Ksar Ouled Soltane and Chenini.</strong> Hilltop granaries and a cave village near Tataouine.'],
    ['When to go?','Mild most of the year. Spring and autumn for exploring, summer for the beach.'],
    ['How to get there?','About an hour’s flight from Tunis, with direct flights from Europe. A causeway links the island to the mainland.'],
  ]},
];

// Alt text for every photo the pages show: what the picture contains.
export const alts = {
  'hero-desktop':'Two travellers looking across the golden dunes of the Tunisian Sahara',
  'beach-interlude':'Aerial view of a turquoise Mediterranean bay with a crescent of sand dotted with colourful umbrellas',
  'exp-adventure':'A camel caravan crossing the golden dunes of the Sahara',
  'exp-culinary':'Couscous, a tajine, brik and a clay dish of ojja on a candlelit table',
  'exp-culture':'Painted ceramic plates and woven rugs on a white wall with blue window grilles',
  'exp-family':'Parents and their son in embroidered blue traditional clothes, smiling in a bright living room',
  'exp-ancient-worlds':'Aerial view of the Roman amphitheatre of El Jem among the houses of the town',
  'exp-go-local':'A craftsman hammering a pattern into a brass plate in his workshop',
  'exp-off-the-beaten-path':'Whitewashed courtyard of an underground home with a blue door, Matmata',
  'souk-medina':'Shoppers walking through a vaulted souk lined with rugs and leather goods in the Tunis medina',
  'carthage':'Ruins of ancient Carthage on a hillside above the Gulf of Tunis',
  'blue-way':'Cobbled street of white houses with blue doors and bougainvillea in Sidi Bou Saïd',
  'sidi-landscape':'Sidi Bou Saïd terraces and a white dome above the marina and the Gulf of Tunis',
  'sidi-bou-said':'Café terrace with striped benches and blue parasols above the bay of Sidi Bou Saïd',
  'kelibia':'Aerial view of the fortress of Kelibia above a turquoise bay and a long sandy beach',
  'carpets':'Woven rugs, kilims and cushions hanging outside a shop',
  'picnic':'Picnic of pastries, bread and tea on a gingham blanket below a stone aqueduct',
  'el-jem':'Arched walls inside the amphitheatre of El Jem at golden hour, with two visitors',
  'rouma':'Roman temple and columns at an ancient site under a blue sky',
  'workshop':'A smiling man in a red chechia and a blue robe in a shop full of brass lanterns and teapots',
  'tozeur':'Waterfall pouring into a turquoise pool among palms in a mountain oasis near Tozeur',
  'chebika':'Palm trees around a clear spring at the foot of red cliffs at Chebika',
  '7ssan':'A white horse and carriage waiting under date palms in the oasis',
  'chott-sunset':'Sunset reflected in the shallow salt water of Chott el Djerid',
  'sahara-dunes':'Rippled sand dunes and palm trees at sunset in the Tunisian Sahara',
  'sahara-camp':'Three men talking around a campfire in the desert at night',
  'etoile':'A red pickup truck and a tent under a starry desert sky',
  'sahara-camels':'A guide leading travellers on camels across orange dunes',
  'djerba-island':'Whitewashed building with a blue door and a tower on Djerba',
  'djerba':'White houses, palms and a minaret on Djerba, with the sea behind',
  'dolphin':'A dolphin leaping near a tour boat in turquoise water',
  'guelala':'A potter guiding a girl at the wheel in a pottery workshop in Guellala',
};
