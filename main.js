'use strict';
// Elements
const body = document.body;
const allSections = document.querySelectorAll('.section');
const featuresSection = document.querySelector('.features');
const featuresImgs = document.querySelectorAll('.features img');
const landing = document.querySelector('.landing');

const icon = document.querySelector('.navbar .nav-icon');
const navContainer = document.querySelector('.navbar');
const navBar = document.querySelector('.nav');
const navItems = document.querySelectorAll(".nav-item"); // You Can Manipulate Them

const showForm = document.querySelectorAll('.login-btn');
const layer = document.querySelector('.layer');
const popupBody = document.querySelector('.popup');
const closeBtn = document.querySelector('.close-popup');

const cookieBody = document.createElement('div');
const cookieContent = document.createElement('p');
const cookieClose = document.createElement('button');

const scrollToFirst = document.querySelector('.scroll-1');
const scrollTop = document.querySelector('.scroll-top');

const operationBtnsContainer = document.querySelector('.operations .btns');
const tabContainer = document.querySelector('.operations .operation-container');

const sliderImgs = document.querySelectorAll('.testimonials .slide');
const sliderRightArrow = document.querySelector('.testimonials .arrow-right');
const sliderLeftArrow = document.querySelector('.testimonials .arrow-left');
const sliderDots = document.querySelector('.testimonials .dots');

// Functions
//  Nav
const hideNav = function () {
  if(icon.classList.contains('hidden'))
    icon.classList.remove('hidden');
  if(!navBar.classList.contains('hidden'))
    navBar.classList.add('hidden');
}
const showNav = function () {
  // Restart The Defualt State
  if(icon.classList.contains('active-nav'))
    icon.classList.remove('active-nav');
  if(!icon.classList.contains('hidden'))
    icon.classList.add('hidden');
  if(navBar.classList.contains('hidden'))
    navBar.classList.remove('hidden');
}
const toggleNav = function () {
  // Avoid Multiclicks
  if(navClicked) {
    if(navBar.classList.contains('hidden')) {
      navBar.classList.remove('hidden');
      let opacity = 0;
      navBar.style.opacity = opacity;
      const opacityChang = setInterval(() => {
        navBar.style.opacity = opacity;
        // Change Opacity
        opacity += 0.10;
        if(opacity >= 1) {
          clearInterval(opacityChang);
          // Return Ability To Click
          navClicked = true;
        }
      }, 10);
    }
    else {
      let opacity = 1;
      navBar.style.opacity = opacity;
      const opacityChang = setInterval(() => {
        navBar.style.opacity = opacity;
        opacity -= 0.10;
        if(opacity <= -1) {
          clearInterval(opacityChang);
          navBar.classList.add('hidden');
          navClicked = true;
          navBar.style.opacity = 1;
        }
      }, 10);
    }
    if(icon.classList.contains('active-nav'))
    icon.classList.remove('active-nav');
  else
      icon.classList.add('active-nav');
    navClicked = !navClicked; // Stop Taking Actions Till Finish
  }
}
//  Popup
const showPopup = function () {
  popupBody.classList.remove('hide');
  layer.classList.remove('hide');
}
const hidePopup = function () {
  popupBody.classList.add('hide');
  layer.classList.add('hide');
}
//  Smooth Scolling
const smoothScroll = function (target) {
  let targetElementX = target.getBoundingClientRect().left; // Distance Between The Target And Left Of Viewport From The Page(Browser)
  let targetElementY = target.getBoundingClientRect().top;// Distance Between The Target And Top Of Viewport From The Page(Browser)
  let totalDistanceY = window.scrollY + targetElementY - (parseInt(getComputedStyle(navBar.parentElement).height));// The Target And Navbar Height(sticky)
  let totalDistanceX = window.scrollX + targetElementX;
  window.scrollTo({ // For Old Browsers Versions
    left: totalDistanceX,
    top: totalDistanceY,
    behavior: 'smooth',
  });
  // firstSection.scrollIntoView({behavior: 'smooth'}); // New Browsers Versions
}
//  Slider
const slideRight = function(elements) {
  if(sliderClicked) {
    sliderClicked = !sliderClicked; // Cooldown For Click
    elements = [...elements]; // To Make It As Array Not NodeList
    const currentELement = document.querySelector('.testimonials .slide-active');
    let targetElement;
  
    // To Check If It's The First Element Or There Is No Problem
    if(currentELement == elements[elements.length-1])
      targetElement = elements[0];
    else 
      targetElement = elements[elements.indexOf(currentELement)+1];
    dotActive(elements.indexOf(currentELement), elements.indexOf(targetElement)); // Active Dots
    moveRight(currentELement, targetElement); // Make The Movement
  }
}
const moveRight = function(currentELement, nextElement) {
  nextElement.classList.add('slide-active', 'slide-right'); // Take The Next Element To The Right
  setTimeout(() => {
    currentELement.classList.add('slide-left'); // Take It Left
    nextElement.classList.remove('slide-right') // Back To Normall
  }, 0); // It Will Wait The Callstack To Be Empty (Event Loop)
  setTimeout(() => {
    currentELement.classList.remove('slide-active', 'slide-left');
    sliderClicked = !sliderClicked;
  }, 600); // After The Element Take Its Time To Move Hide It
}

const slideLeft = function(elements) {
  if(sliderClicked) {
    sliderClicked = !sliderClicked; // Cooldown For Click
    elements = [...elements]; // To Make It As Array Not NodeList
    const currentELement = document.querySelector('.testimonials .slide-active');
    let targetElement;
  
    // To Check If It's The Last Element Or There Is No Problem
    if(currentELement == elements[0])
      targetElement = elements[elements.length-1];
    else
      targetElement = elements[elements.indexOf(currentELement)-1];
    // Active Dots
    dotActive(elements.indexOf(currentELement), elements.indexOf(targetElement));
    moveLeft(currentELement, targetElement);
  }
}
const moveLeft = function(currentELement, nextElement) {
  nextElement.classList.add('slide-active', 'slide-left'); // Take The Next Element To The Left
  setTimeout(() => {
    currentELement.classList.add('slide-right'); // Take It Right
    nextElement.classList.remove('slide-left') // Back To Normall
  }, 0);
  setTimeout(() => {
    currentELement.classList.remove('slide-active', 'slide-right');
    sliderClicked = !sliderClicked;
  }, 600); // After The Element Take Its Time To Move Hide It
}

const dotTravel = function(oldOne, newOne) {
  if(sliderClicked) {
    sliderClicked = !sliderClicked; // cooldown
    const currentELement = sliderImgs[oldOne];
    const targetElement = sliderImgs[newOne];
    if(oldOne > newOne) 
      moveRight(currentELement, targetElement);
    else
      moveLeft(currentELement, targetElement);
    dotActive(oldOne, newOne);
  }
}
const dotActive = function(oldOne, newOne) {
  sliderDots.children[oldOne].classList.remove('dot-active');
  sliderDots.children[newOne].classList.add('dot-active');
}
// Main
//  Nav
let navClicked = true;
if(body.offsetWidth <= 768)
hideNav();
else
showNav();
// Just For Responsive But When Uploading This Website As Real Apllication This Doesn't Matter
body.onresize = function () {
  if(body.offsetWidth <= 752) // It Must Be 768 But There Is 16px IDK Where Did it Go !
  hideNav();
  else
  showNav();
}
icon.addEventListener('click', toggleNav);

navBar.addEventListener('click', function(e) { // Event Delegation
  e.preventDefault();
  if(e.target.nodeName == 'A' && !e.target.parentElement.classList.contains('login-btn')) {
    const id = e.target.getAttribute('href');
    smoothScroll(document.querySelector(id));
  }
});

navItems.forEach((navItem) => { // Blur Every Item Except Hovered
  navItem.addEventListener('mouseenter', function(e) {
    const siblings = [... e.target.parentElement.children];
    siblings.forEach((one) => {
      if(e.target != one) {
        one.classList.add('hovered');
      }
    });
  });
});

navItems.forEach((navItem) => { // Remove Blur From Every Item Except Hovered
  navItem.addEventListener('mouseleave', function(e) {
    const siblings = [... e.target.parentElement.children];
    siblings.forEach((one) => {
      if(one.classList.contains('hovered')) {
        one.classList.remove('hovered');
      }
    });
  });
});

//  Popup
showForm.forEach((btn) => {
  btn.addEventListener('click', showPopup);
});
closeBtn.addEventListener('click', hidePopup);
layer.addEventListener('click', hidePopup);
document.addEventListener('keydown', function(clicked) {
  if(clicked.key === 'Escape' && !layer.classList.contains('hidden'))
    hidePopup();
});

//  Cookie Message
cookieBody.classList.add('cookie-body');
cookieContent.classList.add('msg'); // Give Classes
cookieClose.classList.add('close-cookie');

cookieContent.innerText = 'We Use Cookied For Improved Functionality.';
cookieClose.innerText = 'Got It !'; // Initialize Needed Text

cookieBody.prepend(cookieContent); // Add Them To Cookie
cookieBody.append(cookieClose);

body.append(cookieBody); // Add Cookie Message To The Page
cookieClose.addEventListener('click', () => { // Remove Cookie Message
  body.removeChild(cookieBody);
  // cookieBody.remove();
});

//  Smooth Scrolling
scrollToFirst.addEventListener('click', function(e) {
  e.preventDefault();
  smoothScroll(featuresSection);
});

//  Scroll To Top
scrollTop.addEventListener('click', function(e) {
  e.preventDefault();
  smoothScroll(landing);
});

//  Sticky The Nav And Show Scroll To Top Button Using Intersection Observer API
let navHieght = getComputedStyle(navContainer).height;
const obsFuncLanding = function(entries) { // Callback Function
  const [hiddenLanding] = entries; // Destruction
  if(!hiddenLanding.isIntersecting) { // If The Landing Is No More Visible
    navContainer.classList.add('sticky');
    scrollTop.classList.remove('hide');
  }
  else if(hiddenLanding.isIntersecting) { // If The Landing Is Visible
    navContainer.classList.remove('sticky');
    scrollTop.classList.add('hide');
  }
};
const observerLanding = new IntersectionObserver(obsFuncLanding, {
  root: null, // Null Mean Viewport
  threshold: 0, // The Percentage Of The Element That Shown(%Visible Of It)
  rootMargin: `-${parseInt(navHieght) + 10}px`, // Box Outside The Target (Before The Threshold Reached)
});
observerLanding.observe(landing);

//  Fading The Sections
const obsFuncSections = function(entries, observer) {
  const [entry] = entries; // Take First One
  if(entry.isIntersecting)
    if(entry.target.classList.contains('section-hidden')) {
      entry.target.classList.remove('section-hidden');
       // Disable Observing The Elements Because We Don't Want To Affect On The Performance
      observer.unobserve(entry.target);
    }
};
const observerSections = new IntersectionObserver(obsFuncSections, {
  root: null,
  threshold: 0.1,
});
allSections.forEach((section) => {
  section.classList.add('section-hidden'); // For Some People Who Disabled JS Files To Make Sections Visible To Them
  observerSections.observe(section);
});

//  Lazy Loading The Images
const obsFuncImgs = function(entries, observer) {
  const [entry] = entries;
  if(entry.isIntersecting) {
    let newPath = entry.target.dataset.src;
    entry.target.setAttribute('src', newPath);
    entry.target.addEventListener('load', function() {
      entry.target.classList.remove('hidden-img');
    });
    observer.unobserve(entry.target);
  }
};
const observerImgs = new IntersectionObserver(obsFuncImgs, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
featuresImgs.forEach((img) => {
  observerImgs.observe(img);
});

//  Tabs
operationBtnsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('button'); // Get The Button
  if(clicked?.classList.contains('btn')) { // Optional Chaining
    const target = clicked.dataset.tab; // Target Card
    const activeBtn = document.querySelector('.btn-active'); // Current Active Button
    const activeTab = tabContainer.querySelector(`.card:not(.hide-operation)`); // Current Activated Tab
    const wantedTab = tabContainer.querySelector(`.card-${target}`);
    activeTab.classList.add('hide-operation'); // Hide It
    activeBtn.classList.remove('btn-active'); // Remove Active Button
    wantedTab.classList.remove('hide-operation'); // Active Tab
    clicked.classList.add('btn-active'); // Active Tab Button
  }
});

//  Slider
let sliderClicked = true;
// Arrows
sliderLeftArrow.addEventListener('click', slideLeft.bind(null, sliderImgs));
sliderRightArrow.addEventListener('click', slideRight.bind(null, sliderImgs));

// Dots
sliderDots.addEventListener('click', function(e) {
  if(e.target.classList.contains('dot') && !e.target.classList.contains('dot-active')) {
    const activeDot = document.querySelector('.testimonials .dots .dot-active')
    dotTravel(activeDot.dataset.toSlide, e.target.dataset.toSlide);
  }
});
// Slide By Arrows
const obsArrowsFunc = function(entries) {
  const [entry] = entries;
  let keyDown;
  if(entry.isIntersecting) {
    keyDown = document.addEventListener('keydown', function(clicked) {
      if(clicked.key === 'ArrowLeft') {
        slideLeft(sliderImgs);
      }
      if(clicked.key === 'ArrowRight') {
        slideRight(sliderImgs);
      }
    });
  }
  else if(!entry.isIntersecting) {
    removeEventListener('keydown', keyDown);
  }
};
const observArrows = new IntersectionObserver(obsArrowsFunc, {
  root: null,
  threshold: 0,
});
observArrows.observe(sliderImgs[0].parentElement);