window.addEventListener("load", function () {
  // Đối tượng window ta có thể ví nó
  // như cửa sổ trình duyệt browser nên nó cũng có một số sự kiện riêng
  //  sự kiện ở đây là load, nó sẽ load đc style và ảnh mà ko cần DOM load xong
  // Variables declaration
  const form = document.querySelector(".todo-form");
  const todoList = document.querySelector(".todo-list");

  let todos = JSON.parse(localStorage.getItem("todoList")) || [];
  // khởi tao 1 array [] todos bên ngoài để sử dụng nhiều nơi
  // kiểm tra xem có localStore chưa, nếu có sẽ lấy item todoList
  // nếu ko thì [] rỗng
  // JSON.parse  nhận vào một chuỗi JSON và chuyển đổi nó thành một đối tượng JS
  // dùng JSON để lấy về mảng
  // Để lấy ra được dữ liệu trong localStorage của trình duyệt  dùng getItem

  if (Array.isArray(todos) && todos.length > 0) {
    [...todos].forEach((item) => createTodoItem(item));
    // sau khi lấy đc item ở trên chỗ todos thì ktra todos có phải là 1 array ko
    // forEach để duyệt các item trong todos
  }
  // khi load lại thì vẫn giữ đc các item vì item đc lưu trong local Storage

  function createTodoItem(title) {
    // tạo ra để dùng ở nhiều nơi, insert vào todolist ở dưới
    const template = `<div class="todo-item">
    <span class="todo-text">${title}</span>
    <i class="fa fa-trash todo-remove"></i>
  </div>`;
    // sau khi lấy đc giá trị thì in nó vào todoList
    // sau này muốn truyền vào todo-list
    todoList.insertAdjacentHTML("beforeend", template);
    // chèn các node vào các vị trí xác định,
    // vị trí này được chỉ định bởi tham số của hàm.
    // trước khi đóng thẻ nên mỗi lần thêm việc todo nó sẽ nằm sau,
    // giá trị to do trước đó thêm vào, rồi gọi template đó ra
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const todoVal = this.elements["todo"].value;
    // khi submit vào sẽ lấy ra đc giá trị value, bây h làm tnao để đưa ra bên ngoài đc
    if (!todoVal) return;

    // Main code
    createTodoItem(todoVal);
    // khi submit sẽ tạo ra Item
    todos.push(todoVal);
    // đồng thời có value nên push vào arrays todos ban đầu tạo
    // mảng sau sẽ push vào mảng trước tạo thành mảng mới
    // nhưng khi reload thì todos mất nên cần localStorage lưu lại

    localStorage && localStorage.setItem("todoList", JSON.stringify(todos));
    //mỗi lần thêm todo sẽ lưu vào localStorage có tên là todolist, có giá trị là mảng đó
    //JSON.stringify để chuyển một Object sang JSON.
    // save to localStorage
    this.elements["todo"].value = "";
    // mỗi khi lưu lại nó sẽ ở trong localStorage, ko tạo ra 1 mảng mới
  });

  // Handle remove todo
  todoList.addEventListener("click", function (e) {
    if (e.target.matches(".todo-remove")) {
      // nếu event todo-remove match vs todo-list bên HTML
      // thì lúc bấm vào fa-trash sẽ working, đã click vào đc r
      // -> sẽ xóa ở DOM và localStorge

      // remove todo in DOM
      const todo = e.target.parentNode;
      // thẻ cha là todo-remove là todo, khi đã vào đc thẻ cha rồi
      todo.parentNode.removeChild(todo);
      //thẻ cha là todo-list, sẽ xóa thẻ con todo

      // remove todo in localStorage
      const todoText = e.target.previousElementSibling.textContent;
      // lấy đc cái tag của todoText
      // textContent chỉ lấy ra
      const index = todos.findIndex((item) => item === todoText);
      todos.splice(index, 1);
      // xóa item ở vị trí 1
      localStorage.setItem("todoList", JSON.stringify(todos));
      // set lại 1 mảng mới khi xóa item thì nó sẽ ko lưu trong localStorage
    }
  });
});
