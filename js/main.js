const body = document.querySelector('body');
const gnbList = body.querySelectorAll('header > nav > .gnb-menu > li');
const sectionElms = body.querySelectorAll('main > .section-wrap > section');
const sectionWrap = body.querySelector('main > .section-wrap');
const subList = body.querySelector('.sub-list');
const subElm = subList.querySelectorAll('li');
const typing = body.querySelector('section.about .typing');
const typingIcon = body.querySelector('.sub-title > .typing-icon');
const skillList = body.querySelector('.skills-list');
const contactBtn = body.querySelector('header > nav > .gnb-menu > .contact');
const contactElm = body.querySelector('main > .section-wrap > .contact');
const closeBtn = body.querySelectorAll('main > .section-wrap > .contact > .circles > .circle');
const loadingArea = body.querySelector('.loading-area');
const loadingBar = loadingArea.querySelector('.loading-area .loading-bar');
const loadingMsg = loadingArea.querySelector('.loading-area .loading-msg');
const mobileGnb = body.querySelectorAll('.mobile-header > .m-gnb-menu > ul > li');
const mobileContact = body.querySelector('.mobile-header > .m-gnb-menu > ul > .contact')


let timer; // 셋타임아웃 컨트롤 할 수 있는 전역변수
let loadingTimer;

let typingTxt = '제 스킬을 소개합니다';
typingTxt = typingTxt.split('');

let index = 0;

// 100%가 되면 깜빡깜빡 이벤트 => css 효과 주고 class명

let fill = 0;

// 페이지 로드시 로딩바 호출
// window.onload = ()=>{
//     console.log('로드됨');
//     // loadingArea.classList.add('active');

//     loadingMsg.classList.add('txt-ani')
//     loadingBarEvent();
    
 
//     setTimeout(()=>{
//         loadingArea.style.display = 'none'
//     },4000);

// }

// function loadingBarEvent() {
//     if( fill < 80 ) {
//         loadingBar.style.width = `${40 + fill}%`;

//         fill += 20;
//         loadingTimer = setTimeout(loadingBarEvent,700);
//     } else {
//         clearTimeout(loadingTimer);
//     }
// }





// 타이핑 효과
function typingEffect(){
    if( index < typingTxt.length ) {
        typing.innerHTML += typingTxt[index];
        index++;

        timer = setTimeout(typingEffect,150); // 일정간격으로 타이핑효과 호출
    } else {
        typingIcon.classList.add('on');
        
        clearTimeout(timer); 
        
        setTimeout(()=>{
            skillList.classList.add('active')   
        },2000)
    }
   
}


// PC header click 이벤트
for(let i = 0; i < gnbList.length - 1; i++){
    gnbList[i].addEventListener('click', (ev)=>{
        ev.preventDefault();

        const liElm = ev.target.parentNode.parentNode;

        if( liElm.tagName !== 'LI' ) return
        

        // 전체 classList, active 지우기
        setionAllRemove()
        gnbAllRemove()
        
        

        // 위치가 about이면
        if( sectionElms[i].classList.contains('about') ) {   
            body.classList.add('black'); 
            setTimeout(typingEffect,500); //타이핑효과 호출
        }


        // 위치가 portfolio면
        if( gnbList[i].classList.contains('portfolio') ) {
            let targetSection = sectionElms[i];
            let sectionInner = sectionElms[i].children[1];

            subGnbRemove();

            // gnb 
            contactBtn.style.display = 'none';
            subList.style.display = 'block';

            // 클릭한 엘리먼트가 자바스크립트일 경우
            if( liElm.classList.contains('js') ) {
                targetSection = sectionElms[i+1];
                sectionInner = sectionElms[i+1].children[1]
                targetSection.classList.add('active');
            
            // 클릭한 엘리먼트가 vue일 경우
            }else {
                console.log('vue');
                subElm[0].classList.add('on')
                targetSection.classList.add('active');
            }

            sectionInner.scrollTop = '0';
            liElm.classList.add('on')

            

        } else {
            // gnb
            contactBtn.style.display = 'block';
            subList.style.display = 'none';
            sectionElms[i].classList.add('active');
        }

        gnbList[i].classList.add('on');


    })
}

// 섹션 클래스네임 전체 삭제 함수
function setionAllRemove() {
    for(let j = 0; j < sectionElms.length; j++){
        sectionElms[j].classList.remove('active');
    }

    body.classList.remove('black');
}

// gnb, body 클래스네임 전체 삭제 함수
function gnbAllRemove() {
    for(let k = 0; k < gnbList.length; k++) {
        gnbList[k].classList.remove('on');
    }
}

function subGnbRemove() {
    subElm.forEach(elm=>{
        elm.classList.remove('on')
    })
}

// mobile header click 이벤트
for(let i = 0; i < mobileGnb.length - 1; i++){
    mobileGnb[i].addEventListener('click',ev=>{
        ev.preventDefault();
        const sectionInner = sectionElms[i].children[1];

        // 섹션 전체 삭제
        setionAllRemove();
        

        // 클릭시 해당 섹션 active
        sectionElms[i].classList.add('active');
        sectionInner.scrollTop = '0'; // 포폴부분은 스크롤이 많으니 항상 맨위에 위치

        // 위치가 about이면
        if( sectionElms[i].classList.contains('about') ) {   
            body.classList.add('black'); 
            setTimeout(typingEffect,500); //타이핑효과 호출
          
        }


    })
}

// PC - gnb 메뉴 contact 버튼
contactBtn.addEventListener('click',(ev)=>{
    ev.preventDefault();
    contactElm.classList.add('active');
    body.style.overflow = 'hidden'
})

for(let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click',ev=>{
        ev.preventDefault();
        contactElm.classList.remove('active');
    })
}


// mobile - gnb 메뉴 contact 버튼
mobileContact.addEventListener('click', ev=>{
    ev.preventDefault();
    contactElm.classList.add('active');
})

function init() {
    subList.style.display = 'none';
}

init()

