// Proof Mode demo: toggles the 'capture' pane between visible and hidden.
import { renderCrosshair } from './crosshair.js';

export function initProof(){
  var proofState={tpl:4,color:'#f5f5f5',size:1.1,gap:6,outline:1,opacity:1};
  document.querySelectorAll('.proof-ch').forEach(function(cv){renderCrosshair(cv,proofState);});
  var pt=document.getElementById('proof-toggle');
  pt.addEventListener('change',function(){
    document.getElementById('capture-pane').classList.toggle('on',pt.checked);
    document.getElementById('proof-state').textContent=pt.checked?'ON':'OFF';
  });
}
