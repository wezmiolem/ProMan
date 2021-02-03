const columnNames = ["To Do", "In Progress", "Testing", "Done"];

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
    boardNameHolder.setAttribute("placeholder", "Board Name");
    newBoardHeader.appendChild(boardNameHolder);
    let addNoteButton = document.createElement("button");
    addNoteButton.innerHTML = "Add Note";
    newBoardHeader.appendChild(addNoteButton);
        addNoteButton.addEventListener("click", (e) => {
        let newNote = document.createElement("div");
        newNote.classList.add("note");
        newNote.setAttribute("contenteditable", "true");
        newNote.setAttribute("placeholder", "Note");
        let firstColumn = e.currentTarget
            .parentElement
            .nextElementSibling
            .firstChild
            .firstChild;
        firstColumn.appendChild(newNote);
        }
    )
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
        columnTitle.innerHTML = columnName;
        columnTitle.setAttribute("contenteditable", "true");
        columnTitle.setAttribute("placeholder", columnName);
        column.appendChild(columnTitle);
        newBoardBodyContent.appendChild(column);
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
