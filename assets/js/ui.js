import { REDUCED } from './env.js';

export function initUI(){
  var annX=document.getElementById('ann-x');
  if(annX){
    if(sessionStorage.getItem('cy-ann-hidden')==='1'){
      document.documentElement.classList.add('ann-hidden');
    }
    annX.addEventListener('click',function(){
      document.documentElement.classList.add('ann-hidden');
      try{sessionStorage.setItem('cy-ann-hidden','1');}catch(e){}
    });
  }

  var coords=document.getElementById('coords');
  if(coords && window.matchMedia('(pointer:fine)').matches){
    window.addEventListener('mousemove',function(e){
      coords.textContent='X:'+String(Math.round(e.clientX)).padStart(4,'0')+'\u00A0\u00A0Y:'+String(Math.round(e.clientY)).padStart(4,'0');
    },{passive:true});
  }
  
  var revs=document.querySelectorAll('.reveal');
  if(REDUCED||!('IntersectionObserver' in window)){
    revs.forEach(function(el){el.classList.add('in');});
  }else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
      });
    },{threshold:0.12});
    revs.forEach(function(el){io.observe(el);});
  }
  
  if(!REDUCED && window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('[data-tilt]').forEach(function(card){
      card.addEventListener('mousemove',function(e){
        var r=card.getBoundingClientRect();
        var px=(e.clientX-r.left)/r.width-0.5;
        var py=(e.clientY-r.top)/r.height-0.5;
        card.style.transform='perspective(700px) rotateX('+(-py*7)+'deg) rotateY('+(px*7)+'deg) translateZ(6px)';
      });
      card.addEventListener('mouseleave',function(){
        card.style.transition='transform .4s ease';
        card.style.transform='';
        setTimeout(function(){card.style.transition='';},400);
      });
    });
  }
}
