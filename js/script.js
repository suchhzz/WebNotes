const newListItemBtn = document.getElementById("newListItemBtn");

newListItemBtn.addEventListener("click", function() {
    event.preventDefault();
    addListItemLine();
})

function addListItemLine() {
    const listForm = document.getElementById("listItem");

    let divElem = document.createElement("div");
    divElem.classList.add("item-list-row", "row", "d-flex");

    let inputElem = document.createElement("input");
    inputElem.type = "text";
    inputElem.classList.add("col-10");

    let buttonElem = document.createElement("button");
    buttonElem.classList.add("col-2", "btn-close");

    buttonElem.addEventListener("click", function() {
        event.preventDefault();
        divElem.remove();
    });

    divElem.appendChild(inputElem);
    divElem.appendChild(buttonElem);

    listForm.appendChild(divElem);
}

function openModal() {
    var modal = new bootstrap.Modal(document.getElementById('listModal'));
    modal.show();
}

function addNoteCard(title, text) {
    const cardContainer = document.getElementById("cardContainer");

    let mainCardDiv = document.createElement("div");
    mainCardDiv.classList.add("card", "col-3");
    mainCardDiv.style.width = "18rem";

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title-container", "d-flex");
    cardTitle.addEventListener("click", function() {
        openModal();
    });

    let cardTitleText = document.createElement("h5");
    cardTitleText.textContent = "New Card";

    let cardTitleButton = document.createElement("button");
    cardTitleButton.classList.add("trash-icon-button", "bi", "bi-trash-fill", "btn");

    cardTitleButton.addEventListener("click", function() {
        event.stopPropagation();
        mainCardDiv.remove();
    });

    cardTitle.appendChild(cardTitleText);
    cardTitle.appendChild(cardTitleButton);

    let lineDivider = document.createElement("hr");

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = "Some quick example text to build on the card title and";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(lineDivider);
    cardBody.appendChild(cardText);

    mainCardDiv.appendChild(cardBody);

    cardContainer.appendChild(mainCardDiv);
}