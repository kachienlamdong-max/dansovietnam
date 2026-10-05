import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RegionId } from '../../types';
import { VIETNAM_REGIONS, SOVEREIGNTY_MARKERS } from '../../data/vietnamGeographyData';
import { playHoverSound } from '../../utils/audio';
import { RotateCcw, ZoomIn, ZoomOut, Layers, Compass } from 'lucide-react';

interface Vietnam3DMapProps {
  onRegionSelect: (regionId: RegionId) => void;
  selectedRegionId: RegionId | null;
  targetRegionId?: RegionId | null;
  flashState?: {
    regionId: RegionId;
    type: 'correct' | 'incorrect';
  } | null;
  interactive?: boolean;
}

export const Vietnam3DMap: React.FC<Vietnam3DMapProps> = ({
  onRegionSelect,
  selectedRegionId,
  targetRegionId,
  flashState,
  interactive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<RegionId | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const regionMeshesRef = useRef<Map<RegionId, THREE.Mesh>>(new Map());
  const mapGroupRef = useRef<THREE.Group | null>(null);
  const isPointerDownRef = useRef(false);
  const prevPointerPositionRef = useRef({ x: 0, y: 0 });
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-10, -10));
  const hoveredRegionRef = useRef<RegionId | null>(null);
  const reqAnimFrameRef = useRef<number | null>(null);

  // Target camera and map group rotation (upright orientation for recognizable S-shape)
  const targetRotationRef = useRef({ x: 0.12, y: 0.0 });

  const resetView = useCallback(() => {
    targetRotationRef.current = { x: 0.12, y: 0.0 };
    if (cameraRef.current) {
      cameraRef.current.position.set(0, -0.2, 11.5);
      cameraRef.current.lookAt(0, -0.2, 0);
    }
  }, []);

  const zoomIn = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(7.0, cameraRef.current.position.z - 1.2);
    }
  }, []);

  const zoomOut = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.min(16.0, cameraRef.current.position.z + 1.2);
    }
  }, []);

  // Update materials when selection, hover, or flashState changes
  useEffect(() => {
    regionMeshesRef.current.forEach((mesh, rId) => {
      const regionData = VIETNAM_REGIONS[rId];
      if (!regionData) return;

      const mat = mesh.material as THREE.MeshStandardMaterial;

      // Check if flashing (from correct or incorrect click feedback)
      if (flashState && flashState.regionId === rId) {
        if (flashState.type === 'correct') {
          // Bright glowing green
          mat.color.set('#22c55e');
          mat.emissive.set('#16a34a');
          mat.emissiveIntensity = 0.9;
        } else {
          // Bright glowing red
          mat.color.set('#ef4444');
          mat.emissive.set('#b91c1c');
          mat.emissiveIntensity = 0.9;
        }
        return;
      }

      // Check selection or hover
      const isSelected = selectedRegionId === rId;
      const isHovered = hoveredRegionId === rId;

      if (isSelected) {
        mat.color.set(regionData.highlightColor);
        mat.emissive.set(regionData.highlightColor);
        mat.emissiveIntensity = 0.6;
        mesh.position.z = 0.15; // slightly lifted
      } else if (isHovered) {
        mat.color.set(regionData.highlightColor);
        mat.emissive.set(regionData.highlightColor);
        mat.emissiveIntensity = 0.35;
        mesh.position.z = 0.08;
      } else {
        mat.color.set(regionData.color);
        mat.emissive.set(regionData.emissiveColor);
        mat.emissiveIntensity = 0.15;
        mesh.position.z = 0;
      }
    });
  }, [hoveredRegionId, selectedRegionId, flashState]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x070d19); // Deep dark oceanic navy

    // Exponential fog for depth
    scene.fog = new THREE.FogExp2(0x070d19, 0.045);

    // 2. Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, -0.2, 11.5);
    camera.lookAt(0, -0.2, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting (Three-point studio lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.2);
    keyLight.position.set(6, 8, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-8, -4, 6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa78bfa, 0.4);
    rimLight.position.set(0, 10, -5);
    scene.add(rimLight);

    // 5. Ocean Bed / Water Grid
    const oceanGroup = new THREE.Group();
    const oceanGeo = new THREE.PlaneGeometry(16, 20, 32, 32);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x0a1628,
      roughness: 0.7,
      metalness: 0.2
    });
    const oceanPlane = new THREE.Mesh(oceanGeo, oceanMat);
    oceanPlane.position.set(0, 0.5, -0.4);
    oceanPlane.receiveShadow = true;
    oceanGroup.add(oceanPlane);

    // Grid lines for maritime coordinates aesthetic
    const grid = new THREE.GridHelper(16, 16, 0x1e293b, 0x0f172a);
    grid.rotation.x = Math.PI / 2;
    grid.position.set(0, 0.5, -0.38);
    oceanGroup.add(grid);
    scene.add(oceanGroup);

    // 6. Map Group (holds extruded regions and sovereignty markers)
    const mapGroup = new THREE.Group();
    mapGroupRef.current = mapGroup;
    mapGroup.rotation.x = targetRotationRef.current.x;
    mapGroup.rotation.y = targetRotationRef.current.y;
    scene.add(mapGroup);

    // 7. Create 3D Extruded Meshes for 6 Regions
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 1,
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.03,
      bevelOffset: 0,
      bevelSegments: 3
    };

    regionMeshesRef.current.clear();

    (Object.keys(VIETNAM_REGIONS) as RegionId[]).forEach((regionId) => {
      const reg = VIETNAM_REGIONS[regionId];
      const shape = new THREE.Shape();

      reg.polygon.forEach((pt, idx) => {
        if (idx === 0) shape.moveTo(pt[0], pt[1]);
        else shape.lineTo(pt[0], pt[1]);
      });
      shape.closePath();

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(reg.color),
        roughness: 0.35,
        metalness: 0.15,
        emissive: new THREE.Color(reg.emissiveColor),
        emissiveIntensity: 0.2
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { regionId };

      // Crisp outline edges
      const edges = new THREE.EdgesGeometry(geom, 25);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
      );
      mesh.add(line);

      mapGroup.add(mesh);
      regionMeshesRef.current.set(regionId, mesh);
    });

    // 8. Sovereignty & Island Markers (Hoàng Sa, Trường Sa, Phú Quốc, Côn Đảo)
    const markersGroup = new THREE.Group();
    SOVEREIGNTY_MARKERS.forEach((marker) => {
      const [mx, my, mz] = marker.position3D;

      // Island base mesh (cluster of small blocks)
      const islandGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.15, 6);
      const islandMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.4,
        metalness: 0.1
      });
      const islandMesh = new THREE.Mesh(islandGeo, islandMat);
      islandMesh.rotation.x = Math.PI / 2;
      islandMesh.position.set(mx, my, mz - 0.08);
      markersGroup.add(islandMesh);

      // Sovereignty Beacon Pin (Golden pin + glowing sphere)
      const pinGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xeab308,
        emissiveIntensity: 0.8
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(mx, my, mz + 0.18);
      markersGroup.add(pin);

      // Pulsing beacon ring
      const ringGeo = new THREE.RingGeometry(0.18, 0.24, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xfacc15,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(mx, my, mz);
      markersGroup.add(ring);
    });
    mapGroup.add(markersGroup);

    // 9. Interaction Handlers (Pointer drag rotation & Raycasting)
    const handlePointerDown = (e: PointerEvent) => {
      isPointerDownRef.current = true;
      setIsRotating(true);
      prevPointerPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.set(x, y);

      if (isPointerDownRef.current) {
        const deltaX = e.clientX - prevPointerPositionRef.current.x;
        const deltaY = e.clientY - prevPointerPositionRef.current.y;

        targetRotationRef.current.y += deltaX * 0.006;
        targetRotationRef.current.x = Math.max(
          -0.1,
          Math.min(0.85, targetRotationRef.current.x + deltaY * 0.006)
        );

        prevPointerPositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isPointerDownRef.current) {
        isPointerDownRef.current = false;
        setIsRotating(false);
      }

      // Check for click if movement was negligible
      const deltaX = Math.abs(e.clientX - prevPointerPositionRef.current.x);
      const deltaY = Math.abs(e.clientY - prevPointerPositionRef.current.y);

      if (deltaX < 5 && deltaY < 5 && interactive) {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), camera);
        const meshes = Array.from(regionMeshesRef.current.values());
        const intersects = raycasterRef.current.intersectObjects(meshes, false);

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object as THREE.Mesh;
          const hitRegionId = hitMesh.userData.regionId as RegionId;
          if (hitRegionId) {
            onRegionSelect(hitRegionId);
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(5.5, Math.min(13, camera.position.z + e.deltaY * 0.005));
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      reqAnimFrameRef.current = requestAnimationFrame(animate);

      // Smooth interpolation for rotation
      if (mapGroupRef.current) {
        mapGroupRef.current.rotation.x += (targetRotationRef.current.x - mapGroupRef.current.rotation.x) * 0.1;
        mapGroupRef.current.rotation.y += (targetRotationRef.current.y - mapGroupRef.current.rotation.y) * 0.1;
      }

      // Raycasting for hover state when not dragging
      if (!isPointerDownRef.current && interactive && cameraRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const meshes = Array.from(regionMeshesRef.current.values());
        const intersects = raycasterRef.current.intersectObjects(meshes, false);

        if (intersects.length > 0) {
          const firstHit = intersects[0].object as THREE.Mesh;
          const regionId = firstHit.userData.regionId as RegionId;
          if (hoveredRegionRef.current !== regionId) {
            hoveredRegionRef.current = regionId;
            setHoveredRegionId(regionId);
            container.style.cursor = 'pointer';
            playHoverSound();
          }
        } else {
          if (hoveredRegionRef.current !== null) {
            hoveredRegionRef.current = null;
            setHoveredRegionId(null);
            container.style.cursor = 'grab';
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      if (reqAnimFrameRef.current) cancelAnimationFrame(reqAnimFrameRef.current);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      resizeObserver.disconnect();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [interactive, onRegionSelect]);

  const activeRegion = hoveredRegionId ? VIETNAM_REGIONS[hoveredRegionId] : selectedRegionId ? VIETNAM_REGIONS[selectedRegionId] : null;

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl select-none group">
      {/* Three.js Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: Controls & Viewport Tools */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 shadow-lg">
        <button
          onClick={resetView}
          title="Đặt lại góc nhìn"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Góc nhìn</span>
        </button>
        <div className="w-px h-4 bg-slate-800" />
        <button
          onClick={zoomIn}
          title="Phóng to"
          className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={zoomOut}
          title="Thu nhỏ"
          className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top Right: National Sovereignty Notice Badge */}
      <div className="absolute top-4 right-4 z-20 max-w-[240px] md:max-w-xs bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-amber-500/30 text-xs shadow-lg">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
          <Compass className="w-3.5 h-3.5 shrink-0" />
          <span>Chủ quyền biển đảo Việt Nam</span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          Quần đảo Hoàng Sa & Trường Sa là một phần máu thịt thiêng liêng, không thể tách rời của Tổ quốc Việt Nam.
        </p>
      </div>

      {/* Bottom Floating Region Info Card on Hover/Selection */}
      {activeRegion && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-20 bg-slate-900/90 backdrop-blur-lg border border-slate-700/80 rounded-2xl p-4 shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[11px] uppercase tracking-wider font-semibold text-slate-400"
              style={{ color: activeRegion.highlightColor }}
            >
              Khu vực địa lí
            </span>
            <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              {activeRegion.density} người/km²
            </span>
          </div>

          <h4 className="text-base font-bold text-white mb-2">
            {activeRegion.name}
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-2.5">
            <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/40">
              <div className="text-slate-400 text-[10px]">Dân số (2024)</div>
              <div className="font-semibold text-white">{activeRegion.population} triệu</div>
            </div>
            <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/40">
              <div className="text-slate-400 text-[10px]">Đô thị hóa</div>
              <div className="font-semibold text-white">{activeRegion.urbanRate}%</div>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
            {activeRegion.description}
          </p>
        </div>
      )}

      {/* Bottom Center: Interaction Guidance Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-sm">
        <span>Kéo chuột để xoay 3D</span>
        <span aria-hidden="true">·</span>
        <span>Cuộn để phóng to/thu nhỏ</span>
        <span aria-hidden="true">·</span>
        <span className="text-emerald-400 font-medium">Nhấp trực tiếp vào vùng để trả lời</span>
      </div>
    </div>
  );
};
