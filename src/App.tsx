import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import * as THREE from 'three';
import { initGraphics, render } from './custom/graphics.js';
import { initPhysics, createObjects } from './custom/physics.js';
import { initInput } from './custom/input.js';
import { initGUI, applyCameraPreset } from './custom/gui.js'; // Import the GUI
import { loadCentralityGraph, loadPageRankGraph, loagTilesGraph } from './custom/legend.js';

import Ammo from 'ammojs3';

import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';


const state = useSelector((state: RootState) => state);

// Initialize Ammo.js physics engine and start the application
Ammo().then(function(AmmoLib) {
    // might need to store this in state
    // Ammo = AmmoLib; // Store Ammo globally for use in other modules
    init();
});

function init() {
    // Initialize graphics (scene, camera, renderer, lights)
    initGraphics();

    // Initialize physics world
    initPhysics();

    // Initialize input handlers and UI
    initInput();

    // Initialize GUI controls
    initGUI();

    // Select random camera preset
    const presets = Object.keys(state.cameraPresets);
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    applyCameraPreset(randomPreset);

    // Load the centrality or page rank graph when the "Legend" modal is shown
    const legendModal = document.getElementById('legend-modal');
    legendModal.addEventListener('show.bs.modal', function() {
        // Clear any existing graph to prevent duplicates
        const container = document.getElementById('legend-graph');
        if (container) {
            container.innerHTML = '';

            // Default to centrality graph initially
            loadCentralityGraph('#legend-graph');
        }
    });

    // Load the relevant information when "About" modal is shown
    const aboutModal = document.getElementById('about-modal');
    aboutModal.addEventListener('show.bs.modal', function() {
        //to fill if needed
    });


    // Create initial objects (ground plane, Jenga tower)
    createObjects();

    // Start animation loop
    state.renderer.setAnimationLoop(animate);
}


function animate() {
    // Log camera position
    const pos = state.camera.position;
    const rot = state.camera.rotation;
    const orb = state.orbitControls.target;
    console.log(
        `Camera Position: x: ${pos.x.toFixed(2)}, y: ${pos.y.toFixed(2)}, z: ${pos.z.toFixed(2)}`,
        `\nRotation: x: ${rot.x.toFixed(2)}, y: ${rot.y.toFixed(2)}, z: ${rot.z.toFixed(2)}`,
        `\nOrbit: x: ${orb.x.toFixed(2)}, y: ${orb.y.toFixed(2)}, z: ${orb.z.toFixed(2)}`
    );

    render();

    // Stats update if needed
    // if (stats) stats.update();
}

function showGraph(type) {
    const container = document.getElementById('legend-graph');
    if (container) {
        container.parentNode.querySelectorAll('button').forEach(button => {
            if (button.getAttribute('data-name') === type) {
                button.classList.add('btn-dark');
                button.classList.remove('btn-outline-dark');
            } else {
                button.classList.remove('btn-dark');
                button.classList.add('btn-outline-dark');
            }
        });
        container.innerHTML = '';
        if (type === 'centrality') {
            loadCentralityGraph('#legend-graph');
        } else if (type === 'pagerank') {
            loadPageRankGraph('#legend-graph');
        }
    }
}

// Attach functions to the window to make them accessible globally
window.showGraph = showGraph;
window.loadCentralityGraph = loadCentralityGraph;
window.loadPageRankGraph = loadPageRankGraph;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
