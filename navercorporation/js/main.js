        
        //header gnb메뉴
		enterNav(document.querySelector('.nav_container'));

		function enterNav(obj) {
			var liEls = obj.children;
			
			for(var i = 0; i < liEls.length; i++){
				if(liEls[i].querySelector('.sub')){
					liEls[i].addEventListener('mouseenter', enterWork);
					liEls[i].addEventListener('mouseleave', leaveWork);
				}
				
			}
			function enterWork(e) {
				this.querySelector('.sub').classList.add('on');
				
			}

			function leaveWork(e) {
				this.querySelector('.sub').classList.remove('on');

			}
		}

		//header 스크롤
		window.addEventListener('scroll',scrollWork);
		
		
		function scrollWork() {
			var htmlEl = document.querySelector('html');
			var headEl = htmlEl.querySelector('header');
			var htmlScrTop = htmlEl.scrollTop;

			if(htmlScrTop > 150 ){
				headEl.classList.add('on');
			}
			if ( htmlScrTop < 120 ){
				headEl.classList.remove('on');
				
			}

		}


	//메뉴박스
	enterBox();

	function enterBox() {
		var btn = document.querySelector('.affiliate_menu');
		var listBox = btn.querySelector('ul');
		
		btn.addEventListener('click',listOpen);
		window.addEventListener('click', close);
		

		function listOpen(ev) {
			ev.preventDefault();
			listBox.classList.add('on');
		
		}
			
		function close(ev) {
			if (ev.target.tagName === 'A') return;
			
			if( !check(ev.target,listBox) ){
				listBox.classList.remove('on');
			}

		}

		function check(clickTarget,listBox) {	
			while( clickTarget.tagName !== 'HTML' ){
				if( clickTarget.tagName === listBox.tagName ){
					return true;
				}

				clickTarget = clickTarget.parentNode;
			}
			return false
		}
	}

	//사이트맵
	clickSiteMap();
	function clickSiteMap() {
		var header = document.querySelector('header');
		var btn_box = header.querySelector('.btn_box');
		
		btn_box.addEventListener('click', clickWork);

		function clickWork(ev) {
			ev.preventDefault();
			
			if( ev.target.tagName !== 'SPAN' && ev.target.tagName !== 'A' ) return;
			
			if( header.classList.contains('active') ){
				header.classList.remove('active');
			}else{
				header.classList.add('active');
			}
			
		}
	}

	//메인 슬라이드
		const slide = document.querySelector('.slide_area > .slide');
		const slideItem = document.querySelectorAll('.slide_area > .slide > .slide_item');
		const slideContens = document.querySelectorAll('.slide_area > .slide_contents_list > .slide_contents');
		let curPage = document.querySelector('.slide_area > .slide_contents_list > .slide_page > .current');
		const totalPage = document.querySelector('.slide_area > .slide_contents_list > .slide_page > .total');
		let progressBar = document.querySelector('.slide_contents_list > .progress_bar > span');
		const slideLen = slideItem.length; //슬라이드 갯수
		const slideWidth = 100 / (slideLen + 2); //슬라이드 아이템 width
		let curIndex = 0; //현재 슬라이드 index


		//슬라이드 넓이 지정
		for(let i = 0; i < slideLen; i++){
			slideItem[i].style.width = slideWidth + '%'
		}
		//전체 슬라이드 크기
		slide.style.width = 100 * (slideLen + 2) + '%' 

		//슬라이드 초기 위치
		slide.style.transform = `translateX(-${slideWidth}%)`

		totalPage.innerHTML = slideLen;

		//슬라이드 복제
		let firstClone = slide.firstElementChild.cloneNode(true);
		let lastClone = slide.lastElementChild.cloneNode(true);
		slide.appendChild(firstClone);
		slide.insertBefore(lastClone,slide.firstElementChild)

		//현재 슬라이드에 클래스 이름 저장
		let curContents = slideContens[curIndex];
		curContents.classList.add('active');

		curPage.innerHTML = curIndex + 1;
		let autoSlide; //슬라이드 자동 재생을 위한 변수 저장

		slidePlay();
		
		progressBar.style.width = `${20}%`

		function slidePlay(){
			autoSlide = setInterval(() => {
				if( curIndex <= slideLen - 1){
				slide.style.transform = `translateX(-${slideWidth * (curIndex + 2)}%)`
				slide.style.transition = `1s`
			}

			if( curIndex === slideLen - 1){
				setTimeout(() => {
					slide.style.transition = `0ms`
					slide.style.transform = `translateX(-${slideWidth}%)`
				}, 1000);

				curIndex = -1 // index 초기화
			}
				curContents.classList.remove('active');
				curIndex++;//현재 슬라이드에 클래스를 주기 위한 index 업데이트
				curContents = slideContens[curIndex];
				curPage.innerHTML = curIndex + 1;

				progressBar.style.width = `${(curIndex + 1) * 20}%`
				curContents.classList.add('active')
			}, 6000);
			
		}

		//이전,다음 버튼
		const prevBtn = document.querySelector('.slide_area > .slide_contents_list > .prev');
		const nextBtn = document.querySelector('.slide_area > .slide_contents_list > .next');

		//기본 슬라이드 함수
		function nextSlide(){
			if( curIndex <= slideLen - 1){
				slide.style.transform = `translateX(-${slideWidth * (curIndex + 2)}%)`
				slide.style.transition = `1s`
			}

			if( curIndex === slideLen - 1){
				setTimeout(() => {
					slide.style.transition = `0ms`
					slide.style.transform = `translateX(-${slideWidth}%)`
				}, 1000);

				curIndex = -1
			}
				curContents.classList.remove('active');
				curIndex++;
				curContents = slideContens[curIndex];
				curPage.innerHTML = curIndex + 1;

				progressBar.style.width = `${(curIndex + 1) * 20}%`
				curContents.classList.add('active');

		}

		//다음버튼
		nextBtn.addEventListener('click',function(ev){
			ev.preventDefault();

			nextSlide()
			
			clearInterval(autoSlide) //슬라이드 정지

			slidePlay() //슬라이드 다시 실행
		})

		//이전버튼
		prevBtn.addEventListener('click',function(ev){
			ev.preventDefault();

			clearInterval(autoSlide) //슬라이드 정지

			if( curIndex <= slideLen - 1 ){
				slide.style.transform = `translateX(-${slideWidth * curIndex }%)`
				slide.style.transition = `1s`
			}

			if( curIndex === 0 ){
				setTimeout(() => {
					slide.style.transform = `translateX(-${slideWidth * slideLen }%)`
					slide.style.transition = `0s`

				}, 1000);

				curIndex = slideLen
			}
			curContents.classList.remove('active')
			curIndex--;
			curContents = slideContens[curIndex];
			curPage.innerHTML = curIndex + 1;
			progressBar.style.width = `${(curIndex + 1) * 20}%`;
			curContents.classList.add('active');
			
			
			slidePlay() //슬라이드 다시 자동 재생
		})