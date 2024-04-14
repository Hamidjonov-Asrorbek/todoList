const fullDay = document.getElementById('full-day');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const title_time = document.getElementById('title_time');
const formCreate = document.getElementById('form-create');
const inputCreate = document.getElementById('inputCreate');
const messageCreate = document.getElementById('message-create');
const formEdit = document.getElementById('form-edit');
const inputEdit = document.getElementById('inputEdit');
const listGroupTodo = document.getElementById('list-group-todo');
const closeEl = document.getElementById('close');
const add_btn = document.getElementById('add_btn');




let todoArr = [];

// show error message
function ShowError(where, message){
    document.getElementById(`${where}`).textContent = message;
    
    setTimeout(() =>{
        document.getElementById(`${where}`).textContent = ''
        inputCreate.value = ""
    }, 2000)
}

// form create submit

formCreate.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    let todo = {
        id: Math.floor(Math.random()*1000000),
        text: inputCreate.value.trim(),
        time: getTime()
    }
    if(todo.text.length){
        todoArr.push(todo);
        inputCreate.value = ""
        createTodos(todoArr);
    }
    else{
        ShowError("message-create", "Please enter the text !")
    }
    
})



// create todo

function createTodos(data){
    listGroupTodo.innerHTML = ""
    todoArr.forEach(({id, text}) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `<p>${text}</p>
                        <div class='align-items-center'>
                            <span class='opacity-50 me-2'>${getTime()}</span>
                            <img src="./img/edit.svg" width='25' onclick="editTodo(${id})" alt="edit">
                            <img src="./img/delete.svg" width='25' onclick="deletTodo(${id})" alt="delete">
                        </div>`
        listGroupTodo.appendChild(li)
        
    });
}



// delete todo
function deletTodo(itemId){
    todoArr = todoArr.filter(({id}) => id !== itemId);
    createTodos(todoArr)
}

// edit todo

function editTodo(itemId){
    open();

    formEdit.addEventListener("submit", (e) =>{
        e.preventDefault();
        todoArr = todoArr.map((item) =>{
            if(item.id === itemId){
                return {...item, text: inputEdit.value.trim()};
            }
            return item;
        });
        close();
        createTodos();
        inputEdit.value = ''
    });
};

closeEl.addEventListener("click", () =>{
    close()
})
overlay.addEventListener("click", () =>{
    close()
})

function open(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    
}

function close(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// time 

function getTime(){
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    fullDay.textContent = date;
    title_time.textContent = time;
    return `${hour}:${minute}, ${date}`;
}
setInterval(getTime ,1000);