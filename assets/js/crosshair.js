const OUT_COLOR = 'rgba(0,0,0,0.95)';

function makeDrawer(ctx){
  function line(x1,y1,x2,y2){ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);}
  function stroked(build,lw,outline){
    if(outline>0){
      ctx.strokeStyle=OUT_COLOR;ctx.lineWidth=lw+outline*2;
      ctx.beginPath();build();ctx.stroke();
    }
    ctx.strokeStyle=ctx._color;ctx.lineWidth=lw;
    ctx.beginPath();build();ctx.stroke();
  }
  function filled(build,outline){
    ctx.beginPath();build();
    ctx.fillStyle=ctx._color;ctx.fill();
    if(outline>0){ctx.strokeStyle=OUT_COLOR;ctx.lineWidth=outline*2;ctx.stroke();}
  }
  return {line:line,stroked:stroked,filled:filled};
}

export const TPLS=[
 {name:'DOT',draw:function(d,c,s,g,o){d.filled(function(){c.arc(0,0,3.2*s,0,7);},o);}},
 {name:'RING',draw:function(d,c,s,g,o){d.stroked(function(){c.arc(0,0,10*s,0,7);},2*s,o);}},
 {name:'SQUARE',draw:function(d,c,s,g,o){var h=9*s;d.stroked(function(){c.rect(-h,-h,h*2,h*2);},2*s,o);}},
 {name:'THIN CROSS',draw:function(d,c,s,g,o){var L=g+18*s;d.stroked(function(){d.line(0,-g,0,-L);d.line(0,g,0,L);d.line(-g,0,-L,0);d.line(g,0,L,0);},1.6*s,o);}},
 {name:'THICK CROSS',draw:function(d,c,s,g,o){var L=g+16*s;d.stroked(function(){d.line(0,-g,0,-L);d.line(0,g,0,L);d.line(-g,0,-L,0);d.line(g,0,L,0);},4.2*s,o);}},
 {name:'CROSS \u00B7',draw:function(d,c,s,g,o){var gg=Math.max(g,4*s),L=gg+13*s;d.stroked(function(){d.line(0,-gg,0,-L);d.line(0,gg,0,L);d.line(-gg,0,-L,0);d.line(gg,0,L,0);},1.6*s,o);d.filled(function(){c.arc(0,0,1.8*s,0,7);},o);}},
 {name:'T-SHAPE',draw:function(d,c,s,g,o){var L=g+15*s;d.stroked(function(){d.line(-g,0,-L,0);d.line(g,0,L,0);d.line(0,g,0,L);},3.6*s,o);}},
 {name:'CIRCLE +',draw:function(d,c,s,g,o){d.stroked(function(){c.arc(0,0,12*s,0,7);},1.6*s,o);d.stroked(function(){d.line(0,-3*s,0,-8.5*s);d.line(0,3*s,0,8.5*s);d.line(-3*s,0,-8.5*s,0);d.line(3*s,0,8.5*s,0);},1.6*s,o);}},
 {name:'SMALL PLUS',draw:function(d,c,s,g,o){var gg=g*0.5,L=gg+6.5*s;d.stroked(function(){d.line(0,-gg,0,-L);d.line(0,gg,0,L);d.line(-gg,0,-L,0);d.line(gg,0,L,0);},2.4*s,o);}},
 {name:'LARGE PLUS',draw:function(d,c,s,g,o){var L=g+26*s;d.stroked(function(){d.line(0,-g,0,-L);d.line(0,g,0,L);d.line(-g,0,-L,0);d.line(g,0,L,0);},3*s,o);}},
 {name:'SNIPER',draw:function(d,c,s,g,o){var L=g+34*s;d.stroked(function(){d.line(0,-g,0,-L);d.line(0,g,0,L);d.line(-g,0,-L,0);d.line(g,0,L,0);},1.2*s,o);d.filled(function(){c.arc(0,0,1.5*s,0,7);},o);}},
 {name:'X CROSS',draw:function(d,c,s,g,o){var a=0.7071,r1=g,r2=g+14*s;d.stroked(function(){d.line(a*r1,a*r1,a*r2,a*r2);d.line(-a*r1,a*r1,-a*r2,a*r2);d.line(a*r1,-a*r1,a*r2,-a*r2);d.line(-a*r1,-a*r1,-a*r2,-a*r2);},2.8*s,o);}},
 {name:'X \u00B7',draw:function(d,c,s,g,o){var a=0.7071,r1=Math.max(g,4*s),r2=r1+11*s;d.stroked(function(){d.line(a*r1,a*r1,a*r2,a*r2);d.line(-a*r1,a*r1,-a*r2,a*r2);d.line(a*r1,-a*r1,a*r2,-a*r2);d.line(-a*r1,-a*r1,-a*r2,-a*r2);},2*s,o);d.filled(function(){c.arc(0,0,1.8*s,0,7);},o);}},
 {name:'ARROWS',draw:function(d,c,s,g,o){
   var dd=g+4*s,len=7.5*s,w=4.5*s,i;
   for(i=0;i<4;i++){(function(ang){
     d.filled(function(){
       var ca=Math.cos(ang),sa=Math.sin(ang);
       function pt(x,y){return [x*ca-y*sa, x*sa+y*ca];}
       var t=pt(0,-dd),b1=pt(-w,-(dd+len)),b2=pt(w,-(dd+len));
       c.moveTo(t[0],t[1]);c.lineTo(b1[0],b1[1]);c.lineTo(b2[0],b2[1]);c.closePath();
     },o);
   })(i*Math.PI/2);}
 }},
 {name:'CHEVRONS',draw:function(d,c,s,g,o){
   var dd=g+5*s,sp=5.5*s,i;
   d.stroked(function(){
     for(i=0;i<4;i++){
       var ang=i*Math.PI/2,ca=Math.cos(ang),sa=Math.sin(ang);
       function pt(x,y){return [x*ca-y*sa, x*sa+y*ca];}
       var a1=pt(-sp,-(dd+sp)),m=pt(0,-dd),a2=pt(sp,-(dd+sp));
       c.moveTo(a1[0],a1[1]);c.lineTo(m[0],m[1]);c.lineTo(a2[0],a2[1]);
     }
   },2*s,o);
 }},
 {name:'TRIANGLE',draw:function(d,c,s,g,o){
   var r=11*s;
   d.stroked(function(){
     var p1=[0,-r],p2=[r*0.866,r*0.5],p3=[-r*0.866,r*0.5];
     c.moveTo(p1[0],p1[1]);c.lineTo(p2[0],p2[1]);c.lineTo(p3[0],p3[1]);c.closePath();
   },2*s,o);
 }},
 {name:'DIAMOND',draw:function(d,c,s,g,o){
   var r=11*s;
   d.stroked(function(){
     c.moveTo(0,-r);c.lineTo(r,0);c.lineTo(0,r);c.lineTo(-r,0);c.closePath();
   },2*s,o);
 }}
];

export function renderCrosshair(canvas,state){
  var ctx=canvas.getContext('2d');
  var w=canvas.width,h=canvas.height;
  ctx.clearRect(0,0,w,h);
  ctx.save();
  ctx.translate(w/2,h/2);
  ctx.lineCap='butt';ctx.lineJoin='miter';
  var s=(Math.min(w,h)/170)*state.size;
  var g=state.gap*(Math.min(w,h)/170)*0.9;
  var o=state.outline*(Math.min(w,h)/170)*0.8;
  ctx.globalAlpha=state.opacity;
  ctx._color=state.color;
  var d=makeDrawer(ctx);
  TPLS[state.tpl].draw(d,ctx,s,g,o);
  ctx.restore();
}
