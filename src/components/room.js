import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { useNavigate } from 'react-router-dom';

const ThreeRoom = () => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const suppressPrompt = useRef(false);
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
      setInfoText('');
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    if (!started) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new PointerLockControls(camera, renderer.domElement);
    controlsRef.current = controls;
    scene.add(controls.object);

    const onLock = () => setIsLocked(true);
    const onUnlock = () => {
      if (!suppressPrompt.current) {
        setShowExitPrompt(true);
      } else {
        setIsLocked(false);
      }
    };

    controls.addEventListener('lock', onLock);
    controls.addEventListener('unlock', onUnlock);

    renderer.domElement.addEventListener('click', () => {
      if (!controls.isLocked) {
        controls.lock();
      }
    });

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    const makeFloor = (color, pos, size = 10) => {
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size),
        new THREE.MeshStandardMaterial({ color })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(...pos);
      scene.add(floor);
    };

    const makeWall = (width, height, color, pos, rotation) => {
      const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshStandardMaterial({ color })
      );
      wall.position.set(...pos);
      if (rotation) wall.rotation.y = rotation;
      scene.add(wall);
    };

    const positions = {
      room1: [0, 0, 0],
      room3: [20, 0, 0],
      room4: [-20, 0, 0],
      room5: [0, 0, -20]
    };

    const roomBounds = Object.values(positions).map(([x, , z]) => ({
      minX: x - 5,
      maxX: x + 5,
      minZ: z - 5,
      maxZ: z + 5,
    }));

    const isInsideRoom = (x, z) => {
      return roomBounds.some(({ minX, maxX, minZ, maxZ }) =>
        x >= minX && x <= maxX && z >= minZ && z <= maxZ
      );
    };

    const makeRoad = (start, end) => {
      const dx = end[0] - start[0];
      const dz = end[2] - start[2];
      const length = Math.sqrt(dx * dx + dz * dz);
      const angle = Math.atan2(dz, dx);

      const road = new THREE.Mesh(
        new THREE.PlaneGeometry(length, 2),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
      );
      road.rotation.x = -Math.PI / 2;
      road.rotation.z = angle;
      road.position.set((start[0] + end[0]) / 2, 0.01, (start[2] + end[2]) / 2);
      scene.add(road);

      const startInside = isInsideRoom(start[0], start[2]);
      const endInside = isInsideRoom(end[0], end[2]);

      if (startInside || endInside) return;

      const wallHeight = 2;
      const wallThickness = 0.1;
      const wallGeometry = new THREE.BoxGeometry(length, wallHeight, wallThickness);
      const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });

      const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
      const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);

      const offsetX = Math.sin(angle) * 1.1;
      const offsetZ = -Math.cos(angle) * 1.1;

      [wall1, wall2].forEach((wall, idx) => {
        wall.rotation.y = -angle;
        wall.position.set(
          (start[0] + end[0]) / 2 + (idx === 0 ? offsetX : -offsetX),
          wallHeight / 2,
          (start[2] + end[2]) / 2 + (idx === 0 ? offsetZ : -offsetZ)
        );
        scene.add(wall);
      });
    };

    // Create rooms and roads
    makeFloor(0xff0000, positions.room1);
    makeWall(10, 10, 0xadd8e6, [0, 2.5, -5]);
    makeWall(10, 10, 0xadd8e6, [0, 2.5, 5], Math.PI);
    makeWall(10, 10, 0xffffff, [-5, 2.5, 0], Math.PI / 2);
    makeWall(10, 10, 0xffffff, [5, 2.5, 0], -Math.PI / 2);

    makeFloor(0x0000ff, positions.room3);
    makeWall(10, 10, 0x00ffff, [20, 2.5, -5]);
    makeWall(10, 10, 0x00ffff, [20, 2.5, 5], Math.PI);
    makeWall(10, 10, 0xffffff, [15, 2.5, 0], Math.PI / 2);
    makeWall(10, 10, 0xffffff, [25, 2.5, 0], -Math.PI / 2);

    makeFloor(0x0000ff, positions.room4);
    makeWall(10, 10, 0xffc0cb, [-20, 2.5, -5]);
    makeWall(10, 10, 0xffc0cb, [-20, 2.5, 5], Math.PI);
    makeWall(10, 10, 0xffffff, [-25, 2.5, 0], Math.PI / 2);
    makeWall(10, 10, 0xffffff, [-15, 2.5, 0], -Math.PI / 2);

    makeFloor(0x8a2be2, positions.room5);
    makeWall(10, 10, 0xdeb887, [-5, 2.5, -20], Math.PI / 2);
    makeWall(10, 10, 0xdeb887, [5, 2.5, -20], -Math.PI / 2);
    makeWall(10, 10, 0xffffff, [0, 2.5, -25]);
    makeWall(10, 10, 0xffffff, [0, 2.5, -15], Math.PI);

    makeRoad(positions.room1, positions.room3);
    makeRoad(positions.room1, positions.room4);
    makeRoad(positions.room1, positions.room5);

    const loader = new GLTFLoader();
    const addModel = (path, position, scale, rotationY, infoText) => {
      loader.load(path, (gltf) => {
        const model = gltf.scene;
        model.position.set(...position);
        model.scale.set(...scale);
        if (rotationY) model.rotation.y = rotationY;
        model.userData.infoText = infoText;
        scene.add(model);
      });
    };

    addModel('statue_1/scene.gltf', [-1, 0, -6], [5, 5, 5], Math.PI / 2, 'A famous painted limestone bust of Queen Nefertiti, renowned for its elegance and realism. It was discovered in the workshop of sculptor Thutmose and is one of the most iconic symbols of ancient beauty');
    addModel('statue_2/scene.gltf', [3, 0, -3.5], [0.018, 0.018, 0.018], 0, 'A gilded statue and funerary mask of Pharaoh Tutankhamun, discovered nearly intact in his tomb by Howard Carter. Known for its elaborate craftsmanship and historical significance....');
    addModel('khafre.glb', [-5, 0, -25  ], [0.018, 0.018, 0.018], -Math.PI +20, 'A seated statue of Pharaoh Khafre, known for the iconic stone with the falcon god Horus behind his head.');
    addModel('cleopatra.glb', [-4, 0, -11], [0.03, 0.03, 0.03], Math.PI + 190, 'A statue believed to depict Cleopatra VII, one of the most famous queens of ancient Egypt, combining Greek and Egyptian artistic styles....');
    addModel('ramsesii.glb', [15, 0, 4], [0.03, 0.03, 0.03], Math.PI + 100, 'A colossal granite statue of Pharaoh Ramses II, one of Egypt’s most powerful rulers, originally located in Memphis and now displayed in the Egyptian Museum in Cairo');
    addModel('mentuhotep_ii.glb', [-22, 1, 1], [0.5, 0.5, 0.5], Math.PI + 80, 'A painted sandstone statue of Pharaoh Mentuhotep II, who reunified Egypt and founded the Middle Kingdom.');
    addModel('akhenaten.glb', [-43, 1, -3], [0.15, 0.15, 0.15], Math.PI + 80, 'A statue of Pharaoh Akhenaten, known for his unique artistic style and religious reforms toward monotheism (Aten worship)...');
        addModel('triad_statue_of_king_menkaure.glb', [3, 2, -20], [0.4, 0.4, 0.4], 0, 'A triad statue featuring King Menkaure flanked by the goddess Hathor and a local nome goddess, symbolizing protection and unity...');

    



    

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(0, 0);

    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      for (const intersect of intersects) {
        let object = intersect.object;
        while (object.parent && !object.userData.infoText) {
          object = object.parent;
        }
        if (object.userData.infoText) {
          setInfoText(object.userData.infoText);
          speakText(object.userData.infoText);
          break;
        }
      }
    };

    window.addEventListener('click', handleClick);

    const keys = {};
    window.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true));
    window.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));

    const speed = 0.1;
    const move = () => {
      const dir = new THREE.Vector3();
      controls.getDirection(dir);
      dir.y = 0;
      dir.normalize();

      const right = new THREE.Vector3().crossVectors(dir, camera.up).normalize();
      const pos = controls.object.position;

      if (keys['w']) pos.addScaledVector(dir, speed);
      if (keys['s']) pos.addScaledVector(dir, -speed);
      if (keys['a']) pos.addScaledVector(right, -speed);
      if (keys['d']) pos.addScaledVector(right, speed);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      move();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      renderer.dispose();
      controls.removeEventListener('lock', onLock);
      controls.removeEventListener('unlock', onUnlock);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [started]);

  const handleExitConfirm = (confirm) => {
    if (confirm) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      navigate('/review');
    } else {
      suppressPrompt.current = true;
      setShowExitPrompt(false);
      controlsRef.current?.lock();
      setTimeout(() => {
        suppressPrompt.current = false;
      }, 100);
    }
  };

  return (
    <>
      {!started && (
        <div onClick={() => setStarted(true)} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', background: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, cursor: 'pointer', fontSize: '2rem' }}>
          Click to Start
        </div>
      )}

      {!isLocked && started && !showExitPrompt && (
        <div onClick={() => controlsRef.current?.lock()} style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', padding: '8px 16px', background: '#222', color: 'white', borderRadius: '5px', cursor: 'pointer', zIndex: 10 }}>
          Click to re-enter
        </div>
      )}

      {showExitPrompt && (
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: '#333', color: 'white', padding: '20px', borderRadius: '10px', zIndex: 20, textAlign: 'center' }}>
          <p style={{ marginBottom: '20px' }}>Are you sure you want to leave?</p>
          <button onClick={() => handleExitConfirm(true)} style={{ marginRight: '10px' }}>Yes</button>
          <button onClick={() => handleExitConfirm(false)}>No</button>
        </div>
      )}

      {infoText && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#111', color: '#fff', padding: '15px', borderRadius: '8px', maxWidth: '300px', zIndex: 15 }}>
          {infoText}
        </div>
      )}

      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '8px', height: '8px', background: 'white', borderRadius: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }} />
      <div ref={mountRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} />
    </>
  );
};

export default ThreeRoom;