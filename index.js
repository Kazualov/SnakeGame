var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var snake = {
  x: 160,
  y: 160,
  // Скорость змейки
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

var apple = {
  x: 320,
  y: 320
};

//Игровой процесс
function loop() {
    
    requestAnimationFrame(loop);
    // Игровой код выполнится только один раз из десяти, это нужно для замедления игрового процесса
    if (++count < 10) {
        return;
    }

    //Сбросс поля и скорости
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    //Движение змейки с определенной скоростью
    snake.x += snake.dx;
    snake.y += snake.dy;

    //Перемещение змейки в противоположную часть поля
    if (snake.x < 0) {
      snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
      snake.x = 0;
    }

    if (snake.y < 0) {
      snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
      snake.y = 0;
    }

    //Отрисовка движения
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }

    // Рисуем еду
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    //Движение змейки
    context.fillStyle = 'green';
    // Обрабатываем каждый элемент змейки
    snake.cells.forEach(function (cell, index) {

      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      
      //Когда змейка ест яблоко
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        // Рисуем новое яблочко
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }

      // Проверяем, не столкнулась ли змея сама с собой(перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами) 
      for (var i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          // Задаём стартовые параметры основным переменным
          snake.x = 160;
          snake.y = 160;
          snake.cells = [];
          snake.maxCells = 4;
          snake.dx = grid;
          snake.dy = 0;

          // Ставим яблочко в случайное место
          apple.x = getRandomInt(0, 25) * grid;
          apple.y = getRandomInt(0, 25) * grid;
        }
      }
    });
  }

  document.addEventListener('keydown', function (UIEvent) {
    // Если нажата стрелка влево, и при этом змейка никуда не движется по горизонтали и так далее
    
    if (UIEvent.which === 37 && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    }

    else if (UIEvent.which === 38 && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }

    else if (UIEvent.which === 39 && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }

    else if (UIEvent.which === 40 && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
  });

  requestAnimationFrame(loop);