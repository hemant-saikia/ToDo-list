//Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector( '.filter-todos');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);



//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    if (todoInput.value === ""){
        return;
    }

    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create the LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add to local storage
    
    SaveLocalTodo(todoInput.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND to List
    todoList.appendChild(todoDiv);

    //clear todo INput value
    todoInput.value = "";

}

function deleteCheck(event){
    const item = event.target;

    //DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocatTodos(todo);
        RemoveLocalTodoCompleted(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //CHECK Complete
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");

        if (todo.classList.contains('completed')){
            SaveLocalTodoCompleted(todo.children[0].innerText);
        }
        else{
            RemoveLocalTodoCompleted(todo)
        }
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
   
    todos.forEach( function (todo)
    {
        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
        
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                    // todo.remove();
                }
                else
                {
                    todo.style.display = 'none';
                }
                break;
        
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }
                else
                {
                    todo.style.display = 'none';
                }
                break;
        
            default:
                break;
        }
    });
}

function SaveLocalTodo(todo){
    //CHECK
    let todos ;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function SaveLocalTodoCompleted(todo){
    //CHECK
    let todos ;
    let tlist = localStorage.getItem('todosCompleted');
    
    if(localStorage.getItem('todosCompleted') === null || localStorage.getItem('todosCompleted').length == 0 ){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todosCompleted'));
    }
    console.log(todo);
    todos.push(todo);
    localStorage.setItem('todosCompleted', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    let todoCompleted;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    if(localStorage.getItem('todosCompleted') === null){
        todoCompleted = [];
    }
    else{
        todoCompleted = JSON.parse(localStorage.getItem('todosCompleted'));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //check If completed

        if (todoCompleted.indexOf(todo) != -1){
            todoDiv.classList.add("completed");
        }

        //create the LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        //APPEND to List
        todoList.appendChild(todoDiv);
    });
}

function removeLocatTodos(todo){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // let todoIndex = todos.indexOf(todo);
    // todos.splice(i,1);
    const todotext = todo.children[0].innerText;
    let todoIndex = todos.indexOf(todo);
    todos.splice(todoIndex,1);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function RemoveLocalTodoCompleted(todo){
    if(localStorage.getItem('todosCompleted') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todosCompleted'));
    }
    
    const todotext = todo.children[0].innerText;

    let todoIndex = todos.indexOf(todotext);
    todos.splice(todoIndex,1);
    localStorage.setItem('todosCompleted', JSON.stringify(todos));


}