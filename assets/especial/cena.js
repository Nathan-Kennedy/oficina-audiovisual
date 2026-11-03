/* Cena animada da oficina: injeta o SVG e controla etiquetas e legendas */
(function(){
  var host=document.getElementById('cena-oficina'); if(!host) return;
  host.innerHTML=
'<svg viewBox="0 0 1200 640" role="img" aria-label="Animação: uma criança grava com o celular no tripé, outra fala para a câmera e uma terceira ajusta a luz da softbox">'+
'<defs>'+
 '<linearGradient id="cwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3eefa"/><stop offset="1" stop-color="#e2daee"/></linearGradient>'+
 '<linearGradient id="cfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfc3e0"/><stop offset="1" stop-color="#b9abd0"/></linearGradient>'+
 '<linearGradient id="ccurt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e3a9a"/><stop offset=".5" stop-color="#2c4fc4"/><stop offset="1" stop-color="#1e3a9a"/></linearGradient>'+
 '<linearGradient id="cbeam" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff6d8" stop-opacity="1"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient>'+
 '<radialGradient id="cglow"><stop offset="0" stop-color="#fff3c4" stop-opacity=".9"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient>'+
 '<linearGradient id="cunif" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0f0"/><stop offset="1" stop-color="#5aa6dd"/></linearGradient>'+
 '<clipPath id="vfclip"><rect x="52" y="52" width="296" height="166" rx="10"/></clipPath>'+
'</defs>'+
/* ambiente */
'<rect width="1200" height="470" fill="url(#cwall)"/>'+
'<rect y="470" width="1200" height="170" fill="url(#cfloor)"/>'+
'<rect y="466" width="1200" height="8" fill="#a99bc2"/>'+
'<rect x="455" y="70" width="190" height="130" rx="4" fill="#222"/><rect x="465" y="80" width="170" height="110" fill="#9a9a9a"/>'+
'<path d="M465 165 Q520 120 560 150 T635 140 V190 H465Z" fill="#6d6d6d"/><circle cx="600" cy="105" r="10" fill="#d8d8d8"/>'+
'<path d="M640 60 h330 v410 h-330z" fill="url(#ccurt)"/>'+
'<path d="M670 60 v410 M720 60 v410 M770 60 v410 M820 60 v410 M870 60 v410 M920 60 v410" stroke="#173083" stroke-width="6" opacity=".45"/>'+
'<rect x="630" y="52" width="350" height="12" rx="6" fill="#5b4f73"/>'+
/* softbox: tripé, cabeça e feixe */
'<g>'+
 '<polygon class="beam" points="905,205 905,300 690,360 690,200" fill="url(#cbeam)"/>'+
 '<line x1="985" y1="250" x2="985" y2="560" stroke="#3b3348" stroke-width="7"/>'+
 '<path d="M985 560 l-45 40 M985 560 l45 40 M985 560 v40" stroke="#3b3348" stroke-width="6" stroke-linecap="round"/>'+
 '<g class="softhead"><polygon points="900,195 975,215 975,290 900,310" fill="#2c2536"/><rect x="893" y="195" width="12" height="115" rx="3" fill="#fffaf0"/><rect x="975" y="238" width="14" height="28" rx="4" fill="#3b3348"/></g>'+
 '<g class="sparks"><circle class="spark" cx="870" cy="240" r="3" fill="#fff"/><circle class="spark" cx="850" cy="275" r="2.5" fill="#fff"/><circle class="spark" cx="880" cy="300" r="2" fill="#fff"/></g>'+
'</g>'+
/* ===== Criança C: arruma a luz (atrás, à direita) ===== */
'<g class="kid c">'+
 '<rect x="1032" y="470" width="20" height="95" rx="9" fill="#2f3550"/><rect x="1058" y="470" width="20" height="95" rx="9" fill="#2f3550"/>'+
 '<ellipse cx="1040" cy="568" rx="16" ry="7" fill="#222"/><ellipse cx="1070" cy="568" rx="16" ry="7" fill="#222"/>'+
 '<rect x="1020" y="345" width="70" height="135" rx="26" fill="url(#cunif)"/>'+
 '<path d="M1040 350 l15 18 l15 -18" fill="#fff"/>'+
 '<g class="armC"><g transform="rotate(157 1030 360)"><rect x="1020" y="355" width="20" height="112" rx="10" fill="url(#cunif)"/><circle cx="1030" cy="468" r="11" fill="#c68642"/></g></g>'+
 '<rect x="1046" y="330" width="18" height="20" fill="#c68642"/>'+
 '<circle cx="1055" cy="305" r="36" fill="#c68642"/>'+
 '<path d="M1019 300 q2 -42 38 -42 q36 0 36 40 q-10 -18 -38 -20 q-24 0 -36 22z" fill="#1d1414"/>'+
 '<ellipse class="eye" cx="1040" cy="305" rx="3.5" ry="4.5" fill="#1d1414"/><ellipse class="eye" cx="1062" cy="305" rx="3.5" ry="4.5" fill="#1d1414"/>'+
 '<path d="M1042 322 q8 5 16 0" stroke="#7a3f18" stroke-width="3" fill="none" stroke-linecap="round"/>'+
'</g>'+
/* ===== Criança B: fala para a câmera (centro, de perfil para a esquerda) ===== */
'<g class="kid b">'+
 '<rect x="735" y="455" width="90" height="12" rx="6" fill="#6b5a3e"/><path d="M745 467 l-12 95 M815 467 l12 95 M780 467 v95" stroke="#6b5a3e" stroke-width="7" stroke-linecap="round"/>'+
 '<path d="M748 455 q-40 0 -50 30 l-4 70" stroke="#2f3550" stroke-width="22" fill="none" stroke-linecap="round"/>'+
 '<path d="M790 455 q-34 0 -46 30 l-4 70" stroke="#283048" stroke-width="22" fill="none" stroke-linecap="round"/>'+
 '<ellipse cx="686" cy="562" rx="20" ry="8" fill="#222"/><ellipse cx="732" cy="562" rx="20" ry="8" fill="#222"/>'+
 '<rect x="735" y="330" width="80" height="135" rx="28" fill="url(#cunif)"/>'+
 '<path d="M748 334 l18 20 l16 -20" fill="#fff"/>'+
 '<circle cx="752" cy="372" r="5" fill="#222"/><path d="M752 372 q-6 30 10 60" stroke="#222" stroke-width="2" fill="none"/>'+
 
 '<g class="armB"><rect x="742" y="345" width="20" height="70" rx="10" fill="url(#cunif)" transform="rotate(35 752 350)"/><circle cx="713" cy="405" r="11" fill="#f1c27d"/></g>'+
 '<rect x="762" y="312" width="18" height="22" fill="#f1c27d"/>'+
 '<g class="headB">'+
  '<circle cx="768" cy="282" r="40" fill="#f1c27d"/>'+
  
  '<path d="M728 280 q-4 -52 44 -50 q40 4 38 50 q-6 -24 -30 -30 q-30 -6 -52 30z" fill="#5a3416"/>'+
  '<path d="M806 270 q14 30 -4 62 q20 -4 22 -36z" fill="#5a3416"/>'+
  '<ellipse class="eye" cx="745" cy="280" rx="4" ry="5" fill="#2a1a0c"/>'+
  '<path d="M738 268 q8 -5 15 0" stroke="#5a3416" stroke-width="3" fill="none" stroke-linecap="round"/>'+
  '<path d="M729 288 q-6 4 1 7" stroke="#d9a35f" stroke-width="3" fill="none" stroke-linecap="round"/>'+
  '<ellipse class="mouth" cx="741" cy="303" rx="8" ry="6" fill="#8a3b2b"/>'+
  '<circle cx="778" cy="288" r="7" fill="#e7a86b"/>'+
 '</g>'+
'</g>'+
/* ===== Tripé + celular ===== */
'<g>'+
 '<line x1="400" y1="345" x2="400" y2="470" stroke="#3b3348" stroke-width="6"/>'+
 '<path d="M400 470 l-48 95 M400 470 l48 95 M400 470 v95" stroke="#3b3348" stroke-width="6" stroke-linecap="round"/>'+
 '<rect x="388" y="335" width="24" height="14" rx="3" fill="#3b3348"/>'+
 '<rect x="372" y="300" width="58" height="38" rx="7" fill="#111"/>'+
 '<rect x="376" y="304" width="50" height="30" rx="4" fill="#2c4fc4"/>'+
 '<circle class="rec" cx="420" cy="309" r="3.5" fill="#ff3b3b"/>'+
 '<path d="M430 318 L640 260 M430 322 L640 380" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="6 8" opacity=".55"/>'+
'</g>'+
/* ===== Criança A: grava (esquerda, de perfil para a direita) ===== */
'<g class="kid a">'+
 '<rect x="268" y="470" width="21" height="95" rx="10" fill="#2f3550"/><rect x="296" y="470" width="21" height="95" rx="10" fill="#283048"/>'+
 '<ellipse cx="284" cy="568" rx="17" ry="7" fill="#222"/><ellipse cx="312" cy="568" rx="17" ry="7" fill="#222"/>'+
 '<rect x="255" y="335" width="76" height="140" rx="28" fill="url(#cunif)"/>'+
 '<path d="M276 339 l17 20 l17 -20" fill="#fff"/>'+
 '<g class="armA"><rect x="305" y="345" width="80" height="20" rx="10" fill="url(#cunif)" transform="rotate(-18 310 355)"/><circle cx="380" cy="327" r="11" fill="#8d5524"/></g>'+
 '<rect x="284" y="316" width="18" height="22" fill="#8d5524"/>'+
 '<circle cx="292" cy="285" r="38" fill="#8d5524"/>'+
 '<path d="M254 282 q0 -46 40 -46 q38 0 38 38 q-14 -18 -40 -14 q-22 4 -38 22z" fill="#140d0a"/>'+
 '<circle cx="276" cy="262" r="10" fill="#140d0a"/><circle cx="292" cy="252" r="11" fill="#140d0a"/><circle cx="310" cy="256" r="10" fill="#140d0a"/>'+
 '<ellipse class="eye" cx="314" cy="284" rx="4" ry="5" fill="#140d0a"/>'+
 '<path d="M308 272 q7 -4 13 1" stroke="#140d0a" stroke-width="3" fill="none" stroke-linecap="round"/>'+
 '<path d="M310 304 q6 3 11 0" stroke="#5b2c0d" stroke-width="3" fill="none" stroke-linecap="round"/>'+
 '<circle cx="282" cy="290" r="7" fill="#7a4a1f"/>'+
'</g>'+
/* ===== Visor ampliado (o que o celular está gravando) ===== */
'<g>'+
 '<rect x="40" y="40" width="320" height="190" rx="18" fill="#111"/>'+
 '<g clip-path="url(#vfclip)">'+
  '<rect x="52" y="52" width="296" height="166" fill="url(#ccurt)"/>'+
  '<path d="M80 52 v166 M120 52 v166 M160 52 v166 M200 52 v166 M240 52 v166 M280 52 v166 M320 52 v166" stroke="#173083" stroke-width="5" opacity=".4"/>'+
  '<g class="vf-kid">'+
   '<rect x="215" y="150" width="90" height="90" rx="30" fill="url(#cunif)"/><path d="M235 152 l20 20 l20 -20" fill="#fff"/>'+
   '<circle cx="246" cy="185" r="5" fill="#222"/>'+
   '<rect x="250" y="128" width="16" height="22" fill="#f1c27d"/>'+
   '<circle cx="258" cy="108" r="32" fill="#f1c27d"/>'+
   '<path d="M226 106 q0 -40 34 -38 q32 2 30 38 q-8 -18 -30 -20 q-22 -2 -34 20z" fill="#5a3416"/>'+
   '<ellipse class="eye" cx="247" cy="108" rx="3.5" ry="4.5" fill="#2a1a0c"/><ellipse class="eye" cx="268" cy="108" rx="3.5" ry="4.5" fill="#2a1a0c"/>'+
   '<ellipse class="mouth" cx="258" cy="124" rx="7" ry="5" fill="#8a3b2b"/>'+
   
  '</g>'+
  '<path d="M150.7 52 v166 M249.3 52 v166 M52 107.3 h296 M52 162.7 h296" stroke="#fff" stroke-width="1" opacity=".45"/>'+
  '<rect x="52" y="190" width="296" height="28" fill="rgba(0,0,0,.55)"/>'+
  '<text id="cena-sub" x="200" y="209" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="700" font-size="14" fill="#fff">Oi, pessoal! Hoje eu vou mostrar…</text>'+
 '</g>'+
 '<circle class="rec" cx="68" cy="68" r="6" fill="#ff3b3b"/><text x="80" y="73" font-family="Inter,sans-serif" font-weight="700" font-size="13" fill="#fff">REC</text>'+
 '<text id="cena-tc" x="336" y="73" text-anchor="end" font-family="Inter,sans-serif" font-weight="600" font-size="12" fill="#fff">00:00</text>'+
 '<path d="M360 135 Q378 200 372 300" stroke="#fff" stroke-width="2" stroke-dasharray="4 6" fill="none" opacity=".6"/>'+
'</g>'+
/* ===== Etiquetas educativas ===== */
'<g class="tag" data-i="0"><rect x="300" y="585" width="250" height="40" rx="20" fill="#16121d"/><text x="425" y="611" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="600" font-size="15" fill="#fff">📱 Celular firme no tripé</text></g>'+
'<g class="tag" data-i="1"><rect x="820" y="110" width="270" height="40" rx="20" fill="#16121d"/><text x="955" y="136" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="600" font-size="15" fill="#fff">💡 Luz suave vindo da frente</text></g>'+
'<g class="tag" data-i="2"><rect x="560" y="400" width="160" height="40" rx="20" fill="#16121d"/><text x="640" y="426" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="600" font-size="15" fill="#fff">🎙️ Mic perto</text><line x1="720" y1="410" x2="748" y2="378" stroke="#16121d" stroke-width="3"/></g>'+
'<g class="tag" data-i="3"><rect x="40" y="242" width="320" height="40" rx="20" fill="#70cf97"/><text x="200" y="268" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="700" font-size="15" fill="#10251a">🎬 Plano médio + regra dos terços</text></g>'+
'</svg>'+
'<div class="cena-cap"><span>📱 Câmera</span><span>💡 Iluminação</span><span>🎙️ Áudio</span><span>🎬 Enquadramento</span></div>';

  var tags=host.querySelectorAll('.tag'), pills=host.querySelectorAll('.cena-cap span');
  var subs=['Oi, pessoal! Hoje eu vou mostrar…','…como gravar um vídeo só com o celular!','Primeiro: luz de frente e celular firme.','Depois é só editar e publicar! 🎬'];
  var sub=document.getElementById('cena-sub'), tc=document.getElementById('cena-tc');
  var i=0, s=0, t=0, visible=false;
  function step(){
    if(!visible) return;
    var n=i%5;
    tags.forEach(function(g,k){g.classList.toggle('on',k<=n)});
    pills.forEach(function(p,k){p.classList.toggle('on',k===n||n===4)});
    i++;
  }
  setInterval(step,2200);
  setInterval(function(){if(!visible)return;s=(s+1)%subs.length;sub.textContent=subs[s]},2600);
  setInterval(function(){if(!visible)return;t++;tc.textContent='00:'+String(t%60).padStart(2,'0')},1000);
  new IntersectionObserver(function(es){visible=es[0].isIntersecting;
    host.querySelector('svg').style.animationPlayState=visible?'running':'paused';
    if(visible&&i===0)step();},{threshold:.25}).observe(host);
})();
