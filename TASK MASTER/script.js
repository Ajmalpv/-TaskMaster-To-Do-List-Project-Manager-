
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');
  const saveButton = document.getElementById('saveButton');

  // Function to create new todo item
  function createTodoItem(text) {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="checkbox">
      <span class="todo-text"><span>${text}</span></span>
      <button class="delete-btn">&#10006;</button>
    `;
    todoList.appendChild(li);
  }

  // Add event listener to form for adding new todo item
  todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      createTodoItem(todoText);
      todoInput.value = '';
    }
  });

  // Add event listener to delete button for removing todo item
  todoList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      event.target.parentElement.remove();
    }
  });

  // Add event listener to checkboxes for applying line style
  todoList.addEventListener('change', function(event) {
    if (event.target.classList.contains('checkbox')) {
      const listItem = event.target.parentElement;
      const todoText = listItem.querySelector('.todo-text span');
      if (event.target.checked) {
        todoText.classList.add('strike-through');
      } else {
        todoText.classList.remove('strike-through');
      }
    }
  });

  // Add event listener to save button
  saveButton.addEventListener('click', async () => {
    try {
      const handle = await window.showDirectoryPicker();
      const fileHandle = await handle.getFileHandle('todo_list.txt', { create: true });
      const writable = await fileHandle.createWritable();
      const todos = Array.from(todoList.children).map(li => li.textContent.trim()).join('\n');
      await writable.write(todos);
      await writable.close();
      alert('Todo list saved successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  });
