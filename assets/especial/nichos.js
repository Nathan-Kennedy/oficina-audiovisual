/* Seção Nichos: números, gráficos, faixas, sorteador e mural */
(function(){
  var root=document.getElementById('nichos'); if(!root) return;

  /* ---------- nichos (emoji, nome, categoria) ---------- */
  var CATS={local:'🏪 Negócio local',agro:'🌱 Agro e campo',comida:'🍳 Comida',casa:'🔨 Casa e faça você mesmo',beleza:'💄 Beleza e moda',edu:'📚 Educação',tec:'💻 Tecnologia',esporte:'⚽ Esporte',diversao:'🎭 Entretenimento',saude:'🧘 Bem-estar',grana:'💼 Carreira e dinheiro',pets:'🐾 Pets e natureza',arte:'🎨 Arte e música',familia:'👨‍👩‍👧 Família e rotina'};
  var N=[
    ['🥖','padaria de bairro','local'],['💈','barbearia','local'],['💅','salão de manicure','local'],['🛠️','oficina mecânica','local'],['📱','conserto de celular','local'],['🧁','confeitaria caseira','local'],['🍔','hamburgueria artesanal','local'],['🛍️','loja de roupas','local'],['🏡','imobiliária','local'],['🦷','clínica odontológica','local'],['🔑','chaveiro','local'],['🌸','floricultura','local'],['🧺','lavanderia','local'],['🚗','estética automotiva','local'],['🏋️','academia de bairro','local'],['🎂','decoração de festas','local'],
    ['🐄','pecuária leiteira','agro'],['☕','café robusta de Rondônia','agro'],['🚜','vida no sítio','agro'],['🐟','piscicultura','agro'],['🌽','horta em casa','agro'],['🐓','criação de galinhas','agro'],['🐝','apicultura','agro'],['🌳','reflorestamento','agro'],['🐴','lida com cavalos','agro'],['🧀','queijo artesanal','agro'],['🎣','pescaria nos rios da Amazônia','agro'],['🍫','cacau e chocolate','agro'],
    ['🍛','comida regional','comida'],['🥘','marmitas da semana','comida'],['🍝','receitas baratas','comida'],['🥗','comida fit','comida'],['🍰','bolo de pote','comida'],['🍕','pizza caseira','comida'],['🌮','comida de rua','comida'],['🍹','drinks sem álcool','comida'],['🥩','churrasco','comida'],['🍜','culinária japonesa','comida'],['🧃','lanches para a escola','comida'],['🫓','pão de fermentação natural','comida'],
    ['🪚','marcenaria','casa'],['🎨','pintura de paredes','casa'],['🧹','organização da casa','casa'],['🛋️','restauração de móveis','casa'],['🪴','plantas de interior','casa'],['🔌','elétrica residencial','casa'],['🧼','limpeza pesada','casa'],['🏠','reforma com pouco dinheiro','casa'],['🧵','costura e ajustes','casa'],['🪡','crochê','casa'],['🧶','tricô','casa'],['🕯️','velas artesanais','casa'],
    ['💇','cortes de cabelo','beleza'],['💄','maquiagem para iniciantes','beleza'],['👗','moda plus size','beleza'],['👟','sneakers','beleza'],['🧴','skincare','beleza'],['💍','bijuterias artesanais','beleza'],['👔','moda masculina','beleza'],['♻️','brechó','beleza'],['🪮','cabelo cacheado','beleza'],['✂️','sobrancelhas','beleza'],
    ['🧮','matemática para concursos','edu'],['💬','inglês do dia a dia','edu'],['🔬','ciência curiosa','edu'],['📜','história do Brasil','edu'],['🗺️','geografia de Rondônia','edu'],['✍️','redação para o Enem','edu'],['🤟','Libras','edu'],['🧠','técnicas de estudo','edu'],['🎓','vida na faculdade','edu'],['📖','resenha de livros','edu'],['⚖️','direitos do consumidor','edu'],
    ['🎮','games','tec'],['🖥️','montagem de PC','tec'],['🤖','ferramentas de IA para auxílio','tec'],['📷','fotografia com celular','tec'],['🎬','edição de vídeo','tec'],['👨‍💻','programação','tec'],['📡','internet rural','tec'],['🔐','segurança digital','tec'],['🛒','achadinhos de tecnologia','tec'],['🕹️','retrogames','tec'],
    ['⚽','futebol de várzea','esporte'],['🏐','vôlei','esporte'],['🥋','jiu-jítsu','esporte'],['🛹','skate','esporte'],['🚴','ciclismo','esporte'],['🏃','corrida de rua','esporte'],['🏊','natação','esporte'],['♟️','xadrez','esporte'],['🎯','tiro com arco','esporte'],['🏍️','trilha de moto','esporte'],
    ['😂','humor do interior','diversao'],['🎤','dublagem','diversao'],['🎲','jogos de tabuleiro','diversao'],['🧩','cubo mágico','diversao'],['🎥','crítica de filmes','diversao'],['📺','séries e novelas','diversao'],['🪄','mágica','diversao'],['🎙️','podcast local','diversao'],['🗣️','histórias e lendas','diversao'],['🧸','colecionáveis','diversao'],
    ['🧘','yoga','saude'],['🥦','reeducação alimentar','saude'],['😴','sono melhor','saude'],['🧠','saúde mental','saude'],['💪','treino em casa','saude'],['🌿','plantas medicinais','saude'],['👵','qualidade de vida na terceira idade','saude'],
    ['💰','finanças pessoais','grana'],['📈','empreendedorismo','grana'],['🧾','vida de MEI','grana'],['🤝','vendas','grana'],['📦','revenda online','grana'],['🏗️','construção civil','grana'],['🚚','vida de caminhoneiro','grana'],['👩‍🍳','renda extra com comida','grana'],['🧑‍💼','dicas de entrevista de emprego','grana'],['🏦','concursos públicos','grana'],
    ['🐶','adestramento de cães','pets'],['🐱','gatos','pets'],['🦜','aves','pets'],['🐠','aquarismo','pets'],['🦎','animais exóticos legalizados','pets'],['🌧️','clima e natureza','pets'],['🏞️','turismo em Rondônia','pets'],['🌌','astronomia','pets'],['🦋','insetos e curiosidades','pets'],
    ['🎸','violão para iniciantes','arte'],['🥁','bateria','arte'],['🎹','teclado','arte'],['🎧','produção musical','arte'],['✏️','desenho','arte'],['🖌️','pintura em tela','arte'],['💃','dança','arte'],['📸','ensaios fotográficos','arte'],['🎭','teatro','arte'],['🪵','artesanato com madeira','arte'],['🎨','grafite','arte'],
    ['👶','maternidade e paternidade','familia'],['🏫','rotina de professor','familia'],['🛒','compras do mês','familia'],['🧳','viagem barata','familia'],['👴','histórias dos avós','familia'],['💒','casamentos','familia'],['🎉','festas de 15 anos','familia'],['🙏','fé e espiritualidade','familia'],['📅','rotina produtiva','familia']
  ];
  var FORMATS=[
    ['Erros comuns','3 erros que todo iniciante comete em {n}'],
    ['Antes e depois','Antes e depois: {n} na prática'],
    ['Rotina','Um dia comigo: a rotina real de {n}'],
    ['Mito ou verdade','Mito ou verdade? O que falam sobre {n}'],
    ['Quanto custa','Quanto custa começar em {n}?'],
    ['Tutorial rápido','Tutorial de 60 segundos de {n}'],
    ['Bastidores','Bastidores de {n} que ninguém mostra'],
    ['Desafio','Testei por 7 dias: {n}'],
    ['Conselho','O que eu queria saber antes de começar em {n}'],
    ['Perguntas','Respondendo as perguntas mais comuns sobre {n}'],
    ['Lista','5 coisas que facilitam a vida em {n}'],
    ['Com pouco','{N} com pouco dinheiro: dá certo?'],
    ['História','A história de quem vive de {n} aqui na cidade'],
    ['Reação','Reagindo aos piores conselhos sobre {n}']
  ];

  /* ---------- dados (fontes no rodapé dos gráficos) ---------- */
  var TIME=[['Internet',9+13/60,'9h13','Tempo médio diário na internet (todas as telas)'],['TV',4,'≈ 4h','TV aberta, paga e streaming na TV, somados'],['Redes sociais',3+37/60,'3h37','Parte do tempo de internet usada em redes sociais']];
  var REACH=[['YouTube',150,'150 mi','70,4% da população'],['Instagram',147,'147 mi','69,0% da população'],['TikTok',131,'131 mi','público adulto (18+)'],['Facebook',109,'109 mi','51,3% da população']];

  var html=
  '<div class="wrap">'+
   '<span class="kicker">Por que vale a pena começar agora</span>'+
   '<h2>Hoje, a tela que mais importa <em>está no seu bolso</em></h2>'+
   '<p class="lead">O brasileiro passa mais tempo na internet do que em frente à TV. Isso abriu espaço para todo tipo de conteúdo: não é preciso ser famoso nem ter estúdio, é preciso falar com o público certo.</p>'+
   '<div class="nx-nums">'+
    '<div class="nx-num"><b data-count="185" data-suf=" mi">0</b><span>de brasileiros conectados à internet (86,9%)</span><small>DataReportal · Digital 2026</small></div>'+
    '<div class="nx-num"><b data-count="150" data-suf=" mi">0</b><span>usando redes sociais</span><small>DataReportal · Digital 2026</small></div>'+
    '<div class="nx-num"><b data-time="1">0h00</b><span>por dia na internet, em média</span><small>Digital 2025 · We Are Social/Meltwater</small></div>'+
    '<div class="nx-num"><b data-count="99.54" data-dec="2" data-suf="%">0</b><span>dos brasileiros assistiram a vídeo em 2024</span><small>Kantar IBOPE Media · Inside Video 2025</small></div>'+
   '</div>'+
   '<div class="nx-charts">'+
    chart('c1','Internet × TV: horas por dia','Tempo médio diário do brasileiro',TIME,10,'h',
      'Fonte: relatório Digital 2025 (We Are Social e Meltwater). Valores aproximados; o tempo de redes sociais está contido no tempo de internet.','#8612d5')+
    chart('c2','Quantos brasileiros cada plataforma alcança','Público alcançável, em milhões de pessoas (fim de 2025)',REACH,185,' mi',
      'Fonte: <a href="https://datareportal.com/reports/digital-2026-brazil" target="_blank" rel="noopener">DataReportal, Digital 2026: Brazil</a>. A linha tracejada marca os 185 milhões de usuários de internet.','#2f9a5c',185)+
   '</div>'+
   '<div class="nx-facts">'+
    '<div class="nx-fact"><b>📺 A TV virou tela de internet</b>Em 2025, a TV conectada passou o celular como a principal tela para assistir ao YouTube no Brasil.<small>Kantar IBOPE Media, divulgado pelo YouTube no Brandcast 2025</small></div>'+
    '<div class="nx-fact purple"><b>🤓 A teoria dos 1.000 fãs</b>Em 2008, o escritor Kevin Kelly defendeu que um criador pode viver do seu trabalho com cerca de mil fãs fiéis. Nicho pequeno, bem atendido, sustenta muita gente.<small>Ensaio “1,000 True Fans”</small></div>'+
    '<div class="nx-fact green"><b>📈 E continua crescendo</b>O público adulto alcançável pelo TikTok no Brasil cresceu 17,6% em um ano. Ainda tem muita gente chegando.<small>DataReportal · Digital 2026</small></div>'+
   '</div>'+
   '<div class="marquee" aria-hidden="true"><div class="mq-row r1"></div><div class="mq-row rev r2"></div></div>'+
   '<div class="nx-gen">'+
    '<div class="slot"><h3>🎲 Sorteador de nicho</h3><p>Sem ideia do que gravar? Sorteie um nicho e receba três ideias de vídeo prontas para adaptar.</p>'+
     '<div class="slot-win"><div class="slot-name">padaria de bairro</div></div>'+
     '<button class="slot-btn">🎲 Sortear outro nicho</button></div>'+
    '<div class="ideas"><h3>Ideias para <span class="id-n">padaria de bairro</span></h3><div class="who">Toque em qualquer nicho do mural para ver ideias dele.</div><ol></ol><a href="guia/05-roteiro.html">→ Transforme a ideia em roteiro (Módulo 5)</a></div>'+
   '</div>'+
   '<div class="wall-head"><h3>Mural de nichos: escolha o seu</h3><input type="search" placeholder="Buscar nicho… (ex.: café, moto, crochê)" aria-label="Buscar nicho"></div>'+
   '<div class="chips"></div><div class="wall"></div><div class="wall-count"></div>'+
   '<div class="nx-end"><blockquote>Não existe nicho pequeno demais. Existe <span>público que ainda não te encontrou</span>.</blockquote>'+
    '<p>Comece pelo que você conhece e gosta de verdade. Constância e o público certo fazem mais diferença do que câmera cara.</p>'+
    '<a class="btn" href="guia/index.html" style="background:#8612d5;color:#fff">Aprender a produzir no guia gratuito →</a></div>'+
  '</div><div class="nx-tip" role="tooltip"></div>';
  root.innerHTML=html;

  function chart(id,title,sub,data,max,unit,src,color,ref){
    var rows=data.map(function(d,i){
      var c=(id==='c1'&&d[0]==='TV')?'#9b94a8':color;
      return '<div class="bar-row" data-tip="<b>'+d[0]+'</b>: '+d[2]+'<br>'+d[3]+'"><div class="lb">'+d[0]+'</div><div class="bar-track"><div class="bar" data-w="'+(d[1]/max*100)+'" style="background:'+c+'"><span class="bar-val" style="left:100%">'+d[2]+'</span></div>'+
        (ref&&i===0?'<div class="ref-line" style="left:'+(ref/max*100)+'%"><span class="ref-tag">internet: 185 mi</span></div>':(ref?'<div class="ref-line" style="left:'+(ref/max*100)+'%"></div>':''))+'</div></div>';
    }).join('');
    var table='<details><summary>Ver dados em tabela</summary><table><tr><th>Item</th><th>Valor</th><th>Observação</th></tr>'+data.map(function(d){return '<tr><td>'+d[0]+'</td><td>'+d[2]+'</td><td>'+d[3]+'</td></tr>'}).join('')+'</table></details>';
    return '<div class="nx-chart" id="'+id+'"><h3>'+title+'</h3><div class="sub">'+sub+'</div><div class="bars">'+rows+'</div><div class="nx-src">'+src+'</div>'+table+'</div>';
  }
  /* bar widths leave room for the value label */
  [].forEach.call(root.querySelectorAll('.bar'),function(b){b.dataset.w=Math.min(84,+b.dataset.w*0.84)});

  /* ---------- tooltip ---------- */
  var tip=root.querySelector('.nx-tip');
  root.addEventListener('mousemove',function(e){var r=e.target.closest('[data-tip]');if(!r){tip.style.opacity=0;return}
    tip.innerHTML=r.dataset.tip;tip.style.opacity=1;tip.style.left=Math.min(innerWidth-270,e.clientX+14)+'px';tip.style.top=(e.clientY+16)+'px'});
  root.addEventListener('mouseleave',function(){tip.style.opacity=0});

  /* ---------- animação ao aparecer ---------- */
  function countUp(el){
    var t0=performance.now(),dur=1600;
    (function f(now){var p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,3);
      if(el.dataset.time){var m=Math.round(e*553);el.textContent=Math.floor(m/60)+'h'+String(m%60).padStart(2,'0')}
      else{var v=e*parseFloat(el.dataset.count),d=+(el.dataset.dec||0);el.textContent=v.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d})+(el.dataset.suf||'')}
      if(p<1)requestAnimationFrame(f)})(t0);
  }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);
    if(el.classList.contains('nx-chart')){el.classList.add('in');[].forEach.call(el.querySelectorAll('.bar'),function(b){b.style.width=b.dataset.w+'%'})}
    else countUp(el)})},{threshold:.35});
  [].forEach.call(root.querySelectorAll('.nx-num b,.nx-chart'),function(el){io.observe(el)});

  /* ---------- faixas ---------- */
  function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
  var half=shuffle(N), A=half.slice(0,40), Bb=half.slice(40,80);
  function fill(row,list){var h=list.map(function(n){return '<span>'+n[0]+' '+n[1]+'</span>'}).join('');row.innerHTML=h+h}
  fill(root.querySelector('.r1'),A);fill(root.querySelector('.r2'),Bb);

  /* ---------- ideias ---------- */
  var cap=function(s){return s.charAt(0).toUpperCase()+s.slice(1)};
  function ideas(n){
    root.querySelector('.id-n').textContent=n[1];
    root.querySelector('.ideas .who').textContent='Categoria: '+CATS[n[2]]+' · três formatos que funcionam em qualquer nicho';
    var ol=root.querySelector('.ideas ol'), fs=shuffle(FORMATS).slice(0,3);
    ol.innerHTML=fs.map(function(f){return '<li><span class="fmt">'+f[0]+'</span>'+f[1].replace('{n}',n[1]).replace('{N}',cap(n[1]))+'</li>'}).join('');
    [].forEach.call(ol.children,function(li,k){setTimeout(function(){li.classList.add('in')},120*k+60)});
  }
  /* ---------- sorteador ---------- */
  var nameEl=root.querySelector('.slot-name'), spinning=false;
  root.querySelector('.slot-btn').onclick=function(){
    if(spinning)return;spinning=true;var k=0,steps=18+Math.floor(Math.random()*8),pick;
    (function roll(){pick=N[Math.floor(Math.random()*N.length)];nameEl.textContent=pick[0]+' '+pick[1];
      nameEl.style.transform='translateY('+(k%2?-6:6)+'px)';k++;
      if(k<steps)setTimeout(roll,40+k*k*0.9);else{nameEl.style.transform='none';spinning=false;ideas(pick);selectNiche(pick[1])}})();
  };

  /* ---------- mural ---------- */
  var chips=root.querySelector('.chips'), wall=root.querySelector('.wall'), q=root.querySelector('.wall-head input'), cur='todos';
  chips.innerHTML='<button class="on" data-c="todos">✨ Todos</button>'+Object.keys(CATS).map(function(c){return '<button data-c="'+c+'">'+CATS[c]+'</button>'}).join('');
  function norm(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()}
  function render(){
    var term=norm(q.value.trim());
    var list=N.filter(function(n){return (cur==='todos'||n[2]===cur)&&(!term||norm(n[1]).indexOf(term)>-1)});
    wall.innerHTML=list.map(function(n,i){return '<button class="niche" data-n="'+n[1]+'" style="animation-delay:'+Math.min(i*12,600)+'ms">'+n[0]+' '+n[1]+'</button>'}).join('')||'<p style="color:#6f6880">Nenhum nicho com esse nome… mas ele pode ser o seu! Todo assunto tem público.</p>';
    root.querySelector('.wall-count').textContent=list.length+' de '+N.length+' nichos · e existem muitos outros';
  }
  function selectNiche(name){[].forEach.call(wall.querySelectorAll('.niche'),function(b){b.classList.toggle('sel',b.dataset.n===name)})}
  chips.onclick=function(e){var b=e.target.closest('button');if(!b)return;cur=b.dataset.c;[].forEach.call(chips.children,function(x){x.classList.toggle('on',x===b)});render()};
  q.oninput=render;
  wall.onclick=function(e){var b=e.target.closest('.niche');if(!b)return;var n=N.filter(function(x){return x[1]===b.dataset.n})[0];
    nameEl.textContent=n[0]+' '+n[1];ideas(n);selectNiche(n[1]);
    if(innerWidth<900)root.querySelector('.ideas').scrollIntoView({behavior:'smooth',block:'center'})};
  render();ideas(N[0]);
})();
