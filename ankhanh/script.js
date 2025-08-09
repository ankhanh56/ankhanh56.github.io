const root = document.documentElement;
let t0 = performance.now();

function wobble(base, amp, k){ return `${base + Math.sin(k) * amp}%` }

function frame(now){
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
  requestAnimationFrame(frame);
}
if (!matchMedia("(prefers-reduced-motion: reduce)").matches){
  requestAnimationFrame(frame);
}
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    document.body.classList.add("loaded");
  }, 2000);
});
