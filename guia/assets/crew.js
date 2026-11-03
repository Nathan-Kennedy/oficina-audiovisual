/* =====================================================================
   "Equipe ao vivo": cursores de uma equipe de produção montam o site em
   tempo real (inspirado em editores colaborativos). Cada cursor tem uma
   função do audiovisual: Câmera, Luz, Cor, Edição e Áudio.
   - Build-in: blocos que entram na tela são "montados" por um cursor
     (caixa de seleção com medidas + revelação).
   - Cenas: no topo de cada módulo, uma ação ligada ao tema da página.
   - Respeita prefers-reduced-motion e tem botão liga/desliga (salvo).
   ===================================================================== */
(function(){
  if(window.__crew) return; window.__crew=1;
  var KEY='crew-ao-vivo';
  var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var on=localStorage.getItem(KEY)!==null?localStorage.getItem(KEY)==='1':!reduced;

  var CREW=[
    {id:'cam',n:'📷 Câmera',c:'#22b8d6'},
    {id:'luz',n:'💡 Luz',c:'#f5a524'},
    {id:'cor',n:'🎨 Cor',c:'#e255a8'},
    {id:'edi',n:'✂️ Edição',c:'#2fb36a'},
    {id:'aud',n:'🎙️ Áudio',c:'#8b5cf6'}
  ];

  /* ---------------- CSS ---------------- */
  var css=`
  html,body{overflow-x:clip}
  .crew-layer{position:absolute;left:0;top:0;width:0;height:0;z-index:90;pointer-events:none}
  .crew-cur{position:absolute;left:0;top:0;transition-property:transform;transition-timing-function:cubic-bezier(.45,.05,.25,1);will-change:transform}
  .crew-cur svg{width:22px;height:22px;display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
  .crew-cur span{position:absolute;left:16px;top:18px;white-space:nowrap;font:700 11.5px/1 Inter,Poppins,sans-serif;color:#fff;padding:5px 8px;border-radius:7px 7px 7px 2px;box-shadow:0 4px 12px rgba(0,0,0,.2)}
  .crew-cur.click svg{animation:crewclick .25s}
  @keyframes crewclick{50%{transform:scale(.78)}}
  .crew-sel{position:absolute;border:1.5px solid;border-radius:3px;transition:width .45s cubic-bezier(.2,.8,.2,1),height .45s cubic-bezier(.2,.8,.2,1),opacity .4s;background:rgba(255,255,255,.04)}
  .crew-sel i{position:absolute;width:7px;height:7px;background:#fff;border:1.5px solid;border-radius:1px}
  .crew-sel i:nth-child(1){left:-4px;top:-4px}.crew-sel i:nth-child(2){right:-4px;top:-4px}.crew-sel i:nth-child(3){left:-4px;bottom:-4px}.crew-sel i:nth-child(4){right:-4px;bottom:-4px}
  .crew-sel b{position:absolute;left:-1px;top:-22px;font:700 10.5px/1 Inter,sans-serif;color:#fff;padding:4px 6px;border-radius:4px;white-space:nowrap}
  .crew-hide{opacity:.06!important;transform:translateY(16px) scale(.985);filter:blur(3px) grayscale(.6)}
  .crew-reveal{transition:opacity .7s ease,transform .7s cubic-bezier(.2,.8,.2,1),filter .7s ease!important}
  .crew-type{animation:crewtype .75s steps(28,end) both}
  @keyframes crewtype{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
  .crew-toggle{position:fixed;left:16px;bottom:16px;z-index:95;border:0;border-radius:999px;padding:9px 14px;font:700 12.5px Inter,sans-serif;cursor:pointer;background:#16121d;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.25);display:flex;gap:8px;align-items:center}
  .crew-toggle i{width:8px;height:8px;border-radius:50%;background:#ff4d6d;animation:crewblink 1s steps(1) infinite}
  .crew-toggle.off i{background:#777;animation:none}
  @keyframes crewblink{50%{opacity:.2}}
  /* cenas */
  .crew-stage{position:absolute;right:4%;top:50%;transform:translateY(-50%);width:min(36%,360px);aspect-ratio:4/3;pointer-events:none;z-index:2}
  @media(max-width:900px){.crew-stage{display:none}}
  @media(min-width:901px){.has-stage h1,.has-stage > p,.has-stage .crumb,.has-stage .meta{max-width:calc(96% - min(36vw,380px))!important}}
  .crew-card{position:absolute;inset:0;border-radius:16px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);backdrop-filter:blur(6px);overflow:hidden;opacity:0;transform:scale(.9);transition:all .5s cubic-bezier(.2,1.2,.4,1)}
  .crew-card.in{opacity:1;transform:none}
  .crew-focus{position:absolute;width:74px;height:74px;border:2px solid #ffd23f;left:calc(50% - 37px);top:calc(48% - 37px);opacity:0}
  .crew-focus.in{animation:crewfocus .6s forwards}
  @keyframes crewfocus{0%{opacity:1;transform:scale(1.5)}60%{transform:scale(.92)}100%{opacity:1;transform:scale(1)}}
  .crew-chip{position:absolute;font:800 11px Inter,sans-serif;color:#16121d;background:#ffd23f;padding:4px 7px;border-radius:5px;opacity:0;transition:opacity .3s}
  .crew-chip.in{opacity:1}
  .crew-slider{position:absolute;height:6px;border-radius:3px;background:rgba(255,255,255,.35)}
  .crew-knob{position:absolute;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.35);top:-7px;transition:left .9s cubic-bezier(.45,.05,.25,1),bottom .9s cubic-bezier(.45,.05,.25,1)}
  .crew-meter{position:absolute;bottom:14%;width:9%;border-radius:4px 4px 0 0;background:linear-gradient(#ff5d5d,#ffd23f 25%,#70cf97 55%);transition:height .12s}
  .crew-clip{position:absolute;top:40%;height:22%;border-radius:6px;transition:all .45s cubic-bezier(.2,.8,.2,1)}
  .crew-heart{position:absolute;font-size:22px;animation:crewheart 1.6s ease-out forwards}
  @keyframes crewheart{0%{opacity:0;transform:translateY(0) scale(.5)}20%{opacity:1;transform:translateY(-10px) scale(1.1)}100%{opacity:0;transform:translateY(-110px) scale(.9)}}
  .crew-coin{position:absolute;font-size:22px;animation:crewcoin .9s cubic-bezier(.5,0,.8,.4) forwards}
  @keyframes crewcoin{from{transform:translateY(-120px)}to{transform:translateY(0)}}
  .crew-wheel{position:absolute;left:50%;top:50%;width:62%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:conic-gradient(red,#ff0,lime,cyan,blue,#f0f,red);box-shadow:inset 0 0 0 10px rgba(255,255,255,.15)}
  .crew-wheel::after{content:"";position:absolute;inset:18%;border-radius:50%;background:radial-gradient(#fff,rgba(255,255,255,0) 70%)}
  .crew-dot{position:absolute;width:16px;height:16px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 2px rgba(0,0,0,.4);transition:left .8s cubic-bezier(.45,.05,.25,1),top .8s cubic-bezier(.45,.05,.25,1)}
  .crew-grid{position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.6)) 33.33% 0/1px 100% no-repeat,linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.6)) 66.66% 0/1px 100% no-repeat,linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.6)) 0 33.33%/100% 1px no-repeat,linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.6)) 0 66.66%/100% 1px no-repeat}
  .crew-txt{position:absolute;left:8%;right:8%;font:600 14px/1.5 Inter,sans-serif;color:#fff;white-space:pre-wrap}
  .crew-bulb{position:absolute;font-size:34px;filter:drop-shadow(0 0 18px #ffd86b);transition:left 1s cubic-bezier(.45,.05,.25,1),top 1s cubic-bezier(.45,.05,.25,1)}
  .crew-glow{position:absolute;inset:0;transition:background 1s}
  `;
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  /* ---------------- camada e cursores ---------------- */
  var layer=document.createElement('div');layer.className='crew-layer';
  document.body.appendChild(layer);
  var cursors=CREW.map(function(m,i){
    var d=document.createElement('div');d.className='crew-cur';
    d.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" fill="'+m.c+'" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg><span style="background:'+m.c+'">'+m.n+'</span>';
    layer.appendChild(d);
    var c={el:d,m:m,x:-80,y:-80,busy:false};
    place(c,innerWidth+60,scrollY+120+i*80,0);
    return c;
  });
  function place(c,x,y,ms){c.x=x;c.y=y;c.el.style.transitionDuration=(ms||0)+'ms';c.el.style.transform='translate('+x+'px,'+y+'px)'}
  function move(c,x,y,ms){ms=ms||Math.min(1100,Math.max(380,Math.hypot(x-c.x,y-c.y)*0.9));place(c,x,y,ms);return wait(ms)}
  function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
  function click(c){c.el.classList.remove('click');void c.el.offsetWidth;c.el.classList.add('click')}
  function abs(el){var r=el.getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,w:r.width,h:r.height}}
  function park(c){var i=cursors.indexOf(c);return move(c,innerWidth+60,scrollY+140+i*70,700)}
  function idle(){return cursors.filter(function(c){return !c.busy})}

  /* ---------------- toggle ---------------- */
  var tg=document.createElement('button');tg.className='crew-toggle';tg.type='button';
  function upd(){tg.classList.toggle('off',!on);tg.innerHTML='<i></i>'+(on?'Equipe ao vivo':'Equipe pausada');tg.title=on?'Desligar as animações da equipe':'Ligar as animações da equipe';layer.style.display=on?'':'none'}
  tg.onclick=function(){on=!on;localStorage.setItem(KEY,on?'1':'0');upd();if(!on)revealAll()};
  document.body.appendChild(tg);upd();

  /* ---------------- build-in ---------------- */
  var SEL='article > h2, article figure, article .table-wrap, article .callout, article .compare, article .cards, article .tool, article .resumo, article .quiz, article ol.steps, .mods .mod, .trilha > div, .extras > a, .stat, .nx-num, .nx-chart, .nx-fact, .gal img, #objetivo .poster, .card, .membro, .yt-why > div';
  var targets=[].slice.call(document.querySelectorAll(SEL)).filter(function(el){return !el.closest('.studio')&&!el.closest('.crew-stage')});
  var queue=[];
  function revealAll(){targets.forEach(function(el){el.classList.remove('crew-hide')})}
  if(on){
    targets.forEach(function(el){var r=el.getBoundingClientRect();if(r.top>innerHeight*0.9){el.classList.add('crew-reveal','crew-hide')}});
  }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting) return; var el=e.target; io.unobserve(el);
    if(!el.classList.contains('crew-hide')) return;
    if(!on){el.classList.remove('crew-hide');return}
    queue.push(el); setTimeout(function(){el.classList.remove('crew-hide')},2600); /* nunca deixa conteúdo escondido */
    pump();
  })},{threshold:.18,rootMargin:'0px 0px -8% 0px'});
  targets.forEach(function(el){io.observe(el)});

  function pump(){
    while(queue.length>5){queue.shift().classList.remove('crew-hide')}
    var free=idle();
    while(free.length&&queue.length){build(free.shift(),queue.shift())}
  }
  async function build(c,el){
    c.busy=true;
    var a=abs(el);
    if(el.classList.contains('crew-hide')===false&&!document.body.contains(el)){c.busy=false;return}
    await move(c,a.x-6,a.y-6);
    click(c);
    var s=document.createElement('div');s.className='crew-sel';s.style.borderColor=c.m.c;
    s.style.left=a.x+'px';s.style.top=a.y+'px';s.style.width='0px';s.style.height='0px';
    s.innerHTML='<i style="border-color:'+c.m.c+'"></i><i style="border-color:'+c.m.c+'"></i><i style="border-color:'+c.m.c+'"></i><i style="border-color:'+c.m.c+'"></i><b style="background:'+c.m.c+'">'+Math.round(a.w)+' × '+Math.round(a.h)+'</b>';
    layer.appendChild(s);
    requestAnimationFrame(function(){s.style.width=a.w+'px';s.style.height=a.h+'px'});
    move(c,a.x+a.w-8,a.y+a.h-8,450);
    await wait(470);
    el.classList.remove('crew-hide');
    if(el.tagName==='H2'){el.classList.add('crew-type')}
    await wait(380);
    s.style.opacity='0';setTimeout(function(){s.remove()},450);
    c.busy=false;
    if(queue.length) pump(); else setTimeout(function(){if(!c.busy)park(c)},900);
  }

  /* ---------------- cenas do topo ---------------- */
  var page=document.body.dataset.page||'';
  var hero=document.querySelector('.mod-hero, .hub-hero');
  var SCENES={
    '01-camera':camera,'02-iluminacao':luz,'03-audio':audio,'04-linguagem':enquadra,'05-roteiro':roteiro,
    '06-edicao':edicao,'07-instagram':social,'08-youtube':youtube,'09-monetizacao':moedas,'10-equipamentos':camera,
    '11-titulos-capas':capa,'12-anuncios':audio,'13-ia-producao':roteiro,'14-monetizar':moedas,
    'ferramentas':cor,'recursos':cor,'glossario':roteiro,'hub':hub
  };
  function stage(){var s=document.createElement('div');s.className='crew-stage';s.innerHTML='<div class="crew-card"></div>';hero.style.position='relative';hero.classList.add('has-stage');hero.appendChild(s);
    var card=s.firstChild;setTimeout(function(){card.classList.add('in')},60);return card}
  function pt(card,fx,fy){var a=abs(card);return {x:a.x+a.w*fx,y:a.y+a.h*fy}}
  function crew(id){return cursors.filter(function(c){return c.m.id===id})[0]}
  async function go(c,card,fx,fy,ms){var p=pt(card,fx,fy);return move(c,p.x,p.y,ms)}

  async function camera(){var card=stage(),c=crew('cam');c.busy=true;
    card.innerHTML='<div class="crew-glow" style="background:linear-gradient(135deg,#6a3fa0,#2f6b8f)"></div><div class="crew-grid" style="opacity:.35"></div><div class="crew-focus"></div><div class="crew-chip" style="left:8%;top:8%">AE/AF TRAVADO</div><div class="crew-slider" style="right:9%;top:18%;bottom:18%;width:6px;height:auto"><div class="crew-knob" style="left:-7px;bottom:20%"></div></div><div class="crew-chip" style="left:8%;bottom:8%;background:#fff">1080p · 30 fps · 1/60</div>';
    await wait(500);await go(c,card,.5,.48);click(c);card.querySelector('.crew-focus').classList.add('in');card.querySelector('.crew-chip').classList.add('in');
    await wait(700);var k=card.querySelector('.crew-knob');await go(c,card,.9,.72,500);click(c);
    k.style.bottom='70%';move(c,pt(card,.9,.3).x,pt(card,.9,.3).y,900);card.querySelector('.crew-glow').style.background='linear-gradient(135deg,#9a6bd6,#58a8cf)';
    await wait(950);card.querySelectorAll('.crew-chip')[1].classList.add('in');c.busy=false;park(c)}
  async function luz(){var card=stage(),c=crew('luz');c.busy=true;
    card.innerHTML='<div class="crew-glow" style="background:radial-gradient(circle at 85% 20%,rgba(255,220,140,.15),rgba(20,10,40,.6) 60%)"></div><div style="position:absolute;left:38%;top:30%;font-size:64px">🙂</div><div class="crew-bulb" style="left:78%;top:10%">💡</div><div class="crew-chip" style="right:8%;bottom:8%;background:#fff">Luz suave · 5600 K</div>';
    await wait(500);var b=card.querySelector('.crew-bulb');await go(c,card,.84,.18);click(c);
    b.style.left='10%';b.style.top='22%';move(c,pt(card,.16,.3).x,pt(card,.16,.3).y,1000);
    card.querySelector('.crew-glow').style.background='radial-gradient(circle at 20% 32%,rgba(255,226,150,.85),rgba(255,200,120,.25) 40%,rgba(20,10,40,.35) 75%)';
    await wait(1050);card.querySelector('.crew-chip').classList.add('in');c.busy=false;park(c)}
  async function audio(){var card=stage(),c=crew('aud');c.busy=true;
    var m='';for(var i=0;i<6;i++)m+='<div class="crew-meter" style="left:'+(10+i*11)+'%;height:4%"></div>';
    card.innerHTML='<div class="crew-glow" style="background:#1b1530"></div>'+m+'<div class="crew-slider" style="right:12%;top:15%;bottom:15%;width:6px;height:auto"><div class="crew-knob" style="left:-7px;bottom:5%"></div></div><div class="crew-chip" style="left:8%;top:8%;background:#70cf97">Pico em −12 dB ✓</div>';
    await wait(500);var k=card.querySelector('.crew-knob');await go(c,card,.88,.82);click(c);k.style.bottom='62%';move(c,pt(card,.88,.4).x,pt(card,.88,.4).y,900);
    var ms=card.querySelectorAll('.crew-meter'),t=0;var iv=setInterval(function(){t++;ms.forEach(function(x,i){x.style.height=(18+Math.abs(Math.sin(t*.7+i))*44)+'%'})},140);
    await wait(1000);card.querySelector('.crew-chip').classList.add('in');c.busy=false;park(c);setTimeout(function(){clearInterval(iv)},9000)}
  async function enquadra(){var card=stage(),c=crew('cam');c.busy=true;
    card.innerHTML='<div class="crew-glow" style="background:linear-gradient(135deg,#2f6b8f,#6a3fa0)"></div><div style="position:absolute;left:58%;top:22%;font-size:72px">🧍</div><div class="crew-frame" style="position:absolute;left:10%;top:12%;width:50%;height:62%;border:2px solid #fff;transition:all .9s cubic-bezier(.45,.05,.25,1)"><div class="crew-grid"></div></div><div class="crew-chip" style="left:8%;bottom:8%;background:#fff">Regra dos terços ✓</div>';
    await wait(500);var f=card.querySelector('.crew-frame');await go(c,card,.35,.43);click(c);
    f.style.left='38%';f.style.top='14%';f.style.width='56%';move(c,pt(card,.66,.45).x,pt(card,.66,.45).y,900);
    await wait(950);card.querySelector('.crew-chip').classList.add('in');c.busy=false;park(c)}
  async function roteiro(){var card=stage(),c=crew('edi');c.busy=true;
    card.innerHTML='<div class="crew-glow" style="background:#faf8fd"></div><div class="crew-txt" style="top:12%;color:#2b2533"></div>';
    var t=card.querySelector('.crew-txt'),txt='GANCHO: “Você sabia que…”\nPROBLEMA: o que incomoda\nSOLUÇÃO: mostre na prática\nCTA: salve e compartilhe';
    t.style.fontFamily='ui-monospace,Consolas,monospace';t.style.fontSize='13px';
    await wait(500);await go(c,card,.12,.18);click(c);
    for(var i=0;i<=txt.length;i++){t.textContent=txt.slice(0,i);if(i%4===0){var lines=txt.slice(0,i).split('\n');var p=pt(card,.1+Math.min(.75,lines[lines.length-1].length*.025),.18+(lines.length-1)*.13);place(c,p.x,p.y,60)}await wait(26)}
    c.busy=false;park(c)}
  async function edicao(){var card=stage(),c=crew('edi');c.busy=true;
    var cols=['#8612d5','#2f9a5c','#22b8d6','#f5a524'],h='<div class="crew-glow" style="background:#17131f"></div><div style="position:absolute;left:6%;right:6%;top:36%;height:30%;background:#231d2f;border-radius:8px"></div>';
    cols.forEach(function(col,i){h+='<div class="crew-clip" style="left:'+(8+i*21)+'%;width:20%;background:'+col+'"></div>'});
    h+='<div style="position:absolute;top:28%;bottom:26%;width:2px;background:#ff4d6d;left:40%" class="crew-ph"></div><div class="crew-chip" style="left:8%;top:8%;background:#70cf97">Corte na batida ✂️</div>';
    card.innerHTML=h;await wait(500);var cl=card.querySelectorAll('.crew-clip');
    for(var i=1;i<4;i++){await go(c,card,(8+i*21)/100,.5,450);click(c);cl[i].style.transform='translateY(-6px)';await wait(160);cl[i].style.transform='';cl[i].style.left=(8+i*21-1.2*i)+'%'}
    card.querySelector('.crew-chip').classList.add('in');c.busy=false;park(c)}
  async function cor(){var card=stage(),c=crew('cor');c.busy=true;
    card.innerHTML='<div class="crew-glow" style="background:#17131f"></div><div class="crew-wheel"></div><div class="crew-dot" style="left:calc(50% - 8px);top:calc(50% - 8px)"></div><div class="crew-chip" style="left:8%;top:8%;background:#fff">Teal & orange suave</div>';
    await wait(500);var d=card.querySelector('.crew-dot');await go(c,card,.5,.5);click(c);
    d.style.left='calc(62% - 8px)';d.style.top='calc(40% - 8px)';move(c,pt(card,.62,.4).x,pt(card,.62,.4).y,800);
    await wait(850);hero.style.transition='filter 1s';hero.style.filter='saturate(1.25) hue-rotate(-8deg)';card.querySelector('.crew-chip').classList.add('in');
    setTimeout(function(){hero.style.filter=''},2600);c.busy=false;park(c)}
  async function social(){var card=stage(),c=crew('cor');c.busy=true;
    card.innerHTML='<div class="crew-glow" style="background:linear-gradient(160deg,#f58529,#dd2a7b,#8134af)"></div><div style="position:absolute;left:30%;top:18%;width:40%;height:64%;border-radius:12px;background:rgba(255,255,255,.2);border:2px solid #fff"></div><div class="crew-chip" style="left:8%;bottom:8%;background:#fff">+128 curtidas</div>';
    await wait(500);await go(c,card,.5,.5);for(var i=0;i<5;i++){click(c);var hh=document.createElement('div');hh.className='crew-heart';hh.textContent='❤️';hh.style.left=(42+Math.random()*16)+'%';hh.style.top='46%';card.appendChild(hh);await wait(220)}
    card.querySelector('.crew-chip').classList.add('in');c.busy=false;park(c)}
  async function youtube(){var card=stage(),c=crew('edi');c.busy=true;
    card.innerHTML='<div class="crew-glow" style="background:#0f0f0f"></div><div style="position:absolute;left:8%;right:8%;top:10%;height:56%;border-radius:10px;background:linear-gradient(120deg,#5a0b91,#8612d5);display:grid;place-items:center;font:800 18px Poppins,sans-serif;color:#fff">CAPA ▶</div><div style="position:absolute;left:8%;right:8%;top:74%;height:6px;border-radius:3px;background:#333"><div class="crew-prog" style="height:100%;width:0;background:#ff3b3b;border-radius:3px;transition:width 1.4s"></div></div><div class="crew-chip" style="left:8%;bottom:6%;background:#70cf97">Retenção 62% ↑</div>';
    await wait(500);await go(c,card,.5,.38);click(c);card.querySelector('.crew-prog').style.width='72%';move(c,pt(card,.75,.76).x,pt(card,.75,.76).y,1400);
    await wait(1450);card.querySelector('.crew-chip').classList.add('in');c.busy=false;park(c)}
  async function moedas(){var card=stage(),c=crew('luz');c.busy=true;
    card.innerHTML='<div class="crew-glow" style="background:linear-gradient(135deg,#1f6f45,#2f9a5c)"></div><div style="position:absolute;left:38%;bottom:12%;font-size:64px">🐷</div><div class="crew-chip" style="left:8%;top:8%;background:#ffd23f">R$ 0</div>';
    await wait(500);var chip=card.querySelector('.crew-chip');chip.classList.add('in');await go(c,card,.5,.2);
    for(var i=1;i<=6;i++){click(c);var m=document.createElement('div');m.className='crew-coin';m.textContent='🪙';m.style.left=(44+Math.random()*10)+'%';m.style.bottom='40%';card.appendChild(m);chip.textContent='R$ '+(i*150);await wait(260)}
    c.busy=false;park(c)}
  async function capa(){var card=stage(),c=crew('cor');c.busy=true;
    card.innerHTML='<div class="crew-glow" style="background:linear-gradient(120deg,#2a0a45,#8612d5)"></div><div style="position:absolute;right:6%;top:12%;font-size:70px">😮</div><div class="crew-word" style="position:absolute;left:60%;top:70%;font:900 22px Poppins,sans-serif;color:#16121d;background:#70cf97;padding:4px 10px;transition:all .9s cubic-bezier(.45,.05,.25,1)">EM 60s</div><div class="crew-chip" style="left:8%;bottom:8%;background:#fff">CTR 4,1% → 7,8%</div>';
    await wait(500);var w=card.querySelector('.crew-word');await go(c,card,.68,.76);click(c);w.style.left='8%';w.style.top='20%';w.style.fontSize='30px';move(c,pt(card,.16,.26).x,pt(card,.16,.26).y,900);
    await wait(950);card.querySelector('.crew-chip').classList.add('in');c.busy=false;park(c)}
  async function hub(){
    var cs=cursors.slice(),h=abs(hero);
    for(var i=0;i<cs.length;i++){(function(c,i){c.busy=true;move(c,h.x+h.w*(.55+.08*i),h.y+h.h*(.25+.12*i),900).then(function(){click(c);setTimeout(function(){c.busy=false;park(c)},1400+i*200)})})(cs[i],i)}
  }
  if(on&&hero&&SCENES[page]) setTimeout(SCENES[page],700);

  /* home: equipe chega e "assina" o topo */
  if(on&&!page&&document.querySelector('.hero')){
    var hp=document.querySelectorAll('.hero-pills span');
    setTimeout(function(){cursors.forEach(function(c,i){if(!hp[i])return;c.busy=true;var a=abs(hp[i]);
      move(c,a.x+a.w*.6,a.y+a.h*.6,900+i*120).then(function(){click(c);hp[i].style.transition='transform .3s';hp[i].style.transform='translateY(-4px) scale(1.06)';
        setTimeout(function(){hp[i].style.transform='';c.busy=false;park(c)},1300)})})},900);
  }
  addEventListener('resize',function(){cursors.forEach(function(c){if(!c.busy)park(c)})});
})();
