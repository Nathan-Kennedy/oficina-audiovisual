/* Guia Audiovisual com Pouco Recurso — shell compartilhado
   Cada página só precisa de: <body data-page="ID"> ... <main class="content"> ... </main>
   O script injeta topbar, sidebar, sumário, quiz, checklist, "concluir módulo", pager e rodapé. */
(function(){
  var MODS=[
    {id:'01-camera',t:'Câmera e configurações',e:'📱',d:'Como o celular grava e quais ajustes usar: resolução, fps, obturador, ISO e foco.'},
    {id:'02-iluminacao',t:'Iluminação',e:'💡',d:'Luz natural, três pontos, temperatura de cor e soluções caseiras baratas.'},
    {id:'03-audio',t:'Áudio',e:'🎙️',d:'Microfones, ambiente, níveis e como limpar o som do seu vídeo.'},
    {id:'04-linguagem',t:'Linguagem visual',e:'🎞️',d:'Planos, ângulos, movimentos, composição e continuidade.'},
    {id:'05-roteiro',t:'Roteiro e planejamento',e:'📝',d:'Ganchos, estruturas, storyboard e pré-produção sem dor de cabeça.'},
    {id:'06-edicao',t:'Edição',e:'✂️',d:'Fluxo de edição, cortes, ritmo, legendas, cor e exportação.'},
    {id:'07-instagram',t:'Instagram',e:'📸',d:'Reels, carrossel, stories, perfil, métricas e crescimento.'},
    {id:'08-youtube',t:'YouTube',e:'▶️',d:'Nicho, SEO, thumbnails, retenção, Shorts e monetização.'},
    {id:'09-monetizacao',t:'Ganhar dinheiro',e:'💰',d:'Serviços, preço, portfólio, prospecção e contratos.'},
    {id:'10-equipamentos',t:'Equipamentos',e:'🧰',d:'Kits por orçamento, do R$ 0 ao intermediário, e soluções faça-você-mesmo.'},
    {id:'11-titulos-capas',t:'Títulos, capas e posts',e:'🎯',d:'CTR na prática: títulos, thumbnails, capas de Reels e TikTok, carrosséis e legendas que fazem clicar.'},
    {id:'12-anuncios',t:'Anúncios e tráfego pago',e:'📣',d:'Meta Ads, TikTok Ads e Google/YouTube Ads: público, orçamento, criativos e métricas.'},
    {id:'13-ia-producao',t:'IA como assistente',e:'🤖',d:'Automação com IA para editar vídeos, anúncios e posts mais rápido, com o trabalho humano no centro.'},
    {id:'14-monetizar',t:'Formas de monetizar',e:'🪙',d:'Afiliados, cursos, monetização das plataformas, produto próprio e site com IA, com segurança.'}
  ];
  var EXTRAS=[
    {id:'ferramentas',t:'Ferramentas interativas',e:'🧮'},
    {id:'recursos',t:'Recursos gratuitos',e:'🎁'},
    {id:'glossario',t:'Glossário',e:'📖'}
  ];
  window.GUIA_MODS=MODS;
  var KEY='guia-av-done', done=JSON.parse(localStorage.getItem(KEY)||'{}');
  function save(){localStorage.setItem(KEY,JSON.stringify(done))}
  var page=document.body.dataset.page||'';
  var theme=localStorage.getItem('guia-theme')||'light';
  document.documentElement.dataset.theme=theme;

  function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}

  /* topbar */
  var top=el('<header class="topbar"><div class="in">'+
    '<button class="icon-btn menu-btn" aria-label="Menu">☰</button>'+
    '<a class="logo" href="../index.html"><img src="../assets/img/logo-oficina.png" alt="NK Oficina"></a>'+
    '<nav><a href="../index.html">A Oficina</a><a href="index.html"'+(page==='hub'?' class="on"':'')+'>Guia</a>'+
    '<a href="ferramentas.html"'+(page==='ferramentas'?' class="on"':'')+'>Ferramentas</a>'+
    '<a href="glossario.html"'+(page==='glossario'?' class="on"':'')+'>Glossário</a>'+
    '<button class="icon-btn theme keep" aria-label="Alternar tema">'+(theme==='dark'?'☀️':'🌙')+'</button></nav></div></header>');
  document.body.prepend(top);
  document.body.insertBefore(el('<div class="progress-bar"></div>'),top.nextSibling);
  top.querySelector('.theme').onclick=function(){
    theme=theme==='dark'?'light':'dark';localStorage.setItem('guia-theme',theme);
    document.documentElement.dataset.theme=theme;this.textContent=theme==='dark'?'☀️':'🌙';
  };
  top.querySelector('.menu-btn').onclick=function(){document.body.classList.toggle('nav-open')};

  var main=document.querySelector('main.content');
  if(main && page!=='hub'){
    /* sidebar */
    var s='<aside class="sidebar"><a href="index.html"'+(page==='hub'?' class="on"':'')+'><span class="n">🏠</span>Início do guia</a><h4>Módulos</h4>';
    MODS.forEach(function(m,i){
      s+='<a href="'+m.id+'.html" class="'+(m.id===page?'on ':'')+(done[m.id]?'done':'')+'"><span class="n">'+(done[m.id]?'✓':(i+1))+'</span>'+m.t+'</a>';
      if(m.id===page) s+='<div class="toc"></div>';
    });
    s+='<h4>Extras</h4>';
    EXTRAS.forEach(function(m){
      s+='<a href="'+m.id+'.html"'+(m.id===page?' class="on"':'')+'><span class="n">'+m.e+'</span>'+m.t+'</a>';
      if(m.id===page) s+='<div class="toc"></div>';
    });
    s+='</aside>';
    var lay=el('<div class="layout"></div>');
    main.parentNode.insertBefore(lay,main);
    lay.appendChild(el(s));lay.appendChild(main);
    var sb=lay.querySelector('.sidebar');
    sb.addEventListener('click',function(e){if(e.target.closest('a'))document.body.classList.remove('nav-open')});

    /* in-page TOC from h2[id] */
    var toc=sb.querySelector('.toc'), hs=[].slice.call(main.querySelectorAll('article h2[id]'));
    if(toc){hs.forEach(function(h){var a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent.replace(/^\d+\s*/,'');toc.appendChild(a)})}
    var links=toc?[].slice.call(toc.querySelectorAll('a')):[];
    var bar=document.querySelector('.progress-bar');
    window.addEventListener('scroll',function(){
      var h=document.documentElement, p=h.scrollTop/(h.scrollHeight-h.clientHeight);bar.style.width=(p*100)+'%';
      var cur=-1;hs.forEach(function(x,i){if(x.getBoundingClientRect().top<120)cur=i});
      links.forEach(function(a,i){a.classList.toggle('on',i===cur)});
    },{passive:true});

    /* module: done box + pager */
    var idx=MODS.findIndex(function(m){return m.id===page});
    var art=main.querySelector('article');
    if(idx>=0 && art){
      var db=el('<div class="done-box"><div><b>Terminou este módulo?</b><br><span style="font-size:15px;color:var(--muted)">Marque como concluído para acompanhar seu progresso no guia.</span></div><button class="btn green"></button></div>');
      var b=db.querySelector('button');
      function upd(){b.textContent=done[page]?'✓ Módulo concluído':'Marcar como concluído'}
      upd();b.onclick=function(){done[page]=!done[page];if(!done[page])delete done[page];save();upd();
        var a=sb.querySelector('a[href="'+page+'.html"]');a.classList.toggle('done',!!done[page]);a.querySelector('.n').textContent=done[page]?'✓':(idx+1)};
      art.appendChild(db);
      var pg='<div class="pager">';
      if(idx>0)pg+='<a class="prev" href="'+MODS[idx-1].id+'.html"><small>← Módulo anterior</small><b>'+MODS[idx-1].t+'</b></a>';
      if(idx<MODS.length-1)pg+='<a class="next" href="'+MODS[idx+1].id+'.html"><small>Próximo módulo →</small><b>'+MODS[idx+1].t+'</b></a>';
      else pg+='<a class="next" href="ferramentas.html"><small>Continue →</small><b>Ferramentas interativas</b></a>';
      art.appendChild(el(pg+'</div>'));
    }
  }

  /* footer */
  document.body.appendChild(el('<footer class="foot"><img src="../assets/img/selos.png" alt="Lei Paulo Gustavo, Ministério da Cultura, Governo Federal, FUNCET, Prefeitura de Ariquemes">'+
    '<p>Conteúdo gratuito da oficina <b>Como produzir com pouco recurso no audiovisual</b>, por Nathan Kennedy (<a href="https://www.facebook.com/share/192dd6MgjS/" target="_blank" rel="noopener">Facebook</a> · <a href="mailto:nathankennedyoficial@gmail.com">e-mail</a>), com participação de <a href="https://www.instagram.com/lucasrikeh/" target="_blank" rel="noopener">Lucas Rikelmy</a> (fotógrafo e filmmaker).<br>Este projeto foi contemplado no Edital 001/2023 (Audiovisual) da Lei Paulo Gustavo do município de Ariquemes.<br>Site e guia desenvolvidos por Nathan Kennedy.</p></footer>'));

  /* quiz: <div class="quiz"><script type="application/json">[{"q":"","o":["",""],"a":0,"e":""}]</script></div> */
  [].forEach.call(document.querySelectorAll('.quiz'),function(qz){
    var data;try{data=JSON.parse(qz.querySelector('script').textContent)}catch(e){return}
    var title=qz.dataset.title||'Teste seus conhecimentos';
    var h='<h3>🧠 '+title+'</h3>', ok=0, ans=0;
    data.forEach(function(it,i){
      h+='<div class="q" data-i="'+i+'"><p>'+(i+1)+'. '+it.q+'</p>';
      it.o.forEach(function(o,j){h+='<button class="opt" data-j="'+j+'">'+o+'</button>'});
      h+='<div class="exp">'+(it.e||'')+'</div></div>';
    });
    qz.innerHTML=h+'<div class="score"></div>';
    qz.addEventListener('click',function(e){
      var b=e.target.closest('button.opt');if(!b)return;
      var q=b.closest('.q');if(q.classList.contains('answered'))return;
      var it=data[+q.dataset.i], j=+b.dataset.j;
      q.classList.add('answered');ans++;
      [].forEach.call(q.querySelectorAll('.opt'),function(x){x.disabled=true;if(+x.dataset.j===it.a)x.classList.add('right')});
      if(j===it.a)ok++;else b.classList.add('wrong');
      if(ans===data.length)qz.querySelector('.score').textContent='Você acertou '+ok+' de '+data.length+(ok===data.length?' 🎉 Mandou bem!':ok>=data.length/2?' 👍 Bom trabalho!':' — revise o módulo e tente de novo.');
    });
  });

  /* checklists persist */
  [].forEach.call(document.querySelectorAll('ul.checklist'),function(ul,k){
    var ck='guia-ck-'+page+'-'+k, st=JSON.parse(localStorage.getItem(ck)||'[]');
    [].forEach.call(ul.children,function(li,i){if(st[i])li.classList.add('ok');li.onclick=function(){li.classList.toggle('ok');st[i]=li.classList.contains('ok');localStorage.setItem(ck,JSON.stringify(st))}});
  });

  /* hub: render module cards */
  var hub=document.getElementById('mods');
  if(hub){
    var n=0;
    MODS.forEach(function(m,i){if(done[m.id])n++;
      hub.appendChild(el('<a class="mod'+(done[m.id]?' done':'')+'" href="'+m.id+'.html"><span class="em">'+m.e+'</span><div class="num">MÓDULO '+String(i+1).padStart(2,'0')+'</div><h3>'+m.t+'</h3><p>'+m.d+'</p><div class="st">'+(done[m.id]?'✓ Concluído':'Não iniciado')+'</div></a>'));
    });
    var r=document.getElementById('ring');if(r)r.innerHTML='<b>'+n+'/'+MODS.length+'</b><span>módulos concluídos<br>(salvo neste navegador)</span>';
  }
  /* efeitos audiovisuais (flash, grading, render, luz) */
  var cs=document.createElement('script');cs.src='assets/fx.js';document.body.appendChild(cs);
})();
