const root = document.documentElement;
let t0 = performance.now();
function wobble(base, amp, k){ return `${base + Math.sin(k) * amp}%` }
function bgFrame(now){
  const t = (now - t0) * 0.00012;
  root.style.setProperty("--p1x", wobble(60,2.0,t*1.1));
  root.style.setProperty("--p1y", wobble(28,1.2,t*0.9+1.4));
  root.style.setProperty("--p2x", wobble(48,1.8,t*1.3+0.2));
  root.style.setProperty("--p2y", wobble(40,1.4,t*1.1+2.1));
  root.style.setProperty("--p3x", wobble(40,1.6,t*1.0+0.6));
  root.style.setProperty("--p3y", wobble(55,1.0,t*0.8+2.8));
  root.style.setProperty("--p4x", wobble(78,1.5,t*1.2+1.7));
  root.style.setProperty("--p4y", wobble(18,1.0,t*0.7+0.9));
  root.style.setProperty("--p5x", wobble(88,1.6,t*1.05+2.7));
  root.style.setProperty("--p5y", wobble(66,1.2,t*0.95+1.9));
  root.style.setProperty("--p6x", wobble(22,1.8,t*1.15+0.4));
  root.style.setProperty("--p6y", wobble(78,1.1,t*1.05+2.3));
  root.style.setProperty("--p7x", wobble(34,1.4,t*0.85+1.1));
  root.style.setProperty("--p7y", wobble(86,1.0,t*0.75+2.6));
  root.style.setProperty("--p8x", wobble(16,1.7,t*1.25+0.3));
  root.style.setProperty("--p8y", wobble(36,1.1,t*0.95+1.6));
  requestAnimationFrame(bgFrame);
}
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(bgFrame);


const loader = document.getElementById("loader");
const fill = loader.querySelector(".fill");
let rafId = 0;
let progress = 0;

function setProgress(p){
  fill.style.setProperty("--progress", Math.max(0, Math.min(100, p)));
}
function tickProgress(){
  progress = Math.min(progress + 0.4, 90);
  setProgress(progress);
  rafId = requestAnimationFrame(tickProgress);
}

setProgress(2);
rafId = requestAnimationFrame(tickProgress);

document.addEventListener("readystatechange", () => {
  if (document.readyState === "interactive") setProgress(60);
  if (document.readyState === "complete") setProgress(90);
});

async function waitExtras(){
  const fontsReady = ("fonts" in document) ? document.fonts.ready : Promise.resolve();
  const imgs = Array.from(document.images || []);
  const imgPromises = imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => {
    img.addEventListener("load", r, { once:true });
    img.addEventListener("error", r, { once:true });
  }));
  await Promise.all([fontsReady, ...imgPromises]);
}

window.addEventListener("load", async () => {
  await waitExtras();
  cancelAnimationFrame(rafId);
  setProgress(100);
  requestAnimationFrame(() => {
    document.body.classList.add("ready");
    loader.classList.add("hide");
    setTimeout(() => { loader.style.display = "none"; }, 800);
  });
});


function showLoaderQuick(){
  loader.style.display = "flex";
  loader.classList.remove("hide");
  setProgress(10);
}
window.addEventListener("pagehide", () => showLoaderQuick());
window.addEventListener("beforeunload", () => showLoaderQuick());

window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    loader.classList.add("hide");
    setTimeout(() => { loader.style.display = "none"; }, 400);
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    showLoaderQuick();
  } else if (document.readyState === "complete") {
    loader.classList.add("hide");
    setTimeout(() => { loader.style.display = "none"; }, 600);
  }
});

