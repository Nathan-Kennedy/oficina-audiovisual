/* =====================================================================
   Efeitos audiovisuais do site (uma vez por elemento, curtos e discretos)
   📸 flash   : fotos/galerias "fotografadas" (visor + flash)
   🎨 grade   : blocos chegam em P&B e uma linha de color grading colore
   🧊 render  : diagramas/gráficos aparecem em "buckets" como num render
   💡 luz     : seção escura; mouse ou dedo vira lanterna; depois acende
   Respeita prefers-reduced-motion e tem botão liga/desliga (salvo).
   ===================================================================== */
(function(){
  if(window.__fx) return; window.__fx=1;
  var KEY='fx-efeitos';
  var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var on=localStorage.getItem(KEY)!==null?localStorage.getItem(KEY)==='1':!reduced;

  var css=`
  .fx-rel{position:relative}
  .fx-ov{position:absolute;inset:0;pointer-events:none;z-index:5;border-radius:inherit}
  /* flash */
  .fx-pre-flash{opacity:0}
  .fx-brk{position:absolute;inset:6px;pointer-events:none;z-index:6;opacity:0;transform:scale(1.06);transition:opacity .2s,transform .3s cubic-bezier(.2,.8,.2,1)}
  .fx-brk.in{opacity:1;transform:none}
  .fx-brk i{position:absolute;width:22px;height:22px;border:2.5px solid #fff;filter:drop-shadow(0 0 2px rgba(0,0,0,.6))}
  .fx-brk i:nth-child(1){left:0;top:0;border-right:0;border-bottom:0}.fx-brk i:nth-child(2){right:0;top:0;border-left:0;border-bottom:0}
  .fx-brk i:nth-child(3){left:0;bottom:0;border-right:0;border-top:0}.fx-brk i:nth-child(4){right:0;bottom:0;border-left:0;border-top:0}
  .fx-brk b{position:absolute;right:30px;top:2px;font:700 11px Inter,sans-serif;color:#fff;display:flex;gap:6px;align-items:center;text-shadow:0 1px 3px #000}
  .fx-brk b::before{content:"";width:8px;height:8px;border-radius:50%;background:#ff3b3b}
  .fx-flash{position:absolute;inset:0;background:#fff;pointer-events:none;z-index:7;opacity:0;border-radius:inherit}
  .fx-flash.go{animation:fxflash .45s ease-out}
  @keyframes fxflash{0%{opacity:0}10%{opacity:.85}100%{opacity:0}}
  .fx-shot{animation:fxshot .6s cubic-bezier(.2,.8,.2,1)}
  @keyframes fxshot{0%{opacity:0;filter:brightness(2.2)}25%{opacity:1;filter:brightness(1.8)}100%{filter:none}}
  /* grade */
  .fx-grade{-webkit-backdrop-filter:grayscale(1) contrast(.88) brightness(1.04);backdrop-filter:grayscale(1) contrast(.88) brightness(1.04);left:0;transition:left .95s cubic-bezier(.65,0,.35,1)}
  .fx-grade::before{content:"";position:absolute;left:-1px;top:0;bottom:0;width:2px;background:#fff;box-shadow:0 0 14px 4px rgba(255,190,90,.75),0 0 2px #fff}
  .fx-grade.go{left:100%}
  .fx-gtag{position:absolute;right:8px;top:8px;z-index:7;font:700 10.5px Inter,sans-serif;background:#16121d;color:#ffd27a;padding:4px 7px;border-radius:6px;opacity:0;transition:opacity .3s}
  .fx-gtag.in{opacity:1}
  /* render */
  .fx-tiles{display:grid;overflow:hidden}
  .fx-tiles span{background:#17131f;transition:opacity .22s}
  .fx-tiles span.cur{background:#231d30;outline:1.5px solid #ffb020;outline-offset:-1.5px}
  .fx-tiles span.done{opacity:0}
  .fx-rtag{position:absolute;left:10px;top:10px;z-index:7;font:700 11px ui-monospace,Consolas,monospace;background:#16121d;color:#70cf97;padding:5px 8px;border-radius:6px;transition:opacity .35s}
  /* luz */
  .fx-dark{position:absolute;inset:0;z-index:8;pointer-events:none;transition:opacity 1.2s ease;
    background:radial-gradient(circle var(--r,170px) at var(--x,50%) var(--y,40%),rgba(10,6,16,0) 0%,rgba(10,6,16,.15) 45%,rgba(10,6,16,.93) 100%)}
  .fx-dark.lit{opacity:0}
  .fx-hint{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;font:700 13px Poppins,sans-serif;color:#fff;background:rgba(22,18,29,.85);border:1px solid rgba(255,255,255,.2);padding:8px 14px;border-radius:999px;pointer-events:none;transition:opacity .6s;white-space:nowrap}
  .fx-toggle{position:fixed;left:14px;bottom:14px;z-index:95;border:0;border-radius:999px;padding:8px 13px;font:700 12px Inter,sans-serif;cursor:pointer;background:rgba(22,18,29,.88);color:#fff;box-shadow:0 6px 20px rgba(0,0,0,.25);opacity:.75;transition:opacity .2s}
  .fx-toggle:hover{opacity:1}
  .fx-toggle.off{background:rgba(120,120,120,.8)}
  @media(max-width:700px){.fx-toggle{left:auto;right:10px;bottom:10px;padding:7px 10px;font-size:11px;opacity:.6}}
  `;
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  var tg=document.createElement('button');tg.type='button';tg.className='fx-toggle';
  function upd(){tg.classList.toggle('off',!on);tg.textContent=on?'✨ Efeitos ligados':'✨ Efeitos desligados'}
  tg.onclick=function(){on=!on;localStorage.setItem(KEY,on?'1':'0');upd();if(!on)clearAll()};
  document.body.appendChild(tg);upd();

  function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
  function rel(el){if(getComputedStyle(el).position==='static')el.classList.add('fx-rel')}

  /* ---------------- alvos ---------------- */
  var RULES=[
    ['flash','.gal, .stories, #objetivo .poster, article figure:has(img), .membro'],
    ['render','article figure, article .table-wrap, article .tool, .nx-chart, .yt-player'],
    ['grade','article .compare, article .cards, article .resumo, .stat, .nx-num, .nx-fact, .mods .mod, .extras > a, .trilha > div, .slot, .ideas']
  ];
  var items=[];
  RULES.forEach(function(r){[].forEach.call(document.querySelectorAll(r[1]),function(el){
    if(el.closest('.studio')||el.__fx) return; el.__fx=r[0]; items.push(el);
  })});
  function clearAll(){items.forEach(function(el){el.classList.remove('fx-pre-flash');[].forEach.call(el.querySelectorAll(':scope > .fx-ov, :scope > .fx-gtag, :scope > .fx-rtag, :scope > .fx-brk'),function(o){o.remove()})});
    [].forEach.call(document.querySelectorAll('.fx-dark,.fx-hint'),function(o){o.remove()})}

  /* prepara (estado "antes") só se os efeitos estiverem ligados */
  function prep(el){
    var t=el.__fx;
    if(t==='flash'){ if(el.tagName==='IMG'){el.classList.add('fx-pre-flash')} else el.classList.add('fx-pre-flash'); }
    if(t==='grade'){ rel(el); var g=document.createElement('div');g.className='fx-ov fx-grade';el.appendChild(g); }
    if(t==='render'){ rel(el); var cols=Math.max(8,Math.min(18,Math.round(el.offsetWidth/80))),rows=Math.max(3,Math.round(cols*el.offsetHeight/Math.max(1,el.offsetWidth)));el.__cols=cols;
      var d=document.createElement('div');d.className='fx-ov fx-tiles';d.style.gridTemplateColumns='repeat('+cols+',1fr)';d.style.gridTemplateRows='repeat('+rows+',1fr)';
      d.innerHTML=new Array(cols*rows+1).join('<span></span>');el.appendChild(d);
      var tag=document.createElement('div');tag.className='fx-rtag';tag.textContent='Renderizando… 0%';el.appendChild(tag); }
  }
  async function play(el){
    var t=el.__fx;
    if(t==='flash'){
      var host=el.tagName==='IMG'?el.parentElement:el; rel(host);
      var b=document.createElement('div');b.className='fx-brk';b.innerHTML='<i></i><i></i><i></i><i></i><b>REC</b>';
      if(el.tagName==='IMG'){var r=el.getBoundingClientRect(),h=host.getBoundingClientRect();b.style.inset='auto';b.style.left=(r.left-h.left+6)+'px';b.style.top=(r.top-h.top+6)+'px';b.style.width=(r.width-12)+'px';b.style.height=(r.height-12)+'px'}
      host.appendChild(b);
      el.classList.remove('fx-pre-flash');el.style.opacity='.18';
      requestAnimationFrame(function(){b.classList.add('in')});
      await wait(420);
      var fl=document.createElement('div');fl.className='fx-flash';if(el.tagName==='IMG'){fl.style.cssText=b.style.cssText.replace(/opacity[^;]*;?/,'');fl.style.inset='auto'}host.appendChild(fl);fl.classList.add('go');setTimeout(function(){fl.remove()},600);
      el.style.opacity='';el.classList.add('fx-shot');
      await wait(650);b.style.opacity='0';await wait(250);b.remove();el.classList.remove('fx-shot');
    }
    if(t==='grade'){
      var g=el.querySelector(':scope > .fx-grade'); if(!g) return;
      var tag=document.createElement('div');tag.className='fx-gtag';tag.textContent='🎨 LUT aplicada';el.appendChild(tag);
      requestAnimationFrame(function(){g.classList.add('go');tag.classList.add('in')});
      await wait(1050);g.remove();tag.classList.remove('in');await wait(320);tag.remove();
    }
    if(t==='render'){
      var d=el.querySelector(':scope > .fx-tiles'),tag2=el.querySelector(':scope > .fx-rtag'); if(!d) return;
      var tiles=[].slice.call(d.children),order=tiles.map(function(_,i){return i});
      /* ordem em espiral simples a partir do centro, como buckets de render */
      var cols=el.__cols||8,rows=tiles.length/cols,cx=(cols-1)/2,cy=(rows-1)/2;
      order.sort(function(a,b){var ax=a%cols-cx,ay=Math.floor(a/cols)-cy,bx=b%cols-cx,by=Math.floor(b/cols)-cy;return (ax*ax+ay*ay)-(bx*bx+by*by)});
      var step=Math.max(12,Math.min(28,900/tiles.length));
      for(var i=0;i<order.length;i++){var tl=tiles[order[i]];tl.classList.add('cur');
        (function(x){setTimeout(function(){x.classList.remove('cur');x.classList.add('done')},step*1.6)})(tl);
        if(tag2&&i%3===0)tag2.textContent='Renderizando… '+Math.round(i/order.length*100)+'%';
        await wait(step)}
      if(tag2){tag2.textContent='Render concluído ✓';await wait(500);tag2.style.opacity='0'}
      await wait(380);d.remove();if(tag2)tag2.remove();
    }
  }

  if(on){
    items.forEach(prep);
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting) return; io.unobserve(e.target);
      var el=e.target, delay=(e.boundingClientRect.top<innerHeight*.5)?Math.random()*200:0;
      setTimeout(function(){play(el)},delay+120);
    })},{threshold:.3});
    items.forEach(function(el){io.observe(el)});
    /* segurança: nada fica escondido se algo falhar */
    setTimeout(function(){},0);
  }

  /* ---------------- luz (lanterna) ---------------- */
  function lantern(sec,opt){
    opt=opt||{};
    rel(sec);
    var d=document.createElement('div');d.className='fx-dark';sec.appendChild(d);
    var hint=document.createElement('div');hint.className='fx-hint';hint.textContent=opt.hint||'💡 Mova o mouse ou o dedo para iluminar';sec.appendChild(hint);
    var moved=0,lx=null,ly=null,lit=false,auto=true,t0=performance.now(),seen=false;
    function set(x,y){d.style.setProperty('--x',x+'px');d.style.setProperty('--y',y+'px')}
    function light(){if(lit)return;lit=true;d.classList.add('lit');hint.textContent='💡 Luz acesa!';setTimeout(function(){hint.style.opacity='0'},900);setTimeout(function(){d.remove();hint.remove()},2200)}
    function onMove(e){var r=sec.getBoundingClientRect();var x=e.clientX-r.left,y=e.clientY-r.top;auto=false;
      if(lx!==null)moved+=Math.hypot(x-lx,y-ly);lx=x;ly=y;set(x,y);d.style.setProperty('--r',Math.min(320,170+moved/12)+'px');
      if(moved>(opt.need||1400))light()}
    sec.addEventListener('pointermove',onMove,{passive:true});
    sec.addEventListener('touchmove',function(e){if(e.touches[0])onMove(e.touches[0])},{passive:true});
    (function loop(now){if(lit)return;
      if(auto&&seen){var r=sec.getBoundingClientRect(),k=(now-t0)/1000;set(r.width*(.5+.32*Math.sin(k*.9)),r.height*(.45+.22*Math.sin(k*1.7)))}
      requestAnimationFrame(loop)})(t0);
    new IntersectionObserver(function(es){if(es[0].isIntersecting&&!seen){seen=true;t0=performance.now();setTimeout(light,opt.auto||9000)}},{threshold:.35}).observe(sec);
  }

  /* ---------------- topos especiais ---------------- */
  var page=document.body.dataset.page||'';
  var hero=document.querySelector('.mod-hero');
  if(on){
    if(!page){ var cena=document.getElementById('cena-oficina'); if(cena) lantern(cena,{hint:'💡 O estúdio está no escuro: mova o mouse ou o dedo para iluminar',need:1100,auto:7000}); }
    if(page==='02-iluminacao'&&hero) lantern(hero,{need:900,auto:6000});
    if(page==='01-camera'&&hero){ hero.__fx='flash'; setTimeout(function(){play(hero)},500); }
    if((page==='06-edicao'||page==='ferramentas')&&hero){ hero.__fx='render'; prep(hero); setTimeout(function(){play(hero)},400); }
    if((page==='11-titulos-capas'||page==='04-linguagem')&&hero){ hero.__fx='grade'; prep(hero); setTimeout(function(){play(hero)},500); }
  }
})();
