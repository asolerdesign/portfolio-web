/* Liquid shader wallpaper — background mount for index.html.
   Creates a full-viewport canvas behind everything, follows the cursor,
   ripples on click. Same shader as wallpaper.html minus the HUD chrome. */
(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-gl';
  canvas.setAttribute('aria-hidden', 'true');
  // display is governed by CSS (#bg-gl) so the responsive hide needs no
  // !important to beat an inline style.
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '-1',
    pointerEvents: 'none',
  });
  document.body.prepend(canvas);

  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) { canvas.style.background = '#f4f4f4'; return; }

  const VERT = `
    attribute vec2 a;
    void main() { gl_Position = vec4(a, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    uniform vec2  uRes;
    uniform vec2  uMouse;
    uniform vec2  uVel;
    uniform float uTime;
    uniform float uRipple;
    uniform vec2  uRippleAt;

    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p){
      vec2 i=floor(p), f=fract(p);
      vec2 u=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),           hash(i+vec2(1,0)), u.x),
                 mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
    }
    float fbm(vec2 p){
      float v=0.0, a=0.5;
      for(int i=0;i<5;i++){ v += a*noise(p); p*=2.02; a*=0.5; }
      return v;
    }
    float ball(vec2 p, vec2 c, float r){
      float d = length(p - c);
      return (r*r) / (d*d + 0.0008);
    }

    void main(){
      vec2 p  = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
      vec2 m  = (uMouse        - 0.5*uRes) / uRes.y;
      vec2 rp = (uRippleAt     - 0.5*uRes) / uRes.y;
      float t = uTime;

      float speed = clamp(length(uVel)/800.0, 0.0, 1.0);
      float warpAmt = 0.18 + 0.20*speed;
      vec2 w1 = vec2(fbm(p*1.1 + 0.10*t), fbm(p*1.1 - 0.10*t + 5.2));
      vec2 w2 = vec2(fbm((p+w1)*1.7 + 0.20*t + 1.0), fbm((p+w1)*1.7 - 0.20*t + 3.3));
      vec2 q = p + warpAmt * (w1 - 0.5) + warpAmt*0.6 * (w2 - 0.5);

      float rMouse = 0.16 + 0.05*speed;
      vec2 trail = m - 0.08 * normalize(uVel + vec2(0.0001)) * speed;

      float f = 0.0;
      f += ball(q, m,     rMouse);
      f += ball(q, trail, rMouse * 0.55);
      f += ball(q, vec2(sin(t*0.27)*0.85,        cos(t*0.22)*0.45), 0.085);
      f += ball(q, vec2(cos(t*0.18 + 1.3)*0.65, sin(t*0.31 + 2.1)*0.55), 0.075);
      f += ball(q, vec2(sin(t*0.15 + 2.7)*0.95, cos(t*0.36 + 0.4)*0.40), 0.090);

      float rDist = length(q - rp);
      float ring  = exp(-30.0 * pow(rDist - (1.6 - 1.2*uRipple), 2.0)) * uRipple;
      f += ring * 1.2;

      float intensity = smoothstep(1.0, 3.4, f);
      float edge = smoothstep(0.85, 1.0, f) - smoothstep(1.0, 1.25, f);

      // Very soft grays — sits behind UI without competing
      vec3 cBg    = vec3(0.978, 0.978, 0.980);
      vec3 cTone  = vec3(0.960, 0.960, 0.965);
      vec3 cMid   = vec3(0.910, 0.910, 0.918);
      vec3 cDark  = vec3(0.830, 0.830, 0.840);

      float amb = fbm(p*0.65 + 0.07*t);
      vec3 col = mix(cBg, cTone, smoothstep(0.35, 0.85, amb));
      col = mix(col, cMid, intensity);
      col = mix(col, cDark, intensity*intensity*0.85);
      col = mix(col, vec3(0.985), edge * 0.45);

      float r2 = dot(p, p);
      col *= 1.0 - 0.06 * r2;

      float g = (hash(gl_FragCoord.xy + fract(uTime)*1000.0) - 0.5) * 0.014;
      col += g;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }
  const prog = gl.createProgram();
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) { canvas.style.background = '#f4f4f4'; return; }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); return; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const aLoc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(aLoc);
  gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

  const U = {
    uRes:      gl.getUniformLocation(prog, 'uRes'),
    uMouse:    gl.getUniformLocation(prog, 'uMouse'),
    uVel:      gl.getUniformLocation(prog, 'uVel'),
    uTime:     gl.getUniformLocation(prog, 'uTime'),
    uRipple:   gl.getUniformLocation(prog, 'uRipple'),
    uRippleAt: gl.getUniformLocation(prog, 'uRippleAt'),
  };

  const DPR_CAP = 1.5;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const w = Math.round(innerWidth  * dpr);
    const h = Math.round(innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }
  resize();
  addEventListener('resize', resize);

  let target = { x: innerWidth/2, y: innerHeight/2 };
  let pos    = { x: target.x, y: target.y };
  let vel    = { x: 0, y: 0 };
  let last   = { x: pos.x, y: pos.y };
  let lastMoveAt = performance.now();
  let pointerInside = false;
  let ripple = 0;
  let rippleAt = { x: pos.x, y: pos.y };

  function dpr() { return Math.min(window.devicePixelRatio || 1, DPR_CAP); }

  addEventListener('pointermove', (e) => {
    const k = dpr();
    target.x = e.clientX * k;
    target.y = (innerHeight - e.clientY) * k;
    lastMoveAt = performance.now();
    pointerInside = true;
  }, { passive: true });

  addEventListener('pointerdown', (e) => {
    const k = dpr();
    ripple = 1.0;
    rippleAt.x = e.clientX * k;
    rippleAt.y = (innerHeight - e.clientY) * k;
  });

  addEventListener('pointerleave', () => { pointerInside = false; });
  addEventListener('blur',         () => { pointerInside = false; });

  const startT = performance.now();
  let lastT = startT;

  function render(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;

    const k = 1 - Math.pow(0.001, dt);
    const idleFor = now - lastMoveAt;
    const idleLerpToCenter = pointerInside ? 0 : Math.min(1, idleFor / 5000);
    const tx = target.x + (canvas.width/2  - target.x) * 0.06 * idleLerpToCenter;
    const ty = target.y + (canvas.height/2 - target.y) * 0.06 * idleLerpToCenter;
    pos.x += (tx - pos.x) * k;
    pos.y += (ty - pos.y) * k;

    vel.x = (pos.x - last.x) / Math.max(dt, 1/240);
    vel.y = (pos.y - last.y) / Math.max(dt, 1/240);
    last.x = pos.x; last.y = pos.y;

    if (ripple > 0) ripple = Math.max(0, ripple - dt * 0.9);

    resize();

    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform2f(U.uMouse, pos.x, pos.y);
    gl.uniform2f(U.uVel, vel.x, vel.y);
    gl.uniform1f(U.uTime, (now - startT) / 1000);
    gl.uniform1f(U.uRipple, ripple);
    gl.uniform2f(U.uRippleAt, rippleAt.x, rippleAt.y);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();
