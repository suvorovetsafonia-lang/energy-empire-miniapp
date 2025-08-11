function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function formatNumber(n) {
  return Math.floor(n).toLocaleString('ru-RU');
}

// Анимация плавного изменения числа в элементе
function tweenNumber(el, target, duration=400){
  const start = parseFloat(el.dataset.val || el.innerText.replace(/[^0-9.-]/g,'')) || 0;
  const diff = target - start;
  const startTime = performance.now();
  el.dataset.val = start;
  function frame(now){
    const t = Math.min(1,(now-startTime)/duration);
    const v = start + diff * (1 - Math.pow(1-t,3));
    el.innerText = Math.floor(v);
    if(t<1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
