const annX = document.getElementById('ann-x');
if (annX) {
  annX.addEventListener('click', () => {
    document.documentElement.classList.add('ann-hidden');
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  reveals.forEach((el) => io.observe(el));
}
