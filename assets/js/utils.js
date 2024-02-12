function hide(element, timeout) {
  if (!timeout) {
    element.style.display = 'none';
    return;
  }

  const startTime = new Date().getTime();
  function animate() {
    requestAnimationFrame(() => {
      const now = new Date().getTime();
      element.style.opacity = (timeout - now + startTime) / timeout;
      if (now < startTime + timeout) {
        animate();
      } else {
        element.style.opacity = '1';
        element.style.display = 'none';
      }
    });
  };

  animate();
}

function show(element) {
  element.style.display = '';
}