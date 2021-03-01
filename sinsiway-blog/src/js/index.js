const contentDesc = document.querySelectorAll('.p-desc');
const contentSubject = document.querySelectorAll('.p-subject');


// 글자 제한
function textEdit() {
    const descMaxNum = 150;
    const subjMaxNum = 23;

    contentDesc.forEach(content => {
        if( content.innerHTML.length >= descMaxNum ) {
            content.innerHTML = content.innerHTML.substr(0,descMaxNum) + '...'
        }
    });


    contentSubject.forEach(content => {

        if( content.innerHTML.length >= subjMaxNum ) {
            content.innerHTML = content.innerHTML.substr(0,subjMaxNum) + '...'
        }
    })
}


textEdit()


