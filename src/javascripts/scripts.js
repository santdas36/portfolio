import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagnetMouse from './magnetMouse';
import successIcon from '../images/success.svg';
import loadingIcon from '../images/loading.svg';

gsap.registerPlugin(ScrollTrigger);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const mm = new MagnetMouse({
    magnet: {
      element: '.magnet',
      class: 'cta-active',
      position: 'center',
      distance: 20,
    },
    follow: {
      element: '.cursor',
      class: 'cursor-active',
    },
    inCallback(data) {
      cursor.style.width = data.elem.width;
      cursor.style.height = data.elem.height;
      cursor.style.opacity = 0;
    },
    outCallback() {
      cursor.style.width = `${2}rem`;
      cursor.style.height = `${2}rem`;
      cursor.style.opacity = 1;
    },
  });
  mm.init();

  const heroForm = document.querySelectorAll('.hero-form');
  heroForm.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch(`https://portfolio.santdas36.vercel.app/api/new-pitch?email=${form.querySelector('input[type="email"]').value}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => console.log(res));
    });
  });

  const codeDiv = document.getElementById('projects');
  const designDiv = document.getElementById('designs');
  const workCode = document.getElementById('workTypeCode');
  const workDesign = document.getElementById('workTypeDesign');
  const workOption = [workCode, workDesign];
  workOption.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      const current = e.target.value;
      if (e.target.checked && current === 'code') {
        gsap.to(designDiv, {
          opacity: 0,
          y: '50px',
          display: 'none',
          duration: 0.3,
        });
        gsap.to(codeDiv, {
          opacity: 1,
          y: 0,
          display: 'block',
          duration: 0.3,
          delay: 0.3,
        });
      } else if (e.target.checked && current === 'design') {
        gsap.to(codeDiv, {
          opacity: 0,
          y: '50px',
          display: 'none',
          duration: 0.3,
        });
        gsap.to(designDiv, {
          opacity: 1,
          y: 0,
          display: 'flex',
          duration: 0.3,
          delay: 0.3,
        });
      }
    });
  });

  gsap.from('.service', {
    scrollTrigger: {
      trigger: '.services',
      start: '50 bottom',
    },
    duration: 0.6,
    y: 50,
    opacity: 0,
    delay: 0.6,
    stagger: 0.2,
    ease: 'power3.out',
    clearProps: 'all',
  });

  const projectImages = document.querySelectorAll('.project-images .small');
  projectImages.forEach((image) => {
    gsap.from(image, {
      scrollTrigger: {
        trigger: image.parentElement,
        scrub: true,
        start: 'top bottom',
        end: 'top 10%',
      },
      y: 80,
      ease: 'power1.inOut',
    });
  });

  const projectImagesBig = document.querySelectorAll('.project-images .big');
  projectImagesBig.forEach((image) => {
    gsap.from(image, {
      scrollTrigger: {
        trigger: image,
        scrub: true,
        start: 'top bottom',
        end: 'top 10%',
      },
      y: -30,
      ease: 'power3.out',
    });
  });

  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.navbar');
  const anchorLinks = document.querySelectorAll('a');
  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    navToggle.classList.toggle('open');
    document.querySelector('body').classList.toggle('scrollingdisabled');
  });
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const linkTo = link.getAttribute('href').split('#')[1];
      if (linkTo) {
        e.preventDefault();
        if (mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
          navToggle.classList.remove('open');
          document.querySelector('body').classList.remove('scrollingdisabled');
          setTimeout(() => {
            document.getElementById(linkTo).scrollIntoView();
          }, 200);
        } else {
          document.getElementById(linkTo).scrollIntoView();
        }
      }
    });
  });

  const stars = document.querySelectorAll('.service-icon .star');
  stars.forEach((star) => {
    star.style.animation = `star ${(Math.floor(Math.random() * 300) / 100) + 0.5}s infinite ease-in-out`;
  });

  const cElem = document.querySelectorAll('.contact-elem');
  cElem.forEach((elem) => {
    elem.style.animation = `cElem ${(Math.floor(Math.random() * 300) / 100) + 3}s infinite ease-in-out`;
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((navLink) => {
    navLink.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    navLink.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });

  const playlist = ['twss.mp3', 'alive.mp3', 'bears.mp3', 'calm.mp3', 'cookie.mp3', 'dundies.mp3', 'dwight.mp3', 'fire.mp3', 'goodbye.mp3', 'jim.mp3', 'localad.mp3', 'scarn.mp3', 'scranton.mp3', 'theme.mp3'];

  const audioElement = document.createElement('audio');
  const playButton = document.querySelector('#playAudio');

  playButton.addEventListener('click', () => {
    if (!this.classList.contains('isPlaying')) {
      this.classList.add('isPlaying');
      const randomSong = playlist[Math.floor(Math.random() * playlist.length)];
      if (!this.classList.contains('notFirst')) {
        audioElement.setAttribute('src', './audio/twss.mp3');
        this.classList.add('notFirst');
      } else {
        audioElement.setAttribute('src', `./audio/${randomSong}`);
      }
      audioElement.load();
      audioElement.play();
    } else {
      audioElement.pause();
      audioElement.src = '';
      this.classList.remove('isPlaying');
    }
  });
  audioElement.addEventListener('ended', () => {
    playButton.classList.remove('isPlaying');
  });

  const designImages = document.querySelectorAll('.design img');
  const imgModal = document.querySelector('.image-modal');
  const imgModalInner = document.querySelector('.image-modal-inner');
  const imgModalImage = document.querySelector('.image-modal-inner img');

  designImages.forEach((image) => {
    image.addEventListener('click', (e) => {
      const imgUrl = e.target.getAttribute('src');
      imgModalImage.setAttribute('src', imgUrl);
      gsap.to(imgModal, {
        opacity: 1,
        display: 'grid',
      });
      gsap.from(imgModalInner, {
        y: 50,
        scale: 0.95,
      });
    });
  });

  document.addEventListener('click', (event) => {
    const isClickInside = imgModalInner.contains(event.target);
    if (!isClickInside && imgModal.style.display !== 'none') {
      gsap.to(imgModal, {
        opacity: 0,
        display: 'none',
      });
    }
  });

  const contactForm = document.querySelector('.contact-form');
  const inputElems = document.querySelectorAll('.inputElem');
  const emailRE = /^\S+@\S+\.\S+$/;

  inputElems.forEach((elem) => {
    elem.addEventListener('focus', (e) => {
      if (!e.target.classList.contains('active')) {
        e.target.classList.add('active');
      }
      e.target.parentNode.classList.remove('error');
    });
    elem.addEventListener('blur', (e) => {
      if (!e.target.value) {
        e.target.classList.remove('active');
        e.target.parentNode.classList.add('error');
      } else if (e.target.getAttribute('name') === 'email' && !emailRE.test(e.target.value)) {
        e.target.parentNode.classList.add('error');
      } else if (e.target.getAttribute('name') === 'message' && e.target.value.length < 10) {
        e.target.parentNode.classList.add('error');
      }
    });
  });
  const inpName = document.getElementById('name');
  const inpEmail = document.getElementById('email');
  const inpMessage = document.getElementById('message');
  const inpSubmit = document.getElementById('submitForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!inpName.value) {
      inpName.parentNode.classList.add('error');
      inpName.focus();
    } else if (!inpEmail.value || !emailRE.test(inpEmail.value)) {
      inpEmail.parentNode.classList.add('error');
      inpEmail.focus();
    } else if (!inpMessage.value || inpMessage.value.length < 10) {
      inpMessage.parentNode.classList.add('error');
      inpMessage.focus();
    } else {
      inpSubmit.innerHTML = `<img src=${loadingIcon} class="sending"/> Sending...`;
      fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inpName.value,
          email: inpEmail.value,
          name: inpMessage.value,
        }),
      }).then(() => {
        inpSubmit.innerHTML = `<img src=${successIcon} class="sent"/> Message Sent!`;
        gsap.to(contactForm, {
          opacity: 0,
          delay: 1,
        });
        setTimeout(() => {
          inpSubmit.innerHTML = 'Send Message';
          inpName.value = '';
          inpEmail.value = '';
          inpMessage.value = '';
          inpName.classList.remove('active');
          inpEmail.classList.remove('active');
          inpMessage.classList.remove('active');
          gsap.to(contactForm, {
            opacity: 1,
            delay: 0.5,
          });
        }, 1500);
      });
    }
  });
});
