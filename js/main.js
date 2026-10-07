// Mobile menu
const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('site-nav');
btn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});

// Contact form: posts to Formspree (set the action URL in contact.html)
const form = document.getElementById('contact-form');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('form-status');
  if (form.website.value) return; // honeypot caught a bot
  if (!form.checkValidity()) {
    status.textContent = 'Please fill in every required field with a valid value.';
    status.className = 'status err';
    return;
  }
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error();
    form.reset();
    status.textContent = 'Message sent. Thank you, I will reply soon.';
    status.className = 'status ok';
  } catch {
    status.textContent = 'Message not sent. Email me directly at rameenaamir26@outlook.com.';
    status.className = 'status err';
  }
});
// Copy email button (fallback when no mail app is set up)
const copyBtn = document.getElementById('copy-email');
copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('rameenaamir26@outlook.com');
    copyBtn.textContent = 'Copied!';
  } catch {
    copyBtn.textContent = 'Press Ctrl+C';
  }
  setTimeout(() => (copyBtn.textContent = 'Copy'), 2000);
});