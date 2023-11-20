"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import day from '../assets/earthDay.webp';
// import night from '../assets/earthNight.webp';
// import clouds from '../assets/earthClouds.webp';
import { getSunDirection } from "../utils/utils";

const Scene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let mouseX = 0,
    mouseY = 0;

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  function onPointerMove(event: any) {
    if (event.isPrimary === false) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }
  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      document.body.addEventListener("pointermove", onPointerMove);

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

      // EarthSphere.rotation.x = 90 * Math.PI / 180

      renderer.setSize(window.innerWidth, window.innerHeight);

      // add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      // load model

      // create 100 spheres
      const spheres = [];
      const radius = 1.5;
      const widthSegments = 16;
      const heightSegments = 16;
      const sphereGeometry = new THREE.SphereGeometry(
        radius,
        widthSegments,
        heightSegments
      );
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

      for (let i = 0; i < 1000; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        const x = 2000 * Math.random() - 1000;
        const y = 2000 * Math.random() - 1000;
        const z = 1800 * Math.random() - 1000;
        sphere.position.set(x, y, z);

        scene.add(sphere);
        spheres.push(sphere);
      }

      camera.position.z = 1000;

      const animate = () => {
        requestAnimationFrame(animate);


        const time = Date.now() * 0.00005;

        camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

        camera.lookAt( scene.position );

        const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;


        renderer.render(scene, camera);
      };

      animate();
    }
  }, []);

  return <canvas className="flex min-h-screen" ref={canvasRef} />;
};

export default Scene;
