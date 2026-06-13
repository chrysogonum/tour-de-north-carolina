/* =====================================================================
   Le Tour de North Carolina — Bar Exam Edition
   Ride engine + game logic.  Depends on questions.js (global STAGES).
   ===================================================================== */
"use strict";

/* ---------- terrain tuning ---------- */
const TERRAIN = {
  flat:    { grad: 0,  rise:  2, base: 100, spdTarget: 42, climbF: 0.00, label: "Flat — soft pedal", cls: "flat" },
  rolling: { grad: 4,  rise: 13, base: 150, spdTarget: 33, climbF: 0.30, label: "Rolling",            cls: "rolling" },
  sprint:  { grad:-2,  rise: -4, base: 150, spdTarget: 54, climbF: 0.00, label: "Sprint",             cls: "sprint" },
  climb:   { grad: 8,  rise: 30, base: 250, spdTarget: 20, climbF: 0.72, label: "Cat. climb — KOM",   cls: "climb" },
  hc:      { grad:12,  rise: 48, base: 400, spdTarget: 13, climbF: 1.00, label: "Hors Catégorie",     cls: "hc" }
};
const SPRINT_TIME = 16;      // seconds shown for sprint green-points window
const SOFT_TIME   = 30;      // soft timer on other questions (speed bonus only)

/* ---------- game state ---------- */
const G = {
  stage: 0, q: 0,
  yellow: 0, green: 0, polka: 0,
  // per-stage records: {correct, total, yellow, green, polka, grid:[bool], sprintHits, sprintTot, komHits, komTot}
  stageRec: [],
  answered: false,
  startedStage: false
};

/* ---------- world (render) state ---------- */
const W = {
  scroll: 0, speed: 30, dispSpeed: 30,
  watts: 120, cad: 84, hr: 128,
  climbF: 0, climbFTarget: 0,
  grad: 0, gradTarget: 0,
  pedal: 0, surge: 0,
  jersey: "#eef2f7",      // rider jersey colour (turns yellow when leading)
  worlds: false,          // stage 5: rainbow world-champion kit
  t: 0
};

/* ---------- element refs ---------- */
const $ = id => document.getElementById(id);
const screens = {
  start: $("screen-start"), ride: $("screen-ride"),
  result: $("screen-result"), final: $("screen-final")
};
function show(name){ for(const k in screens) screens[k].classList.toggle("active", k===name); }

let canvas, ctx, pcanvas, pctx, DPR = 1;

/* ===================================================================
   START SCREEN
   =================================================================== */
function buildPreview(){
  const wrap = $("stagesPreview");
  wrap.innerHTML = "";
  STAGES.forEach((s,i)=>{
    const el = document.createElement("div");
    el.className = "spv";
    el.setAttribute("role", "button");
    el.tabIndex = 0;
    el.setAttribute("aria-label", `Stage ${i+1}, ${s.name}, ${s.questions.length} questions. Click to start.`);
    if(s.id === 5) el.classList.add("worlds");
    const worldTag = s.id === 5 ? `<div class="worldtag">🌈 Rainbow Stage · The Exam Itself</div>` : "";
    el.innerHTML =
      `<div class="n"><span>Stage ${i+1}</span><span class="qct">${s.questions.length} questions</span></div>
       <div class="t">${s.name}</div>
       <div class="s">${s.subject}</div>
       ${worldTag}
       <canvas class="prof" width="320" height="60"></canvas>
       <div class="go">Roll out ▸</div>`;
    const launch = () => { resetTotals(); startStage(i); };
    el.addEventListener("click", launch);
    el.addEventListener("keydown", e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); launch(); } });
    wrap.appendChild(el);
    drawMiniProfile(el.querySelector("canvas"), s);
  });
}
function stageElevations(stage){
  let e = 40, pts = [40];
  stage.questions.forEach(q=>{ e = Math.max(8, e + TERRAIN[q.terrain].rise); pts.push(e); });
  return pts;
}
function drawMiniProfile(cv, stage){
  const c = cv.getContext("2d"), w = cv.width, h = cv.height;
  const pts = stageElevations(stage), max = Math.max(...pts), min = Math.min(...pts);
  const span = Math.max(1, max-min);
  c.clearRect(0,0,w,h);
  c.beginPath(); c.moveTo(0,h);
  pts.forEach((p,i)=>{ const x=i/(pts.length-1)*w, y=h-6-((p-min)/span)*(h-12); c.lineTo(x,y); });
  c.lineTo(w,h); c.closePath();
  const g = c.createLinearGradient(0,0,0,h); g.addColorStop(0,"#5fd0ff66"); g.addColorStop(1,"#0b7cc922");
  c.fillStyle = g; c.fill();
  c.beginPath();
  pts.forEach((p,i)=>{ const x=i/(pts.length-1)*w, y=h-6-((p-min)/span)*(h-12); i?c.lineTo(x,y):c.moveTo(x,y); });
  c.strokeStyle = "#9fe0ff"; c.lineWidth = 1.5; c.stroke();
}

/* ===================================================================
   CANVAS SIZING
   =================================================================== */
function resize(){
  DPR = Math.min(2, window.devicePixelRatio || 1);
  canvas = $("world"); ctx = canvas.getContext("2d");
  canvas.width  = canvas.clientWidth  * DPR;
  canvas.height = canvas.clientHeight * DPR;
  pcanvas = $("profcanvas"); pctx = pcanvas.getContext("2d");
  pcanvas.width  = pcanvas.clientWidth  * DPR;
  pcanvas.height = pcanvas.clientHeight * DPR;
}
window.addEventListener("resize", resize);

/* ===================================================================
   COLOUR HELPERS
   =================================================================== */
function lerp(a,b,t){ return a+(b-a)*t; }
function mix(c1,c2,t){
  return c1.map((v,i)=>Math.round(lerp(v,c2[i],t)));
}
function rgb(a){ return `rgb(${a[0]},${a[1]},${a[2]})`; }

/* ===================================================================
   RENDER WORLD  (the Zwift-style ride)
   =================================================================== */
function drawWorld(dt){
  const w = canvas.width, h = canvas.height, s = DPR;
  const cf = W.climbF;                      // 0 valley .. 1 alpine
  // ----- sky -----
  const skyTop = mix([122,196,255],[40,86,150], cf);
  const skyBot = mix([214,238,255],[150,196,236], cf);
  const sg = ctx.createLinearGradient(0,0,0,h*0.78);
  sg.addColorStop(0, rgb(skyTop)); sg.addColorStop(1, rgb(skyBot));
  ctx.fillStyle = sg; ctx.fillRect(0,0,w,h);

  // sun glow
  ctx.save();
  const sunY = lerp(h*0.22, h*0.12, cf);
  const rg = ctx.createRadialGradient(w*0.74, sunY, 0, w*0.74, sunY, h*0.5);
  rg.addColorStop(0, "rgba(255,247,214,0.55)"); rg.addColorStop(1,"rgba(255,247,214,0)");
  ctx.fillStyle = rg; ctx.fillRect(0,0,w,h);
  ctx.restore();

  const horizon = h*0.70;

  // ----- far mountains (parallax slow) -----
  drawRidge(W.scroll*0.06, horizon, h*0.30*(0.6+0.7*cf), mix([150,176,205],[92,110,150],cf), 0.013, 1.7);
  // ----- mid hills -----
  drawRidge(W.scroll*0.13, horizon+8*s, h*0.18*(0.7+0.5*cf), mix([86,150,96],[70,108,96],cf), 0.02, 1.1);
  // ----- near hills -----
  drawRidge(W.scroll*0.26, horizon+22*s, h*0.12, mix([54,116,66],[60,96,80],cf), 0.03, 0.7);

  // ----- ground -----
  const grTop = mix([72,138,70],[96,120,96],cf), grBot = mix([40,92,46],[64,86,72],cf);
  const gg = ctx.createLinearGradient(0,horizon,0,h);
  gg.addColorStop(0, rgb(grTop)); gg.addColorStop(1, rgb(grBot));
  ctx.fillStyle = gg; ctx.fillRect(0,horizon,w,h-horizon);

  // ----- road (perspective, tilts up on climbs) -----
  const tilt = (W.grad/100) * 0.9;          // visual slope
  const roadW0 = w*0.62, roadW1 = w*0.10;
  const baseY = h*0.86;
  const vanY  = horizon + 6*s;
  const vanX  = w*0.5 + tilt*w*0.5;          // vanishing point shifts up-right with gradient
  ctx.beginPath();
  ctx.moveTo(w*0.5-roadW0/2, baseY);
  ctx.lineTo(vanX-roadW1/2, vanY);
  ctx.lineTo(vanX+roadW1/2, vanY);
  ctx.lineTo(w*0.5+roadW0/2, baseY);
  ctx.closePath();
  ctx.fillStyle = "#3a3f49"; ctx.fill();
  // road edges
  ctx.lineWidth = 3*s; ctx.strokeStyle = "#e9edf2"; ctx.stroke();
  // centre dashes scrolling
  ctx.save(); ctx.clip();
  ctx.strokeStyle = "#f2c200"; ctx.lineWidth = 4*s; ctx.setLineDash([26*s, 30*s]);
  ctx.lineDashOffset = -(W.scroll*1.4 % 1000);
  ctx.beginPath(); ctx.moveTo(w*0.5, baseY); ctx.lineTo(vanX, vanY); ctx.stroke();
  ctx.restore();

  // ----- roadside furniture (poles + trees + banners) -----
  drawRoadside(horizon, baseY, vanX, vanY);

  // ----- the rider -----
  const riderX = w*0.36, riderY = baseY - 6*s;
  const heroJersey = W.worlds ? "#f4f6fb" : W.jersey;
  drawCyclist(riderX, riderY, h*0.00052*s*100/ DPR * DPR, W.pedal, tilt*1.4, heroJersey, true, W.worlds);

  // a chasing rival (for flavour) just behind on flats/rolling
  if(W.climbF < 0.5){
    drawCyclist(riderX - w*0.16, baseY - 2*s, h*0.00046*s*100/DPR*DPR, W.pedal+1.7, tilt*1.4, "#cf3b3b", false, false);
  }
}

function drawRidge(offset, baseY, amp, color, freq, jag){
  const w = canvas.width, h = canvas.height;
  ctx.beginPath(); ctx.moveTo(0, baseY);
  for(let x=0; x<=w; x+=6*DPR){
    const t = (x+offset);
    const y = baseY - amp*(0.5
        + 0.5*Math.sin(t*freq*0.012)
        + 0.25*Math.sin(t*freq*0.031*jag)
        + 0.12*Math.sin(t*freq*0.07));
    ctx.lineTo(x,y);
  }
  ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath();
  ctx.fillStyle = rgb(color); ctx.fill();
  // snow caps on alpine
  if(color[0]>80 && W.climbF>0.5){
    ctx.save(); ctx.globalAlpha = (W.climbF-0.5)*1.2;
    ctx.fillStyle = "#eef6ff";
    ctx.beginPath(); ctx.moveTo(0,baseY);
    for(let x=0;x<=w;x+=6*DPR){
      const t=(x+offset);
      const y=baseY-amp*(0.5+0.5*Math.sin(t*freq*0.012)+0.25*Math.sin(t*freq*0.031*jag)+0.12*Math.sin(t*freq*0.07));
      const cap = baseY - amp*0.62;
      ctx.lineTo(x, Math.min(y, cap) === y ? y : y);
    }
    ctx.restore();
  }
}

function drawRoadside(horizon, baseY, vanX, vanY){
  const w = canvas.width, spacing = 220*DPR;
  const phase = (W.scroll*1.1) % spacing;
  for(let i=0;i<7;i++){
    // depth 0(near)..1(far)
    const along = ((i*spacing - phase) % (spacing*7) + spacing*7) % (spacing*7);
    const depth = 1 - along/(spacing*7);    // near big
    const persp = depth;
    const side = (i%2===0)?-1:1;
    const baseRoadHalf = lerp(w*0.05, w*0.32, persp);
    const x = lerp(vanX, w*0.5, persp) + side*baseRoadHalf;
    const y = lerp(vanY, baseY, persp);
    const sc = lerp(0.18, 1, persp);
    if(i%2===0) drawTree(x, y, sc); else drawKmPole(x, y, sc);
  }
}
function drawTree(x,y,sc){
  ctx.save(); ctx.translate(x,y);
  ctx.fillStyle = "#5a3a22"; ctx.fillRect(-3*sc*DPR, -22*sc*DPR, 6*sc*DPR, 22*sc*DPR);
  ctx.fillStyle = mix([46,120,54],[60,96,76],W.climbF);
  for(let k=0;k<3;k++){
    ctx.beginPath();
    const yy = -18*sc*DPR - k*16*sc*DPR, ww=(26-k*5)*sc*DPR;
    ctx.moveTo(-ww, yy); ctx.lineTo(ww, yy); ctx.lineTo(0, yy-30*sc*DPR); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}
function drawKmPole(x,y,sc){
  ctx.save(); ctx.translate(x,y);
  ctx.fillStyle="#dfe6ee"; ctx.fillRect(-2*sc*DPR,-44*sc*DPR,4*sc*DPR,44*sc*DPR);
  ctx.fillStyle="#d11"; ctx.fillRect(-12*sc*DPR,-50*sc*DPR,24*sc*DPR,12*sc*DPR);
  ctx.restore();
}

/* the cyclist — stylised, pedalling, leans on climbs */
function drawCyclist(cx, cy, scale, phase, tilt, jersey, hero, worlds){
  const u = DPR * (hero?1.0:0.86);          // unit
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-tilt);
  // shadow
  ctx.save(); ctx.globalAlpha=0.22; ctx.fillStyle="#000";
  ctx.beginPath(); ctx.ellipse(0, 2*u, 40*u, 7*u, 0, 0, 7); ctx.fill(); ctx.restore();

  const R = 17*u;                            // wheel radius
  const wb = 33*u;                           // half wheelbase
  const bbY = -R;                            // bottom bracket height (~ wheel centre)
  const bbX = -2*u;
  const wheels = [[-wb, -R],[wb, -R]];

  // wheels
  wheels.forEach(([wx,wy])=>{
    ctx.save(); ctx.translate(wx,wy);
    ctx.beginPath(); ctx.arc(0,0,R,0,7); ctx.lineWidth=2.4*u; ctx.strokeStyle="#1b1f27"; ctx.stroke();
    ctx.rotate(phase*1.4);
    ctx.strokeStyle="#9aa3b2"; ctx.lineWidth=1*u;
    for(let k=0;k<6;k++){ ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(k*1.047)*R, Math.sin(k*1.047)*R); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(0,0,2.4*u,0,7); ctx.fillStyle="#1b1f27"; ctx.fill();
    ctx.restore();
  });

  const seatX = bbX-9*u, seatY = bbY-20*u;   // saddle
  const barX  = wb-9*u,  barY  = bbY-17*u;   // handlebar
  // frame
  ctx.strokeStyle="#11151c"; ctx.lineWidth=3*u; ctx.lineJoin="round";
  ctx.beginPath();
  ctx.moveTo(-wb,-R); ctx.lineTo(bbX,bbY); ctx.lineTo(seatX,seatY); ctx.closePath();     // rear triangle
  ctx.moveTo(bbX,bbY); ctx.lineTo(barX,barY); ctx.lineTo(seatX,seatY);                   // down/top tube
  ctx.moveTo(barX,barY); ctx.lineTo(wb,-R);                                              // fork
  ctx.stroke();
  // handlebar
  ctx.beginPath(); ctx.moveTo(barX,barY); ctx.lineTo(barX+7*u,barY-1*u); ctx.lineWidth=2.6*u; ctx.stroke();

  // cranks + pedals
  const crank = 9*u;
  const p1 = [bbX+Math.cos(phase)*crank, bbY+Math.sin(phase)*crank];
  const p2 = [bbX+Math.cos(phase+Math.PI)*crank, bbY+Math.sin(phase+Math.PI)*crank];
  ctx.strokeStyle="#2a2f39"; ctx.lineWidth=2.2*u;
  ctx.beginPath(); ctx.moveTo(bbX,bbY); ctx.lineTo(p1[0],p1[1]); ctx.moveTo(bbX,bbY); ctx.lineTo(p2[0],p2[1]); ctx.stroke();

  // hips/shoulders
  const hipX=seatX+2*u, hipY=seatY-2*u;
  const shX = lerp(hipX, barX, 0.62), shY = barY-22*u;
  // legs (hip -> knee -> pedal) with simple knee bend
  function leg(pedal, fwd){
    const kneeX = lerp(hipX, pedal[0], 0.5) + fwd*7*u;
    const kneeY = lerp(hipY, pedal[1], 0.5) - 9*u;
    ctx.beginPath(); ctx.moveTo(hipX,hipY); ctx.lineTo(kneeX,kneeY); ctx.lineTo(pedal[0],pedal[1]);
    ctx.lineWidth=5*u; ctx.strokeStyle="#1d2531"; ctx.stroke();
  }
  leg(p2, -1); // far leg first
  // torso
  ctx.beginPath(); ctx.moveTo(hipX,hipY); ctx.lineTo(shX,shY);
  ctx.lineWidth=9*u; ctx.strokeStyle=jersey; ctx.lineCap="round"; ctx.stroke(); ctx.lineCap="butt";
  // rainbow world-champion bands (stage 5)
  if(worlds){
    const bands=["#1c6cff","#e2231a","#111111","#ffd000","#00a651"];
    const dx=shX-hipX, dy=shY-hipY, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L;
    ctx.lineCap="round";
    bands.forEach((col,bi)=>{
      const tt=0.18+bi*0.16, px=hipX+dx*tt, py=hipY+dy*tt;
      ctx.beginPath();
      ctx.moveTo(px-nx*4.2*u, py-ny*4.2*u);
      ctx.lineTo(px+nx*4.2*u, py+ny*4.2*u);
      ctx.lineWidth=2.3*u; ctx.strokeStyle=col; ctx.stroke();
    });
    ctx.lineCap="butt";
  }
  // arm
  ctx.beginPath(); ctx.moveTo(shX,shY); ctx.lineTo(barX+6*u,barY-1*u); ctx.lineWidth=3.6*u; ctx.strokeStyle="#10151d"; ctx.stroke();
  leg(p1, 1);  // near leg over torso
  // head + helmet
  const hX=shX+10*u, hY=shY-3*u;
  ctx.beginPath(); ctx.arc(hX,hY,6*u,0,7); ctx.fillStyle="#e8c39a"; ctx.fill();
  ctx.beginPath(); ctx.arc(hX,hY-2*u,6.6*u,Math.PI*1.05,Math.PI*2.05); ctx.fillStyle="#15181f"; ctx.fill();
  ctx.beginPath(); ctx.arc(hX+5.4*u,hY,2.2*u,0,7); ctx.fillStyle="#22262e"; ctx.fill(); // glasses hint
  ctx.restore();
}

/* ===================================================================
   ELEVATION PROFILE STRIP (bottom)
   =================================================================== */
function drawProfStrip(){
  if(!pctx) return;
  const w = pcanvas.width, h = pcanvas.height;
  pctx.clearRect(0,0,w,h);
  const stage = STAGES[G.stage];
  const pts = stageElevations(stage), max=Math.max(...pts), min=Math.min(...pts), span=Math.max(1,max-min);
  const px = i => i/(pts.length-1)*w;
  const py = p => h-8*DPR-((p-min)/span)*(h-20*DPR);

  // segment colour bands by terrain under the curve
  stage.questions.forEach((q,i)=>{
    const x0=px(i), x1=px(i+1);
    pctx.fillStyle = {
      flat:"#2c405f88", rolling:"#3a5a3f88", sprint:"#00b84d55", climb:"#e2231a33", hc:"#e2231a55"
    }[q.terrain];
    pctx.fillRect(x0, py(Math.max(pts[i],pts[i+1])), x1-x0, h);
  });
  // area
  pctx.beginPath(); pctx.moveTo(0,h);
  pts.forEach((p,i)=>pctx.lineTo(px(i),py(p)));
  pctx.lineTo(w,h); pctx.closePath();
  const g=pctx.createLinearGradient(0,0,0,h); g.addColorStop(0,"#bfe6ff55"); g.addColorStop(1,"#0b1a2e00");
  pctx.fillStyle=g; pctx.fill();
  // line
  pctx.beginPath(); pts.forEach((p,i)=>i?pctx.lineTo(px(i),py(p)):pctx.moveTo(px(i),py(p)));
  pctx.strokeStyle="#cfeeff"; pctx.lineWidth=2*DPR; pctx.stroke();

  // sprint & KOM markers
  stage.questions.forEach((q,i)=>{
    if(q.terrain==="sprint"){ banner(px(i+1), py(pts[i+1]), "#00b84d", "S"); }
    if(q.terrain==="climb"||q.terrain==="hc"){ banner(px(i+1), py(pts[i+1]), "#e2231a", q.terrain==="hc"?"HC":"KOM"); }
  });
  function banner(x,y,col,txt){
    pctx.fillStyle=col; pctx.fillRect(x-1*DPR, y, 2*DPR, h-y);
    pctx.fillStyle=col; pctx.beginPath(); pctx.arc(x,y,3*DPR,0,7); pctx.fill();
    pctx.fillStyle="#fff"; pctx.font=`${9*DPR}px Barlow Condensed, sans-serif`; pctx.textAlign="center";
    pctx.fillText(txt, x, y-5*DPR);
  }

  // current position marker (between answered questions)
  const prog = Math.min(G.q, pts.length-1);
  const mx = px(prog), my = py(pts[prog]);
  pctx.beginPath(); pctx.arc(mx,my,5.5*DPR,0,7); pctx.fillStyle="#ffd000"; pctx.fill();
  pctx.strokeStyle="#000"; pctx.lineWidth=1.5*DPR; pctx.stroke();
  // label
  pctx.fillStyle="#cfe0ff"; pctx.font=`${10*DPR}px Barlow Condensed, sans-serif`; pctx.textAlign="left";
  pctx.fillText(`${stage.name.toUpperCase()}  ·  Q${Math.min(G.q+1,pts.length-1)}/${stage.questions.length}`, 8*DPR, 14*DPR);
}

/* ===================================================================
   MAIN LOOP
   =================================================================== */
let lastT = 0;
function loop(ts){
  const dt = Math.min(0.05, (ts-lastT)/1000 || 0); lastT = ts;
  if(screens.ride.classList.contains("active")){
    // physics-ish easing
    W.climbF += (W.climbFTarget - W.climbF) * Math.min(1, dt*3);
    W.grad   += (W.gradTarget   - W.grad)   * Math.min(1, dt*3);
    // surge decays
    W.surge  = Math.max(0, W.surge - dt*1.4);
    const tgt = TERRAIN[currentTerrain()].spdTarget + W.surge*30;
    W.speed += (tgt - W.speed) * Math.min(1, dt*1.5);
    W.dispSpeed += (W.speed - W.dispSpeed)*Math.min(1,dt*4);
    W.scroll += W.speed * dt * 9;
    // cadence & pedal
    W.cad = lerp(W.cad, 60 + W.speed*0.7 + W.surge*22, Math.min(1,dt*3));
    W.pedal += (W.cad/60) * dt * 2*Math.PI;
    // watts & hr follow effort (climb + surge)
    const wattTgt = 120 + W.climbF*150 + W.surge*180 + (W.speed>45?60:0);
    W.watts = lerp(W.watts, wattTgt, Math.min(1,dt*2.5));
    const hrTgt = 124 + W.climbF*42 + W.surge*20;
    W.hr = lerp(W.hr, hrTgt, Math.min(1,dt*1.2));

    drawWorld(dt);
    drawProfStrip();
    updateHUD();
    tickTimer(dt);
  }
  requestAnimationFrame(loop);
}
function currentTerrain(){
  const st = STAGES[G.stage]; if(!st) return "flat";
  const q = st.questions[Math.min(G.q, st.questions.length-1)];
  return q ? q.terrain : "flat";
}
function updateHUD(){
  $("mPower").textContent = Math.round(W.watts);
  $("mCad").textContent   = Math.round(W.cad);
  $("mSpd").textContent   = Math.round(W.dispSpeed);
  $("mHr").textContent    = Math.round(W.hr);
  $("jYellow").textContent= G.yellow;
  $("jGreen").textContent = G.green;
  $("jPolka").textContent = G.polka;
  const gp = $("gradPill");
  if(W.gradTarget >= 3){ gp.classList.add("show"); $("gradVal").textContent = Math.round(W.grad)+"%"; }
  else gp.classList.remove("show");
}

/* ===================================================================
   QUESTION FLOW
   =================================================================== */
let timer = { active:false, t:0, max:SOFT_TIME, sprint:false, answeredFast:false };

function startStage(i){
  G.stage = i; G.q = 0;
  if(!G.stageRec[i]) G.stageRec[i] = {correct:0,total:0,yellow:0,green:0,polka:0,grid:[],sprintHits:0,sprintTot:0,komHits:0,komTot:0};
  $("stageLab").textContent = `Stage ${i+1} / ${STAGES.length}`;
  $("stageNm").textContent  = STAGES[i].name;
  $("progBar").style.width = "0%";
  const worlds = STAGES[i].id === 5;
  W.worlds = worlds;
  W.jersey = "#eef2f7";
  screens.ride.classList.toggle("worlds", worlds);
  show("ride"); resize();
  loadQuestion();
  if(worlds) flashToast("🌈 RAINBOW STAGE · THE WORLD CHAMPIONSHIP", "#ffe04d");
}
function loadQuestion(){
  const st = STAGES[G.stage];
  if(G.q >= st.questions.length){ return endStage(); }
  const q = st.questions[G.q];
  const tt = TERRAIN[q.terrain];
  W.climbFTarget = tt.climbF; W.gradTarget = tt.grad;
  W.surge = Math.max(W.surge, 0.15);

  // badge
  const badge = $("tbadge");
  badge.className = "tbadge " + tt.cls;
  badge.textContent = (q.terrain==="sprint" ? "🟢 SPRINT" :
                       q.terrain==="climb" ? "⛰ CATEGORY CLIMB · KOM" :
                       q.terrain==="hc" ? "☠ HORS CATÉGORIE · SUMMIT" :
                       q.terrain==="rolling" ? "ROLLING" : "FLAT · SOFT PEDAL");

  $("qtext").textContent = q.q;

  // shuffle options, remember correct text
  const opts = shuffle(q.options.slice());
  const optsWrap = $("opts"); optsWrap.innerHTML = "";
  opts.forEach((text,idx)=>{
    const b = document.createElement("button");
    b.className = "opt"; b.type="button";
    b.innerHTML = `<span class="key">${String.fromCharCode(65+idx)}</span><span>${text}</span>`;
    b.addEventListener("click", ()=>answer(b, text, q));
    optsWrap.appendChild(b);
  });

  // explain reset
  $("explain").classList.remove("show");
  $("qcard").classList.add("show");
  G.answered = false;

  // timer
  timer.sprint = (q.terrain==="sprint");
  timer.max = timer.sprint ? SPRINT_TIME : SOFT_TIME;
  timer.t = timer.max; timer.active = true; timer.answeredFast=false;
  $("qtimer").classList.remove("lo");
  $("qtimerbar").style.width = "100%";
}
function tickTimer(dt){
  if(!timer.active) return;
  timer.t = Math.max(0, timer.t - dt);
  const r = timer.t/timer.max;
  $("qtimerbar").style.width = (r*100)+"%";
  $("qtimer").classList.toggle("lo", r < 0.34);
}

function answer(btn, text, q){
  if(G.answered) return;
  G.answered = true; timer.active = false;
  const rec = G.stageRec[G.stage];
  const tt = TERRAIN[q.terrain];
  const correct = (text === q.correct);
  const fast = timer.t > timer.max*0.45;     // answered with time to spare

  // disable & mark options
  [...$("opts").children].forEach(b=>{
    b.disabled = true;
    const t = b.querySelector("span:last-child").textContent;
    if(t === q.correct) b.classList.add("correct");
    else if(b===btn) b.classList.add("wrong");
    else b.classList.add("dim");
  });

  // scoring
  let gained = 0, gp=0, kp=0;
  rec.total++; rec.grid.push(correct);
  if(q.terrain==="sprint") rec.sprintTot++;
  if(q.terrain==="climb"||q.terrain==="hc") rec.komTot++;

  if(correct){
    rec.correct++;
    gained = tt.base + (fast ? Math.round(tt.base*0.4) : 0);
    if(q.terrain==="sprint"){ gp = 50 + (fast?30:0); rec.sprintHits++; }
    if(q.terrain==="climb"){ kp = 10; rec.komHits++; }
    if(q.terrain==="hc"){ kp = 20; rec.komHits++; }
    G.yellow += gained + gp + kp; G.green += gp; G.polka += kp;
    rec.yellow += gained+gp+kp; rec.green += gp; rec.polka += kp;
    W.surge = 1;                 // big power surge animation
    W.jersey = "#FFDD00";        // flash to yellow when winning points
    flashToast(fast && q.terrain==="sprint" ? "💥 SPRINT TAKEN!" :
               q.terrain==="hc" ? "⛰ SUMMIT CLEARED!" :
               q.terrain==="climb" ? "KOM POINTS!" : "✓ POWER!", "#22d37a");
  } else {
    W.surge = 0; W.speed = Math.max(8, W.speed*0.5);
    W.jersey = "#cfd6e2";
    flashToast("✗ DROPPED — DIG IN", "#ff5d6c");
  }

  // explanation
  $("verdict").textContent = correct ? "Correct" : "Not quite";
  $("verdict").className = "verdict " + (correct?"ok":"no");
  let rwd = correct ? `+${gained} GC` : "+0";
  if(gp) rwd += ` · +${gp} 🟢`;
  if(kp) rwd += ` · +${kp} 🐞`;
  if(correct && fast && q.terrain!=="sprint") rwd += " · speed bonus";
  $("reward").textContent = rwd;
  $("extext").textContent = q.explain;
  renderCites(q);
  $("explain").classList.add("show");

  // advance marker visually
  G.q_visualNext = true;
}

$("contBtn") && $("contBtn").addEventListener("click", ()=>{
  G.q++;
  const total = STAGES.reduce((a,s)=>a+s.questions.length,0);
  $("progBar").style.width = (G.q/STAGES[G.stage].questions.length*100)+"%";
  $("qcard").classList.remove("show");
  setTimeout(loadQuestion, 220);
});

// Abandon the current stage and return to the menu (no refresh needed)
$("exitBtn") && $("exitBtn").addEventListener("click", ()=>{
  timer.active = false;
  $("qcard").classList.remove("show");
  screens.ride.classList.remove("worlds");
  show("start");
});

/* Build the citation chips. NC/CA questions get two chips (North Carolina /
   California); UBE questions supply their own `chips` array (Tested rule /
   Authority). */
function renderCites(q){
  const box = $("cites"); box.innerHTML = "";
  const chips = q.chips || [
    { label: "North Carolina", text: q.nc, kind: "nc" },
    { label: "California",     text: q.ca, kind: "ca" }
  ];
  chips.forEach(c => {
    const d = document.createElement("div");
    d.className = "cite " + (c.kind || "ube");
    const st = document.createElement("span"); st.className = "st"; st.textContent = c.label;
    const tx = document.createElement("span"); tx.textContent = c.text || "";
    d.appendChild(st); d.appendChild(tx);
    box.appendChild(d);
  });
}

function flashToast(msg, col){
  const t = $("toast"); t.textContent = msg; t.style.color = col;
  t.classList.add("show");
  clearTimeout(flashToast._t);
  flashToast._t = setTimeout(()=>t.classList.remove("show"), 1300);
}

function shuffle(a){
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

/* ===================================================================
   STAGE RESULT
   =================================================================== */
function endStage(){
  const st = STAGES[G.stage], rec = G.stageRec[G.stage];
  const pct = Math.round(rec.correct/rec.total*100);
  $("resKicker").textContent = `Stage ${G.stage+1} of ${STAGES.length} complete`;
  $("resTitle").textContent = st.name;
  $("resStats").innerHTML =
    `<div class="bs"><div class="v num">${rec.correct}/${rec.total}</div><div class="l">Correct</div></div>
     <div class="bs"><div class="v num" style="color:var(--yellow)">${rec.yellow}</div><div class="l">Stage GC pts</div></div>
     <div class="bs"><div class="v num" style="color:var(--green)">${rec.green}</div><div class="l">Green</div></div>
     <div class="bs"><div class="v num" style="color:#fff">${rec.polka}</div><div class="l">KOM</div></div>`;
  $("resBlurb").innerHTML =
    pct>=85 ? "Statement ride. You distanced the field on the hardest climbs of the day." :
    pct>=65 ? "Strong in the bunch — a couple of attacks slipped away, but you're well placed on GC." :
              "Survived the time cut. Spin the legs out, review the citations, and go again tomorrow.";
  $("nextStageBtn").textContent = (G.stage < STAGES.length-1) ? "Next Stage ▸" : "Final Classification ▸";
  show("result");
}
$("nextStageBtn").addEventListener("click", ()=>{
  if(G.stage < STAGES.length-1) startStage(G.stage+1);
  else showFinal();
});

/* ===================================================================
   FINAL CLASSIFICATION
   =================================================================== */
function showFinal(){
  const totQ = STAGES.reduce((a,s)=>a+s.questions.length,0);
  const totC = G.stageRec.reduce((a,r)=>a+r.correct,0);
  const pct = Math.round(totC/totQ*100);
  const sprintTot = G.stageRec.reduce((a,r)=>a+r.sprintTot,0);
  const sprintHit = G.stageRec.reduce((a,r)=>a+r.sprintHits,0);
  const komTot = G.stageRec.reduce((a,r)=>a+r.komTot,0);
  const komHit = G.stageRec.reduce((a,r)=>a+r.komHits,0);

  // podium (single rider, but place rivals for fun)
  const place = pct>=90?1:pct>=78?1:pct>=60?2:3;
  $("podium").innerHTML =
    `<div class="step" style="height:120px"><div class="rider">🚴‍♂️</div><div class="pos">2</div><div class="who">CA Bar</div></div>
     <div class="step" style="height:160px"><div class="rider">🏆</div><div class="pos">1</div><div class="who">JAMES</div></div>
     <div class="step" style="height:96px"><div class="rider">🚴</div><div class="pos">3</div><div class="who">The MBE</div></div>`;

  $("finalStats").innerHTML =
    `<div class="bs"><div class="v num" style="color:var(--yellow)">${G.yellow}</div><div class="l">GC points</div></div>
     <div class="bs"><div class="v num">${totC}/${totQ}</div><div class="l">Correct (${pct}%)</div></div>
     <div class="bs"><div class="v num" style="color:var(--green)">${G.green}</div><div class="l">Green pts</div></div>
     <div class="bs"><div class="v num">${G.polka}</div><div class="l">KOM pts</div></div>`;

  // jerseys (achievement tiers)
  const wonYellow = pct>=78, wonGreen = sprintTot>0 && sprintHit/sprintTot>=0.75, wonPolka = komTot>0 && komHit/komTot>=0.75;
  $("jgrid").innerHTML =
    jerseyCard("🟡","Maillot Jaune", wonYellow,
      wonYellow?`Overall winner — ${pct}% across the whole Tour.`:`${pct}% overall. ${78-pct>0?(78-pct)+"% off the yellow jersey.":""}`) +
    jerseyCard("🟢","Maillot Vert", wonGreen,
      `${sprintHit}/${sprintTot} sprints won.${wonGreen?" Fastest mind in the bunch.":" Sharpen the snap recall."}`) +
    jerseyCard("🐞","Pois — KOM", wonPolka,
      `${komHit}/${komTot} climbs cleared.${wonPolka?" King of the Mountains.":" The marquee divergences are the climbs — drill them."}`);

  // stage table
  let rows = `<tr><th>Stage</th><th>Subject</th><th>Score</th><th>GC</th></tr>`;
  STAGES.forEach((s,i)=>{
    const r = G.stageRec[i] || {correct:0,total:s.questions.length,yellow:0};
    rows += `<tr><td><b>${s.name}</b></td><td>${s.subject}</td><td>${r.correct}/${r.total}</td><td>${r.yellow}</td></tr>`;
  });
  $("stageTable").innerHTML = rows;

  // share text (emoji grid)
  $("shareText").textContent = buildShare(pct, totC, totQ, wonYellow, wonGreen, wonPolka);

  // personal best
  try{
    const best = +(localStorage.getItem("tdnc_best")||0);
    if(G.yellow > best) localStorage.setItem("tdnc_best", G.yellow);
  }catch(e){}

  show("final");
}
function jerseyCard(icon,title,won,desc){
  return `<div class="jcard ${won?'won':'lost'}"><div class="ji">${icon}</div>
          <div class="jt">${won?title:title}</div><div class="jd">${desc}</div>
          <div style="margin-top:6px;font-weight:700;color:${won?'#ffd000':'#7e90b3'}">${won?'WON':'—'}</div></div>`;
}
function buildShare(pct, c, t, y, g, p){
  let out = `🚴 Le Tour de North Carolina — Bar Exam Edition\n`;
  out += `GC: ${c}/${t} (${pct}%)  ·  ${G.yellow} pts\n`;
  out += `${y?'🟡':'⬜'} GC  ${g?'🟢':'⬜'} Sprints  ${p?'🐞':'⬜'} KOM\n\n`;
  STAGES.forEach((s,i)=>{
    const r = G.stageRec[i]; if(!r) return;
    const grid = r.grid.map(b=>b?'🟩':'🟥').join('');
    out += `S${i+1} ${s.name.padEnd(0)}\n${grid}\n`;
  });
  out += `\nThink you can take the maillot jaune?`;
  return out;
}

$("copyBtn").addEventListener("click", async ()=>{
  const txt = $("shareText").textContent;
  try{
    if(navigator.share){ await navigator.share({text:txt}); }
    else { await navigator.clipboard.writeText(txt); $("copyBtn").textContent="Copied ✓"; setTimeout(()=>$("copyBtn").textContent="Copy Result",1500); }
  }catch(e){
    try{ await navigator.clipboard.writeText(txt); $("copyBtn").textContent="Copied ✓"; setTimeout(()=>$("copyBtn").textContent="Copy Result",1500);}catch(_){}
  }
});
$("replayBtn").addEventListener("click", ()=>{
  G.stage=0; G.q=0; G.yellow=G.green=G.polka=0; G.stageRec=[];
  show("start");
});

/* ===================================================================
   BOOT
   =================================================================== */
function resetTotals(){ G.yellow = 0; G.green = 0; G.polka = 0; G.stageRec = []; }

function boot(){
  buildPreview();
  resize();
  requestAnimationFrame(loop);
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
