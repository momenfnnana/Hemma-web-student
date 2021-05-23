/* Start Main Variables */ 
//const navabr = document.querySelector('.navbar');
const bannerText = document.querySelector('.banner-text');
const progressBarLoading = document.querySelector('.progressbar-wrapper .progressbar-line');
const translatedCard = document.querySelector('.translated-card');
const cardTranslated = document.querySelector('.card-translated');
const withFixedNav = document.querySelector('.with-fixed-header');
let previousScrollPosition = window.pageYOffset;
/* End Main Variables */

/* Start Making Padding Top For The Reset Of Elements Of Dom If The Navbar Fixed */
let plusPadding = 30;
function checkIfNavbarFixedAndSetPadding() {
  if ( document.querySelector('.navbar').classList.contains('fixed-top')) {
      withFixedNav.style.paddingTop = navabr.clientHeight + 'px';
  } else {
    withFixedNav.style.paddingTop = '0';
  }
}
checkIfNavbarFixedAndSetPadding();
/* End Making Padding Top For The Reset Of Elements Of Dom If The Navbar Fixed */

window.onscroll = function() {
  // Window Offset OF Y Dimension
  let currentScrollPosition = window.pageYOffset;

  /* Start Navbar Animation While Window Scrolling */
  if (previousScrollPosition > currentScrollPosition) {
    document.querySelector('.navbar').style.top = '0';
  } else {
    document.querySelector('.navbar').style.top = '-70px';
  }
  previousScrollPosition = currentScrollPosition;
  /* End Navbar Animation While Window Scrolling */

  /**************************** LINE SEPERATE ****************************/

  /* Start Toggle For Image Side While Scrolling */
  // const navabr = document.querySelector('.navbar');
  if (currentScrollPosition > '10') {
   
    document.querySelector('.logo-img').style.height = '40px';
    document.querySelector('.navbar').style.boxShadow = '0 3px 20px -5px rgb(0 0 0 / 10%)';
  } else {
    document.querySelector('.logo-img').style.height = '60px';
    document.querySelector('.navbar').style.boxShadow = 'none';
  }
  /* End Toggle For Image Side While Scrolling */

  /**************************** LINE SEPERATE ****************************/

  /* Start Progress Bar Loading While Scrolling */
  loadingProgressbar();
  /* End Progress Bar Loading While Scrolling */

  /**************************** LINE SEPERATE ****************************/

  /* Start Banner Text Animation While Window Scrolling */
  if (bannerText) {
    bannerText.style.top = currentScrollPosition * 1 + 'px';
  }
  /* End Banner Text Animation While Window Scrolling */
}

/* Start Function OF Loadingbar Progress Animation */
function loadingProgressbar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  progressBarLoading.style.width = scrolled + "%";
}
/* End Function OF Loadingbar Progress Animation */
