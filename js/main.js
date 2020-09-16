const body = document.querySelector('body');
const gnbList = body.querySelectorAll('header > nav > .gnb-menu > li');
const sectionElms = body.querySelectorAll('main > .section-wrap > section');
const sectionWrap = body.querySelector('main > .section-wrap')
const typing = body.querySelector('section.about .typing');
const typingIcon = body.querySelector('.sub-title > .typing-icon');
const skillList = body.querySelector('.skills-list');

let timer; // 셋타임아웃 컨트롤 할 수 있는 전역변수

let typingTxt = '제 스킬을 소개합니다';
typingTxt = typingTxt.split('');
let index = 0;

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

// click 이벤트
for(let i = 0; i < gnbList.length; i++){
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


