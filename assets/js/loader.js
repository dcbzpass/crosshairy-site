export function initLoader(){
  (function(){
    var loader=document.getElementById('loader');
    if(!loader)return;
    var de=document.documentElement;
    if(!de.classList.contains('boot')){
      if(loader.parentNode)loader.parentNode.removeChild(loader);
      return;
    }
    var cnt=document.getElementById('ld-count');
    var t0=null;
    function tick(ts){
      if(t0===null)t0=ts;
      var p=Math.min((ts-t0)/950,1);
      cnt.textContent=String(Math.round(p*100)).padStart(3,'0');
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    setTimeout(function(){document.getElementById('ld-ch').classList.add('punch');},1180);
    setTimeout(function(){
      loader.classList.add('done');
      de.classList.remove('boot');
      de.classList.add('booted');
      setTimeout(function(){if(loader.parentNode)loader.parentNode.removeChild(loader);},650);
    },1480);
  })();
}
