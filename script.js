// SLIDESHOW
const slides = document.querySelectorAll('.slide');
let sIdx = 0;
function showSlide(i){
  slides.forEach(s=>s.classList.remove('active'));
  slides[i].classList.add('active');
}
if(slides.length){
  showSlide(0);
  setInterval(()=>{ sIdx=(sIdx+1)%slides.length; showSlide(sIdx); }, 4200);
}

// YEAR
const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

// TEMPLATE FILTER
const toolbarButtons = document.querySelectorAll('.toolbar button');
const cards = document.querySelectorAll('.template');
toolbarButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    toolbarButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c=>{
      const tags = c.dataset.tags || '';
      c.style.display = (f==='all' || tags.includes(f)) ? 'block' : 'none';
    });
  });
});

// PREVIEW MODAL
function ensureModal(){
  if(document.getElementById('modal')) return;
  // modal exists in markup; this is just safeguard
}
document.querySelectorAll('.preview').forEach((b)=>{
  b.addEventListener('click', ()=>{
    const src = b.dataset.src;
    const modal = document.getElementById('modal');
    const img = document.getElementById('modalImg');
    if(img) img.src = src;
    if(modal) modal.hidden = false;
  });
});
document.querySelectorAll('.modal-close').forEach(c=>c.addEventListener('click', ()=>{ document.getElementById('modal').hidden = true; }));
document.getElementById('modal')?.addEventListener('click', (e)=>{ if(e.target.id==='modal') document.getElementById('modal').hidden = true; });

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  q?.addEventListener('click', ()=> {
    item.classList.toggle('open');
    const a = item.querySelector('.faq-a');
    if(item.classList.contains('open')) a.style.maxHeight = a.scrollHeight + 'px';
    else a.style.maxHeight = 0;
  });
});

// BACK TO TOP
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=> {
  if(window.scrollY > 600) { toTop.style.display = 'block'; } else { toTop.style.display = 'none'; }
});
toTop?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// FORM SUBMIT (frontend-only): show thank you popup (no backend connected)
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  // simple validation (optional)
  if(!data.name || !data.phone || !data.email){
    alert('Please fill name, phone and email.');
    return;
  }
  // show nice message and reset
  alert(`🎉 Thanks ${data.name}! Your enquiry has been received. We'll get back to you soon.`);
  form.reset();
});

// MOBILE HAMBURGER
const hamb = document.querySelector('.hamburger');
hamb?.addEventListener('click', ()=>{
  const links = document.querySelector('.nav-links');
  if(getComputedStyle(links).display === 'none' || links.style.display === '') {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '72px';
    links.style.right = '20px';
    links.style.background = 'rgba(255,255,255,0.98)';
    links.style.padding = '12px';
    links.style.borderRadius = '12px';
    links.style.boxShadow = '0 14px 40px rgba(11,8,6,.06)';
  } else {
    links.removeAttribute('style');
  }
});
