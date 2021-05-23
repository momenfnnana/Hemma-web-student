/* Start Main Variables */ 
const navabr = document.querySelector('.navbar');
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
  if (navabr.classList.contains('fixed-top')) {
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
    navabr.style.top = '0';
  } else {
    navabr.style.top = '-70px';
  }
  previousScrollPosition = currentScrollPosition;
  /* End Navbar Animation While Window Scrolling */

  /**************************** LINE SEPERATE ****************************/

  /* Start Toggle For Image Side While Scrolling */
  if (currentScrollPosition > '10') {
    document.querySelector('.logo-img').style.height = '40px';
    navabr.style.boxShadow = '0 3px 20px -5px rgb(0 0 0 / 10%)';
    navabr.style.minHeight = 'auto';
  } else {
    document.querySelector('.logo-img').style.height = '60px';
    navabr.style.boxShadow = 'none';
    navabr.style.minHeight = '70px';
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

/**************************** LINE SEPERATE ****************************/

/* Start Function OF Loadingbar Progress Animation */
function loadingProgressbar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  progressBarLoading.style.width = scrolled + "%";
}
/* End Function OF Loadingbar Progress Animation */

/* Start Collapsing Sub Dropdown Menu By Ckicking */
  // [1] First Sub Menu Of Dropdown Menu
  let linkDropdown = document.querySelectorAll('.dropdown-sub-wrapper-one');
  let subDropdown = document.querySelectorAll('.sub-dropdown');
  handleActiveEle(linkDropdown, subDropdown);

  /* ______________________________________________________________________ */

  // [2] Second Sub Menu Of Dropdown Menu
  let linkDropdownTwo = document.querySelectorAll('.dropdown-sub-wrapper-two');
  let subDropdownTwo = document.querySelectorAll('.sub-dropdown2');
  handleActiveEle(linkDropdownTwo, subDropdownTwo);

  /* ______________________________________________________________________ */

  // [3] Third Sub Menu Of Dropdown Menu
  let linkDropdownThree = document.querySelectorAll('.dropdown-sub-wrapper-three');
  let subDropdownThree = document.querySelectorAll('.sub-dropdown3');
  handleActiveEle(linkDropdownThree, subDropdownThree);

  function handleActiveEle(element, list) {
    element.forEach(smEle => {
      smEle.addEventListener('click', (e) => {
        e.preventDefault();
        let dropMenu = document.querySelector('.' + e.currentTarget.dataset.dropmenu);
        element.forEach(ele => {
          ele.classList.remove('active');
        });
        list.forEach(subDrop => {
          subDrop.classList.remove('showing');
        });
        e.currentTarget.classList.add('active');
        dropMenu.classList.toggle('showing');
      })
    });
  }


  let mainLinkDropDown = document.querySelector('.dropdown-wrapper');
  mainLinkDropDown.onmouseover = function(e) {
    let subListMenu = document.querySelector('.' + e.currentTarget.dataset.hover);
    if(!subListMenu.classList.contains('show')) {
      subListMenu.classList.add('show');
    }
  }
   mainLinkDropDown.onmouseout = function(e) {
    let subListMenu = document.querySelector('.' + e.currentTarget.dataset.hover);
    if(subListMenu.classList.contains('show')) {
      subListMenu.classList.remove('show');
    }
  }
  document.addEventListener('mouseover', function(event) {
    var isClickInside = mainLinkDropDown.contains(event.target);
    let subListMenu = document.querySelector('.sub-list');
    if (isClickInside) { return false; } else {
      subListMenu.classList.remove('show');
      document.querySelector('.sub-dropdown').classList.remove('showing');
      document.querySelector('.sub-dropdown2').classList.remove('showing');
      document.querySelector('.sub-dropdown3').classList.remove('showing');
      document.querySelectorAll('.dropdown-sub-wrapper-one').forEach(ele => {
        ele.classList.remove('active');
      })
      document.querySelectorAll('.dropdown-sub-wrapper-two').forEach(ele => {
        ele.classList.remove('active');
      })
      document.querySelectorAll('.dropdown-sub-wrapper-three').forEach(ele => {
        ele.classList.remove('active');
      })
    }
  });
/* End Collapsing Sub Dropdown Menu By Ckicking */