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


/* Ask Dinakar AI — advanced local portfolio assistant */
(()=>{
  const trigger=document.querySelector('#ai-profile-trigger');
  const panel=document.querySelector('#ask-dinakar-panel');
  if(!trigger||!panel)return;
  const answer=panel.querySelector('#ask-dinakar-answer');
  const input=panel.querySelector('#ask-dinakar-input');
  const send=panel.querySelector('#ask-dinakar-send');
  const data={
    profile:['PROFILE','Hi, I’m Dinakar — an AI/ML Engineer and Software Developer based in Leicester, UK, currently pursuing an MSc Artificial Intelligence with Industry.','I turn intelligent-system ideas into useful software, from research prototypes to practical products.'],
    skills:['CORE SKILLS','Python, C++, JavaScript, TypeScript, React, Node.js, FastAPI, PyTorch, TensorFlow, Scikit-learn, NLP, LLMs and Computer Vision.','I work across models, agents, APIs, interfaces and deployment.'],
    projects:['PROJECTS','My portfolio covers AI/ML, agents, NLP, software engineering, research and web applications.','Explore the selected work section for coding-agent tooling, observability, fraud detection, LinguaSpeak and deep-learning research.'],
    research:['RESEARCH','AI agents, machine learning, NLP, intelligent systems, explainability and AI security.','I’m especially interested in reliable, observable AI systems that connect research ideas to real products.'],
    education:['EDUCATION','MSc Artificial Intelligence with Industry at the University of Leicester, following a B.Tech in Computer Science and Engineering with AI/ML specialisation.','My academic path combines computational intelligence, AI security, responsible AI and production-minded engineering.'],
    contact:['CONNECT','The portfolio has direct routes to projects, contact and GitHub.','Use the links below to explore the work or connect with Dinakar.']
  };
  const render=(key)=>{
    const d=data[key]; if(!d||!answer)return;
    answer.innerHTML='<small>'+d[0]+'</small><p>'+d[1]+'</p><span>'+d[2]+'</span>';
    answer.classList.add('is-visible');
    panel.querySelectorAll('[data-ai-topic]').forEach(b=>b.classList.toggle('is-active',b.dataset.aiTopic===key));
  };
  const answerQuestion=(q)=>{
    const s=q.toLowerCase();
    let key='profile';
    if(/skill|technolog|stack|python|pytorch|react|llm|machine learning/.test(s))key='skills';
    else if(/project|build|built|work|portfolio|agent|fraud|linguaspeak/.test(s))key='projects';
    else if(/study|education|degree|msc|university|leicester|btech|academic/.test(s))key='education';
    else if(/contact|email|connect|github|reach/.test(s))key='contact';
    else if(/research|interest|ai|nlp|agent|security|explain/.test(s))key='research';
    render(key);
  };
  const close=()=>{panel.hidden=true;panel.setAttribute('aria-hidden','true');trigger.setAttribute('aria-expanded','false');document.body.classList.remove('ai-panel-open');};
  const open=()=>{panel.hidden=false;panel.setAttribute('aria-hidden','false');trigger.setAttribute('aria-expanded','true');document.body.classList.add('ai-panel-open');setTimeout(()=>panel.querySelector('.ask-dinakar-close')?.focus(),80);};
  trigger.addEventListener('click',open);
  trigger.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
  panel.addEventListener('click',e=>{
    if(e.target.closest('[data-ai-close]')){close();return;}
    const card=e.target.closest('[data-ai-topic]'); if(card){e.preventDefault();render(card.dataset.aiTopic);return;}
    const q=e.target.closest('[data-ai-question]'); if(q){e.preventDefault();if(input)input.value=q.dataset.aiQuestion;answerQuestion(q.dataset.aiQuestion);return;}
    if(e.target.closest('#ask-dinakar-send')){e.preventDefault();answerQuestion(input?.value?.trim()||'Tell me about Dinakar.');if(input)input.focus();}
  });
  input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();answerQuestion(input.value.trim()||'Tell me about Dinakar.');}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close();});
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

/* About section reveal */
(()=>{
  const section=document.querySelector('.about');
  const items=[...document.querySelectorAll('.about-grid,.about-strip,.about-pillars')];
  if(!section||!items.length)return;
  items.forEach(el=>el.classList.add('about-reveal'));
  const reveal=()=>{
    section.classList.add('about-visible');
    items.forEach(el=>el.classList.add('about-visible'));
  };
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){reveal();return;}
  const io=new IntersectionObserver(entries=>{
    if(entries.some(e=>e.isIntersecting)){reveal();io.disconnect();}
  },{threshold:.12});
  io.observe(section);
})();

/* About interactive fact cards */
(()=>{
 const facts={
  focus:["CURRENT FOCUS","AI agents, intelligent systems and reliable AI workflows."],
  study:["CURRENTLY STUDYING","MSc Artificial Intelligence with Industry at the University of Leicester."],
  build:["HOW I BUILD","Prototype quickly, validate what matters, then turn the useful version into maintainable software."],
  mindset:["ENGINEERING MINDSET","Reliable, observable and useful systems with thoughtful UX."]
 };
 document.querySelectorAll('[data-about-fact]').forEach(btn=>btn.addEventListener('click',()=>{
   document.querySelectorAll('[data-about-fact]').forEach(b=>b.classList.remove('is-active'));
   btn.classList.add('is-active');
 }));
})();


/* About AI assistant */
(()=>{
 const trigger=document.getElementById('about-ai-trigger');
 const panel=document.getElementById('about-ai-panel');
 const close=document.getElementById('about-ai-close');
 const answer=document.getElementById('about-ai-answer');
 if(!trigger||!panel||!close||!answer)return;
 const replies={
  profile:'<strong>Hi, I’m Dinakar.</strong> I’m an AI/ML Engineer and Software Developer based in Leicester, UK, with a Computer Science background and a focus on turning intelligent ideas into useful software.',
  work:'I build across <strong>AI agents, NLP, machine learning, backend APIs and full-stack applications</strong>. My projects combine research experiments with practical software, including agent workflows and tools for evaluating AI systems.',
  study:'I’m currently pursuing an <strong>MSc Artificial Intelligence with Industry at the University of Leicester</strong>, developing deeper knowledge in computational intelligence, AI security, responsible AI and production-minded engineering.',
  ai:'My interests include <strong>AI agents, NLP, LLMs, machine learning, intelligent systems and AI security</strong>. I’m especially interested in making AI systems useful, observable and reliable.'
 };
 const setOpen=open=>{panel.classList.toggle('is-open',open);panel.setAttribute('aria-hidden',String(!open));trigger.setAttribute('aria-expanded',String(open));if(!open){answer.classList.remove('is-visible');answer.innerHTML='';}};
 trigger.addEventListener('click',()=>setOpen(!panel.classList.contains('is-open')));
 close.addEventListener('click',()=>{setOpen(false);trigger.focus()});
 panel.querySelectorAll('[data-about-ai]').forEach(btn=>btn.addEventListener('click',()=>{answer.innerHTML=replies[btn.dataset.aboutAi]||'';answer.classList.add('is-visible')}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('is-open')){setOpen(false);trigger.focus()}});
})();


/* Achievements — interactive milestone controller */
(()=>{
  const rows=[...document.querySelectorAll('#achievements .achievement-row')];
  const title=document.getElementById('achievement-detail-title');
  const copy=document.getElementById('achievement-detail-copy');
  const link=document.getElementById('achievement-detail-link');
  if(!rows.length||!title||!copy||!link)return;
  const details={
    research:{title:'EEG MODEL ACCURACY',copy:'A GRU-based emotion classification model evaluated on EEG data, reaching 95.55% test accuracy.',href:'#work',label:'EXPLORE THE WORK'},
    academic:{title:'COMPUTER SCIENCE',copy:'Final B.Tech CGPA of 8.31/10 in Computer Science & Engineering with an Artificial Intelligence & Machine Learning specialisation.',href:'#education',label:'VIEW EDUCATION'},
    build:{title:'PROJECT PORTFOLIO',copy:'15+ selected projects spanning AI, machine learning, agents, software engineering and research.',href:'#github',label:'EXPLORE GITHUB'}
  };
  const select=(key)=>{
    const d=details[key]||details.research;
    rows.forEach(row=>{
      const active=row.dataset.achievement===key;
      row.classList.toggle('is-active',active);
      row.setAttribute('aria-expanded',active?'true':'false');
    });
    title.textContent=d.title;copy.textContent=d.copy;link.href=d.href;link.innerHTML=d.label+' <span>↗</span>';
  };
  rows.forEach(row=>row.addEventListener('click',()=>select(row.dataset.achievement)));
})();


/* Achievements — cinematic milestone switching */
(()=>{
  const dots=[...document.querySelectorAll('#achievements .achievement-dot')];
  const number=document.getElementById('achievement-hero-number');
  const unit=document.getElementById('achievement-hero-unit');
  const index=document.getElementById('achievement-live-index');
  const kicker=document.getElementById('achievement-stage-kicker');
  const title=document.getElementById('achievement-stage-title');
  const copy=document.getElementById('achievement-stage-copy');
  const link=document.getElementById('achievement-stage-link');
  const note=document.getElementById('achievement-bottom-note');
  if(!dots.length||!number||!unit||!index||!kicker||!title||!copy||!link||!note)return;
  const data={research:{number:'95.55',unit:'%',index:'01',kicker:'RESEARCH · 2025',title:'EEG MODEL<br><em>ACCURACY</em>',copy:'A GRU-based emotion classification model evaluated on EEG data, reaching 95.55% test accuracy.',href:'#work',label:'EXPLORE THE WORK',note:'95.55% TEST ACCURACY · EEG EMOTION CLASSIFICATION'},academic:{number:'8.31',unit:'/10',index:'02',kicker:'ACADEMIC · 2025',title:'COMPUTER<br><em>SCIENCE</em>',copy:'Final B.Tech performance in Computer Science & Engineering with an Artificial Intelligence & Machine Learning specialisation.',href:'#education',label:'VIEW EDUCATION',note:'8.31 / 10 FINAL B.TECH CGPA · AI / ML'},build:{number:'15',unit:'+',index:'03',kicker:'BUILD · 2021—2026',title:'PROJECT<br><em>PORTFOLIO</em>',copy:'15+ selected projects spanning AI, machine learning, agents, software engineering and research.',href:'#github',label:'EXPLORE GITHUB',note:'15+ SELECTED PROJECTS · AI · SOFTWARE'}};
  const select=(key)=>{const d=data[key]||data.research;dots.forEach(dot=>{const active=dot.dataset.achievement===key;dot.classList.toggle('is-active',active);dot.setAttribute('aria-pressed',active?'true':'false')});number.textContent=d.number;unit.textContent=d.unit;index.textContent=d.index;kicker.textContent=d.kicker;title.innerHTML=d.title;copy.textContent=d.copy;link.href=d.href;link.innerHTML=d.label+' <span>↗</span>';note.textContent=d.note};
  dots.forEach(dot=>dot.addEventListener('click',()=>select(dot.dataset.achievement)));
})();


/* Certifications — credential vault controller */
(()=>{
 const items=[...document.querySelectorAll('#certifications .cert-item')];const idx=document.getElementById('cert-detail-index'),title=document.getElementById('cert-detail-title'),copy=document.getElementById('cert-detail-copy'),issuer=document.getElementById('cert-detail-issuer'),date=document.getElementById('cert-detail-date'),tags=document.getElementById('cert-detail-tags');if(!items.length||!idx||!title||!copy||!issuer||!date||!tags)return;
 const data={aws:{title:'AWS Certified Machine Learning — Specialty',copy:'Machine learning credential focused on designing, building and deploying ML solutions on AWS.',issuer:'AMAZON WEB SERVICES',date:'NOV 2023',tags:['Machine Learning','AWS','Cloud','MLOps']},'servicenow-dev':{title:'Certified Application Developer',copy:'Application development credential covering practical development on the ServiceNow platform.',issuer:'SERVICENOW',date:'AUG 2024',tags:['Application Development','ServiceNow','JavaScript']},'servicenow-admin':{title:'Certified System Administrator',copy:'Platform administration credential covering configuration, users, data and core ServiceNow capabilities.',issuer:'SERVICENOW',date:'JUN 2024',tags:['Administration','ServiceNow','Platform']},ethical:{title:'Certified Ethical Hacker',copy:'Ethical hacking credential focused on security concepts, reconnaissance, vulnerabilities and defensive thinking.',issuer:'GREAT LEARNING',date:'OCT 2024',tags:['Cybersecurity','Ethical Hacking','Security']},infosys:{title:'Statistics for R Programming',copy:'Statistics credential covering practical analysis and statistical programming with R.',issuer:'INFOSYS SPRINGBOARD',date:'OCT 2024',tags:['Statistics','R','Data Analysis']},jdbc:{title:'Java Database Connectivity (JDBC)',copy:'Credential covering Java database connectivity and application-level database interaction.',issuer:'COURSERA',date:'2024',tags:['Java','JDBC','Databases']}};
 const select=k=>{const d=data[k]||data.aws;items.forEach((item,i)=>{const active=item.dataset.cert===k;item.classList.toggle('is-active',active);if(active)idx.textContent=String(i+1).padStart(2,'0')});title.textContent=d.title;copy.textContent=d.copy;issuer.textContent=d.issuer;date.textContent=d.date;tags.innerHTML=d.tags.map(t=>'<span>'+t+'</span>').join('')};items.forEach(i=>i.addEventListener('click',()=>select(i.dataset.cert)));
})();


/* Certifications — split preview */
(()=>{const cards=[...document.querySelectorAll('#certifications .certificate-card')];const mark=document.getElementById('cert-focus-mark');const title=document.getElementById('cert-focus-title');const copy=document.getElementById('cert-focus-copy');const issuer=document.getElementById('cert-focus-issuer');const date=document.getElementById('cert-focus-date');const index=document.getElementById('cert-focus-index');if(!cards.length||!mark||!title||!copy||!issuer||!date||!index)return;const data={aws:{mark:'AWS',title:'AWS Certified Machine Learning — Specialty',copy:'Machine learning credential focused on designing, building and deploying ML solutions on AWS. The credential highlights practical machine learning, modelling and cloud deployment knowledge.',issuer:'AMAZON WEB SERVICES',date:'NOV 2023'},'servicenow-dev':{mark:'SN',title:'Certified Application Developer',copy:'ServiceNow application development credential focused on building and extending applications on the platform.',issuer:'SERVICENOW',date:'AUG 2024'},'servicenow-admin':{mark:'SN',title:'Certified System Administrator',copy:'ServiceNow administration credential covering platform configuration, users, data and core system capabilities.',issuer:'SERVICENOW',date:'JUN 2024'},ethical:{mark:'CEH',title:'Certified Ethical Hacker',copy:'Cybersecurity credential focused on ethical hacking concepts, reconnaissance, vulnerabilities and defensive security thinking.',issuer:'GREAT LEARNING',date:'OCT 2024'},infosys:{mark:'R',title:'Statistics for R Programming',copy:'Statistics credential focused on practical statistical analysis and programming with the R language.',issuer:'INFOSYS SPRINGBOARD',date:'OCT 2024'},jdbc:{mark:'JDBC',title:'Java Database Connectivity (JDBC)',copy:'Programming credential covering Java database connectivity and application-level interaction with relational databases.',issuer:'COURSERA',date:'2024'}};const select=k=>{const d=data[k]||data.aws;const i=cards.findIndex(card=>card.dataset.cert===k);cards.forEach(card=>card.classList.toggle('is-selected',card.dataset.cert===k));index.textContent=String(i+1).padStart(2,'0')+' / 06';mark.textContent=d.mark;title.textContent=d.title;copy.textContent=d.copy;issuer.textContent=d.issuer;date.textContent=d.date};cards.forEach(card=>{card.addEventListener('click',()=>select(card.dataset.cert));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(card.dataset.cert)}})});select('aws');})();
