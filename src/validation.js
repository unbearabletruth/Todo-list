export function titleError(title, form){
    createErrorMessage(form);
    liveValidation(title, form);
}

export function checkTitle(title, form){
    const titleError = document.querySelector(".errorMessage");
    if (title.value.length < 3) {
        title.setCustomValidity(" ");
        title.reportValidity();
        titleError.textContent = "At least 3 characters!"
        return false;
    } else if (title.value.length > 20){
        console.log("hey")
        title.setCustomValidity(" ");
        title.reportValidity();
        titleError.textContent = "Title is 20 characters max!"
        return false;
    } else {
        title.setCustomValidity("");
        title.reportValidity();
        titleError.textContent = "";
        return true;
    }
}

function createErrorMessage(form){
    const titleError = document.createElement("span");
    titleError.classList.add("errorMessage");
    form.appendChild(titleError);
}

function liveValidation(title, form){
    title.addEventListener("input", () => {
        checkTitle(title, form);
    })
}