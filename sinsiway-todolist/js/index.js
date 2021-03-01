const todoForm = document.querySelector('.todo-form'),
    todoInput = todoForm.querySelector('.todo-input'),
    todoList = document.querySelector('.todo-list'),
    todoSelect = document.querySelector('.select-btn-box'),
    todoBtns = document.querySelectorAll('.select-btn-box > .select-btn'),
    allDeleteBtn = document.querySelector('.all-delete-btn'),
    emptyMessage = document.querySelector('.todo-empty')

let toDos = [];
let status = true;
let editIndex = null;


// 이벤트
todoForm.addEventListener('submit',createTodo);
todoList.addEventListener('click',deleteCheck);
todoSelect.addEventListener('click',selectTodo);
allDeleteBtn.addEventListener('click',todoAllDelete)



// todolist 엘리먼트 생성
function createTodoElms(text){
    let newId = toDos.length + 1

    // li 생성
    const li = document.createElement('li');

    li.classList.add('todo-item');
    li.id = newId

    // span 생성
    const span = document.createElement('span');

    span.innerHTML = text;
    // span.contentEditable = true;
    li.appendChild(span)

    // 완료 버튼
    const finishBtn = document.createElement('button');
    finishBtn.innerHTML = '<i class="fas fa-check"></i>';
    finishBtn.classList.add('finished-btn');

    li.appendChild(finishBtn);
    li.classList.add('appear');

    li.addEventListener('animationend',function() {
        li.classList.remove('appear');
    })

    // 수정 버튼
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editBtn.classList.add('edit-btn');

    li.appendChild(editBtn);
    

    // 삭제 버튼
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
    deleteBtn.classList.add('delete-btn');

    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    toDos.push({
        text: text,
        id: newId
    });

    
}


// todo Form 제출 
function createTodo(ev) {
    ev.preventDefault();

    const currentValue = todoInput.value;

    // 첫 input입력시 리스트로 제출
    if( currentValue && status ) {
        createTodoElms(currentValue);

        emptyMessage.style.display = 'none'
    
    // 수정 모드일때 리스트로 제출
    } else if( !status ){
        const todoLis = document.querySelectorAll('.todo-item');
        const todoSpan = todoLis[editIndex-1].querySelector('span');

        todoSpan.innerHTML = todoInput.value;

        status = true;
    }

    todoInput.value = ''

}


// 삭제 / 완료 이벤트
function deleteCheck(ev) {
    const clickBtn = ev.target;

    // 삭제버튼
    if (clickBtn.classList[0] === 'delete-btn') {
        const todo = clickBtn.parentElement;
        const todoParent = todo.parentNode;

        elmRemove(todo);

        console.log(todoParent);
        console.dir(todoParent);

        

    }

    // 완료버튼
    if( clickBtn.classList[0] === 'finished-btn') {
        const todo = clickBtn.parentElement;
        todo.classList.toggle('finished');
    }

    // 수정 버튼
    if (clickBtn.classList[0] === 'edit-btn') {
        status = false;
        const todo = clickBtn.parentNode;
        const text = todo.querySelector('span').innerHTML;

        todoInput.value = text;
        editIndex = todo.id;

    }
}


// 전체 목록 / 완료 목록 / 미완료 목록 선택
function selectTodo(ev){
    const todos = todoList.childNodes;

    todos.forEach(todo=>{
        switch (ev.target.value) {
            case 'all':
            todo.style.display = 'flex';
            allDeleteBtn.classList.remove('on');
            break;

            case 'finished':
            allDeleteBtn.classList.add('on');
            if(todo.classList.contains('finished')) {
                todo.style.display = 'flex';
                
            }else {
                todo.style.display = 'none'
            }

            break;

            case 'unfinished':
            allDeleteBtn.classList.remove('on');
            if(!todo.classList.contains('finished')) {
                todo.style.display = 'flex';
                
            }else {
                todo.style.display = 'none'
            }

            break;
        }

        classListRemove()
        ev.target.classList.add('check')
    })
}

// 엘리먼트 애니메이션 효과줘서 삭제, li 엘리먼트 id 값 재정의 
function elmRemove(elm) {
    elm.classList.add('fall');

    elm.addEventListener('transitionend',function(){
        elm.remove()

        const todoLis = todoList.querySelectorAll('.todo-item')

        // 삭제 후 리스트 id 값 재정렬
        todoLis.forEach((item,idx)=>{
            todoLis[idx].id = idx + 1
        })
    })
}

// 전체 / 할일 / 완료 버튼 클래스 리스트 전부 지우는 함수
function classListRemove() {
    todoBtns.forEach(btn => {
        btn.classList.remove('check')
    })
}

// 완료된 리스트 전체 삭제
function todoAllDelete() {
    const lis = todoList.querySelectorAll('li');

    lis.forEach(item => {
        if( item.classList.contains('finished') ) {
            elmRemove(item)
        }
    })


}