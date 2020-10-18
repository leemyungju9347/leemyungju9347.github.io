const toDoForm = document.querySelector('.js-todoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList')

const TODOS_LS = 'toDos';

let toDos = []; //투두리스트 배열

//로컬에 저장
function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)) //로컬에 투두리스트 배열을 json형식으로 저장
    //로컬에는 자바스크립트 형태의 데이터를 저장할 수 없음
    //JSON.stringify를 사용하면 object형식을 string으로 바꿔줌
}

//삭제 이벤트 함수
function deleteToDo(ev){
    const btn = ev.target
    const li = btn.parentNode;

    toDoList.removeChild(li)

    //filter 조건에 일치하는 것만 출력
    const cleanToDo = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id) 
        //모든 toDo.id가 li.id와 같지 않을때
        //parseInt() - 문자열을 정수로 바꾸는 함수
    })


    toDos = cleanToDo

    saveToDos()
}  


function paintToDo(text){
    const liElm = document.createElement('li')
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    
    const newId = toDos.length + 1; 

    delBtn.innerText = '❌'

    delBtn.classList.add('delete_btn')
    
    span.innerText = text

    delBtn.addEventListener('click',deleteToDo)
    
    liElm.appendChild(delBtn)
    liElm.appendChild(span)
    

    liElm.id = newId;

    toDoList.appendChild(liElm)
    
    const toDoObj = {
        text:text,
        id:newId,
    }

                            
    toDos.push(toDoObj)
    
    saveToDos()
    
}


//입력값 전달 함수
function formHandleSubmit(ev){
    ev.preventDefault();
    
    const currentValue = toDoInput.value;
    
    if( currentValue ){
        paintToDo(currentValue) // 페인트 함수에 입력된 value 값 전달  
        toDoInput.value = '';

    }

}


//로컬에 있는 투두리스트 불러오기
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS)
    
    if( loadedToDos !== null ){
        const parsedToDos = JSON.parse(loadedToDos); 
        // 로컬에서 투두리스트는 string 형태로 저장되어있음 
        // 이것을 객체로 변경해주기 위한 과정
        
        //parsedToDos.forEach(something) // forEach - 바깥에 함수를 두고 실행할 수 있음
        
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text,toDo.check)
        })
    }
}


//상위 함수 
function formInit(){
    loadToDos();
    
    toDoForm.addEventListener('submit', formHandleSubmit) //투두리스트 추가

}

formInit()