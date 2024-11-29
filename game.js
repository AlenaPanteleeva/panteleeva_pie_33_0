// Переменные для состояния игры
let playerName = "";
let gameState = 1;
const gameTextElement = document.getElementById("gameText");
const choicesElement = document.getElementById("choices");
const nameInput = document.getElementById("nameInput");
const startButton = document.getElementById("startButton");

// Функция для начала игры, проверка корректности имени
function startGame() {
  playerName = nameInput.value.trim();
  if (validateName(playerName)) {
    nameInput.style.display = "none";
    startButton.style.display = "none";
    updateGameText(`Добро пожаловать, ${playerName}! Вы находитесь в классе. Что хотите сделать?`);
    displayChoices(["Подойти к учителю", "Поговорить с одноклассниками", "Сесть за парту"]);
    gameState = 1;
  } else {
    alert("Имя должно содержать только буквы.");
  }
}

// Функция для проверки корректности имени
function validateName(name) {
  const namePattern = /^[a-zA-Zа-яА-Я]+$/;
  return namePattern.test(name);
}

// Функция для обновления текста в игре
function updateGameText(text) {
  gameTextElement.textContent = text;
}

// Функция для отображения кнопок выбора
function displayChoices(choices) {
  choicesElement.innerHTML = "";
  choices.forEach((choiceText, index) => {
    const button = document.createElement("button");
    button.textContent = choiceText;
    button.classList.add("btn", "btn-dark", "w-100", "mb-2", 'comfortaa-700');
    button.onclick = () => handleChoice(index + 1);
    choicesElement.appendChild(button);
  });
}

// Функция для обработки выбора игрока
function handleChoice(choice) {
  switch (gameState) {
    case 1: // Сцена "Вход в класс"
      if (choice === 1) {
        updateGameText("Учитель заметил вас и спрашивает что случилось. Что вы ответите?");

        displayChoices(["У меня болит живот, можно домой", "Попросить исправить двойку"]);
        displayImage("image/student_and_teacher.png", "Учитель и ученик");
        gameState = 2;
      } else if (choice === 2) {
        updateGameText("Одноклассники обсуждают победу Трампа на выборах. А вы довольны?");
        displayChoices(["Да, ждем легендарное возвращение оригинальной Кока-Колы", "Да мне вообще пофиг, мне и так хорошо живется"]);
        displayImage("image/trump.jpg", "Трамп");
        gameState = 3;
      } else {
        updateGameText("Вы садитесь за парту. Списывать домашку или отвлечься?");
        displayChoices(["Списать домашку", "Играть на телефоне"]);
        displayImage("image/student_at_his_desk.png", "Учитель и ученик");
        gameState = 4;
      }
      break;

    case 2: // Сцена "Болит живот"
      if (choice === 1) {
        updateGameText("Учитель не может дать вам таблетку, но вы можете сходить к врачу. Какие ваши действия?", "image/student_and_teacher.png");
        displayChoices(["Пойти к врачу", "Сесть за парту и терпеть"]);
        displayImage("image/student.png", "Ученик");
        gameState = 21;
      } else {
        updateGameText("Учитель соглашается исправить вашу двойку, если решите математическую задачу. Введите ответ:");
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;

        // Случайный выбор операции
        const operations = ["+", "-", "*", "/"];
        const randomOperation = operations[Math.floor(Math.random() * operations.length)];
        let correctAnswer;
        switch (randomOperation) {
          case "+":
            correctAnswer = num1 + num2;
            break;
          case "-":
            correctAnswer = num1 - num2;
            break;
          case "*":
            correctAnswer = num1 * num2;
            break;
          case "/":
            correctAnswer = Math.floor(num1 / num2);
            break;
        }

        // Слушаем ввод пользователя и проверяем ответ
        const userAnswer = parseInt(prompt(`Введите ваш ответ: ${num1} ${randomOperation} ${num2} = ?`));

        if (userAnswer !== correctAnswer) {
          // Если ответ неверный, показываем кнопки для выбора "рассказать" или "не рассказывать"
          updateGameText("Ответ неверный. Учитель не исправил вашу двойку. Вот я влип, родители меня накажут. Может не рассказывать им?", "image/student.png");

          // Отображаем новые кнопки
          displayChoices(["Рассказать родителям", "Не рассказывать родителям"]);
          gameState = 6
        } else {
          endGame("Вы правильно решили задачу и учитель исправил вашу двойку. Придите домой и порадуйте родителей!")

        }
      }
      break;
    case 3: 
      if (choice === 1) {
       
        updateGameText("Вы разделяете радость с одноклассниками, ждете возвращения Кока-Колы. Давайте погрузимся в атмосферу волшебства вместе:");
        displayVideo("video/coca-cola.mp4", true);

        // Переходим к следующему состоянию игры с кнопками "Поставить лайк" и "Листать дальше"
        gameState = 9; 
      } else {
        endGame("Да вы жуткий пофигист, остались в стороне и чувствуете себя отстраненно. ");
        displayImage("image/odinok.png");
      }
      break;

    case 4: // Сцена "Списать домашку"
      if (choice === 1) {
        updateGameText("Вы решили списать домашку, которую вчера не сделали дома. Надеюсь учитель не обратит на вас внимание. Что произойдет?");
        displayChoices(["Учитель заметил", "Учитель не заметил"]);
        displayImage("image/student_homework.png");
        gameState = 7; 
      } else if (choice === 2) {
        updateGameText("Вы отвлеклись на телефон. Давайте посмотрим на что вы отвлеклись:");
        displayVideo("video/subway.mp4", false); 
      }
      break;

    case 6:
      if (choice === 1) {
        endGame("Как ни странно, я даже не ожидал, что родители не станут меня ругать. Они сказали, что на ошибках учатся и я еще успею исправить");
      } else {
        updateGameText("По приходу домой я спрятал свой дневник в шкаф, который никто не открывает. После чего сел поиграть в компьютер. И на вопрос родителей как учеба я ответил 'все хорошо' Но я забыл, что у родителей есть доступ к сетевому городу. Она зашла и увидела двойку и позвала меня.")
        displayChoices(["Ничего не остается как рассказать правду"]);
        gameState = 20;
      }
      break;

    case 7: // Сцена "Реакция учителя на списывание"
      if (choice === 1) {
        updateGameText("-Что это тут у тебя? Ааа, домашняя работа, решил списать, ну ты же так не усвоишь тему. Иди к доске и реши пример.");
        displayChoices(["Выйти к доске", "Отказаться"]);
        displayImage("image/teacher.png");
        gameState = 8; 
      } else if (choice === 2) {
        endGame("Вы истинный списыватель, хорошая работа!");
      }
      break;

    case 8: // Сцена "Реакция учителя на списывание"
      if (choice === 1) {
        // Передаем сообщение для успешного и неуспешного ответа
        updateGameText("Реши пожалуйста пример:");
        displayMathProblem(
          "Какой ты молодец, не растерялся и решил сам у доски! И родители не узнают, что ты списывал",
          "К сожалению, придется остаться после уроков и разобрать эту тему с учителем заново! В следующий раз готовься к урокам дома"
        );
      } else if (choice === 2) {
        endGame("Чтож, тогда можешь не стараться переписывать, двойка за домашнюю работу все равно обеспечена. 'Какой кошмар, меня накажут родители'");
        displayImage("image/class.png");
      }
      break;

    case 9: // Сцена после просмотра видео
      updateGameText("Вы смотрели атмосферное видео о Кока-Колы. Теперь решите, что делать дальше.");

      // Создаем кнопки "Поставить лайк" и "Листать дальше"
      displayChoices(["Поставить лайк", "Листать дальше"]);
      gameState = 10; 
      break;
    case 10: 
      if (choice === 1) {
        updateGameText("Говорящая колонка: Если в классе есть Bluetooth-колонка, кто-то подключается к ней с телефона и включает забавный звук (например, мяуканье кота или голос, произносящий: Класс, внимание!). Учитель удивляется, откуда идет звук, пока колонка остается незамеченной. Спросить есть ли в классе у кого колонка?");
        displayChoices(["Есть", "Нет"]);
        gameState = 11; // Переход к сцене с колонкой
      } else if (choice === 2) {
        endGame("Ты сделал правильный выбор. Зачем надсмехаться над преподавателем, который пытается нас всему научить");
        displayImage("image/student.png");
      }
      break;

    case 11: // Сцена с говорящей колонкой
      if (choice === 1) { 
        endGame("Ура, я подключился, сейчас будет весело. Я включил мяуканье кошки, учитель перепугался от неожиданного звука. Она сразу поняла, что это был я. Она крикнула: -Иванов, родителей в школу.");
        displayImage("image/angry_teacher.png");
      } else if (choice === 2) {
        endGame("К сожалению этот розыгрыш не удался");
      }
      break;

    case 12:
      if (choice === 1) { // Действие после признания
        updateGameText("Ура, наконец- то учитель вышел из класса. Пора поиграть в агента под прикрытием");
        displayChoices(["Бежать в гардероб коротким путем", "Бежать в гардероб за курткой через учительскую"]);
        displayImage("image/pobeg.png");
        gameState = 13;
      } else if (choice === 2) {
        endGame("Ты резко вспомнил, что мама положила в портфель бутылку воды. Полезная альтернатива, а колу после уроков купить можно");
        displayImage("image/water.png");
      }
      break;
    case 13:
      if (choice === 1) {
        updateGameText("Вы быстро нашли свою куртку и прибежали в магазин. В магазине как раз акция на колу. Какую вы выберете?");
        displayChoices(["Колу без сахара", "Оригинальную колу"]);
        displayImage("image/cola.png");
        gameState = 14;
      } else if (choice === 2) {
        updateGameText("Вы побежали по коридору и услышали, как учителя в учительской обсуждают предстоящую контрольную. Ваши действия?");
        displayChoices(["Срочно вернуться и рассказать одноклассникам", "Бегу дальше за курткой "]);
        displayImage("image/door.png");
        gameState = 17;
      }
      break;

    case 14:
      if (choice === 1) {
        updateGameText("Кассир пробивает колу и она стоит 109 рублей. Оплата будет наличными или по карте? ");
        displayChoices(["Карта", "Наличные"]);
        displayImage("image/kassa.png");
        gameState = 15;
      } else if (choice === 2) {
        updateGameText(" Кассир пробивает колу и она стоит 109 рублей. Оплата будет наличными или по карте? ");
        displayChoices(["Карта", "Наличные"]);
        displayImage("image/kassa.png");
        gameState = 15;
      }
      break;
    case 15:
      if (choice === 1) {
        updateGameText("К сожалению на вашей карте недостаточно средств для оплаты");
        displayChoices(["Вернуться в школу", "Рассчитаться наличкой"]);
        displayImage("image/card.png");
        gameState = 16;

      } else if (choice === 2) {
        updateGameText("Вы насчитали 109 рублей и забрали долгожданную бутылку кока-колы. Только ее нужно успеть выпить, так как в школу ее нести нельзя");
        displayChoices(["Вернутся в школу"]);
        displayImage("image/cola2.png");
        gameState = 16;

      }
      break;
    case 16:
      if (choice === 1) {
        endGame("Вы вернулись в школу. Повешали на место куртку и пошли в класс. Но по пути встретились с Анной Андреевной. Узнав о том, что я сбежал, она вызвала моих родителей в школу. В итоге на месяц мне запретили играть кока-колу и покупать чипсы. ");
        displayImage("image/vstrecha.png");
      } else if (choice === 2) {
        updateGameText("Вы насчитали 109 рублей и забрали долгожданную бутылку кока-колы. Только ее нужно успеть выпить, так как в школу ее нести нельзя");
        displayChoices(["Вернутся в школу"]);
        displayImage("image/cola2.png");
        gameState = 16;
      }
      break;
    case 17:
      if (choice === 1) {
        updateGameText("- Ребята, ребята, завтра контрольная по математике! Я сейчас Анну Андреевну в учительской слышал. Нужно подготовиться!\n- Что правда? Ну ты молодец, что услышал и сразу рассказал!");
        displayChoices(["Выйти в коридор и проверить идет ли учитель"]);
        displayImage("image/kontrolnaya.png");
        gameState = 18;
      }
      break;
    case 18:
      if (choice === 1) {
        endGame("Ой, черт, Анна Андреевна идёт! Нужно скорей садиться на место");
        displayChoices(["Сесть на свое место"]);
        gameState = 19;
        displayImage("image/teacher_in_class.png");
      }
      break;
    case 19:
      if (choice === 1) {
        endGame("Анна Андреевна зашла и начала вести следующий урок. Но мои мысли все были о бутылке кока-колы ");
        displayImage("image/cola.png");
      }
      break;
    case 20:
      if (choice === 1) {
        endGame("Родители были огорчены не то что, я получил двойку, а то, что я обманул их. Из- за этого они запретили мне игры на компьютере на две недели. Я понял, что делать так больше не буду. ");
        displayImage("image/parents.png");
      }
      break;
    case 21:
      if (choice === 1) {
        updateGameText("Было страшно заходить в медицинский кабинет, так как я до смерти боюсь врачей. Но наш доктор оказался очень приветливым. Она спросила что случилось, и я рассказал ей про живот. Она встала около шкафчика с лекарствами и задумалась какую таблетку мне дать ");
        displayChoices(["Дать ношпу", "Дать мезим"]);
        displayImage("image/med.png");
        gameState = 22;
      } else if (choice === 2) {
        endGame("Вы решили сидеть за партой и терпеть. Зато не пропустите ничего важного ");
        displayImage("image/stomach.png");
      }
      break;
    case 22:
      if (choice === 1) {
        endGame("Мед сестра дала мальчику ношпу, сказав, что через некоторое время таблетка подействует. Он пошел дальше на урок, после чего все прекрасно нормализовалось");
        displayImage("image/med_sister.png");
      } else if (choice === 2) {
        updateGameText("Врач дал вам таблетку мезима. Но ты вспомнил что  у тебя на нее аллергия и ты начинаешь задыхаться. Мед. сестра с перепугу не знает как быть и вызывает бригаду скорой помощи. Скорая приехала быстро и увезла тебя в больницу. ");
        displayChoices(["Позвонить родителям и сказать о произошедшем "]);
        displayImage("image/sp.png");
        gameState = 23;
      }
      break;
    case 23:
      if (choice === 1) {
        updateGameText("Родители были очень перепуганы и не довольны действиями мед сестры, которая даже не спросила об аллрегии у мальчика. Какие дальнейшие действия родителей?");
        displayChoices(["Разойтись обоюдно", "Написать заявление в полицию на мед сестру"]);
        displayImage("image/police.png");
        gameState = 24;
      }
      break;
    case 24:
      if (choice === 1) {
        endGame("Родители не стали поднимать скандал на всю школу, так как состояние мальчика нормализовалось. Они понимали и свою вину, что не предупредили сами мед  работника об аллергии.");
        displayImage("image/after_sp.png");
      } else if (choice === 2) {
        updateGameText("Ваши родители написали заявление на мед.сестру, после чего скорее всего ее уволят. После родители поехали к мальчику в больницу узнать как у него дела.");
        displayImage("image/parents_in_sp.png");
        displayChoices(["Все хорошо", "Состояние ухудшилось"]);
        gameState = 25;
      }
      break;
    case 25:
      if (choice === 1) {
        endGame("К счастью, сына разрешили забрать домой и продолжить лечение дома. ");
        displayImage("image/parents_in_sp2.png");
      } else if (choice === 2) {
        endGame("Какой кошмар, аллергия начала проявляться в тяжелой стадии. Придется остаться в больнице");
        displayImage("image/allergia.png");
      }
      break;

  }
}

let correctAnswer; // Переменная для хранения правильного ответа
// Функция для отображения математического задания
function displayMathProblem(successMessage, failMessage) {
  choicesElement.innerHTML = "";  // Очищаем старые элементы
  // Генерация двух случайных чисел от 1 до 10
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  // Случайный выбор операции
  const operations = ["+", "-", "*", "/"];
  const randomOperation = operations[Math.floor(Math.random() * operations.length)];
  // Определение правильного ответа на основе операции
  switch (randomOperation) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "/":
      // Округление результата деления для целочисленного ответа
      correctAnswer = Math.floor(num1 / num2);
      break;
  }

  // Создание текста задания с отображением случайных чисел и операции
  const mathQuestion = document.createElement("p");
  mathQuestion.textContent = `Сколько будет ${num1} ${randomOperation} ${num2}?`;  // Вставляем переменные в строку

  // Поле для ввода ответа
  const answerInput = document.createElement("input");
  answerInput.type = "number";
  answerInput.id = "answerInput";
  answerInput.classList.add("form-control", "mb-2");

  // Кнопка для проверки ответа
  const submitButton = document.createElement("button");
  submitButton.textContent = "Проверить ответ";
  submitButton.classList.add("btn", "btn-dark", "w-100", 'comfortaa-700');

  // Функция для проверки ответа при нажатии на кнопку
  submitButton.onclick = function () {
    checkAnswer(answerInput.value, successMessage, failMessage);
  };

  // Добавление элементов на страницу
  choicesElement.appendChild(mathQuestion);
  choicesElement.appendChild(answerInput);
  choicesElement.appendChild(submitButton);
}

// Функция для проверки математического ответа
function checkAnswer(userAnswer, successMessage, failMessage) {
  // Проверяем введенный ответ
  const answer = parseInt(userAnswer, 10);

  // Если ответ правильный
  if (answer === correctAnswer) {
    endGame(successMessage);
  } else {
    endGame(failMessage);
  }
}

function displayVideo(videoSrc, showButtons = false) {
  choicesElement.innerHTML = ""; // Очищаем старые элементы
  // Создаем контейнер для видео
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("d-flex", "justify-content-center", "align-items-center", "mb-3", "video-container");
  // Создаем элемент video
  const videoElement = document.createElement("video");
  videoElement.setAttribute("controls", "true"); // Включаем элементы управления
  // Создаем элемент source и указываем путь к видеофайлу
  const sourceElement = document.createElement("source");
  sourceElement.src = videoSrc; // Указываем путь к видео
  sourceElement.type = "video/mp4"; // Указываем формат видео
  // Добавляем source в video элемент
  videoElement.appendChild(sourceElement);
  // Добавляем video в контейнер
  videoContainer.appendChild(videoElement);
  // Вставляем контейнер с видео в блок выбора
  choicesElement.appendChild(videoContainer);
  // Добавляем кнопку "Сыграть снова" вручную
  const restartButton = document.createElement("button");
  restartButton.id = "restartButton";
  restartButton.classList.add("btn", "btn-dark", "w-50", "mb-2", "comfortaa-700");
  restartButton.textContent = "Сыграть снова";
  restartButton.onclick = restartGame;

  // Создаем контейнер для кнопки и выравниваем её по центру
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("d-flex", "justify-content-center", "w-100", "mb-2");
  // Вставляем кнопку в контейнер
  buttonContainer.appendChild(restartButton);
  // Вставляем контейнер с кнопкой после видео
  choicesElement.appendChild(buttonContainer);
  // Условно отображаем кнопки
  if (showButtons) {
    // Создаем кнопки "Поставить лайк" и "Листать дальше"
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("d-flex", "justify-content-center", "w-100");
    buttonsContainer.style.gap = "10px"; // Добавляем расстояние между кнопками

    const likeButton = document.createElement("button");
    likeButton.textContent = "Поставить лайк";
    likeButton.classList.add("btn", "btn-dark", "w-50", "mb-2", "comfortaa-700");
    likeButton.onclick = likeAction;

    const nextButton = document.createElement("button");
    nextButton.textContent = "Листать дальше";
    nextButton.classList.add("btn", "btn-dark", "w-50", "mb-2", "comfortaa-700");
    nextButton.onclick = nextAction;

    buttonsContainer.appendChild(likeButton);
    buttonsContainer.appendChild(nextButton);

    // Вставляем контейнер с кнопками под видео
    choicesElement.appendChild(buttonsContainer);
  }
}
// Функция для действия при нажатии на кнопку "Поставить лайк"
function likeAction() {
  alert("Вы поставили лайк! 👍");
  updateGameText("После просмотренного видео вам жутко захотелось кока-колы. Что будете делать?");
  // Скрываем кнопки лайка и листания дальше, показываем кнопку "Сыграть снова"
  hideButtons();
  displayChoices(["Ждать, пока учитель выйдет из класса", "Попить вместо колы воды"]);
  gameState = 12;  // Переход к следующей сцене
}
// Функция для действия при нажатии на кнопку "Листать дальше"
function nextAction() {
  updateGameText("Вы находите забавный ролик о розыгрыше над учителем. Хотите с одноклассниками его повторить?");
  // Скрываем кнопки лайка и листания дальше, показываем кнопку "Сыграть снова"
  hideButtons();
  displayChoices(["Да, конечно", "Это так подло, зачем они так"]);
  displayImage("image/pricol.png");
  gameState = 10;  // Переход к следующей сцене
}
// Функция для скрытия кнопок "Поставить лайк" и "Листать дальше"
function hideButtons() {
  const buttonsContainer = choicesElement.querySelector(".d-flex");
  if (buttonsContainer) {
    buttonsContainer.style.display = "none";  // Скрываем кнопки лайка и листания
  }
  // Показываем кнопку "Сыграть снова"
  const restartButton = document.getElementById("restartButton");
  if (restartButton) {
    restartButton.style.display = "inline-block";
  }
}
function displayImage(imageSrc, altText = "Изображение") {
  // Создаем контейнер для изображения
  const imgContainer = document.createElement('div');
  imgContainer.classList.add('d-flex', 'justify-content-center')
  // Создаем изображение
  const imgElement = document.createElement("img");
  imgElement.src = imageSrc;
  imgElement.alt = altText;
  imgElement.classList.add("img-fluid", "rounded", 'mb-4');
  imgElement.style.width = "250px";  // Ограничиваем максимальную ширину изображения

  // Вставляем изображение в контейнер
  imgContainer.appendChild(imgElement);

  // Вставляем контейнер с изображением в блок выбора
  const choicesElement = document.getElementById("choices"); // Получаем контейнер для выбора
  choicesElement.insertBefore(imgContainer, choicesElement.firstChild);
}
// Функция для завершения игры и отображения результата
function endGame(finalMessage) {
  updateGameText(finalMessage);
  choicesElement.innerHTML = "";
  const restartButton = document.createElement("button");
  restartButton.textContent = "Сыграть снова";
  restartButton.classList.add("btn", "btn-dark", "w-100", 'comfortaa-700');
  restartButton.onclick = restartGame;
  choicesElement.appendChild(restartButton);
}
// Функция для перезапуска игры
function restartGame() {
  playerName = "";
  gameState = 1;
  nameInput.style.display = "inline";
  startButton.style.display = "inline";
  nameInput.value = "";
  updateGameText("Введите ваше имя для начала игры:");
  choicesElement.innerHTML = "";
}
// Начало игры по клику на кнопку
startButton.onclick = startGame;




