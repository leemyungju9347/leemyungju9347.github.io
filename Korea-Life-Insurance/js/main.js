        
    //header

        //gnb 메뉴
        headerNav()
        function headerNav(){
            const header = document.querySelector('header');
            const lnb = header.querySelectorAll('nav > .gnb > li > .lnb');
            const liElms = header.querySelectorAll('header nav > .gnb > li');

            for(let i = 0; i < liElms.length; i++){
                liElms[i].addEventListener('mouseenter',function(ev){
                    ev.target.classList.add('on')
                    header.style.height = lnb[i].clientHeight + 120 + 'px'
                    header.style.transition = '0.5s'
                    header.style.overflow = 'hidden'
                })

                liElms[i].addEventListener('mouseleave',function(ev){
                    ev.target.classList.remove('on')
                    header.style.height = '80px'
                    header.classList.remove('open')
                })
            }
        }



        //사이트맵
        const html = document.querySelector('html');
        const sitemap = document.querySelector('.sitemap')
        const openBtn = document.querySelector('header .util > .sitemap_open')
        const closeBtn = document.querySelector('.sitemap .sitemap_close')
        
        openBtn.addEventListener('click',function(ev){
            ev.preventDefault();
            if( !sitemap.classList.contains('active') ){
                sitemap.classList.add('active');
                html.style.overflow = 'hidden';
            }
            
        })

        closeBtn.addEventListener('click',function(ev){
            ev.preventDefault();
            if( sitemap.classList.contains('active') ){
                sitemap.classList.remove('active');
                html.style.overflow = 'visible';
            }
        })

    //main

        //게시판 부분
        const tabLis = document.querySelectorAll('#section2 .tab_menu > li');
        const tabConts = document.querySelectorAll('#section2 .tab_cont > .contents');
        
        //첫화면 셋팅
        if( window.innerWidth <= 1200 ){
            tabLis[0].classList.add('on');
            tabConts[0].classList.add('on');
        }else{
            tabLis[1].classList.add('on');
            tabConts[1].classList.add('on');
            
        }


        for(let i = 0; i < tabLis.length; i++){
            tabLis[i].addEventListener('click',function(ev){
                ev.preventDefault();
                //탭에 'on'이 들어오기 전에 먼저 'on' 삭제
                for(let i = 0; i < tabLis.length; i++){
                    tabLis[i].classList.remove('on');
                    tabConts[i].classList.remove('on');
                }

                if( !ev.target.parentNode.classList.contains('on') ){
                    tabLis[i].classList.add('on');
                    tabConts[i].classList.add('on');  
                }
            })
        }

        //사이즈 변경시 셋팅
        window.addEventListener('resize',function(){
            if( window.innerWidth <= 1200 ){
                for(let i = 0; i < tabLis.length; i++){
                    tabLis[i].classList.remove('on');
                    tabConts[i].classList.remove('on');
                }
                
                tabLis[0].classList.add('on');
                tabConts[0].classList.add('on');
            }else{
                
                for(let i = 0; i < tabLis.length; i++){
                tabLis[i].classList.remove('on');
                tabConts[i].classList.remove('on');
                }
                tabLis[1].classList.add('on');
                tabConts[1].classList.add('on');
                
            }
        })
  

        //팝업 슬라이드
        popUpSlide()
        function popUpSlide(){
            const slide = document.querySelector('.popup_slide > ul');
            const slideItem = document.querySelectorAll('.popup_slide > ul > li');
            const pageCircle = document.querySelectorAll('.controls > .page_circle > span');
            const slideLen = slideItem.length;
            const slideItemWidth = 100 / (slideLen + 2);
            let curIndex = 0; //현재 슬라이드 인덱스
       
            //슬라이드의 넓이와 초기 위치 셋팅
            slide.style.width = 100 * (slideLen + 2) + '%';
            for(let i = 0; i < slideItem.length; i++){
                slideItem[i].style.width = slideItemWidth + '%'
            }
            slide.style.transform = `translateX(-${slideItemWidth}%)`


            //슬라이드 양끝에 복제
            let firstChildClone = slide.firstElementChild.cloneNode(true);
            let lastChildClone = slide.lastElementChild.cloneNode(true);
            slide.appendChild(firstChildClone);
            slide.insertBefore(lastChildClone,slide.firstElementChild);

            let autoSlide = setInterval(slidePlay,3000) //슬라이드 자동재생
            
            let curPage = pageCircle[curIndex];
            curPage.classList.add('on');

            function slidePlay(){
                //페이지 버튼 'on'전체삭제
                for(let i = 0; i < pageCircle.length; i++){
                    pageCircle[i].classList.remove('on')
                } 

                if( curIndex <= slideLen - 1 ){
                    slide.style.transform = `translateX(-${slideItemWidth * (curIndex + 2)}%)`
                    slide.style.transition = `all 0.3s ease`
                }

                if( curIndex === slideLen - 1 ){
                    setTimeout(function(){
                        slide.style.transition = `0ms`
                        slide.style.transform = `translateX(-${slideItemWidth}%)`
                        
                    }, 300);

                    curIndex = -1

                }
                curPage.classList.remove('on');
                curIndex++;
                curPage = pageCircle[curIndex];
                curPage.classList.add('on');
            }

            //페이지 버튼과 슬라이드 연결
            for(let i = 0; i < slideLen; i++){
                pageCircle[i].addEventListener('click',function(ev){
                    ev.preventDefault();

                    slide.style.transform = `translateX(-${slideItemWidth * (i + 1)}%)`
                    slide.style.transition = `all 0.3s ease`

                    clearInterval(autoSlide) //슬라이드 정지


                    for(let i = 0; i < pageCircle.length; i++){
                        pageCircle[i].classList.remove('on')
                    }

                    pageCircle[i].classList.add('on');

                    curIndex = i; //슬라이드의 연결을 위해 현재 인덱스에 삽입

                    setTimeout(() => {
                        autoSlide = setInterval(slidePlay,3000)
                    },4000);
                    


                })
            }

            //슬라이드 재생, 일시정지
            const playBtn = document.querySelector('.controls > .play');
            const stopBtn = document.querySelector('.controls > .stop');

            //play버튼
            playBtn.addEventListener('click',function(ev){
                ev.preventDefault();
                playBtn.style.display = 'none'
                stopBtn.style.display = 'block'

                autoSlide = setInterval(slidePlay,3000)
            })
            
            //stop버튼
            stopBtn.addEventListener('click',function(ev){
                ev.preventDefault();
                stopBtn.style.display = 'none'
                playBtn.style.display = 'block'

                clearInterval(autoSlide)
            })
        }
        
    
        //section1 게시판 슬라이드
        boardVerticalSlide()
        function boardVerticalSlide(){
            //notice
            const noticeSlide = document.querySelector('.board_area .notice_slide > ul');
            const noticeSlidePage = noticeSlide.querySelectorAll('.notice_slide > ul > li');

            //news
            const newsSlide = document.querySelector('.board_area .news_slide > ul');
            const newsSlidePage = newsSlide.querySelectorAll('.news_slide > ul > li');
            
            let slidePageLen = noticeSlidePage.length; //슬라이드 페이지 갯수
            const slidePageHeight = 60 //슬라이드 페이지 높이
            let curIndex = 0; //현재 슬라이드 index


            //notice 슬라이드 복제
            let firstNoticeClone = noticeSlide.firstElementChild.cloneNode(true); //첫번째 슬라이드
            let lastNoticeClone = noticeSlide.lastElementChild.cloneNode(true); //마지막 슬라이드
            noticeSlide.appendChild(firstNoticeClone);
            noticeSlide.insertBefore(lastNoticeClone,noticeSlide.firstElementChild);

            //news 슬라이드 복제
            let firstNewsClone = newsSlide.firstElementChild.cloneNode(true); //첫번째 슬라이드
            let lastNewsClone = newsSlide.lastElementChild.cloneNode(true); //마지막 슬라이드
            newsSlide.appendChild(firstNewsClone);
            newsSlide.insertBefore(lastNewsClone,newsSlide.firstElementChild);

            //슬라이드 초기 위치 설정
            noticeSlide.style.transform = `translateY(-${slidePageHeight}px)`
            newsSlide.style.transform = `translateY(-${slidePageHeight}px)`


            //let isPause = true;
            let autoPlay = setInterval(boardSlide, 5000); //슬라이드 자동재생

            
            //notice와 news 슬라이드 같이 움직이도록 하는 함수
            // ****현재 문제점:
            // 1. notice와 news 함수를 각각 따로 만들어서 setInterval을 줄 경우 제각각으로 정신없이 슬라이드가 움직임..
            // 2. 같이 함수를 만들어서 줄 경우? 슬라이드가 정신없이 움직이는 현상이 해결되고, 자연스럽게 움직임 문제없어보이지만,
            // next버튼을 누렀을 경우 두개의 함수를 같이 만들었기때문에 next가 눌려지지 않은 슬라이드는 눌려진 슬라이드와 맞추기 위해서 
            // 슬라이드가 정신없이 자기 위치를 찾음.. 자연스럽게 다음 칸으로 넘어갔으면 좋겠는데, 해결방법이 ..
            function boardSlide(){
                if ( curIndex <= slidePageLen - 1 ){
                    newsSlide.style.transform = `translateY(-${slidePageHeight * (curIndex + 2)}px)`
                    newsSlide.style.transition = `0.7s`

                    noticeSlide.style.transform = `translateY(-${slidePageHeight * (curIndex + 2)}px)`
                    noticeSlide.style.transition = `1s`

                }
                //슬라이드 마지막 페이지 
                if( curIndex === slidePageLen - 1 ){
                    setTimeout(() => {
                        newsSlide.style.transform = `translateY(-${slidePageHeight}px)` // 처음 위치로 돌려놓음
                        newsSlide.style.transition = `0s`

                        noticeSlide.style.transform = `translateY(-${slidePageHeight}px)` // 처음 위치로 돌려놓음
                        noticeSlide.style.transition = `0s`
                        
                    },1000);
                
                    curIndex = -1 // index 초기화
                }

                curIndex++
            }

            //notice 슬라이드 함수
            function nextNoticeSlide(){
                if ( curIndex <= slidePageLen - 1 ){
                    noticeSlide.style.transform = `translateY(-${slidePageHeight * (curIndex + 2)}px)`
                    noticeSlide.style.transition = `1s`

                }
                //슬라이드 마지막 페이지 
                if( curIndex === slidePageLen - 1 ){
                    setTimeout(() => {
                        noticeSlide.style.transform = `translateY(-${slidePageHeight}px)` // 처음 위치로 돌려놓음
                        noticeSlide.style.transition = `0s`

                    },1000);
                
                    curIndex = -1 // index 초기화
                }
                
                curIndex++

            }


            //뉴스 슬라이드 함수 
            function nextNewsSlide(){
                if ( curIndex <= slidePageLen - 1 ){
                    newsSlide.style.transform = `translateY(-${slidePageHeight * (curIndex + 2)}px)`
                    newsSlide.style.transition = `0.7s`

                }
                //슬라이드 마지막 페이지 
                if( curIndex === slidePageLen - 1 ){
                    setTimeout(() => {
                        newsSlide.style.transform = `translateY(-${slidePageHeight}px)` // 처음 위치로 돌려놓음
                        newsSlide.style.transition = `0s`

                    },1000);
                
                    curIndex = -1 // index 초기화
                }

                curIndex++

            }
            
            const boardArea = document.querySelector('.board_area');

            //마우스가 오버되면 정지
            boardArea.addEventListener('mouseover',function (ev) {
                clearInterval(autoPlay)
            })

            //마우스가 영역밖으로 나가면 다시 재생
            boardArea.addEventListener('mouseout',function (ev) {   
                autoPlay = setInterval(boardSlide, 5000)
            })
            
            //next 버튼
            const noticeBtn = boardArea.querySelector('.notice_btn');
            const newsBtn = document.querySelector('.news_btn');

            noticeBtn.addEventListener('click',(ev)=>{
                ev.preventDefault();
                clearInterval(autoPlay)
                nextNoticeSlide()
            })

            let transition = true;
            //만약 transition값이 true일때만 click이벤트 할 수 있도록 한다.
            if( transition ){
                newsBtn.addEventListener('click',clickEvent)
            }else{
                newsBtn.removeEventListener('click',clickEvent)
            }
            

            function clickEvent(ev){
                ev.preventDefault();

                clearInterval(autoPlay)
                nextNewsSlide()
            }
            //transitionrun
            newsSlide.addEventListener('transitionrun',function(){
                // newsBtn.removeEventListener('click',clickEvent)
                transition = !transition
            })

            newsSlide.addEventListener('transitionend',function(){
                // console.log('끝');
                // newsBtn.addEventListener('click',clickEvent)
                transition = true
            })
        }
        
        //footer 배너
        window.addEventListener('load',function(){
            init()
        })

        function init(){
            const banner_swiper = new Swiper('.swiper-container',{
                loop:true,
                autoplay:true,
                slidesPerView:3,
                navigation: {
                    nextEl: '.next_btn',
                    prevEl: '.prev_btn',
                },
                breakpointsInverse:true,
                breakpoints:{
                    768:{
                        slidesPerView:4
                    },
                    900:{
                        slidesPerView:5
                    },
                    1200:{
                        slidesPerView:7
                    }
                }
            })

        //1. 1200이하 5개
        //2. 900이하 4개
        //3. 768이하 3개
        
    }