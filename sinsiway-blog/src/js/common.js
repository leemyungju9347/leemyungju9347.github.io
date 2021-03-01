// header
function createHeader() {
    document.querySelector('header').innerHTML = `
    <div class="header-inner">
        <h1 class="main-logo">
        <a href="./index.html">
            <img src="./src/images/mainLogo.png" alt="신시웨이 로고">
        </a>
        </h1>
        <div class="utils-btn-area">
            <form class="search-form" action="">
                <input class="search-input" type="text" placeholder="검색어를 입력해주세요.">
                <button type="submit" class="search-btn">
                    <i class="fas fa-search"></i>
                    <span>검색</span>
                </button>
            </form>
            <div class="nav-btn-box">
                <a href="">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
        </div>
    </div>
    `

}

// nav menu
function createNavmenu() {
    document.querySelector('.navMenu').innerHTML = `
    <div class="nav-inner">
        <!-- 네비게이션 헤더 부분 -->
        <div class="nav-header">
            <a href="./index.html" class="nav-logo">
                <img src="./src/images/logo.png" alt="신시웨이 로고">
            </a>
            <a class="close-btn">
                <span></span>
                <span></span>
            </a>
        </div>
        <!-- 네비게이션 메뉴 -->
        <nav>
            <ul class="nav-list">
                <li>
                    <a href="./blogPost-list.html">홈</a>
                </li>
                <li>
                    <a href="./blogPost-list.html">신시人사이드</a>
                </li>
                <li>
                    <a href="./blogPost-list.html">신시웨이 인사이드</a>
                </li>
                <li>
                    <a href="./blogPost-list.html">보안 이슈 및 동향</a>
                </li>
                <li>
                    <a href="./blogPost-list.html">IT 동향</a>
                </li>
                <li>
                    <a href="./blogPost-list.html">IT 일반</a>
                </li>
                <li>
                    <a href="./blogPost-list.html">기획 연재</a>
                </li>
                <li>
                    <a href="./blogPost-list.html">신시호(The Weekly IT News)</a>
                </li>
                <li>
                    <a href="./blogPost-list.html">이벤트</a>
                </li>
            </ul>
        </nav>
    </div>
    `

}

// footer
function createFooter() {
    document.querySelector('footer').innerHTML = `
    <div class="footer-inner">
        <!-- 푸터 탑 -->
        <div class="footer-top">
            <div class="companyLink-wrap">
                <p class="company-infoLink">
                    <a href="">이용약관</a>
                    <a href="">개인정보보호</a>
                    <a href="">뉴스레터신청</a>
                </p>
                <p class="company-address">서울특별시 송파구 법원로 9길 26(문정동) 에이치비지니스파크 D동 4층 T (02) 6281-9613</p>
                <p class="company-allRight">ⓒ 2020 SINSIWAY. All rights reserved.</p>
            </div>
            <div class="site-selectBox">
                <select name="" id="">
                    <option value="">패밀리 사이트</option>
                    <option value="">신시웨이 홈페이지</option>
                    <option value="">Sinsiway Global</option>
                    <option value="">엑셈 홈페이지</option>
                    <option value="">엑셈 이야기</option>
                </select>
                <span class="arrow-icon"><i class="fas fa-sort-down"></i></span>
            </div>
        </div>
        <!-- 푸터 바텀 -->
        <div class="footer-bottom">
            <ul class="snsLink-area">
                <li class="facebook">
                    <a href="">
                        <i class="link-icon"></i>
                        <span>신시웨이 페이스북</span>
                    </a>
                </li>
                <li class="instagram">
                    <a href="">
                        <i class="link-icon"></i>
                        <span>신시웨이 인스타그램</span>
                    </a>
                </li>
                <li class="youTube">
                    <a href="">
                        <i class="link-icon"></i>
                        <span>신시웨이 유튜브</span>
                    </a>
                </li>
                <li class="email">
                    <a href="">
                        <i class="link-icon"></i>
                        <span>신시웨이 이메일</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    `
}

createHeader()
createFooter()
createNavmenu() 


const html = document.querySelector('html');
const navBtn = document.querySelector('.nav-btn-box > a');
const navMenuArea = document.querySelector('.navMenu');
const navCloseBtn = document.querySelector('.close-btn');
const navDimmed = document.querySelector('.nav-dimmed');

// 네비게이션 메뉴 열기
navBtn.addEventListener('click',function (ev) {
    ev.preventDefault()
    navMenuArea.classList.add('active');
    html.style.overflow = 'hidden';
    navDimmed.classList.add('active');
})

// 네비게이션 메뉴 닫기
navCloseBtn.addEventListener('click',function(ev) {
    ev.preventDefault();
    navMenuArea.classList.remove('active');
    html.style.overflow = 'unset';
    navDimmed.classList.remove('active')
})
