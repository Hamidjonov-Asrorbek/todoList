const formCreate = document.getElementById('form-create');
const inputCreate = document.getElementById('inputCreate');
const formEdit = document.getElementById('form-edit');
const listGroupTodo = document.getElementById('list-group-todo');
const closeEl = document.getElementById('close');
const add_btn = document.getElementById('add_btn');

let todoArr = [];

formCreate.addEventListener('submit', (e) =>{
    e.preventDefault();
    let todo = {
        id: Math.floor(Math.random()*1000000),
        text: inputCreate.value
    }
    todoArr.push(todo);
    inputCreate.value = ""
    createTodos(todoArr);
    // listGroupTodo.innerHTML += `<li>${text}</li>`

})

function createTodos(todoArr){
    listGroupTodo.innerHTML = ""
    todoArr.forEach(({id, text}) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `<p>${item}</p>
                        <div>
                            <img src="./img/delete.svg" onclick="deletTodo(${id})" alt="delete">
                        </div>;`
        listGroupTodo.appendChild(li)
    });
}

// function deletTodo(itemId){
//     todoArr = todoArr.filter(({id}) => id !== itemId);
//     createTodos(todoArr)
// }
