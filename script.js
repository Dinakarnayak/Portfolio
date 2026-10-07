(()=>{try{const saved=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch{document.documentElement.dataset.theme='dark'}})();
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const header = document.querySelector("header");

if (menuToggle && navLinks && header) {
  menuToggle.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuToggle.textContent = open ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("open")) {
      header.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
      menuToggle.focus();
    }
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("section, .card");
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealItems.forEach((item) => {
    item.classList.add("reveal-pending");
    revealObserver.observe(item);
  });
}

const sections = [...document.querySelectorAll("section[id]")];
const sectionLinks = [...document.querySelectorAll("#nav-links a")];
if ("IntersectionObserver" in window && sectionLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.getAttribute("href") === ("#" + entry.target.id)) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-35% 0px -55%" });
  sections.forEach((section) => sectionObserver.observe(section));
}


document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    const filter = button.dataset.filter;
    document.querySelectorAll(".element").forEach((element) => {
      element.classList.toggle("hidden", filter !== "all" && element.dataset.type !== filter);
    });
  });
});
document.querySelectorAll(".element").forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelectorAll(".element").forEach((item) => item.classList.remove("active"));
    element.classList.add("active");
  });
});



// Cinematic interactions from reference package — additive, no existing features removed.
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('cinematic-loader')?.classList.add('loader-done'),650));
const progress=document.querySelector('.scroll-progress');window.addEventListener('scroll',()=>{const d=document.documentElement;progress.style.width=((d.scrollTop/(d.scrollHeight-d.clientHeight))*100)+'%'},{passive:true});
const ring=document.createElement('div'),dot=document.createElement('div');ring.className='cursor-ring';dot.className='cursor-dot';document.body.append(ring,dot);let cx=-100,cy=-100,rx=-100,ry=-100;document.addEventListener('pointermove',e=>{cx=e.clientX;cy=e.clientY;dot.style.left=cx+'px';dot.style.top=cy+'px'});(function loop(){rx+=(cx-rx)*.16;ry+=(cy-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();document.querySelectorAll('a,button,.element,.project').forEach(el=>{el.addEventListener('mouseenter',()=>{ring.style.width='52px';ring.style.height='52px'});el.addEventListener('mouseleave',()=>{ring.style.width='34px';ring.style.height='34px'})});
document.querySelectorAll('.tilt-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(1100px) rotateY('+(x*7)+'deg) rotateX('+(-y*7)+'deg)'}));document.querySelectorAll('.tilt-card').forEach(card=>card.addEventListener('pointerleave',()=>card.style.transform=''));
document.querySelectorAll('.project').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')}));
const palette=document.querySelector('.command-palette'),input=document.querySelector('#commandInput');function togglePalette(){palette.classList.toggle('open');if(palette.classList.contains('open')){input.value='';setTimeout(()=>input.focus(),50)}}document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();togglePalette()}if(e.key==='Escape')palette.classList.remove('open')});palette?.addEventListener('click',e=>{if(e.target===palette)palette.classList.remove('open')});document.querySelectorAll('.command-items button').forEach(b=>b.addEventListener('click',()=>{const g=b.dataset.go;if(g.startsWith('#'))document.querySelector(g)?.scrollIntoView({behavior:'smooth'});else window.open(g,'_blank');palette.classList.remove('open')}));

const contactForm=document.querySelector('#contactForm');if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(contactForm),name=d.get('name'),email=d.get('email'),message=d.get('message');document.querySelector('.form-success').hidden=false;contactForm.hidden=true;setTimeout(()=>{window.location.href='mailto:dinakarnayak4248@gmail.com?subject='+encodeURIComponent('Portfolio enquiry from '+name)+'&body='+encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+message)},450)})}
const themeToggle=document.querySelector('#theme-toggle');if(themeToggle){const setTheme=t=>{document.documentElement.dataset.theme=t;themeToggle.setAttribute('aria-pressed',String(t==='light'));themeToggle.setAttribute('aria-label',t==='light'?'Switch to dark theme':'Switch to light theme');themeToggle.innerHTML='<span aria-hidden="true">'+(t==='light'?'☾':'☼')+'</span>';try{localStorage.setItem('portfolio-theme',t)}catch{}};setTheme(document.documentElement.dataset.theme||'dark');themeToggle.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='light'?'dark':'light'));}


/* Project quick-view + archive UX */
(()=>{const modal=document.querySelector('#project-modal');if(!modal)return;const title=modal.querySelector('#project-modal-title'),copy=modal.querySelector('#project-modal-copy'),type=modal.querySelector('#project-modal-type'),link=modal.querySelector('#project-modal-link');const close=()=>{modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};const open=card=>{const heading=card.querySelector('h3,h4');const paragraph=card.querySelector('p');title.textContent=heading?.textContent?.trim()||'Project';copy.textContent=paragraph?.textContent?.trim()||'Explore this project and its implementation details.';type.textContent=(card.dataset.category||card.querySelector('.project-kind')?.textContent||'AI / ML').replace(/\\s+/g,' ').trim();const href=card.querySelector('a')?.href||card.dataset.href||'#';link.href=href;link.style.display=href==='#'?'none':'inline-flex';modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('.project-modal-close')?.focus(),30)};document.querySelectorAll('.project,.archive-project').forEach(card=>card.addEventListener('click',e=>{if(e.target.closest('a,button'))return;open(card)}));modal.addEventListener('click',e=>{if(e.target.matches('[data-modal-close]'))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()})})();
