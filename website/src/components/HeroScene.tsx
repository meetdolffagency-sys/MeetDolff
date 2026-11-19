import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  reduced: boolean;
  onReady: () => void;
}

/**
 * The signature object: a "listening spool". Concentric rings along a spine form a
 * sound waveform in 3D. The left (past) rings are crisp — memory; the right (future)
 * rings fade — signal still arriving. Longitudinal signal lines connect the rings.
 * One Three.js scene, one WebGL context, lines only (cheap on low-power GPUs).
 */
export default function HeroScene({ reduced, onReady }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const RINGS = small ? 34 : 56;
    const SEG = small ? 72 : 128;
    const SPINE = small ? 5.4 : 7.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(small ? 46 : 36, 1, 0.1, 50);
    camera.position.set(0, 0.2, small ? 9.5 : 10.5);

    const group = new THREE.Group();
    scene.add(group);

    const rings: THREE.LineLoop[] = [];
    const aluminium = new THREE.Color("#b7bec3");
    const chalk = new THREE.Color("#ffffff");
    const signal = new THREE.Color("#d39a68");
    const PLAY = 0.62; // playhead position along spine (0..1)
    const playIdx = Math.round(PLAY * (RINGS - 1));

    for (let i = 0; i < RINGS; i++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SEG * 3), 3));
      const u = i / (RINGS - 1);
      const past = u <= PLAY;
      const mat = new THREE.LineBasicMaterial({
        color: i === playIdx ? signal : aluminium.clone().lerp(chalk, past ? 0.55 + 0.45 * (u / PLAY) : 0),
        transparent: true,
        opacity: i === playIdx ? 1 : past ? 0.55 + 0.4 * (u / PLAY) : Math.max(0.06, 0.4 * (1 - (u - PLAY) / (1 - PLAY))),
      });
      const loop = new THREE.LineLoop(geo, mat);
      rings.push(loop);
      group.add(loop);
    }

    const SPOKES = 14;
    const spokes: THREE.Line[] = [];
    for (let s = 0; s < SPOKES; s++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(RINGS * 3), 3));
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: aluminium, transparent: true, opacity: 0.16 }));
      spokes.push(line);
      group.add(line);
    }

    // drifting signal points
    const N = small ? 50 : 110;
    const pg = new THREE.BufferGeometry();
    const pp = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.2 + Math.random() * 2.2;
      pp[i * 3] = (Math.random() - 0.5) * SPINE * 1.2;
      pp[i * 3 + 1] = Math.sin(a) * r;
      pp[i * 3 + 2] = Math.cos(a) * r;
    }
    pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    const points = new THREE.Points(pg, new THREE.PointsMaterial({ color: signal, size: small ? 0.045 : 0.035, transparent: true, opacity: 0.8 }));
    group.add(points);

    let energy = 0.25;
    let targetEnergy = 0.25;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const update = (t: number) => {
      for (let i = 0; i < RINGS; i++) {
        const u = i / (RINGS - 1);
        const x = (u - 0.5) * SPINE;
        // audio-like envelope along the spine
        const env =
          0.34 +
          0.5 * Math.abs(Math.sin(u * 9.5 + t * 0.55) * Math.sin(u * 3.1 + 1.2)) +
          0.18 * Math.abs(Math.sin(u * 23 - t * 1.1)) * (0.4 + energy);
        const base = 0.55 + env * 1.55;
        const attr = rings[i].geometry.getAttribute("position") as THREE.BufferAttribute;
        for (let k = 0; k < SEG; k++) {
          const th = (k / SEG) * Math.PI * 2;
          const ripple = 1 + (0.05 + 0.08 * energy) * Math.sin(th * 5 + u * 14 - t * 1.4) + 0.03 * Math.sin(th * 11 + t);
          const r = base * ripple;
          attr.setXYZ(k, x, Math.sin(th) * r, Math.cos(th) * r);
        }
        attr.needsUpdate = true;
      }
      for (let s = 0; s < SPOKES; s++) {
        const k = Math.floor((s / SPOKES) * SEG);
        const attr = spokes[s].geometry.getAttribute("position") as THREE.BufferAttribute;
        for (let i = 0; i < RINGS; i++) {
          const ra = rings[i].geometry.getAttribute("position") as THREE.BufferAttribute;
          attr.setXYZ(i, ra.getX(k), ra.getY(k), ra.getZ(k));
        }
        attr.needsUpdate = true;
      }
    };

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) renderer.render(scene, camera);
    });
    ro.observe(el);

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetEnergy = Math.min(1, targetEnergy + Math.hypot(nx - pointer.tx, ny - pointer.ty) * 1.6);
      pointer.tx = nx;
      pointer.ty = ny;
    };
    const onDown = () => {
      targetEnergy = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    let raf = 0;
    let visible = true;
    let last = performance.now();
    let time = 4;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;
      targetEnergy += (0.25 - targetEnergy) * Math.min(1, dt * 1.2);
      energy += (targetEnergy - energy) * Math.min(1, dt * 4);
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3);
      group.rotation.y = -0.62 + pointer.x * 0.22;
      group.rotation.x = 0.28 + pointer.y * 0.1 + Math.sin(time * 0.2) * 0.03;
      update(time);
      renderer.render(scene, camera);
    };

    update(time);
    group.rotation.set(0.28, -0.62, 0);
    renderer.render(scene, camera);
    onReady();

    const start = () => {
      if (reduced || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(el);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose?.();
      });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [reduced, onReady]);

  return <div ref={host} className="h-full w-full" data-testid="hero-webgl" />;
}
