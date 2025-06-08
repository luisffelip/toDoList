const btnSalvar = document.getElementById('btnSalvar');
const input = document.getElementById('task');
const lista = document.querySelector('#lista ul'); // Pega a ul que está dentro do id lista
const btnLimpar = document.getElementById('btnFINAL');

let tasks = [];

// Aqui espera o carregamento da página, carrega as tarefas do localStorage e pra cada tarefa existente ele chama a função criar... pra mostrar na tela.
document.addEventListener('DOMContentLoaded', () => {
  tasks = carregarDoLocalStorage();
  tasks.forEach((task) => {
    criarTaskNaTela(task);
  });
});

function saveTask() {
  const task = input.value.trim();

  if (task === '') {
    alert('Digite uma tarefa!');
    return;
  }

  const novaTask = {
    id: Date.now(),
    texto: task,
    concluido: false,
  };

  tasks.push(novaTask);
  salvarNoLocalStorage();
  criarTaskNaTela(novaTask);
}

function criarTaskNaTela(task) {
  const divItem = document.createElement('div');
  divItem.classList.add('listaItem');
  // Vai criar uma div e dar a classe listaItem
  divItem.setAttribute('data-id', task.id);

  const li = document.createElement('li');
  li.textContent = task.texto;
  // Cria o li e adiciona o valor do input ao texto dela

  const checkImg = document.createElement('img');
  checkImg.src =
    './imgs/check_box_outline_blank_24dp_6B7280_FILL0_wght400_GRAD0_opsz24.svg';
  checkImg.alt = 'Checkbox';

  const deleteImg = document.createElement('img');
  deleteImg.src = './imgs/delete_24dp_6B7280_FILL0_wght400_GRAD0_opsz24.svg';
  deleteImg.alt = 'Deletar';
  // Os dois blocos anteriores se refere a criação das tag img para fazer a funcionalidade delas como botão.

  if (task.concluido) {
    li.style.textDecoration = 'line-through';
    li.style.backgroundColor = '#1f1f1f60';
    checkImg.src =
      './imgs/check_box_24dp_6B7280_FILL0_wght400_GRAD0_opsz24.svg';
  }

  divItem.appendChild(li);
  divItem.appendChild(checkImg);
  divItem.appendChild(deleteImg);
  // Os 3 acima adicionam os elementos a div criada (listaItem) e o de baixo adiciona-os a div de id lista que contem uma ul
  lista.appendChild(divItem);

  // Limpa o input
  input.value = '';

  // Marcar task completed
  checkImg.addEventListener('click', () => {
    task.concluido = !task.concluido;
    // Alternador booleano. Ao clicar, o que é false vira true.

    if (task.concluido) {
      li.style.textDecoration = 'line-through';
      li.style.backgroundColor = '#1f1f1f60';
      checkImg.src =
        './imgs/check_box_24dp_6B7280_FILL0_wght400_GRAD0_opsz24.svg'; // imagem de checkbox marcada
    } else {
      li.style.textDecoration = 'none';
      li.style.backgroundColor = '#1f1f1f16';
      checkImg.src =
        './imgs/check_box_outline_blank_24dp_6B7280_FILL0_wght400_GRAD0_opsz24.svg'; // imagem de checkbox vazia
    }

    salvarNoLocalStorage();
  });

  deleteImg.addEventListener('click', () => {
    lista.removeChild(divItem);
    tasks = tasks.filter((t) => t.id !== task.id);
    // incluir no novo array apenas as tarefas cujo id seja diferente do id da tarefa que quero remover
    salvarNoLocalStorage();
  });
}

btnLimpar.addEventListener('click', () => {
  lista.innerHTML = '';
  tasks = [];
  salvarNoLocalStorage();
});

function salvarNoLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function carregarDoLocalStorage() {
  const tasksSalvas = localStorage.getItem('tasks');
  return tasksSalvas ? JSON.parse(tasksSalvas) : [];
}

btnSalvar.addEventListener('click', saveTask);
