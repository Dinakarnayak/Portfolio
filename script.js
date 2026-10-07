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
const dismissCinematicLoader=()=>{const loader=document.getElementById('cinematic-loader');if(loader)loader.classList.add('loader-done')};document.addEventListener('DOMContentLoaded',()=>setTimeout(dismissCinematicLoader,350));setTimeout(dismissCinematicLoader,2500);
const progress=document.querySelector('.scroll-progress');window.addEventListener('scroll',()=>{const d=document.documentElement;progress.style.width=((d.scrollTop/(d.scrollHeight-d.clientHeight))*100)+'%'},{passive:true});
const ring=document.createElement('div'),dot=document.createElement('div');ring.className='cursor-ring';dot.className='cursor-dot';document.body.append(ring,dot);let cx=-100,cy=-100,rx=-100,ry=-100;document.addEventListener('pointermove',e=>{cx=e.clientX;cy=e.clientY;dot.style.left=cx+'px';dot.style.top=cy+'px'});(function loop(){rx+=(cx-rx)*.16;ry+=(cy-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();document.querySelectorAll('a,button,.element,.project').forEach(el=>{el.addEventListener('mouseenter',()=>{ring.style.width='52px';ring.style.height='52px'});el.addEventListener('mouseleave',()=>{ring.style.width='34px';ring.style.height='34px'})});
document.querySelectorAll('.tilt-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(1100px) rotateY('+(x*7)+'deg) rotateX('+(-y*7)+'deg)'}));document.querySelectorAll('.tilt-card').forEach(card=>card.addEventListener('pointerleave',()=>card.style.transform=''));
document.querySelectorAll('.project').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')}));
const palette=document.querySelector('.command-palette'),input=document.querySelector('#commandInput');function togglePalette(){palette.classList.toggle('open');if(palette.classList.contains('open')){input.value='';setTimeout(()=>input.focus(),50)}}document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();togglePalette()}if(e.key==='Escape')palette.classList.remove('open')});palette?.addEventListener('click',e=>{if(e.target===palette)palette.classList.remove('open')});document.querySelectorAll('.command-items button').forEach(b=>b.addEventListener('click',()=>{const g=b.dataset.go;if(g.startsWith('#'))document.querySelector(g)?.scrollIntoView({behavior:'smooth'});else window.open(g,'_blank');palette.classList.remove('open')}));

const contactForm=document.querySelector('#contactForm');if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(contactForm),name=d.get('name'),email=d.get('email'),message=d.get('message');document.querySelector('.form-success').hidden=false;contactForm.hidden=true;setTimeout(()=>{window.location.href='mailto:dinakarnayak4248@gmail.com?subject='+encodeURIComponent('Portfolio enquiry from '+name)+'&body='+encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+message)},450)})}
/* Project quick-view + archive UX */
(()=>{const modal=document.querySelector('#project-modal');if(!modal)return;const title=modal.querySelector('#project-modal-title'),copy=modal.querySelector('#project-modal-copy'),type=modal.querySelector('#project-modal-type'),link=modal.querySelector('#project-modal-link');const close=()=>{modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};const open=card=>{const heading=card.querySelector('h3,h4');const paragraph=card.querySelector('p');title.textContent=heading?.textContent?.trim()||'Project';copy.textContent=paragraph?.textContent?.trim()||'Explore this project and its implementation details.';type.textContent=(card.dataset.category||card.querySelector('.project-kind')?.textContent||'AI / ML').replace(/\\s+/g,' ').trim();const href=card.querySelector('a')?.href||card.dataset.href||'#';link.href=href;link.style.display=href==='#'?'none':'inline-flex';modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('.project-modal-close')?.focus(),30)};document.querySelectorAll('.project,.archive-project').forEach(card=>card.addEventListener('click',e=>{if(e.target.closest('a,button'))return;open(card)}));modal.addEventListener('click',e=>{if(e.target.matches('[data-modal-close]'))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()})})();

/* Project quick-view interaction */
(()=>{const modal=document.querySelector('#project-modal');if(!modal)return;const title=modal.querySelector('#project-modal-title'),copy=modal.querySelector('#project-modal-copy'),type=modal.querySelector('#project-modal-type'),link=modal.querySelector('#project-modal-link');const close=()=>{modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};const open=card=>{const heading=card.querySelector('h3,h4'),paragraph=card.querySelector('p');title.textContent=heading?.textContent?.trim()||'Project';copy.textContent=paragraph?.textContent?.trim()||'Explore this project and its implementation details.';type.textContent=(card.dataset.category||card.querySelector('.project-kind')?.textContent||'AI / ML').replace(/\s+/g,' ').trim();const href=card.querySelector('a')?.href||card.dataset.href||'#';link.href=href;link.style.display=href==='#'?'none':'inline-flex';modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('.project-modal-close')?.focus(),30)};document.querySelectorAll('.project,.archive-project').forEach(card=>card.addEventListener('click',e=>{if(e.target.closest('a,button'))return;open(card)}));modal.addEventListener('click',e=>{if(e.target.matches('[data-modal-close]'))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()})})();


/* Full archive controls */
(()=>{
  const open=document.querySelector('#archive-open');
  const panel=document.querySelector('#project-archive-panel');
  const close=document.querySelector('#archive-close');
  const search=document.querySelector('#archive-search');
  const filters=[...document.querySelectorAll('.archive-filter')];
  const cards=[...document.querySelectorAll('.archive-project')];
  const count=document.querySelector('#archive-result-count');
  const empty=document.querySelector('#archive-empty');
  if(!open||!panel||!cards.length)return;
  const update=()=>{
    const q=(search?.value||'').trim().toLowerCase();
    const active=document.querySelector('.archive-filter.selected')?.dataset.archiveFilter||'all';
    let shown=0;
    cards.forEach(card=>{
      const matchesCategory=active==='all'||card.dataset.category===active;
      const matchesSearch=!q||card.textContent.toLowerCase().includes(q);
      const visible=matchesCategory&&matchesSearch;
      card.hidden=!visible;
      if(visible)shown++;
    });
    if(count)count.textContent=shown+' PROJECT'+(shown===1?'':'S');
    if(empty)empty.hidden=shown!==0;
  };
  open.addEventListener('click',()=>{
    panel.hidden=false;
    open.setAttribute('aria-expanded','true');
    panel.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});
    setTimeout(()=>search?.focus(),250);
  });
  close?.addEventListener('click',()=>{
    panel.hidden=true;
    open.setAttribute('aria-expanded','false');
    open.focus();
  });
  filters.forEach(button=>button.addEventListener('click',()=>{
    filters.forEach(item=>item.classList.remove('selected'));
    button.classList.add('selected');
    update();
  }));
  search?.addEventListener('input',update);
  update();
})();


/* Ask Dinakar AI profile panel */
(()=>{
  const trigger=document.querySelector('#ai-profile-trigger');
  const panel=document.querySelector('#ask-dinakar-panel');
  if(!trigger||!panel)return;
  const answer=panel.querySelector('#ask-dinakar-answer');
  const close=()=>{panel.hidden=true;panel.setAttribute('aria-hidden','true');trigger.setAttribute('aria-expanded','false');document.body.classList.remove('ai-panel-open')};
  const open=()=>{panel.hidden=false;panel.setAttribute('aria-hidden','false');trigger.setAttribute('aria-expanded','true');document.body.classList.add('ai-panel-open');setTimeout(()=>panel.querySelector('.ask-dinakar-close')?.focus(),80)};
  const topics={
    profile:['PROFILE','AI/ML Engineer and Software Developer based in Leicester, UK, currently pursuing an MSc Artificial Intelligence with Industry at the University of Leicester.','My work connects intelligent systems, practical software engineering and thoughtful UX.'],
    skills:['CORE SKILLS','Python · C++ · JavaScript · TypeScript · React · Node.js · FastAPI · PyTorch · TensorFlow · Scikit-learn · NLP · LLMs · Computer Vision','I build from models and agents through APIs, interfaces and deployment.'],
    projects:['PROJECTS','29 projects across AI/ML, agents, NLP, software engineering, research and web applications.','Featured work includes autonomous coding agents, TraceLens observability, fraud detection, LinguaSpeak and deep-learning research.'],
    research:['RESEARCH','AI agents · machine learning · NLP · intelligent systems · explainability · AI security','Current interests focus on reliable, observable and useful AI systems that connect research ideas to real products.']
  };
  const openPanel=()=>{open();};
  trigger.addEventListener('click',openPanel);
  trigger.addEventListener('pointerup',openPanel);
  trigger.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openPanel()}});
  panel.addEventListener('click',e=>{
    if(e.target.closest('[data-ai-close]')){close();return}
    const card=e.target.closest('[data-ai-topic]');
    if(!card)return;
    const data=topics[card.dataset.aiTopic];
    if(!data||!answer)return;
    answer.innerHTML='<small>'+data[0]+'</small><p>'+data[1]+'</p><span>'+data[2]+'</span>';
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close()});
})();


/* Additive skills / project / experience motion */
(()=>{
  const rail=document.querySelector('.experience-progress i');
  const exp=document.querySelector('.experience');
  const updateExperience=()=>{if(!rail||!exp)return;const r=exp.getBoundingClientRect(),vh=innerHeight;const start=vh*.72,end=vh*.2;const p=Math.max(0,Math.min(1,(start-r.top)/(r.height-(start-end))));rail.style.height=(p*100)+'%';};
  addEventListener('scroll',updateExperience,{passive:true});addEventListener('resize',updateExperience);updateExperience();
  const storyCards=[...document.querySelectorAll('.project-story-card')];
  if(storyCards.length&&!reduceMotion&&'IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('story-active')}),{threshold:.35});storyCards.forEach(c=>io.observe(c));}
})();


/* Project Stories scroll state */
(()=>{const cards=[...document.querySelectorAll('.project-story-card')],bar=document.querySelector('.story-progress i b');if(!cards.length)return;const update=()=>{let active=0,best=Infinity;cards.forEach((card,i)=>{const r=card.getBoundingClientRect();const d=Math.abs((r.top+r.height*.35)-innerHeight*.42);if(d<best){best=d;active=i}card.style.setProperty('--story-depth',Math.min(i,2));});cards.forEach((card,i)=>card.classList.toggle('story-active',i===active));if(bar)bar.style.width=((active+1)/cards.length*100)+'%')};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update()})();
/* Premium project story interactions */
(()=>{const cards=[...document.querySelectorAll('.project-story-card')],bar=document.querySelector('.story-counter i span');if(!cards.length)return;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const update=()=>{let a=0,best=1e9;cards.forEach((c,i)=>{const r=c.getBoundingClientRect(),d=Math.abs(r.top+r.height*.34-innerHeight*.42);if(d<best){best=d;a=i}});cards.forEach((c,i)=>c.classList.toggle('story-active',i===a));if(bar)bar.style.width=((a+1)/cards.length*100)+'%'};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();if(!reduce&&matchMedia('(pointer:fine)').matches)cards.forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--ry',x*5+'deg');c.style.setProperty('--rx',-y*4+'deg');c.style.setProperty('--mx',x*5+'px');c.style.setProperty('--my',y*3+'px')});c.addEventListener('pointerleave',()=>{c.style.setProperty('--ry','0deg');c.style.setProperty('--rx','0deg');c.style.setProperty('--mx','0px');c.style.setProperty('--my','0px')})})})();

/* Hero photo pointer spotlight */
(()=>{
  const hero=document.querySelector('.hero-person');
  if(!hero || matchMedia('(pointer:coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width)*100;
    const y=((e.clientY-r.top)/r.height)*100;
    hero.style.setProperty('--hero-mx',x.toFixed(2)+'%');
    hero.style.setProperty('--hero-my',y.toFixed(2)+'%');
    hero.style.setProperty('--hero-rx',((50-y)*.035).toFixed(2)+'deg');
    hero.style.setProperty('--hero-ry',((x-50)*.035).toFixed(2)+'deg');
    hero.classList.add('hero-hovering');
  });
  hero.addEventListener('pointerleave',()=>{
    hero.style.setProperty('--hero-mx','50%');
    hero.style.setProperty('--hero-my','50%');
    hero.style.setProperty('--hero-rx','0deg');
    hero.style.setProperty('--hero-ry','0deg');
    hero.classList.remove('hero-hovering');
  });
})();
