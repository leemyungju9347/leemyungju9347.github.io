    //header
        //gnb 메뉴
        enterHeader();
        function enterHeader() {
            const header = document.querySelector('header');
            const gnbLis = header.querySelectorAll('nav > ul > li');
            const gnbBg = document.querySelector('.nav_bg');
            const dimmed = document.querySelector('.dimmed');
            
            for(let i = 0; i < gnbLis.length; i++){
                gnbLis[i].addEventListener('mouseenter', function() {
                    header.classList.add('on');
                    gnbBg.style.height = '294px'
                    dimmed.style.display = 'block'
                });
                gnbLis[i].addEventListener('mouseleave', function() {
                    header.classList.remove('on');
                    gnbBg.style.height = '0';
                    dimmed.style.display = 'none'
                })
            }
        }

        //마스크효과
        const htmlEl = document.querySelector('html');
        const bgElms = document.querySelectorAll('.bg');
        const maskElms = document.querySelectorAll('.mask');
        
        window.addEventListener('scroll', scrollMask);

        function scrollMask() {
            
            if( htmlEl.scrollTop > 560 ){
                bgElms[0].classList.add('queue');
                maskElms[0].classList.add('queue');
            }
            if( htmlEl.scrollTop > 1185 ){
                bgElms[1].classList.add('queue');
                maskElms[1].classList.add('queue');
                maskElms[1].style.backgroundColor = '#a4733a';
                bgElms[2].classList.add('queue');
                maskElms[2].classList.add('queue');
                maskElms[2].style.backgroundColor = '#163b51';
            }
        }

        //모바일 header
        const htmlElm = document.querySelector('html');
        const mNav = htmlElm.querySelector('.m_nav');
        const menuBtn = htmlElm.querySelector('.nav_btn');
        const closeBtn = mNav.querySelector('.m_nav .close');
        const sub = document.querySelectorAll('.m_nav .sub')
        const gnbLis = document.querySelectorAll('.m_gnb > ul > li');
 
        
        //메뉴 열기
        menuBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
                      
            mNav.classList.add('active');
            htmlElm.style.overflow = 'hidden';   
        })

        //메뉴 닫기
        closeBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            
            if( mNav.classList.contains('active') ){
                for(let i = 0; i < gnbLis.length; i++){
                    gnbLis[i].classList.remove('on');
                    sub[i].style.opacity= '0'; 
                    sub[i].style.height = '0';
            }
                mNav.classList.remove('active');
                htmlElm.style.overflow = 'visible';
            }

            })
        
        for(let i = 0; i < gnbLis.length; i++){
            gnbLis[i].addEventListener('click',function (ev) {
                ev.preventDefault();

                
               if( gnbLis[i].classList.contains('on') ){
                    remove();
               }else{
                   for(let i = 0; i < gnbLis.length; i++){
                        gnbLis[i].classList.remove('on');
                        sub[i].style.opacity= '0'; 
                        sub[i].style.height = '0';
                   }
                    gnbLis[i].classList.add('on');
                    sub[i].style.opacity = '1'; 
                    sub[i].style.height = sub[i].scrollHeight + 'px';   
               }
                              
            })

            function remove() {
                gnbLis[i].classList.remove('on');
                sub[i].style.opacity= '0'; 
                sub[i].style.height = '0';
            }
        }
        

        //뉴스 슬라이드
        const slide = document.querySelector('.main_content2 .news_box > .news');
        const slideItem = document.querySelectorAll('.main_content2 .news_box > .news > li');
        const nextBtn = document.querySelector('.main_content2 .bottom > .news_btn > .next');
        const prevBtn = document.querySelector('.main_content2 .bottom > .news_btn > .prev');
        const totalPage = document.querySelector('.news_page > .total');
        let nowPage = document.querySelector('.news_page > .now');
        const slideLen = slideItem.length;
        const slideWidth = 100 / (slideLen + 2);


        let curIndex = 0;

        for(let i = 0; i < slideItem.length; i++){
            slideItem[i].style.width = slideWidth + '%'
        }
        slide.style.width = 100 * (slideLen + 2) + '%';
        slide.style.transform = `translateX(-${slideWidth}%)`; // 슬라이드 초기 위치 셋팅

        totalPage.textContent = slideLen;
        nowPage.textContent = curIndex + 1;

        //슬라이드 복제
        let firstClone = slide.firstElementChild.cloneNode(true);
        let lastClone = slide.lastElementChild.cloneNode(true);
        slide.appendChild(firstClone);
        slide.insertBefore(lastClone,slide.firstElementChild);

        let curSlide = slideItem[curIndex];
        curSlide.classList.add('active');

        nextBtn.addEventListener('click',function(ev){
            ev.preventDefault();

            if( curIndex <= slideLen - 1 ){
                slide.style.transform = `translateX(-${slideWidth * (curIndex + 2)}%)`
                slide.style.transition = `1s`
            }

            if( curIndex === slideLen - 1){
                setTimeout(() => {
                    slide.style.transform = `translateX(-${slideWidth}%)`
                    slide.style.transition = `0s`
                },1001);
            
                curIndex = -1
            }
            curSlide.classList.remove('active');
            curIndex++
            nowPage.textContent = curIndex + 1;
            curSlide = slideItem[curIndex];
            curSlide.classList.add('active')
        })
        
        prevBtn.addEventListener('click',function(ev){
            ev.preventDefault();

            if( curIndex <= slideLen - 1){
                slide.style.transform = `translateX(-${slideWidth * curIndex}%)`
                slide.style.transition = `1s`
            }

            if( curIndex === 0 ){
                setTimeout(() => {
                    slide.style.transform = `translateX(-${slideWidth * slideLen}%)`
                    slide.style.transition = `0s`
                }, 1001);

                curIndex = slideLen
            }

            curIndex--;
            
        })

        //모바일 슬라이드
        visualSlide();

        function visualSlide(){
            const slide = document.querySelector('.mvisual_slide');
            const slideItem = document.querySelectorAll('.mvisual_slide > .slide_item');
            const pageBtn = document.querySelectorAll('.mvisual_slide_area > .page_btn > a');
            let slideLen = slideItem.length;
            let slideWidth = 100 / slideLen;

            for(let i = 0; i < slideLen; i++){
                slideItem[i].style.width = slideWidth + '%'
            }
            slide.style.width = 100 * slideLen + '%'

            pageBtn[0].classList.add('active');

            for(let i = 0; i < pageBtn.length; i++){
                pageBtn[i].addEventListener('click',function(ev){
                    ev.preventDefault();

                    for(let i = 0; i < pageBtn.length; i++){
                        pageBtn[i].classList.remove('active');
                    }

                    pageBtn[i].classList.add('active');
                    slide.style.transform = `translateX(-${slideWidth * i}%)`;
                    slide.style.transition = `0.3s`;
                })
            }

        }

        //footer 패밀리
        const divFm = document.querySelector('footer .family');
        const btn = document.querySelector('footer .fmsite');

        btn.addEventListener('click', function(ev) {
            ev.preventDefault();

            divFm.classList.toggle('on');           
            
        })
