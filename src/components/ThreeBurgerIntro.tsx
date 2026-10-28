/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Volume2, VolumeX, FastForward, Play, Gamepad2, Sliders, RotateCcw } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';
import { introAudio } from '../utils/audioSynth.ts';

// User's authentic signature burger image
export const USER_BURGER_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__21_34_15_33b4f247.png';
export const USER_BURGER_PORTRAIT = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__21_34_44_562d840e.png';

interface ThreeBurgerIntroProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const ThreeBurgerIntro: React.FC<ThreeBurgerIntroProps> = ({ onComplete, forceShow = false }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [currentShot, setCurrentShot] = useState<number>(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [manualExplode, setManualExplode] = useState<number | null>(null);
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // References to 3D components for animation
  const burgerGroupRef = useRef<THREE.Group | null>(null);
  const layersRef = useRef<{
    topBun: THREE.Mesh;
    lettuce: THREE.Mesh;
    tomato: THREE.Mesh;
    purpleOnion: THREE.Mesh;
    cheese: THREE.Mesh;
    patty: THREE.Mesh;
    pickles: THREE.Group;
    bottomBun: THREE.Mesh;
    heroCard: THREE.Mesh;
    shockwave: THREE.Mesh;
  } | null>(null);

  // Check sessionStorage and preferences
  useEffect(() => {
    if (!forceShow) {
      const seen = sessionStorage.getItem('allplay_intro_seen');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const nav = navigator as unknown as { connection?: { saveData?: boolean } };
      const saveData = nav.connection?.saveData === true;

      if (seen || prefersReducedMotion || saveData) {
        onComplete();
      }
    }
  }, [forceShow, onComplete]);

  const handleStartIntro = () => {
    setHasStarted(true);
    introAudio.setMuted(isMuted);
    introAudio.startBassLoop();
    introAudio.playSubDrop(150, 0.9);
  };

  const handleSkip = () => {
    introAudio.stopAll();
    setIsFadingOut(true);
    sessionStorage.setItem('allplay_intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    introAudio.setMuted(next);
  };

  // THREE.JS 3D SCENE INITIALIZATION
  useEffect(() => {
    if (!hasStarted) return;
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL as per Three.js skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x120b0a);
    scene.fog = new THREE.FogExp2(0x120b0a, 0.05);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.9, 5.0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    rendererRef.current = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Lighting (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio 3-Point Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xffecd0, 3.8);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xffa726, 0x120b0a, 1.5);
    scene.add(hemiLight);

    const rimGoldLight = new THREE.DirectionalLight(0xc98a3d, 4.5);
    rimGoldLight.position.set(-4, 2, -4);
    scene.add(rimGoldLight);

    const cyanGamerLight = new THREE.PointLight(0x2fe0e6, 2.5, 12);
    cyanGamerLight.position.set(3, -1, 2);
    scene.add(cyanGamerLight);

    // 6. BUILD EXACT BURGER MODEL FOLLOWING STRICT INGREDIENT ORDER
    // [Product Consistency]
    // 1. Golden toasted bottom bun
    // 2. Rich light yellow sauce & pickle slices
    // 3. Single thick-cut grilled beef patty
    // 4. Melted orange-yellow cheese drape
    // 5. Purple onion rings
    // 6. Thick-cut tomato
    // 7. Curly green leaf lettuce
    // 8. Rich light yellow sauce
    // 9. Black-and-white sesame glossy brioche top bun
    const burgerGroup = new THREE.Group();
    burgerGroupRef.current = burgerGroup;
    scene.add(burgerGroup);

    // Texture loader with sRGB
    const textureLoader = new THREE.TextureLoader();
    const burgerTexture = textureLoader.load(USER_BURGER_IMAGE);
    burgerTexture.colorSpace = THREE.SRGBColorSpace;
    burgerTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const bunMaterial = new THREE.MeshStandardMaterial({
      color: 0xc87d3a,
      roughness: 0.65,
      metalness: 0.05,
    });

    // 1. Bottom Bun
    const bottomBunGeo = new THREE.CylinderGeometry(1.22, 1.15, 0.38, 48);
    const bottomBun = new THREE.Mesh(bottomBunGeo, bunMaterial);
    bottomBun.position.y = -0.7;
    bottomBun.castShadow = !isSoftwareGl;
    bottomBun.receiveShadow = !isSoftwareGl;
    burgerGroup.add(bottomBun);

    // 2. Pickles & Sauce
    const pickles = new THREE.Group();
    const pickleGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.05, 24);
    const pickleMat = new THREE.MeshStandardMaterial({
      color: 0x65a30d,
      roughness: 0.35,
      metalness: 0.1,
    });
    [-0.5, 0.05, 0.55].forEach((ox, idx) => {
      const p = new THREE.Mesh(pickleGeo, pickleMat);
      p.position.set(ox, 0, idx % 2 === 0 ? -0.15 : 0.15);
      pickles.add(p);
    });
    pickles.position.y = -0.45;
    burgerGroup.add(pickles);

    // 3. Single Thick-cut Grilled Beef Patty
    const pattyGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.44, 48);
    const pattyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d1d11,
      roughness: 0.85,
      metalness: 0.1,
    });
    const patty = new THREE.Mesh(pattyGeo, pattyMaterial);
    patty.position.y = -0.2;
    patty.castShadow = !isSoftwareGl;
    patty.receiveShadow = !isSoftwareGl;
    burgerGroup.add(patty);

    // 4. Melted Orange-Yellow Cheese Drape
    const cheeseGeo = new THREE.CylinderGeometry(1.36, 1.42, 0.14, 48);
    const cheeseMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.1,
    });
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMaterial);
    cheese.position.y = 0.05;
    burgerGroup.add(cheese);

    // 5. Purple Onion Rings
    const purpleOnionGeo = new THREE.TorusGeometry(0.9, 0.08, 16, 48);
    const purpleOnionMat = new THREE.MeshStandardMaterial({
      color: 0x8b2252,
      roughness: 0.4,
      metalness: 0.1,
    });
    const purpleOnion = new THREE.Mesh(purpleOnionGeo, purpleOnionMat);
    purpleOnion.rotation.x = Math.PI / 2;
    purpleOnion.position.y = 0.2;
    burgerGroup.add(purpleOnion);

    // 6. Thick-cut Tomato
    const tomatoGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.12, 48);
    const tomatoMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.25,
      metalness: 0.1,
    });
    const tomato = new THREE.Mesh(tomatoGeo, tomatoMat);
    tomato.position.y = 0.34;
    burgerGroup.add(tomato);

    // 7. Curly Green Leaf Lettuce
    const lettuceGeo = new THREE.CylinderGeometry(1.4, 1.35, 0.18, 48);
    const lettuceMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      roughness: 0.6,
      metalness: 0.05,
    });
    const lettuce = new THREE.Mesh(lettuceGeo, lettuceMat);
    lettuce.position.y = 0.52;
    burgerGroup.add(lettuce);

    // 8. Glossy Brioche Top Bun with Sesame
    const topBunGeo = new THREE.SphereGeometry(1.26, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const topBun = new THREE.Mesh(topBunGeo, bunMaterial);
    topBun.position.y = 0.68;
    topBun.scale.set(1, 0.65, 1);
    topBun.castShadow = !isSoftwareGl;
    burgerGroup.add(topBun);

    // 9. Authentic High-Res Hero Image Plane (blended in 3D for hyper-realistic commercial food TVC finish)
    const heroCardGeo = new THREE.PlaneGeometry(3.3, 3.3);
    const heroCardMat = new THREE.MeshBasicMaterial({
      map: burgerTexture,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const heroCard = new THREE.Mesh(heroCardGeo, heroCardMat);
    heroCard.position.set(0, 0.05, -0.05);
    scene.add(heroCard);

    // Golden Shockwave Ring
    const shockwaveGeo = new THREE.RingGeometry(0.2, 0.35, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xc98a3d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwave.rotation.x = -Math.PI / 2;
    shockwave.position.y = -0.9;
    scene.add(shockwave);

    // Contact shadow
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.48,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -0.92;
    scene.add(contactShadow);

    layersRef.current = {
      topBun,
      lettuce,
      tomato,
      purpleOnion,
      cheese,
      patty,
      pickles,
      bottomBun,
      heroCard,
      shockwave,
    };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 10-SECOND CINEMATIC ANIMATION LOOP
    const DURATION_MS = 10000;
    const animate = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const pct = Math.min(elapsed / DURATION_MS, 1);
      setProgress(pct * 100);

      const sec = elapsed / 1000;

      // TVC Shot 1: 0–1.6s | Instant Deconstruction
      // TVC Shot 2: 1.6–3.4s | Beef Patty Blazing Sear & Cheese Drop
      // TVC Shot 3: 3.4–5.4s | High-Speed Ingredient Flight
      // TVC Shot 4: 5.4–7.6s | High-Speed Mid-Air Assembly
      // TVC Shot 5: 7.6–10s | Slamming Down and Hero Shot
      if (sec < 1.6) {
        if (currentShot !== 1) {
          setCurrentShot(1);
          introAudio.playWhoosh(0.7);
        }
      } else if (sec < 3.4) {
        if (currentShot !== 2) {
          setCurrentShot(2);
          introAudio.playSizzle(1.8);
          introAudio.playSubDrop(160, 0.5);
        }
      } else if (sec < 5.4) {
        if (currentShot !== 3) {
          setCurrentShot(3);
          introAudio.playWhoosh(0.5);
        }
      } else if (sec < 7.6) {
        if (currentShot !== 4) {
          setCurrentShot(4);
          introAudio.playWhoosh(0.8);
        }
      } else {
        if (currentShot !== 5) {
          setCurrentShot(5);
          introAudio.playSubDrop(180, 1.2);
        }
      }

      let explodeFactor = 0;
      if (manualExplode !== null) {
        explodeFactor = manualExplode;
      } else {
        if (sec < 1.6) {
          explodeFactor = Math.sin((sec / 1.6) * Math.PI * 0.5) * 1.8;
        } else if (sec < 3.4) {
          explodeFactor = 1.6 + Math.sin(sec * 4) * 0.08;
        } else if (sec < 5.4) {
          explodeFactor = 1.4 + Math.cos(sec * 3) * 0.15;
        } else if (sec < 7.6) {
          const snapT = (sec - 5.4) / 2.2;
          explodeFactor = (1 - snapT) * 1.4;
        } else {
          explodeFactor = 0.0;
        }
      }

      // Update 3D layer vertical offsets with smooth physical damping
      if (layersRef.current) {
        const { topBun, lettuce, tomato, purpleOnion, cheese, patty, pickles, bottomBun, shockwave, heroCard } =
          layersRef.current;

        topBun.position.y = 0.68 + explodeFactor * 1.6;
        lettuce.position.y = 0.52 + explodeFactor * 1.2;
        tomato.position.y = 0.34 + explodeFactor * 0.85;
        purpleOnion.position.y = 0.2 + explodeFactor * 0.6;
        cheese.position.y = 0.05 + explodeFactor * 0.35;
        patty.position.y = -0.2 - explodeFactor * 0.1;
        pickles.position.y = -0.45 - explodeFactor * 0.35;
        bottomBun.position.y = -0.7 - explodeFactor * 0.65;

        // Shockwave expansion on landing
        if (sec >= 7.6 && sec <= 9.2) {
          const waveT = (sec - 7.6) / 1.6;
          const scale = 0.5 + waveT * 5.2;
          shockwave.scale.set(scale, scale, scale);
          (shockwave.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - waveT);
        } else {
          (shockwave.material as THREE.MeshBasicMaterial).opacity = 0;
        }

        // Freeze and fade into authentic hero image at 7.6s+
        if (sec >= 7.6) {
          const fadeT = Math.min((sec - 7.6) / 1.2, 1);
          (heroCard.material as THREE.MeshBasicMaterial).opacity = fadeT * 0.98;
        } else {
          (heroCard.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      }

      // Camera choreography
      if (sec < 7.6) {
        const orbitAngle = now * 0.0006;
        camera.position.x = Math.sin(orbitAngle) * 4.5;
        camera.position.z = Math.cos(orbitAngle) * 4.5;
        camera.position.y = 0.9 + Math.sin(now * 0.001) * 0.25;
        camera.lookAt(0, 0.05, 0);
      } else {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 4, 0.016);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.1, 4, 0.016);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 4.3, 4, 0.016);
        camera.lookAt(0, 0.05, 0);
      }

      renderer.render(scene, camera);

      if (elapsed < DURATION_MS || manualExplode !== null) {
        animFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        handleSkip();
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hasStarted, manualExplode, currentShot]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#120B0A] transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. INITIAL DARK START GATE */}
      {!hasStarted ? (
        <div className="relative flex flex-col items-center justify-center px-4 text-center max-w-xl z-10">
          <div className="absolute w-80 h-80 rounded-full bg-[#E8541C]/20 blur-3xl -z-10 pointer-events-none" />

          {/* User's signature burger preview */}
          <div className="relative w-36 h-36 mb-6 rounded-2xl overflow-hidden border-2 border-[#E8541C] shadow-2xl shadow-[#E8541C]/30">
            <img
              src={USER_BURGER_IMAGE}
              alt="Hambúrguer artesanal All Play deconstruído"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B0A] via-transparent to-transparent" />
          </div>

          <div className="flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-[#C98A3D]/40 bg-[#1D1412]/80 backdrop-blur-sm">
            <Gamepad2 className="w-4 h-4 text-[#E8541C]" />
            <span className="font-arcade text-xs text-[#C98A3D] uppercase tracking-wider">
              São Mateus · São Paulo
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wide uppercase leading-none mb-2">
            ALL PLAY BURGUER
          </h1>
          <p className="font-arcade text-sm md:text-base text-[#2FE0E6] mb-6 tracking-widest uppercase">
            {RESTAURANT_CONFIG.slogan}
          </p>

          <p className="text-sm text-stone-300 max-w-md mb-8 leading-relaxed">
            Videogames em todas as mesas, parque de trampolim no andar superior e rodízio completo de mini hambúrgueres artesanais + pizzas.
          </p>

          {/* Big PRESS START Button */}
          <button
            onClick={handleStartIntro}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E8541C] hover:bg-[#ff6128] text-white font-arcade text-sm md:text-base tracking-widest uppercase rounded gamer-button shadow-xl shadow-[#E8541C]/40 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2FE0E6]"
          >
            <Play className="w-5 h-5 fill-current text-white group-hover:scale-110 transition-transform" />
            <span>PRESS START</span>
          </button>

          <button
            onClick={handleSkip}
            className="mt-6 text-xs text-stone-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            Pular intro e ir direto para o site
          </button>
        </div>
      ) : (
        /* 2. THREE.JS 3D CINEMATIC INTRO VIEWPORT */
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
          <div ref={containerRef} className="absolute inset-0 w-full h-full" />

          {/* Top Control Bar: Status, Audio & Skip */}
          <div className="relative z-20 flex items-center justify-between p-6">
            <div className="flex items-center gap-3 bg-[#120B0A]/80 px-3.5 py-1.5 rounded border border-stone-800">
              <span className="font-arcade text-[11px] text-[#2FE0E6] uppercase tracking-wider">
                THREE.JS 3D · 150 BPM BASS HOUSE
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                className="p-2.5 rounded bg-[#120B0A]/80 hover:bg-[#1D1412] text-white border border-stone-700/80 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-stone-400" /> : <Volume2 className="w-5 h-5 text-[#39FF88]" />}
              </button>

              <button
                onClick={handleSkip}
                className="flex items-center gap-2 px-4 py-2 bg-[#120B0A]/90 hover:bg-[#E8541C] text-white font-arcade text-xs rounded border border-stone-700/80 transition-colors"
              >
                <span>PULAR</span>
                <FastForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stage Info Badge */}
          <div className="relative z-20 flex flex-col items-center justify-end pb-4 px-4 text-center pointer-events-none">
            <div className="bg-[#120B0A]/90 border border-[#E8541C]/40 px-6 py-2 rounded gamer-card max-w-md pointer-events-auto shadow-xl">
              <span className="font-arcade text-[10px] text-[#E8541C] uppercase block">
                Fase 0{currentShot} / 05 · TVC Cinematic
              </span>
              <p className="font-display text-lg sm:text-xl text-white tracking-wide uppercase">
                {currentShot === 1 && 'Desconstrução Explosiva do Burger'}
                {currentShot === 2 && 'Carne na Brasa & Cheddar Melt'}
                {currentShot === 3 && 'Alface, Tomate e Picles em Voo'}
                {currentShot === 4 && 'Montagem Aérea em Alta Velocidade'}
                {currentShot === 5 && 'All Play Burger · Pronto para o Jogo'}
              </p>
            </div>

            {/* Thin Progress Bar */}
            <div className="w-full max-w-md mt-3 bg-stone-900/90 h-1.5 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-gradient-to-r from-[#E8541C] via-[#C98A3D] to-[#2FE0E6] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 3. COLLAPSIBLE BOTTOM DOCK (Three.js Skill: <= 15% Viewport) */}
          <div className="relative z-20 pb-4 flex justify-center px-4">
            <div className="bg-[#140F1D]/95 border border-stone-800 rounded-2xl p-3 max-w-xl w-full shadow-2xl flex flex-col gap-2.5">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#2FE0E6]" />
                  <span className="font-arcade text-[10px] text-white uppercase tracking-wider">
                    Controle 3D de Camadas
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {manualExplode !== null && (
                    <button
                      onClick={() => setManualExplode(null)}
                      className="text-[10px] text-[#E8541C] hover:underline flex items-center gap-1 font-arcade"
                    >
                      <RotateCcw className="w-3 h-3" /> Auto
                    </button>
                  )}
                  <button
                    onClick={() => setIsHudCollapsed(!isHudCollapsed)}
                    className="text-[10px] text-stone-400 hover:text-white px-2 py-0.5 rounded bg-stone-900 border border-stone-800 uppercase"
                  >
                    {isHudCollapsed ? '▴ Expandir' : '▾ Ocultar'}
                  </button>
                </div>
              </div>

              {!isHudCollapsed && (
                <div className="flex items-center gap-4 pt-1">
                  <span className="text-[11px] text-stone-400 shrink-0">Explosão:</span>
                  <input
                    type="range"
                    min="0"
                    max="2.5"
                    step="0.05"
                    value={manualExplode ?? (currentShot <= 3 ? 1.5 : 0)}
                    onChange={(e) => setManualExplode(parseFloat(e.target.value))}
                    className="w-full accent-[#E8541C] bg-stone-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono text-xs text-[#2FE0E6] tabular-nums shrink-0">
                    {((manualExplode ?? (currentShot <= 3 ? 1.5 : 0)) * 40).toFixed(0)}%
                  </span>
                </div>
              )}

            </div>
          </div>

        </div>
      )}
    </div>
  );
};
