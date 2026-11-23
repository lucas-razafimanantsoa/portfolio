(() => {
  const canvas = document.getElementById("sky-canvas");

  if (!canvas) return;

  const host = canvas.parentElement;
  const context = canvas.getContext("2d");

  if (!host || !context) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const stars = [];
  const starColors = ["234, 240, 250", "234, 240, 250", "234, 240, 250", "242, 197, 124"];
  let width = 0;
  let height = 0;
  let frame = 0;
  let lastDraw = 0;
  let running = false;
  let inView = true;

  const draw = (time) => {
    context.clearRect(0, 0, width, height);

    for (const star of stars) {
      const twinkle = Math.sin(time * 0.00042 * star.twinkle + star.phase) * 0.14;
      const alpha = Math.max(0.06, star.alpha + twinkle);
      const x = ((star.x + time * 0.0028 * star.drift) % (width + 12)) - 6;

      if (star.glow) {
        context.beginPath();
        context.arc(x, star.y, star.radius * 2.6, 0, Math.PI * 2);
        context.fillStyle = `rgba(${star.color}, ${alpha * 0.09})`;
        context.fill();
      }

      context.beginPath();
      context.arc(x, star.y, star.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${star.color}, ${alpha})`;
      context.fill();
    }
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    const nextWidth = Math.round(rect.width);
    const nextHeight = Math.round(rect.height);

    if (!nextWidth || !nextHeight || (nextWidth === width && nextHeight === height)) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = nextWidth;
    height = nextHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars.length = 0;

    const count = Math.min(190, Math.max(42, Math.round((width * height) / 6800)));

    for (let i = 0; i < count; i += 1) {
      const bright = Math.random() > 0.84;

      stars.push({
        x: Math.random() * width,
        y: Math.pow(Math.random(), 1.08) * height,
        radius: bright ? 1.1 + Math.random() * 0.95 : 0.4 + Math.random() * 0.72,
        alpha: bright ? 0.64 + Math.random() * 0.22 : 0.22 + Math.random() * 0.38,
        glow: bright,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.55 + Math.random() * 1.4,
        drift: 0.15 + Math.random() * 0.55,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    draw(0);
  };

  const loop = (time) => {
    if (!running) return;

    if (time - lastDraw > 34) {
      draw(time);
      lastDraw = time;
    }

    frame = window.requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) return;

    running = true;
    lastDraw = 0;
    frame = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    running = false;
    window.cancelAnimationFrame(frame);
  };

  const canAnimate = () => inView && !document.hidden && !motionQuery.matches;

  const sync = () => {
    if (canAnimate()) {
      start();
    } else {
      stop();
      if (inView && motionQuery.matches) draw(0);
    }
  };

  const handleMotionChange = () => sync();
  const handleVisibility = () => sync();

  let resizeTimer = 0;
  const handleResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 140);
  };

  resize();

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", handleMotionChange);
  } else {
    motionQuery.addListener(handleMotionChange);
  }

  document.addEventListener("visibilitychange", handleVisibility);

  if ("ResizeObserver" in window) {
    new ResizeObserver(handleResize).observe(host);
  } else {
    window.addEventListener("resize", handleResize);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        sync();
      },
      { threshold: 0 }
    ).observe(host);
  }

  sync();
})();
