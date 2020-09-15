const gnbList = document.querySelectorAll('header > nav > .gnb-menu > li');
const sectionElms = document.querySelectorAll('main > .section-wrap > section');
const sectionWrap = document.querySelector('main > .section-wrap')
const body = document.querySelector('body');
// const typing = document.querySelector('section.about .typing');

// console.log(typing);
for(let i = 0; i < gnbList.length; i++){
    gnbList[i].addEventListener('click', (ev)=>{
        ev.preventDefault();

        // 전체 active 지우기
        for(let j = 0; j < sectionElms.length; j++){
            sectionElms[j].classList.remove('active');
            gnbList[j].classList.remove('on');
            body.classList.remove('black');
        }

        sectionElms[i].classList.add('active');
        gnbList[i].classList.add('on');

        if( sectionElms[i].classList.contains('about') ) {
            body.classList.add('black');
            // typingEffect();
            // setInterval(typingEffect,1000)
        }
    })

    
}


function typingEffect(){
    let text = '제 스킬을 소개합니다 🙋‍♀️';
    let i = 0;

    // setInterval(()=>{
    //     console.log('a');
    // })

    // if( i < text.length ){
    //     document.querySelector('section.about .typing').innerHTML += text[i];
    //     console.log(document.querySelector('section.about .typing').innerHTML);
    //     i++;

    //     // console.log(text[i]);
        
    // }

    

    
}