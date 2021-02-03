const columnNames = ["New", "In Progress", "Testing", "Done"];

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
    boardNameHolder.setAttribute("placeholder", "Board Name")
    newBoardHeader.appendChild(boardNameHolder);
    let accordionButton = document.createElement("button");
    accordionButton.classList.add("dropdown");
    enableAccordion(accordionButton);
    newBoardHeader.appendChild(accordionButton);
    newBoard.appendChild(newBoardHeader);
    let newBoardBody = document.createElement("div");
    newBoardBody.classList.add("accordion-item-body");
    let newBoardBodyContent = document.createElement("div");
    newBoardBodyContent.classList.add("accordion-item-body-content");
    columnNames.forEach(function (columnName) {
        let column = document.createElement("div");
        column.classList.add("column");
        let columnTitle = document.createElement("span")
        columnTitle.innerHTML = columnName
        columnTitle.setAttribute("contenteditable", "true")
        columnTitle.setAttribute("placeholder", columnName)
        column.appendChild(columnTitle)
        newBoardBodyContent.appendChild(column)
    })
    newBoardBody.appendChild(newBoardBodyContent);
    newBoard.appendChild(newBoardBody);
    let boardsHolder = document.querySelector(".accordion");
    boardsHolder.appendChild(newBoard);
}

function enableAccordion(accordionButton) {
    accordionButton.addEventListener("click", () => {
        const accordionItemHeader = accordionButton.parentElement;
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains("active")) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        } else {
            accordionItemBody.style.maxHeight = 0;
        }

    })
}
