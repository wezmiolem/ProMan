const columnNames = ["To Do", "In Progress", "Testing", "Done"];

newBoardButton = document.querySelector(".new-board");

newBoardButton.addEventListener("click", createBoard);

ImportBoardButton = document.querySelector(".import-board");

ImportBoardButton.addEventListener("click", importBoard);

function createBoard() {

    let today = boardCreationDate();

    let boardName = prompt("Board Name");
    let newBoard = document.createElement("div");
    newBoard.classList.add("accordion-item");
    let newBoardHeader = document.createElement("div");
    newBoardHeader.classList.add("accordion-item-header");

    let exportButton = document.createElement("button");
    exportButton.innerHTML = 'export_JSON';
    exportButton.setAttribute('exJSON','exJSON');
    exportButton.classList.add('c_button');
    convertDivToJson(exportButton, newBoard, boardName);
    newBoardHeader.appendChild(exportButton);

    let addNoteButton = document.createElement("button");
    addNoteButton.innerHTML = "Add Note";
    addNoteButton.classList.add('c_button');
    noteCreator(addNoteButton);
    newBoardHeader.appendChild(addNoteButton);

    let boardNameHolder = document.createElement("span");
    boardNameHolder.innerHTML = boardName;
    boardNameHolder.setAttribute("contenteditable", "true");
    boardNameHolder.setAttribute("placeholder", "Board Name");
    newBoardHeader.appendChild(boardNameHolder);

    let timeHolder = document.createElement("div");
    timeHolder.setAttribute("class","tholder");
    timeHolder.innerHTML = today;
    newBoardHeader.appendChild(timeHolder);

    let accordionButton = document.createElement("button");
    accordionButton.classList.add("dropdown");
    enableAccordion(accordionButton);
    newBoardHeader.appendChild(accordionButton);
    newBoard.appendChild(newBoardHeader);
    let newBoardBody = document.createElement("div");
    newBoardBody.classList.add("accordion-item-body");
    let newBoardBodyContent = document.createElement("div");
    newBoardBodyContent.classList.add("accordion-item-body-content");
    dragExample(newBoardBodyContent);
    columnNames.forEach(function (columnName) {
        let column = document.createElement("div");
        column.classList.add("column");
        dropExample(column);
        let columnTitle = document.createElement("span");
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

function noteCreator(addNoteButton) {
    addNoteButton.addEventListener("click", (e) => {
        let newNote = document.createElement("div");
        newNote.classList.add("note");
        newNote.setAttribute("draggable", "true");
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
}

function dragExample(accordionBody) {
    accordionBody.addEventListener("dragstart", (e) => {
        if (e.target && e.target.className === "note") {
            e.target.classList.add("dragging")
        }
    });
    accordionBody.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging")
    });
}

function dropExample(column) {
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
        const draggedItem = document.querySelector(".dragging");
        column.appendChild(draggedItem);
    });
}

function boardCreationDate(){
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) month = "0"+ month;
    let day = today.getDate();
    if (day <10) day = "0" + day;

    let hour = today.getHours();
    if (hour < 10) hour = "0" + hour;
    let minute = today.getMinutes();
    if (minute < 10) minute = "0" + minute;
    let second = today.getSeconds();
    if (second < 10) second = "0" + second;

    return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

}

function convertDivToJson(exportButton, elem, name){
    exportButton.addEventListener("click",() => {
    let jsonObj = {};
    jsonObj.innerHTML = elem.innerHTML;
    let jsonString = JSON.stringify(jsonObj);
    download(name,jsonString)
    });
}

function download(filename, text) {
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function importBoard() {
    console.log("import-board");
      fetch(`../static/js/data.json`) /* temporary fixed path to file before create dynamic path*/
        .then((response) => response.json())
        .then(function (data){
            console.log(data)
          })
}

function fileSelection(){
    addEventListener("click", () =>{
            let input = document.createElement('input');
            input.type = 'file';
            input.click()
          });
}