document.addEventListener('DOMContentLoaded', () => {

  const fadeInElements = document.querySelectorAll('.about-wrapper, .skill-card, .project-card, .contact-wrapper, .core-techs');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  fadeInElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links li a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: "-30% 0px -70% 0px" });

  sections.forEach(section => {
    navObserver.observe(section);
  });

  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !subject || !message) {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.color = 'red';
        return;
      }

      formMessage.textContent = 'Thank you for your message. I will get back to you soon!';
      formMessage.style.color = '#4BB543';
      
      setTimeout(() => {
        formMessage.textContent = '';
      }, 5000);

      form.reset();
    });
  }
});