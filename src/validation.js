export function titleValidation(title, form){
    createTitleErrorMessage(form);
    titleLiveValidation(title);
}

export function descriptionValidation(description, form){
    createDescriptionErrorMessage(form);
    descriptionLiveValidation(description);
}

export function checkTitle(title){
    const titleError = document.querySelector("#titleErrorMessage");
    if (title.value.length < 3) {
        title.setCustomValidity(" ");
        title.reportValidity();
        titleError.textContent = "At least 3 characters!"
        return false;
    } else if (title.value.length > 20){
        console.log("hey")
        title.setCustomValidity(" ");
        title.reportValidity();
        titleError.textContent = "Title shouldn't exceed 20 characters!"
        return false;
    } else {
        title.setCustomValidity("");
        title.reportValidity();
        titleError.textContent = "";
        return true;
    }
}

function createTitleErrorMessage(form){
    const titleError = document.createElement("span");
    titleError.classList.add("errorMessage");
    titleError.id = "titleErrorMessage";
    form.appendChild(titleError);
}

function titleLiveValidation(title){
    title.addEventListener("input", () => {
        checkTitle(title);
    })
}


export function checkDescription(description){
    const descriptionError = document.querySelector("#descriptionErrorMessage");
    if (description.value.length > 80) {
        description.setCustomValidity(" ");
        description.reportValidity();
        descriptionError.textContent = "Description shouldn't exceed 100 characters!"
        return false;
    } else {
        description.setCustomValidity("");
        description.reportValidity();
        descriptionError.textContent = "";
        return true;
    }
}

function createDescriptionErrorMessage(form){
    const descriptionError = document.createElement("span");
    descriptionError.classList.add("errorMessage");
    descriptionError.id = "descriptionErrorMessage";
    form.appendChild(descriptionError);
}

function descriptionLiveValidation(description){
    description.addEventListener("input", () => {
        checkDescription(description);
    })
}