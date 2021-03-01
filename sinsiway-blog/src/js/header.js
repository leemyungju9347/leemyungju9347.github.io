function headerElm() {
    document.querySelector('header').innerHTML = `
    <div class="header-inner">
        <h1 class="main-logo">
            <img src="./src/images/logo.png" alt="신시웨이 로고">
        </h1>
        <div class="utils-btn-area">
            <button class="search-btn">
                <i class="fas fa-search"></i>
                <span>검색</span>
            </button>
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

headerElm()