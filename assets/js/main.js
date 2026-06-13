// Entry point. Wires up each feature module after the DOM is parsed
// (module scripts are deferred by default). three.js is loaded as a
// classic <script> before this module, so the THREE global is ready.
import { initLoader } from './loader.js';
import { initLab } from './lab.js';
import { initProof } from './proof.js';
import { initUI } from './ui.js';
import { initHero3D } from './hero3d.js';

initLoader();
initLab();
initProof();
initUI();
initHero3D();
