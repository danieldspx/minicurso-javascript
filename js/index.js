//Start eventListeners
document.getElementById('add-button').addEventListener('click', addTodo)
var statusTodosBtns = document.getElementsByClassName('btn-mark-done-todo');
for(var i = 0; i < statusTodosBtns.length; i++){
  bindEventStatusTodo(statusTodosBtns[i]);
}

var toggleUrgencyBtns = document.getElementsByClassName('btn-toggle-urgency');
for(var i = 0; i < toggleUrgencyBtns.length; i++){
  bindEventUrgencyTodo(toggleUrgencyBtns[i]);
}

var deleteTodosBtns = document.getElementsByClassName('btn-todo-delete');
for(var i = 0; i < deleteTodosBtns.length; i++){
  bindEventDeleteTodo(deleteTodosBtns[i]);
}
//End eventListeners


function addTodo(){
  var todoInput = document.getElementById('task-input');
  var todoList = document.getElementsByClassName('todo-list')[0];
  //Opcao 1
  // var newTodo = document.createElement('div');
  // newTodo.classList.add('todo-item', 'normal');
  // newTodo.innerHTML = '<div class="todo-status">\
  //                       <i class="mdi mdi-checkbox-blank-circle-outline"></i>\
  //                     </div>\
  //                     <div class="todo-text">'+todoInput.value+'</div>';
  // todoList.appendChild(newTodo);
  //
  //Opcao 2
  var todoItem = document.createElement('div');
  todoItem.classList.add('todo-item', 'normal')
  todoItem.insertAdjacentHTML(
    'beforeend',
    '<div class="todo-status">\
      <i class="mdi mdi-checkbox-blank-circle-outline btn-mark-done-todo"></i>\
    </div>\
    <div class="todo-text">'+todoInput.value+'</div>\
    <div class="todo-actions">\
      <i class="mdi mdi-alert-circle btn-toggle-urgency"></i>\
      <i class="mdi mdi-delete btn-todo-delete"></i>\
    </div>'
  );
  todoInput.value = '';
  // todoList.appendChild(todoItem);  //Mostra o errado
  // allBindTodo(todoList);

  allBindTodo(todoList.appendChild(todoItem));
}

function bindEventStatusTodo(elem){
  elem.addEventListener('click', toggleStatusTodo);
}

function parentUpLevel(elem, upLevel){
  if(upLevel != 0){
    return parentUpLevel(elem.parentElement, upLevel-1)
  }
  return elem;
}

function toggleStatusTodo(event){
  var btnTodo = event.target;
  var todoText = parentUpLevel(btnTodo, 2).querySelector('.todo-text');
  // text-decoration: line-through;
  // color: #635d5dba;
  // font-style: italic;
  todoText.style.color = '#635d5dba';
  todoText.style.fontStyle = 'italic';
  todoText.style.textDecoration = 'line-through';
  btnTodo.classList.remove('mdi-checkbox-blank-circle-outline');
  btnTodo.classList.add('mdi-checkbox-multiple-marked-circle-outline');
}

function toggleUrgency(event){
  // var nextUrgency = {
  //   warning: 'normal',
  //   normal: 'critical', //Mostra que da errado
  //   critical: 'warning'
  // };

  var nextUrgency = [
    // [from, to],
    ['warning', 'normal'],
    ['normal', 'critical'],
    ['critical', 'warning']
  ];

  var todoItem = parentUpLevel(event.target, 2);

  for(var i = 0; i < nextUrgency.length; i++){
    if(todoItem.classList.contains(nextUrgency[i][0])){
      todoItem.classList.add('animated', 'flipInX')
      todoItem.classList.remove(nextUrgency[i][0]);
      animateCSS(todoItem, 'flipInX');
      todoItem.classList.add(nextUrgency[i][1]);
      break;
    }
  }
}

function bindEventUrgencyTodo(elem){
  elem.addEventListener('click', toggleUrgency);
}

function animateCSS(elem, animation, callback){
  elem.classList.add('animated', animation);
  elem.addEventListener('animationend', function(){
    this.classList.remove('animated', animation);
    if(callback != null){
      callback();
    }
  })
}

function deleteTodo(event){
  var todoItem = parentUpLevel(event.target, 2);
  animateCSS(todoItem, 'fadeOutRight', function(){
    todoItem.parentElement.removeChild(todoItem);
    if(isAllTodoDone()){
      animateAllDoneTodo()
    }
  });
}

function bindEventDeleteTodo(elem){
  elem.addEventListener('click', deleteTodo)
}

function allBindTodo(todoItem){
  bindEventDeleteTodo(todoItem.querySelector('.btn-todo-delete'));
  bindEventUrgencyTodo(todoItem.querySelector('.btn-toggle-urgency'));
  bindEventStatusTodo(todoItem.querySelector('.btn-mark-done-todo'));
}

//Bonus
function isAllTodoDone(){
  return document.getElementsByClassName('todo-list')[0].children.length == 0;
}

function animateAllDoneTodo(){
  var animationContainer = document.getElementById('animation');
  lottie.loadAnimation({
    container: animationContainer, // the dom element that will contain the animation
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'animations/check-animation.json' // the path to the animation json
  });
}
