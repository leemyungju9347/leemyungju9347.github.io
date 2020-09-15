const gnbList = document.querySelectorAll('header > nav > .gnb-menu > li');
const sectionElms = document.querySelectorAll('main > .section-wrap > section');
const sectionWrap = document.querySelector('main > .section-wrap')
const body = document.querySelector('body');

console.log(gnbList);

for(let i = 0; i < gnbList.length; i++){
    gnbList[i].addEventListener('click', (ev)=>{
        ev.preventDefault();

        // 전체 active 지우기
        for(let i = 0; i < sectionElms.length; i++){
            sectionElms[i].classList.remove('active');
            body.classList.remove('black');
            sectionWrap.classList.remove('change');
        }

        sectionElms[i].classList.add('active');
        sectionWrap.classList.add('change');

        if( sectionElms[i].classList.contains('about') ) {
            body.classList.add('black');
        }
    })
}