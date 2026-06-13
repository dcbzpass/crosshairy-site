// The Lab: an interactive replica of the in-app crosshair customizer.
import { TPLS, renderCrosshair } from './crosshair.js';

export function initLab(){
  var SWATCHES=['#F5F5F5','#FF3B3B','#3BFF7E','#3BD7FF','#FF3BD0','#FFE43B','#FF8C1A','#5468FF'];
  var DEFAULTS={tpl:4,color:'#F5F5F5',size:1,gap:6,outline:1,opacity:1};
  var lab=Object.assign({},DEFAULTS);
  var labCanvas=document.getElementById('lab-canvas');
  
  var els={
    tplOut:document.getElementById('tpl-out'),
    colOut:document.getElementById('col-out'),
    sizeOut:document.getElementById('size-out'),
    gapOut:document.getElementById('gap-out'),
    outOut:document.getElementById('out-out'),
    opOut:document.getElementById('op-out'),
    readout:document.getElementById('lab-readout'),
    rSize:document.getElementById('r-size'),
    rGap:document.getElementById('r-gap'),
    rOutline:document.getElementById('r-outline'),
    rOpacity:document.getElementById('r-opacity'),
    hex:document.getElementById('hex-input')
  };
  
  function syncLab(){
    renderCrosshair(labCanvas,lab);
    els.tplOut.textContent=TPLS[lab.tpl].name;
    els.colOut.textContent=lab.color.toUpperCase();
    els.sizeOut.textContent=Math.round(lab.size*100)+'%';
    els.gapOut.textContent=lab.gap;
    els.outOut.textContent=lab.outline===0?'OFF':lab.outline;
    els.opOut.textContent=Math.round(lab.opacity*100)+'%';
    els.readout.textContent=TPLS[lab.tpl].name+' / '+lab.color.toUpperCase();
    var btns=document.querySelectorAll('.tpl-btn');
    for(var i=0;i<btns.length;i++){btns[i].classList.toggle('active',i===lab.tpl);}
    var sw=document.querySelectorAll('.swatch');
    for(var j=0;j<sw.length;j++){
      sw[j].classList.toggle('active',sw[j].dataset.c.toUpperCase()===lab.color.toUpperCase());
    }
  }
  
  var tplGrid=document.getElementById('tpl-grid');
  TPLS.forEach(function(t,i){
    var b=document.createElement('button');
    b.className='tpl-btn';b.type='button';
    b.setAttribute('role','option');
    b.setAttribute('aria-label',t.name);
    b.title=t.name;
    var cv=document.createElement('canvas');cv.width=72;cv.height=72;
    b.appendChild(cv);
    renderCrosshair(cv,{tpl:i,color:'#f5f5f5',size:1,gap:3,outline:0,opacity:1});
    b.addEventListener('click',function(){lab.tpl=i;syncLab();});
    tplGrid.appendChild(b);
  });
  
  var swWrap=document.getElementById('swatches');
  SWATCHES.forEach(function(cl){
    var b=document.createElement('button');
    b.className='swatch';b.type='button';
    b.style.background=cl;b.dataset.c=cl;
    b.setAttribute('aria-label','Color '+cl);
    b.addEventListener('click',function(){
      lab.color=cl;els.hex.value=cl;syncLab();
    });
    swWrap.insertBefore(b,els.hex);
  });
  
  els.hex.addEventListener('input',function(){
    var v=els.hex.value.trim();
    if(v[0]!=='#')v='#'+v;
    if(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v)){lab.color=v;syncLab();}
  });
  els.rSize.addEventListener('input',function(){lab.size=this.value/100;syncLab();});
  els.rGap.addEventListener('input',function(){lab.gap=+this.value;syncLab();});
  els.rOutline.addEventListener('input',function(){lab.outline=+this.value;syncLab();});
  els.rOpacity.addEventListener('input',function(){lab.opacity=this.value/100;syncLab();});
  
  document.getElementById('btn-random').addEventListener('click',function(){
    lab.tpl=Math.floor(Math.random()*TPLS.length);
    lab.color=SWATCHES[Math.floor(Math.random()*SWATCHES.length)];
    els.hex.value=lab.color;
    syncLab();
  });
  document.getElementById('btn-reset').addEventListener('click',function(){
    lab=Object.assign({},DEFAULTS);
    els.hex.value=lab.color;
    els.rSize.value=100;els.rGap.value=6;els.rOutline.value=1;els.rOpacity.value=100;
    syncLab();
  });
  syncLab();
}
