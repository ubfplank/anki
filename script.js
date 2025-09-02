const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-question"); // corrigido getElementB incompleto
const closeBtn = document.getElementById("close-btn"); // certifique-se de ter esse botão no HTML
let editBool = false; // precisa ser definido
let tempQuestion = "";
let tempAnswer = "";

// Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
});

// Hide Create Flashcard Card
closeBtn.addEventListener("click", () => {
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
  if (editBool) {
    editBool = false;
    submitQuestion();
  }
});

// Submit Question
cardButton.addEventListener("click", () => { // removido espaço extra em 'click '
  container.classList.remove("hide");
  editBool = false;
  tempQuestion = question.value.trim();
  tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    viewList();
    question.value = "";
    answer.value = "";
  }
});

// Card Generate
function viewList() {
  const listCard = document.getElementsByClassName("card-list-container");
  const div = document.createElement("div");
  div.classList.add("card");

  // Question
  div.innerHTML += `<p class="question-div">${question.value}</p>`;

  // Answer
  const displayAnswer = document.createElement("p");
  displayAnswer.classList.add("answer-div");
  displayAnswer.innerText = answer.value;

  // Link to show/hide answer
  const link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("class", "show-hide-btn");
  link.innerHTML = "Show/Hide";
  link.addEventListener("click", () => {
    displayAnswer.classList.toggle("hide");
  });

  div.appendChild(link);
  div.appendChild(displayAnswer);

  // Edit button
  const buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");

  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addQuestionCard.classList.remove("hide");
  });

  buttonsCon.appendChild(editButton);
  disableButtons(false);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = '<i class="fas fa-trash-can"></i>';
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });

  buttonsCon.appendChild(deleteButton);
  div.appendChild(buttonsCon);
  listCard[0].appendChild(div);

  // Hide question card after adding
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
}

// Modify Elements
const modifyElement = (element, edit = false) => {
  const parentDiv = element.parentElement.parentElement;

  if (edit) {
    const parentQuestion = parentDiv.querySelector(".question-div").innerText;
    const parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
  }

  parentDiv.remove();
};

// Disable edit and delete buttons
const disableButtons = (value) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};
