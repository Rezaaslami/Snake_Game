
  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const tileSize = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 5, y: 5 };
    let score = 0;

    // کنترل‌های کیبورد
    document.addEventListener('keydown', changeDirection);

    // کنترل‌های دکمه‌ای
    document.getElementById('up').addEventListener('click', () => changeDirection({ key: 'ArrowUp' }));
    document.getElementById('down').addEventListener('click', () => changeDirection({ key: 'ArrowDown' }));
    document.getElementById('left').addEventListener('click', () => changeDirection({ key: 'ArrowLeft' }));
    document.getElementById('right').addEventListener('click', () => changeDirection({ key: 'ArrowRight' }));

    function changeDirection(e) {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) direction = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (direction.y === 0) direction = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (direction.x === 0) direction = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (direction.x === 0) direction = { x: 1, y: 0 };
          break;
      }
    }

    function gameLoop() {
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

      // برخورد
      if (
        head.x < 0 || head.x >= gridSize ||
        head.y < 0 || head.y >= gridSize ||
        snake.some(seg => seg.x === head.x && seg.y === head.y)
      ) {
        alert('Game Over! Your score: ' + score);
        document.location.reload();
        return;
      }

      snake.unshift(head);

      // خوردن غذا
      if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
      } else {
        snake.pop();
      }

      draw();
    }

    function placeFood() {
      food.x = Math.floor(Math.random() * gridSize);
      food.y = Math.floor(Math.random() * gridSize);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // مار
      ctx.fillStyle = 'green';
      snake.forEach(part => {
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
      });

      // غذا
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
    }

    // شروع بازی
    setInterval(gameLoop, 150);
  </script>
