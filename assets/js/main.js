// Seleção de elementos principais
const inputTask = document.querySelector('.input-task');
const addTaskButton = document.querySelector('.btn-task');
const taskList = document.querySelector('.tasks');

// Adiciona tarefa ao pressionar Enter
inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputTask.value.trim()) {
        createTask(inputTask.value.trim());
    }
});

// Adiciona tarefa ao clicar no botão
addTaskButton.addEventListener('click', () => {
    if (inputTask.value.trim()) {
        createTask(inputTask.value.trim());
    }
});

// Cria um elemento <li> para a tarefa
const createLi = (taskText) => {
    const li = document.createElement('li');
    li.className = 'li-list';
    li.innerText = taskText;
    return li;
};

// Cria um botão com uma classe e texto especificado
const createButton = (className, text) => {
    const button = document.createElement('button');
    button.className = className;
    button.innerText = text;
    button.style.padding = '10px';
    return button;
};

// Cria e adiciona uma nova tarefa
const createTask = (taskText) => {
    const li = createLi(taskText);
    li.appendChild(createButton('delete', 'Delete'));
    taskList.appendChild(li);
    clearInput();
    saveTasks();
};

// Limpa o campo de entrada
const clearInput = () => {
    inputTask.value = '';
    inputTask.focus();
};

// Adiciona funcionalidade de apagar ou marcar/desmarcar tarefas
document.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('delete')) {
        target.parentElement.remove();
        saveTasks();
    }

    if (target.tagName === 'LI') {
        target.classList.toggle('li-check');
        target.classList.toggle('li-list');
    }
});

// Salva as tarefas no localStorage
const saveTasks = () => {
    const tasks = Array.from(taskList.querySelectorAll('li')).map((li) => li.innerText.replace('Delete', '').trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Carrega as tarefas salvas do localStorage
const loadSavedTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => createTask(task));
};

// Inicializa as tarefas salvas ao carregar a página
loadSavedTasks();
