const body = document.querySelector('body');
const gnbList = body.querySelectorAll('header > nav > .gnb-menu > li');
const sectionElms = body.querySelectorAll('main > .section-wrap > section');
const sectionWrap = body.querySelector('main > .section-wrap');
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

console.log(mobileContact);


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

function loadingBarEvent() {
    if( fill < 80 ) {
        loadingBar.style.width = `${40 + fill}%`;

        fill += 20;
        loadingTimer = setTimeout(loadingBarEvent,700);
    } else {
        clearTimeout(loadingTimer);
    }
}





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

        // 전체 classList, active 지우기
        for(let j = 0; j < sectionElms.length; j++){
            sectionElms[j].classList.remove('active');
            gnbList[j].classList.remove('on');
            body.classList.remove('black');
        }

        // 클릭시 해당 인덱스 active
        sectionElms[i].classList.add('active');
        gnbList[i].classList.add('on');

        // 위치가 about이면
        if( sectionElms[i].classList.contains('about') ) {   
            body.classList.add('black'); 
            setTimeout(typingEffect,500); //타이핑효과 호출
          
        }
    })

}

// mobile header click 이벤트

for(let i = 0; i < mobileGnb.length - 1; i++){
    mobileGnb[i].addEventListener('click',ev=>{
        ev.preventDefault();

        // 전체 classList, active 지우기
        for(let j = 0; j < sectionElms.length; j++){
            sectionElms[j].classList.remove('active');
            gnbList[j].classList.remove('on');
            body.classList.remove('black');
        }

        // 클릭시 해당 인덱스 active
        sectionElms[i].classList.add('active');
        gnbList[i].classList.add('on');

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

