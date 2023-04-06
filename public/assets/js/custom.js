// Navigation Menu 
let path = window.location.pathname;
path = path.split('/');
let activePath = path[path.length - 2];




let sideMenu = Array.from(document.querySelectorAll('.main-menu .nav-item'));
    sideMenu.forEach(e => {
        let sideMenuLink = e.querySelector('.main-menu .nav-item a').href;

        sideMenuLink = sideMenuLink.split('/');
        let sideMenuActive = sideMenuLink[sideMenuLink.length - 1];
        if (sideMenuActive == activePath) {
        e.classList.add('active');
    };
});



// $(".").click(function(){
//     $("p").hide();
//   });
  
  $(".cAboutButt").click(function(){
    $(".cAboutS").show();
    $(".cAboutH").hide();
  });

  $(".cAboutButt2").click(function(){
    $(".cAboutS2").show();
    $(".cAboutH2").hide();
  });  





/*----- Go Back Page -----*/
let backLink = Array.from(document.querySelectorAll('.backLink'));
if (backLink) {
    backLink.forEach(e => {
        e.addEventListener('click', function () {
            window.history.go(-1)
        });
    });
};




/*----- Password Display -----*/
let eyeBtn = Array.from(document.querySelectorAll('.passDisplay'));
if (eyeBtn) {
    eyeBtn.forEach(e => {
        e.addEventListener('click', function () {
            let passwordWrapper = e.closest('.passwordWrapper');
            let passInput = passwordWrapper.querySelector('input');
            let eyeIcon = passwordWrapper.querySelector('.passDisplay i');
            if (passInput.classList.contains('passInput')) {
                if (passInput.type == 'password') {
                    passInput.setAttribute('type', 'text');
                    eyeIcon.setAttribute('class', 'fas fa-eye');
                }
                else {
                    passInput.setAttribute('type', 'password');
                    eyeIcon.setAttribute('class', 'fas fa-eye-slash');
                };
            };
        });
    });
};


/*----- Toggle Switch Status -----*/
// let templateStatusBox = Array.from(document.querySelectorAll('.templateStatusBox'));
// let templateStatusText = document.querySelector('.templateStatusText');
// templateStatusBox.forEach(e => {
//     if (e.checked) {
//         templateStatusText.innerHTML = 'Active';
//     }
//     else {
//         templateStatusText.innerHTML = 'Inactive';
//     }
//     e.addEventListener('change', function () {
//         if (this.checked) {
//             templateStatusText.innerHTML = 'Active';
//         }
//         else {
//             templateStatusText.innerHTML = 'Inactive';
//         }
//     })
// })


/*----- Open SubMenu -----*/
let subNavItem = document.querySelector('.subactive');

if (subNavItem) {
    let navItem = subNavItem.closest('.has-sub');
    navItem.classList.add('open');
};



/*----- Attendance Layout Style -----*/
// let attendanceBoxes = Array.from(document.querySelectorAll('.attendanceBoxes'));
// attendanceBoxes.forEach(e => {
//     let attendanceBox = Array.from(e.querySelectorAll('.attendanceBox'));
//     if (attendanceBox.length > 1) {
//         e.classList.add('multipleAttendance');
//         e.classList.add('flex-wrap');

//     }
// })



/*----- Image Custom Modal -----*/
// let zoomImageModal = document.querySelector('.zoomImageModal');
// let zoomImage = Array.from(document.querySelectorAll('.zoomImage'));
// zoomImage.forEach(e => {
//     e.addEventListener('click', function(){
//         let myImg = this.closest('.contentImageBox').querySelector('img').src;
//         zoomImageModal.style.display="block";
//         zoomImageModal.querySelector('.imageContent img').src= myImg;
//     })
// })
// let customModalClose = zoomImageModal.querySelector('.customModalClose');
// customModalClose.addEventListener('click', function() {
//     this.closest('.zoomImageModal').style.display="none";
// })





/*----- Custom Attribute -----*/
let mainBox = Array.from(document.querySelectorAll('.mainBox'));
if (mainBox) {
    mainBox.forEach(e => {
        let mainRemove = e.querySelector('.mainRemove');
        let mainValue = e.querySelector('.mainValue');
        let mainValue2 = e.querySelector('.mainValue2');
        mainRemove.addEventListener('click', function () {
            e.remove();
        });
    });
};



/*----- Collapse Expand Accordion -----*/
let collapseExpand = document.querySelector('.collapseExpand');
if (collapseExpand) {
    collapseExpand.addEventListener('click', function () {
        let collapse = Array.from(document.querySelectorAll('.accordion .collapse'));
        collapse.forEach(e => {
            e.classList.toggle('show');
        });
    });
};






/*----- Edit Profile -----*/
let editProfile = document.querySelector('.editProfile');
let editedProfile = document.querySelector('.editedProfile');
if (editProfile) {
    editProfile.style.display = "none";
}
if (editedProfile) {
    let editProfileBtn = document.querySelector('.editProfileBtn');
    editProfileBtn.addEventListener('click', function () {
        editProfile.style.display = "block";
        editedProfile.style.display = "none";
    });
};

if (editProfile) {
    let cancelProfileBtn = document.querySelector('.cancelProfileBtn');
    cancelProfileBtn.addEventListener('click', function () {
        editedProfile.style.display = "block";
        editProfile.style.display = "none";
    });
};