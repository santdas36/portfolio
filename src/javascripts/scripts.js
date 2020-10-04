import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagnetMouse from './magnetMouse';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
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
      start: 'top bottom',
    },
    duration: 0.6,
    y: 50,
    opacity: 0,
    delay: 0.6,
    stagger: 0.3,
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

  gsap.to('.ido1', {
    scrollTrigger: {
      trigger: '.ido1',
      scrub: true,
      start: 'top bottom',
      end: 'bottom top',
    },
    x: '100%',
  });
  gsap.to('.ido2', {
    scrollTrigger: {
      trigger: '.ido2',
      scrub: true,
      start: 'top bottom',
      end: 'bottom top',
    },
    x: '-35%',
  });
  gsap.to('.ido3', {
    scrollTrigger: {
      trigger: '.ido3',
      scrub: true,
      start: 'top bottom',
      end: 'bottom top',
    },
    x: '70%',
  });

  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.navbar');
  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    navToggle.classList.toggle('open');
    document.querySelector('body').classList.toggle('scrollingdisabled');
  });

  const stars = document.querySelectorAll('.service-icon .star');
  stars.forEach((star) => {
    star.style.animation = `star ${(Math.floor(Math.random() * 300) / 100) + 0.5}s infinite ease-in-out`;
  });

  const cElem = document.querySelectorAll('.contact-elem');
  cElem.forEach((elem) => {
    elem.style.animation = `cElem ${(Math.floor(Math.random() * 300) / 100) + 3}s infinite ease-in-out`;
  });

  const cursor = document.querySelector('.cursor');
  const mm = new MagnetMouse({
    magnet: {
      element: '.cta',
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

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((navLink) => {
    navLink.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    navLink.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });

  const marquees = document.querySelectorAll('.about-who span');
  marquees.forEach((marquee) => {
    marquee.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-scroll');
    });
    marquee.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-scroll');
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

  const inputElems = document.querySelectorAll('.inputElem');
  inputElems.forEach((elem) => {
    elem.addEventListener('focus', (e) => {
      if (!e.target.classList.contains('active')) {
        e.target.classList.add('active');
      }
    });
    elem.addEventListener('blur', (e) => {
      if (!e.target.value) {
        e.target.classList.remove('active');
      }
    });
  });
});
