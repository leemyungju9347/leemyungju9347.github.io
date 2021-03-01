const todoForm = document.querySelector('.todoList > form'),
    todoInput = todoForm.querySelector('input'),
    todoList = document.querySelector('.allTodo > ul'),
    finishedList = document.querySelector('.finishedTodo > ul'),
    unfinishedList = document.querySelector('.unfinishedTodo > ul')

let toDos = [];
let finishedToDos = [];
let unfinishedToDos = [];




// 삭제 이벤트
function removeList(ev) {
    const currentLi = ev.target.parentNode;
    const currentId = ev.target.parentNode.id;

    todoList.removeChild(currentLi);

    const newToDos = toDos.filter(value => {
        return value.id !== parseInt(currentId);
    })

    toDos = newToDos;

    const lis = todoList.querySelectorAll('li');

    // toDos 배열 id 값 재정리
    toDos.forEach((element,idx) => {
        let newId = idx + 1;
        element.id = newId;
        lis[idx].id = newId

    });

}


// 할일 완료
function checkList(ev) {
    const btn = ev.target;
    const currentLi = btn.parentNode;
    const currentId = currentLi.id - 1;

    if(  toDos[currentId].status === 'unfinished' ) {
        toDos[currentId].status = 'finished';
        btn.innerHTML = '⛔';
        btn.disabled = true
        console.dir(btn)
    
        // finishedToDos.push(toDos[currentId])
        currentLi.classList.add('checked');
        finishedPaint(toDos[currentId].text)

        console.log('만약에 unfinished일때? 🔵',finishedToDos);
        console.log('만약에 unfinished일때? 🔴',toDos);
        
    } else {
        toDos[currentId].status = 'unfinished';
        btn.innerHTML = '✅'
        currentLi.classList.remove('checked');


        console.log('만약에 finished일때? 🔵',finishedToDos);
        console.log('만약에 finished일때? 🔴',toDos);
        
    }


    // finishedMove(currentId)

}




// function finishedMove(currentId) {
//     const text = toDos[currentId].text;
//     const status = toDos[currentId].status;

//     if( status === 'finished' ) {
//         newId = finishedToDos.length + 1

//         finishedToDos.push({
//             text:text,
//             id:newId,
//             status:status
//         })

//         console.log('✅ 체크할때 finished',finishedToDos);
//     }else {
//         console.log('🔵',finishedToDos);
//         console.log('❤',toDos);

//     }
    
// }


    
function todoPaint(value) {
    const li = document.createElement('li');
    const removeBtn = document.createElement('button');
    const checkBtn = document.createElement('button');
    let idx = toDos.length + 1; // 1부터


    li.innerHTML = value;
    li.id = idx;
    removeBtn.innerHTML = '❌';
    checkBtn.innerHTML = '✅'
    
    li.appendChild(removeBtn);
    li.appendChild(checkBtn);


    removeBtn.addEventListener('click',removeList);
    checkBtn.addEventListener('click',checkList);

    todoList.appendChild(li);


    toDos.push({
        text:value,
        id:idx,
        status:'unfinished'
    })

    unfinishedToDos.push({
        text:value,
        id:idx,
        status:'unfinished'
    })

    console.log('⛔투두 추가 언피니쉬드',unfinishedToDos);
}

function finishedPaint(value) {
    const li = document.createElement('li');
    const removeBtn = document.createElement('button');
    let idx = finishedToDos.length + 1; // 1부터


    li.innerHTML = value;
    li.id = idx;
    removeBtn.innerHTML = '❌';
    
    li.appendChild(removeBtn);


    finishedList.appendChild(li);

    finishedToDos.push({
        text:value,
        id:idx,
        status:'finished'
    })
}




function todoSubmit(ev) {
    ev.preventDefault();
    const currentValue = todoInput.value;
    todoInput.value = ''
    todoPaint(currentValue)
}


function init() {
    todoForm.addEventListener('submit', todoSubmit);

    document.querySelector('.select-btn').addEventListener('click',function(ev){
        console.log(ev.target);
    })
}

init()