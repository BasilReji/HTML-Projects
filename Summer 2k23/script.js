
import * as THREE from "three";

import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { OrbitControls as e } from "three/addons/controls/OrbitControls.js";

!(function () {
  "use strict";
  function t() {
    (a.aspect = window.innerWidth / window.innerHeight),
      a.updateProjectionMatrix(),
      r.setSize(window.innerWidth, window.innerHeight);
  }
  function o() {
    requestAnimationFrame(o),
      d.update(),
      (function () {
        (S > p || S < c) && (w *= -1);
        E.rotation.set(0, 0, (S += w)), r.render(n, a);
      })();
  }
  let a,
    n,
    r,
    d,
    l,
    i,
    s = [];
  const h = 7;
  let E;
  const p = -Math.PI / 1.95,
    c = -Math.PI / 1.2;
  let w = 0.05,
    S = p;
  const u = window.innerWidth < window.innerHeight;
  !(function () {
    ((n = new THREE.Scene()).background = new THREE.Color("black")),
      (r = new THREE.WebGLRenderer({
        antialias: !0,
        canvas: canvas
      })).setPixelRatio(window.devicePixelRatio),
      r.setSize(window.innerWidth, window.innerHeight),
      (r.useLegacyLights = !1),
      (r.shadowMap.enabled = !0),
      (a = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.01,
        500
      )),
      u ? a.position.set(0, 4, 13) : a.position.set(0, 3, 12),
      a.lookAt(0, 0, 0);
    const p = new THREE.AmbientLight(16777215, 1.5);
    n.add(p);
    const c = new THREE.DirectionalLight(16777215, 1.5);
    (c.castShadow = !0), c.position.set(0, 3, 3), n.add(c);
    let w = new THREE.Mesh(
      new THREE.SphereGeometry(50, 4, 4),
      new THREE.MeshBasicMaterial({
        color: "lightcyan",
        side: THREE.BackSide
      })
    );
    n.add(w),
      (s = []),
      (i = new THREE.MeshLambertMaterial({
        color: "limegreen",
        side: THREE.DoubleSide
      })),
      (l = new THREE.SphereGeometry(1.5, 11, 5, 0, 6.3, 1.865, 3.14)).rotateX(
        Math.PI
      ),
      l.rotateZ(Math.PI / 10),
      l.translate(0.2, 2.85, 0);
    const S = new THREE.Mesh(l, i);
    (l = new THREE.SphereGeometry(0.35, 10, 10)).translate(0.4, 2.8, 0),
      s.push(l),
      (l = l.clone()).translate(-0.3, 0.25, 0.3),
      s.push(l),
      (l = BufferGeometryUtils.mergeBufferGeometries(s)),
      (i = i.clone()).color.set("yellow");
    const T = new THREE.Mesh(l, i);
    (T.castShadow = !0),
      S.add(T),
      (l = new THREE.CylinderGeometry(0.13, 0.3, 4.3, 8)).translate(0, 1.3, 0),
      s.push(l),
      (i = i.clone()).color.set("peru");
    const C = new THREE.Mesh(l, i);
    (C.castShadow = !0),
      S.add(C),
      S.position.set(-3, 0.15, 0),
      (S.name = "tree"),
      (S.castShadow = !0),
      n.add(S),
      (l = new THREE.SphereGeometry(0.6, 12, 10));
    let R = i.clone();
    R.color.set("white"),
      (R.map = (function () {
        let e = document.createElement("canvas");
        (e.width = 300), (e.height = 300);
        let t = e.getContext("2d");
        var o = t.createLinearGradient(0, 0, e.width, 0);
        o.addColorStop(0, "white"),
          o.addColorStop(0.5, "white"),
          o.addColorStop(0.5, "orange"),
          o.addColorStop(1, "orange"),
          (t.fillStyle = o),
          t.fillRect(0, 0, e.width, e.height);
        let a = new THREE.CanvasTexture(e);
        return (
          (a.wrapS = a.wrapT = THREE.RepeatWrapping), a.repeat.set(3, 1), a
        );
      })());
    const m = new THREE.Mesh(l, R);
    m.position.set(2.3, 0.4, 1.5),
      (m.name = "beachball"),
      (m.castShadow = !0),
      n.add(m),
      (s = []),
      (l = new THREE.CapsuleGeometry(0.5, 0.7, 4, 10)).translate(0, 0, 0),
      s.push(l),
      (l = new THREE.CapsuleGeometry(0.15, 0.8, 4, 10)).rotateZ(Math.PI / 3.5),
      l.translate(0.65, 0.2, 0),
      s.push(l),
      (l = new THREE.CapsuleGeometry(0.18, 0.5, 4, 10)).translate(0.2, -1, 0),
      s.push(l),
      (l = new THREE.CapsuleGeometry(0.18, 0.5, 4, 10)).translate(-0.2, -1, 0),
      s.push(l),
      (l = new THREE.SphereGeometry(0.5, 10, 10)).translate(0, 1.2, 0),
      s.push(l),
      (l = new THREE.CapsuleGeometry(0.15, 0.5, 4, 8)).translate(0.2, 1.8, 0),
      s.push(l),
      (l = new THREE.CapsuleGeometry(0.15, 0.5, 4, 8)).translate(-0.2, 1.8, 0),
      s.push(l),
      (l = BufferGeometryUtils.mergeBufferGeometries(s)),
      (i = i.clone()).color.set("bisque");
    const f = new THREE.Mesh(l, i);
    (l = new THREE.SphereGeometry(0.15, 5, 5)).translate(0, -0.3, -0.5),
      s.push(l),
      (i = i.clone()).color.set("white");
    const H = new THREE.Mesh(l, i);
    (H.castShadow = !0),
      f.add(H),
      (l = new THREE.CylinderGeometry(0, 4.5, 0.2, 30)).translate(0, -1.4, 0),
      s.push(l),
      (i = i.clone()).color.set("lightcyan");
    const g = new THREE.Mesh(l, i);
    (g.receiveShadow = !0),
      f.add(g),
      (l = new THREE.SphereGeometry(0.07, 10, 10)).translate(0.18, 1.3, 0.4),
      (i = i.clone()).color.set("black");
    const y = new THREE.Mesh(l, i);
    f.add(y), (l = l.clone()).translate(-0.36, 0, 0);
    const M = new THREE.Mesh(l, i);
    f.add(M);
    const v = new THREE.Shape();
    v.moveTo(25, 25),
      v.bezierCurveTo(25, 25, 20, 0, 0, 0),
      v.bezierCurveTo(-30, 0, -30, 35, -30, 35),
      v.bezierCurveTo(-30, 55, -10, 77, 25, 95),
      v.bezierCurveTo(60, 77, 80, 55, 80, 35),
      v.bezierCurveTo(80, 35, 80, 0, 50, 0),
      v.bezierCurveTo(35, 0, 25, 25, 25, 25),
      (l = new THREE.ExtrudeGeometry(v, {
        depth: 1,
        bevelEnabled: !0,
        bevelSegments: 5,
        steps: 1,
        bevelSize: 10,
        bevelThickness: 10
      })),
      (i = i.clone()).color.set("red");
    const b = new THREE.Mesh(l, i);
    b.scale.set(0.003, 0.003, 0.003),
      b.position.set(0.07, 0.35, 0.5),
      b.rotateZ(Math.PI),
      f.add(b),
      (l = new THREE.TorusGeometry(0.75, 0.25, 12, 15)).rotateX(Math.PI / 2),
      l.rotateZ(Math.PI / 8);
    let G = i.clone();
    G.color.set("white"),
      (G.map = (function () {
        let e = document.createElement("canvas");
        (e.width = 300), (e.height = 300);
        let t = e.getContext("2d");
        var o = t.createLinearGradient(0, 0, 0, e.height);
        return (
          o.addColorStop(0, "deeppink"),
          o.addColorStop(0.5, "deeppink"),
          o.addColorStop(0.5, "springgreen"),
          o.addColorStop(1, "springgreen"),
          (t.fillStyle = o),
          t.fillRect(0, 0, e.width, e.height),
          new THREE.CanvasTexture(e)
        );
      })());
    const P = new THREE.Mesh(l, G);
    P.position.set(0, -0.4, 0),
      (P.castShadow = !0),
      f.add(P),
      (l = new THREE.CapsuleGeometry(0.15, 0.8, 4, 10)).translate(0, -0.4, 0),
      (l.verticesNeedUpdate = !0),
      (i = i.clone()).color.set("bisque"),
      (E = new THREE.Mesh(l, i)).position.set(-0.45, 0.5, 0),
      E.rotation.set(0, 0, -Math.PI / 1.2),
      (E.castShadow = !0),
      f.add(E),
      f.position.set(0, 1.3, 0),
      (f.name = "bunny"),
      (f.castShadow = !0),
      n.add(f),
      (s = []),
      (l = new THREE.SphereGeometry(
        1.8,
        6,
        8,
        0,
        2 * Math.PI,
        0,
        (Math.PI / 2) * 0.65
      )).translate(0, 0, 0),
      s.push(l);
    let x = i.clone();
    x.color.set("white"),
      (x.map = (function () {
        let e = document.createElement("canvas");
        (e.width = 300), (e.height = 300);
        let t = e.getContext("2d");
        var o = t.createLinearGradient(0, 0, e.width, 0);
        o.addColorStop(0, "white"),
          o.addColorStop(0.5, "white"),
          o.addColorStop(0.5, "blue"),
          o.addColorStop(1, "blue"),
          (t.fillStyle = o),
          t.fillRect(0, 0, e.width, e.height);
        let a = new THREE.CanvasTexture(e);
        return (
          (a.wrapS = a.wrapT = THREE.RepeatWrapping), a.repeat.set(3, 1), a
        );
      })()),
      (x.side = THREE.DoubleSide);
    const I = new THREE.Mesh(l, x);
    (l = new THREE.CylinderGeometry(0.04, 0.04, 3.5, 6)),
      s.push(l),
      (i = i.clone()).color.set("silver");
    const L = new THREE.Mesh(l, i);
    (L.castShadow = !0),
      I.add(L),
      I.position.set(1.8, 2, -1),
      I.rotation.set(0, 0, -Math.PI / 18),
      I.scale.set(1.7, 1.7, 1.7),
      (I.name = "umbrella"),
      (I.castShadow = !0),
      n.add(I),
      (l = new THREE.CircleGeometry(10, 50)).rotateX(-Math.PI / 2),
      (i = new THREE.MeshLambertMaterial({
        color: "aqua"
      }));
    const k = new THREE.Mesh(l, i);
    k.position.set(0, -0.2, 0),
      (k.name = "floor"),
      (k.receiveShadow = !0),
      n.add(k),
      (l = new THREE.TorusGeometry(7, 1, 15, 20, Math.PI)),
      (i = new THREE.MeshBasicMaterial({
        map: (function () {
          let e = document.createElement("canvas");
          (e.width = 300), (e.height = 300);
          let t = e.getContext("2d");
          var o = t.createLinearGradient(0, e.height, 0, 0);
          return (
            o.addColorStop(0, "#ff3333"),
            o.addColorStop(0.17, "#ff3333"),
            o.addColorStop(0.17, "orange"),
            o.addColorStop(0.23, "orange"),
            o.addColorStop(0.23, "yellow"),
            o.addColorStop(0.27, "yellow"),
            o.addColorStop(0.27, "#33ff33"),
            o.addColorStop(0.31, "#33ff33"),
            o.addColorStop(0.31, "#3399ff"),
            o.addColorStop(0.35, "#3399ff"),
            o.addColorStop(0.35, "#3333ff"),
            o.addColorStop(0.4, "#3333ff"),
            o.addColorStop(0.4, "violet"),
            o.addColorStop(0.5, "violet"),
            o.addColorStop(0.5, "violet"),
            o.addColorStop(0.6, "violet"),
            o.addColorStop(0.6, "#3333ff"),
            o.addColorStop(0.63, "#3333ff"),
            o.addColorStop(0.63, "#3399ff"),
            o.addColorStop(0.66, "#3399ff"),
            o.addColorStop(0.66, "#33ff33"),
            o.addColorStop(0.7, "#33ff33"),
            o.addColorStop(0.7, "yellow"),
            o.addColorStop(0.76, "yellow"),
            o.addColorStop(0.76, "orange"),
            o.addColorStop(0.82, "orange"),
            o.addColorStop(0.82, "#ff3333"),
            o.addColorStop(1, "#ff3333"),
            (t.fillStyle = o),
            t.fillRect(0, 0, e.width, e.height),
            new THREE.CanvasTexture(e)
          );
        })(),
        alphaMap: (function () {
          let e = document.createElement("canvas");
          (e.width = 300), (e.height = 300);
          let t = e.getContext("2d");
          var o = t.createLinearGradient(0, 0, e.width, 0);
          return (
            o.addColorStop(0, "black"),
            o.addColorStop(0.33, "white"),
            o.addColorStop(0.5, "white"),
            o.addColorStop(0.66, "white"),
            o.addColorStop(1, "black"),
            (t.fillStyle = o),
            t.fillRect(0, 0, e.width, e.height),
            new THREE.CanvasTexture(e)
          );
        })(),
        transparent: !0,
        opacity: 0.6
      }));
    let z = new THREE.Mesh(l, i);
    z.position.set(0, 0, -8),
      n.add(z),
      ((d = new e(a, r.domElement)).autoRotate = 1),
      (d.autoRotateSpeed = 1),
      (d.enableDamping = !0),
      (d.enablePan = !1),
      (d.minDistance = 2),
      (d.maxDistance = 20),
      (d.minPolarAngle = 0),
      (d.maxPolarAngle = Math.PI / 2),
      d.target.set(0, h / 4, 0),
      d.update(),
      o(),
      window.addEventListener("resize", t);
  })();
})();