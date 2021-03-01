const contentDesc = document.querySelectorAll('.p-desc');
const contentSubject = document.querySelectorAll('.p-subject');
const html = document.querySelector('html');
const sectionElm = document.querySelectorAll('section');
const navBtn = document.querySelector('.nav-btn-box > a');
const navMenuArea = document.querySelector('.navMenu');
const navCloseBtn = document.querySelector('.close-btn');


navBtn.addEventListener('click',function (ev) {
    ev.preventDefault()
    navMenuArea.classList.add('active');
    html.style.overflow = 'hidden'
})

navCloseBtn.addEventListener('click',function(ev) {
    ev.preventDefault();
    navMenuArea.classList.remove('active');
    html.style.overflow = 'unset'
})


// window.addEventListener('scroll',function () {
//     console.log(Math.floor(html.scrollTop));
//     const htmlLocation = Math.floor(html.scrollTop)
//     if( htmlLocation === 1100 ) {
//         sectionElm[1].classList.add('itemFadeUp')
//     }

// })

console.dir(html.scrollTop);


function textEdit() {
    const descMaxNum = 150;
    const subjMaxNum = 23;

    contentDesc.forEach(content => {
        if( content.innerHTML.length >= descMaxNum ) {
            content.innerHTML = content.innerHTML.substr(0,descMaxNum) + '...'
        }
    });


    contentSubject.forEach(content => {

        if( content.innerHTML.length >= subjMaxNum ) {
            content.innerHTML = content.innerHTML.substr(0,subjMaxNum) + '...'
        }
    })
}


textEdit()


