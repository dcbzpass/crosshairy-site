import { REDUCED } from './env.js';

export function initHero3D(){
  (function(){
    var mount=document.getElementById('hero-3d');
    if(!mount||typeof THREE==='undefined')return;
  
    var scene=new THREE.Scene();
    scene.fog=new THREE.Fog(0x080808,7,20);
  
    var camera=new THREE.PerspectiveCamera(45,mount.clientWidth/mount.clientHeight,0.1,100);
    camera.position.set(0,0.4,6.4);
  
    var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(mount.clientWidth,mount.clientHeight);
    mount.appendChild(renderer.domElement);
  
      scene.add(new THREE.AmbientLight(0xffffff,0.22));
    var key=new THREE.DirectionalLight(0xffffff,1.15);key.position.set(3,4,5);scene.add(key);
    var rim=new THREE.DirectionalLight(0xffffff,0.35);rim.position.set(-4,-2,-4);scene.add(rim);
  
    var group=new THREE.Group();
    scene.add(group);
  
      var metal=new THREE.MeshStandardMaterial({color:0xf5f5f5,metalness:0.85,roughness:0.32});
    var armLen=1.35,armW=0.3,gap=0.42;
    var geoV=new THREE.BoxGeometry(armW,armLen,armW);
    var geoH=new THREE.BoxGeometry(armLen,armW,armW);
    var offs=gap+armLen/2;
    var arms=[
      {g:geoV,p:[0,offs,0]},{g:geoV,p:[0,-offs,0]},
      {g:geoH,p:[offs,0,0]},{g:geoH,p:[-offs,0,0]}
    ];
    arms.forEach(function(a){
      var m=new THREE.Mesh(a.g,metal);
      m.position.set(a.p[0],a.p[1],a.p[2]);
      group.add(m);
    });
  
      var ringMat1=new THREE.MeshStandardMaterial({color:0x3a3a3a,metalness:0.9,roughness:0.4});
    var ringMat2=new THREE.MeshStandardMaterial({color:0x242424,metalness:0.9,roughness:0.5});
    var ring1=new THREE.Mesh(new THREE.TorusGeometry(2.35,0.018,8,120),ringMat1);
    var ring2=new THREE.Mesh(new THREE.TorusGeometry(2.85,0.012,8,120),ringMat2);
    group.add(ring1);group.add(ring2);
  
      var grid=new THREE.GridHelper(46,46,0x1e1e1e,0x141414);
    grid.position.y=-2.4;
    scene.add(grid);
  
      var pGeo=new THREE.BufferGeometry();
    var pCount=160,pos=new Float32Array(pCount*3);
    for(var i=0;i<pCount*3;i++){pos[i]=(Math.random()-0.5)*17;}
    pGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    var points=new THREE.Points(pGeo,new THREE.PointsMaterial({color:0x5a5a5a,size:0.022,transparent:true,opacity:0.7}));
    scene.add(points);
  
    var mouse={x:0,y:0};
    if(window.matchMedia('(pointer:fine)').matches){
      window.addEventListener('mousemove',function(e){
        mouse.x=(e.clientX/window.innerWidth)*2-1;
        mouse.y=(e.clientY/window.innerHeight)*2-1;
      },{passive:true});
    }
  
    window.addEventListener('resize',function(){
      camera.aspect=mount.clientWidth/mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth,mount.clientHeight);
      if(REDUCED)renderer.render(scene,camera);
    });
  
    var t=0,running=true;
    document.addEventListener('visibilitychange',function(){running=!document.hidden;});
  
    function frame(){
      if(!REDUCED)requestAnimationFrame(frame);
      if(!running)return;
      t+=0.008;
      group.rotation.y+=(mouse.x*0.45-group.rotation.y)*0.05+0.0018;
      group.rotation.x+=(mouse.y*0.3-group.rotation.x)*0.05;
      group.position.y=Math.sin(t*1.3)*0.1;
      ring1.rotation.x=t*0.5;ring1.rotation.y=t*0.32;
      ring2.rotation.x=-t*0.34;ring2.rotation.z=t*0.22;
      points.rotation.y=t*0.05;
      renderer.render(scene,camera);
    }
    frame();
    if(REDUCED)renderer.render(scene,camera);
  })();
}
