/* =====================================================
   Cục Bột · aka An Khánh — main.js
   1. Modal manager  2. Copy + toast  3. Live clock
   ===================================================== */
(function(){
'use strict';

const doc = document;

/* ================= 1. MODAL MANAGER ================= */
let lastFocus = null;

function openModal(id){
  const m = doc.getElementById(id);
  if(!m) return;
  lastFocus = doc.activeElement;
  m.classList.add('open');
  m.setAttribute('aria-hidden','false');
  doc.body.classList.add('no-scroll');
  const closeBtn = m.querySelector('.modal-close');
  if(closeBtn) closeBtn.focus();
}

function closeModal(m){
  m.classList.remove('open');
  m.setAttribute('aria-hidden','true');
  if(!doc.querySelector('.modal.open')) doc.body.classList.remove('no-scroll');
  if(lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
}

doc.addEventListener('click', function(e){
  const opener = e.target.closest('[data-open]');
  if(opener){ e.preventDefault(); openModal(opener.dataset.open); return; }
  const closer = e.target.closest('[data-close]');
  if(closer){ closeModal(closer.closest('.modal')); }
});

doc.addEventListener('keydown', function(e){
  if(e.key === 'Escape') doc.querySelectorAll('.modal.open').forEach(closeModal);
});

/* ================= 2. COPY + TOAST ================= */
const toastEl = doc.getElementById('toast');
let toastTimer;

function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toastEl.classList.remove('show'); }, 2200);
}

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    toast('Đã copy: ' + text);
  }catch(_){
    const ta = doc.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    doc.body.appendChild(ta);
    ta.select();
    try{
      doc.execCommand('copy');
      toast('Đã copy: ' + text);
    }catch(__){
      toast('Không copy được, bạn copy tay nhé: ' + text);
    }
    ta.remove();
  }
}

doc.addEventListener('click', function(e){
  const btn = e.target.closest('[data-copy]');
  if(btn) copyText(btn.dataset.copy);
});

/* ================= 3. LIVE CLOCK (giờ TP.HCM) ================= */
const clockEl = doc.getElementById('clock');
const fmt = new Intl.DateTimeFormat('vi-VN',{
  hour:'2-digit', minute:'2-digit', second:'2-digit',
  hour12:false, timeZone:'Asia/Ho_Chi_Minh'
});

function tick(){ clockEl.textContent = fmt.format(new Date()); }

tick();
setInterval(tick, 1000);

})();
