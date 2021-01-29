accordionButtons = document.querySelectorAll(".dropdown");

accordionButtons.forEach(accordionButton => {
    accordionButton.addEventListener("click", event => {
        const accordionItemHeader = accordionButton.parentElement;
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains("active")) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        }
        else {
            accordionItemBody.style.maxHeight = 0;
        }
    });
});

newBoardButton = document.querySelector(".new-board");

newBoardButton.addEventListener("click", createBoard);

function createBoard() {
    let boardName = prompt("Board Name");
    let newBoard = document.createElement("div");
    newBoard.classList.add("accordion-item");
    let newBoardHeader = document.createElement("div");
    newBoardHeader.classList.add("accordion-item-header");
    let boardNameHolder = document.createElement("span");
    boardNameHolder.innerHTML = boardName;
    boardNameHolder.setAttribute("contenteditable", "true");
    newBoardHeader.appendChild(boardNameHolder);
    let accordionButton = document.createElement("button");
    accordionButton.classList.add("dropdown");
    newBoardHeader.appendChild(accordionButton);
    newBoard.appendChild(newBoardHeader);
    let newBoardBody = document.createElement('div');
    newBoardBody.classList.add("accordion-item-body");
    newBoardBody.innerHTML = "test";
    newBoard.appendChild(newBoardBody);
    let boardsHolder = document.querySelector(".accordion");
    boardsHolder.appendChild(newBoard);
}