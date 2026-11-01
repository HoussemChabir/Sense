import en from './src/i18n/en.js';

// The home page's trip planner (src/main.js) posts each brief to /api/brief, kept in the D1 database "sense" (the briefs
// table, migrations/). Every other request is a file from dist/.
const fields = ['lang', 'name', 'email', 'month', 'travelers', 'interests'];
// The form's own limits (src/templates.js), checked again here as anyone can post.
const valid = b => fields.every(k => typeof b?.[k] === 'string') && /^[a-z]{2}$/.test(b.lang)
  && b.name.trim() && b.name.length <= 100 && b.email.length <= 254 && /^[^\s@]+@[^\s@]+$/.test(b.email)
  && /^(\d{4}-\d{2})?$/.test(b.month) && en.ui.planner.travelerOptions.includes(b.travelers) && b.interests.length <= 2000;

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/api/brief') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return new Response(null, {status: 405, headers: {Allow: 'POST'}});
    const b = await request.json().catch(() => null);
    if (!valid(b)) return new Response(null, {status: 400});
    await env.DB.prepare('INSERT INTO briefs (lang, name, email, month, travelers, interests) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(b.lang, b.name.trim(), b.email.trim(), b.month || null, b.travelers, b.interests.trim() || null).run();
    return new Response(null, {status: 201});
  },
};
