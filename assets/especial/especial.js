/* Especial: o vídeo "se produz sozinho" na tela, seguindo as etapas reais de um videomaker. */
(function(){
  var root=document.getElementById('especial'); if(!root) return;
  var B='assets/especial/';
  var TOTAL=60;
  /* tempos reais do vídeo renderizado no Remotion (120 BPM) */
  var CUTS=[
    ['241',4,3,'Briefing com o cliente'],['4953',7,3,'Ideia, gancho e mensagem'],['41271',10,3,'Roteiro e lista de cenas'],
    ['44076',13,3,'Bateria, cartão e lente limpa'],['46353',16,2,''],['41282',18,3,'Configurações certas antes do REC'],
    ['41289',21,2,'Microfone perto da boca'],['44069',23,2,''],['44062',25,2,'Luz de frente'],['46352',27,3,'Movimento estável'],['49645',30,2,''],['8784',32,2,'Vertical para Reels'],
    ['41273',34,2,'Cortes no ritmo'],['44054',36,2,''],['47208',38,4,'Correção de cor'],['44074',42,2,''],['44075',44,3,'Legendas, trilha e motion'],
    ['4919',47,3,'Exportado no formato certo'],['41174',50,2,'Aprovado pelo cliente'],['41272',52,3,'No ar!']
  ];
  var MOTION=[['Abertura',0,4],['01 Roteiro',4,2],['02 Pré',13,2],['03 Captação',21,2],['04 Edição',34,2],['05 Entrega',47,2],['Tela final',55,5]];
  var STAGES=[
    {t:'Roteiro',n:'01',p:'Antes de ligar a câmera, o videomaker conversa com o cliente e escreve o roteiro: objetivo, público, gancho e a lista de cenas.',li:['Briefing com o cliente','Objetivo e público definidos','Gancho dos 3 primeiros segundos','Lista de cenas pronta'],m:['05-roteiro','Módulo 5: Roteiro']},
    {t:'Pré-produção',n:'02',p:'Checklist de equipamento e configurações. É aqui que se evita 90% dos problemas da gravação.',li:['Bateria e cartão de memória','Lente limpa','1080p · 30 fps · obturador 1/60','Áudio e luz testados'],m:['10-equipamentos','Módulo 10: Equipamentos']},
    {t:'Captação',n:'03',p:'Gravação com luz de frente, microfone perto e planos variados: abertos, médios e detalhes. Cada clipe vai para a mídia do projeto.',li:['20 clipes gravados','Luz de frente para o rosto','Microfone perto da boca','Planos abertos, médios e detalhes'],m:['04-linguagem','Módulo 4: Linguagem visual']},
    {t:'Montagem',n:'04',p:'Os clipes vão para a timeline. A trilha tem 120 BPM e cada corte cai exatamente na batida. Repare na imagem ainda “lavada”: é o bruto, sem cor.',li:['Trilha de 120 BPM na timeline','Clipes na ordem do roteiro','Cortes na batida da música','60 segundos cravados'],m:['06-edicao','Módulo 6: Edição']},
    {t:'Correção de cor',n:'05',p:'Contraste, saturação, balanço de branco e um look final. Arraste os olhos pela divisória: à direita o antes, à esquerda o depois.',li:['Balanço de branco','Contraste e exposição','Saturação controlada','Look final consistente'],m:['06-edicao','Módulo 6: Edição']},
    {t:'Legendas e motion',n:'06',p:'Títulos dos capítulos, legendas animadas palavra por palavra, barra de progresso e tela final com chamada para ação.',li:['Títulos dos capítulos','Legendas animadas','Barra das etapas','Tela final com chamada'],m:['11-titulos-capas','Módulo 11: Títulos e capas']},
    {t:'Exportação e entrega',n:'07',p:'Exportação no formato certo para a plataforma, revisão final e envio para o cliente aprovar.',li:['H.264 · 1920×1080','30 fps · ~8 Mbps','Revisão final','Aprovado pelo cliente'],m:['09-monetizacao','Módulo 9: Ganhar dinheiro']},
    {t:'Publicação',n:'08',p:'Capa, título, descrição com capítulos e palavras-chave: tudo o que o guia ensina, aplicado no vídeo publicado logo abaixo.',li:['Título com palavra-chave','Capa com rosto e contraste','Descrição com capítulos','Poucas hashtags relevantes'],m:['08-youtube','Módulo 8: YouTube']}
  ];
  var SCRIPT='ROTEIRO · “Do bruto à entrega” (60 s)\nObjetivo: mostrar o processo real de um videomaker\nPúblico: quem quer começar no audiovisual\nTrilha: 120 BPM · cortes na batida\n\n00:00  GANCHO · título animado\n00:05  01 Roteiro e briefing\n00:13  02 Pré-produção\n00:21  03 Captação\n00:34  04 Edição e cor\n00:46  05 Entrega\n00:54  CHAMADA · guia gratuito';
  var GEAR=[['🔋','Bateria 100%'],['💾','128 GB livres'],['🧽','Lente limpa'],['⚙️','1080p · 30 fps'],['🎙️','Áudio testado'],['💡','Luz posicionada']];

  /* ---------- markup ---------- */
  var chips=STAGES.map(function(s){return '<span>'+s.n+' '+s.t+'</span>'}).join('');
  var thumbs=CUTS.map(function(c){return '<img src="'+B+'thumbs/'+c[0]+'.jpg" alt="" data-id="'+c[0]+'">'}).join('');
  var ruler='';for(var s=0;s<=60;s+=10)ruler+='<span style="left:'+(s/TOTAL*100)+'%">0:'+(s<10?'0':'')+s+'</span>';
  root.querySelector('.studio').innerHTML=
   '<div class="st-top"><div class="st-dots"><i></i><i></i><i></i></div><div class="st-name">NK Studio · projeto: do-bruto-a-entrega</div><div class="st-chips">'+chips+'</div></div>'+
   '<div class="st-body">'+
    '<div class="st-media"><div class="st-h"><span>Mídia</span><span class="bin-n">0 clipes</span></div><div class="bin">'+thumbs+'</div></div>'+
    '<div class="st-viewer"><div class="screen">'+
      '<div class="layer vw-doc"></div>'+
      '<div class="layer vw-gear">'+GEAR.map(function(g){return '<div class="gear"><b>'+g[0]+'</b>'+g[1]+'</div>'}).join('')+'</div>'+
      '<div class="layer vw-raw"><video muted playsinline preload="auto" src="'+B+'raw.mp4"></video><div class="frame-guides"></div><div class="rec"><i></i><span class="tc">REC 00:00:00</span></div></div>'+
      '<div class="layer vw-cmp"><video class="g" muted playsinline preload="auto" src="'+B+'graded.mp4"></video><video class="r" muted playsinline preload="auto" src="'+B+'raw.mp4" style="clip-path:inset(0 0 0 50%)"></video><div class="vw-split"></div><span class="vw-tag" style="left:3%;background:#70cf97;color:#10251a">DEPOIS</span><span class="vw-tag" style="right:3%;background:#ccc;color:#111">ANTES</span></div>'+
      '<div class="layer vw-final"><video muted playsinline preload="auto" src="'+B+'final.mp4"></video></div>'+
      '<div class="layer vw-export"><div class="exp-box"><h4>Exportando…</h4><div class="meta">do-bruto-a-entrega.mp4 · H.264 · 1920×1080 · 30 fps · 8 Mbps</div><div class="exp-bar"><i></i></div><div class="exp-row"><span class="exp-fr">quadro 0 / 1800</span><span class="exp-pc">0%</span></div></div>'+
        '<div class="chat"><div class="l">Ficou pronto? 👀<small>Cliente · 18:02</small></div><div>Prontinho! Segue o vídeo final 🎬<small>18:03 ✓✓</small></div><div class="l">FICOU INCRÍVEL!! Pode publicar 😍<small>Cliente · 18:04</small></div></div></div>'+
    '</div></div>'+
    '<div class="st-panel"><div class="stage-n"></div><h3></h3><p></p><ul></ul><a href="#"></a></div>'+
   '</div>'+
   '<div class="st-tl"><div class="tl-ruler">'+ruler+'</div>'+
     '<div class="track"><b>V2 Motion</b><div class="lane ln-m"></div></div>'+
     '<div class="track"><b>V1 Vídeo</b><div class="lane ln-v"></div></div>'+
     '<div class="track"><b>T1 Legenda</b><div class="lane ln-t"></div></div>'+
     '<div class="track"><b>A1 Música</b><div class="lane ln-a"></div></div>'+
     '<div class="playhead"></div></div>'+
   '<div class="st-ctrl"><button class="b-restart">↺ Recomeçar</button><button class="b-next">⏭ Próxima etapa</button><button class="pri b-final">▶ Pular para o vídeo publicado</button><span class="hint">Tudo o que aparece aqui é o processo real usado para produzir este vídeo.</span></div>';

  var $=function(s){return root.querySelector(s)}, $$=function(s){return [].slice.call(root.querySelectorAll(s))};
  var pct=function(t){return (t/TOTAL*100)+'%'};
  /* timeline blocks */
  CUTS.forEach(function(c){
    $('.ln-v').insertAdjacentHTML('beforeend','<div class="blk v flat" style="left:'+pct(c[1])+';width:calc('+pct(c[2])+' - 2px);background-image:url('+B+'thumbs/'+c[0]+'.jpg)"></div>');
    if(c[3])$('.ln-t').insertAdjacentHTML('beforeend','<div class="blk t" style="left:'+pct(c[1])+';width:calc('+pct(c[2])+' - 2px)">'+c[3]+'</div>');
  });
  MOTION.forEach(function(m){$('.ln-m').insertAdjacentHTML('beforeend','<div class="blk m" style="left:'+pct(m[1])+';width:calc('+pct(m[2])+' - 2px)">'+m[0]+'</div>')});
  /* waveform + beat markers */
  var w='<svg class="wave" viewBox="0 0 1200 28" preserveAspectRatio="none">',seed=7;
  function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
  for(var x=0;x<1200;x+=3){var e=x<100?0.25+x/400:x>1150?(1200-x)/120:0.55+0.35*Math.abs(Math.sin(x/10*Math.PI));var h=(4+rnd()*10)*e*1.4;w+='<rect x="'+x+'" y="'+(14-h)+'" width="2" height="'+(h*2)+'" fill="#3fa96b"/>'}
  for(var b=0;b<=120;b++){var bx=b*0.5/TOTAL*1200;w+='<line x1="'+bx+'" x2="'+bx+'" y1="0" y2="'+(b%4?5:9)+'" stroke="#ffb020" stroke-width="1.2"/>'}
  $('.ln-a').innerHTML=w+'</svg>';

  var vRaw=$('.vw-raw video'), vG=$('.vw-cmp .g'), vR=$('.vw-cmp .r'), vF=$('.vw-final video');
  var ph=$('.playhead'), lane=$('.ln-v');
  function setPH(t){var r=lane.getBoundingClientRect(), p=root.querySelector('.st-tl').getBoundingClientRect();ph.style.left=(r.left-p.left+r.width*Math.min(1,t/TOTAL))+'px'}
  function show(cls){$$('.layer').forEach(function(l){l.classList.toggle('on',l.classList.contains(cls))})}
  function stopVids(){[vRaw,vG,vR,vF].forEach(function(v){v.pause()})}

  /* ---------- runner com cancelamento ---------- */
  var run=0, cur=-1, skip=false;
  function sleep(ms,id){return new Promise(function(res,rej){var t0=performance.now();(function tick(){if(id!==run)return rej('x');if(skip){skip=false;return rej('skip')}if(performance.now()-t0>=ms)return res();requestAnimationFrame(tick)})()})}
  function stage(i){
    cur=i;
    $$('.st-chips span').forEach(function(c,k){c.classList.toggle('on',k===i);c.classList.toggle('ok',k<i)});
    var s=STAGES[i];$('.stage-n').textContent='ETAPA '+s.n;$('.st-panel h3').textContent=s.t;$('.st-panel p').textContent=s.p;
    $('.st-panel ul').innerHTML=s.li.map(function(l){return '<li>'+l+'</li>'}).join('');
    var a=$('.st-panel a');a.textContent='→ '+s.m[1];a.href='guia/'+s.m[0]+'.html';
  }
  function tick(i){var li=$$('.st-panel li');if(li[i])li[i].classList.add('ok')}
  function reset(){
    stopVids();show('none');
    $$('.bin img').forEach(function(im){im.classList.remove('in','used')});$('.bin-n').textContent='0 clipes';
    $$('.blk').forEach(function(b){b.classList.remove('in')});$$('.blk.v').forEach(function(b){b.classList.add('flat')});
    $('.wave').classList.remove('in');$$('.gear').forEach(function(g){g.classList.remove('ok')});
    $$('.chat div').forEach(function(d){d.classList.remove('in')});$('.exp-bar i').style.width='0';
    setPH(0);
  }
  async function playStage(i,id){
    stage(i);
    if(i===0){show('vw-doc');var d=$('.vw-doc');d.innerHTML='';
      for(var k=0;k<=SCRIPT.length;k+=2){d.innerHTML=SCRIPT.slice(0,k).replace(/</g,'&lt;')+'<span class="cur"></span>';if(k%60===0)tick(Math.min(3,Math.floor(k/SCRIPT.length*4)));await sleep(16,id)}
      tick(3);await sleep(900,id)}
    if(i===1){show('vw-gear');var g=$$('.gear');for(var k=0;k<g.length;k++){g[k].classList.add('ok');if(k%2)tick((k-1)/2|0);await sleep(520,id)}tick(3);await sleep(700,id)}
    if(i===2){show('vw-raw');vRaw.currentTime=21;vRaw.playbackRate=1.5;vRaw.play().catch(function(){});
      var ims=$$('.bin img');for(var k=0;k<ims.length;k++){ims[k].classList.add('in');$('.bin-n').textContent=(k+1)+' clipes';
        $('.tc').textContent='REC 00:00:'+String(k*2).padStart(2,'0');if(k%5===4)tick(k/5|0);await sleep(330,id)}
      tick(3);await sleep(500,id)}
    if(i===3){show('vw-raw');$('.rec').style.display='none';$('.frame-guides').style.display='none';
      $('.wave').classList.add('in');tick(0);await sleep(700,id);
      vRaw.currentTime=4;vRaw.playbackRate=2.5;vRaw.play().catch(function(){});
      var bl=$$('.ln-v .blk'), ims2=$$('.bin img');
      for(var k=0;k<bl.length;k++){bl[k].classList.add('in');ims2[k].classList.add('used');setPH(CUTS[k][1]+CUTS[k][2]);if(k===6)tick(1);if(k===13)tick(2);await sleep(260,id)}
      var t0=vRaw.currentTime;for(var q=0;q<40;q++){setPH(vRaw.currentTime);await sleep(50,id)}tick(3);await sleep(400,id)}
    if(i===4){show('vw-cmp');[vG,vR].forEach(function(v){v.currentTime=27;v.playbackRate=1;v.play().catch(function(){})});
      var sp=$('.vw-split');
      for(var k=0;k<=100;k++){var x=50+40*Math.sin(k/100*Math.PI*2);vR.style.clipPath='inset(0 0 0 '+x+'%)';sp.style.left=x+'%';
        if(Math.abs(vG.currentTime-vR.currentTime)>.15)vR.currentTime=vG.currentTime;setPH(vG.currentTime);
        if(k%25===0)tick(k/25);
        $$('.ln-v .blk').forEach(function(b,j){if(j<=Math.floor(k/5))b.classList.remove('flat')});await sleep(55,id)}
      tick(3);await sleep(300,id)}
    if(i===5){show('vw-final');vF.currentTime=4;vF.playbackRate=1;vF.play().catch(function(){});
      var mb=$$('.ln-m .blk'), tb=$$('.ln-t .blk');
      for(var k=0;k<Math.max(mb.length,tb.length);k++){if(mb[k])mb[k].classList.add('in');if(tb[k])tb[k].classList.add('in');if(k===2)tick(0);if(k===6)tick(1);await sleep(200,id)}
      for(var q=0;q<55;q++){setPH(vF.currentTime);if(q===20)tick(2);await sleep(100,id)}tick(3)}
    if(i===6){vF.pause();show('vw-export');var bar=$('.exp-bar i');
      for(var k=0;k<=100;k+=2){bar.style.width=k+'%';$('.exp-pc').textContent=k+'%';$('.exp-fr').textContent='quadro '+Math.round(k*18)+' / 1800';setPH(k*0.6);if(k===40)tick(0);if(k===80)tick(1);await sleep(55,id)}
      $('.exp-box h4').textContent='Exportado ✓';tick(2);var cs=$$('.chat div');for(var k=0;k<cs.length;k++){await sleep(700,id);cs[k].classList.add('in')}tick(3);await sleep(1200,id);$('.exp-box h4').textContent='Exportando…'}
    if(i===7){for(var k=0;k<4;k++){tick(k);await sleep(250,id)}publish(true)}
  }
  async function start(from){
    var id=++run;skip=false;reset();
    if(from>0){/* estado já montado das etapas anteriores */
      $$('.bin img').forEach(function(im){im.classList.add('in','used')});$('.bin-n').textContent='20 clipes';
      if(from>3){$('.wave').classList.add('in');$$('.ln-v .blk').forEach(function(b){b.classList.add('in')})}
      if(from>4)$$('.ln-v .blk').forEach(function(b){b.classList.remove('flat')});
      if(from>5)$$('.ln-m .blk,.ln-t .blk').forEach(function(b){b.classList.add('in')});
    }
    for(var i=from;i<STAGES.length;i++){
      try{await playStage(i,id)}catch(e){if(e==='x')return;stopVids();
        if(e==='skip'){ /* completa visualmente a etapa pulada */
          $$('.st-panel li').forEach(function(l){l.classList.add('ok')});
          if(i>=2){$$('.bin img').forEach(function(im){im.classList.add('in')});$('.bin-n').textContent='20 clipes'}
          if(i>=3){$('.wave').classList.add('in');$$('.ln-v .blk').forEach(function(b){b.classList.add('in')});$$('.bin img').forEach(function(im){im.classList.add('used')})}
          if(i>=4)$$('.ln-v .blk').forEach(function(b){b.classList.remove('flat')});
          if(i>=5)$$('.ln-m .blk,.ln-t .blk').forEach(function(b){b.classList.add('in')});
          if(i===7)publish(true);
        }}
    }
    $$('.st-chips span').forEach(function(c){c.classList.remove('on');c.classList.add('ok')});
  }
  $('.b-restart').onclick=function(){$('.rec').style.display='';$('.frame-guides').style.display='';start(0)};
  $('.b-next').onclick=function(){skip=true};
  $('.b-final').onclick=function(){run++;stopVids();stage(7);$$('.st-panel li').forEach(function(l){l.classList.add('ok')});
    $$('.st-chips span').forEach(function(c){c.classList.add('ok')});publish(true);};

  /* ---------- publicação (simulação) ---------- */
  var yt=root.querySelector('.yt'), published=false;
  function publish(scroll){
    yt.classList.add('show');requestAnimationFrame(function(){requestAnimationFrame(function(){yt.classList.add('in')})});
    if(scroll&&!published){setTimeout(function(){yt.scrollIntoView({behavior:'smooth',block:'start'})},600)}
    published=true;
  }
  var yv=yt.querySelector('video'), cover=yt.querySelector('.yt-cover'), playBtn=yt.querySelector('.yt-play');
  playBtn.onclick=function(){cover.style.display='none';playBtn.style.display='none';yv.controls=true;yv.play()};
  [].forEach.call(yt.querySelectorAll('[data-t]'),function(a){a.onclick=function(e){e.preventDefault();cover.style.display='none';playBtn.style.display='none';yv.controls=true;yv.currentTime=+a.dataset.t;yv.play();yt.querySelector('.yt-player').scrollIntoView({behavior:'smooth',block:'center'})}});

  /* começa sozinho quando a ilha de edição aparece na tela */
  var started=false;
  new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!started){started=true;start(0)}})},{threshold:.35}).observe(root.querySelector('.studio'));
  window.addEventListener('resize',function(){if(cur>=0)setPH(0)});
})();
