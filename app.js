
let textArea = document.querySelector("#textareass");
const manageBtn = document.querySelector("#manage-btn");
const closeBtn = document.querySelector("#closeBtn");
const manageDataContainer = document.querySelector(".manageData-container");
const cardsContainer = document.querySelector('#cards-container');
let checkBox = document.querySelector('input[value="Very-Good"]');

// global variables
let editForTargetValue;

manageDataContainer.style.display = "none"
cancel.style.display = "none";
update.style.display = "none";

// Add data to array as form submit
let data = localStorage.getItem('shayri');
data = data ? JSON.parse(data) : [];
addButton.addEventListener('click', addData);

showCodesFun();
function addData() {
    let tempObj = {};
    let tempValue = checkBox.checked ? "Very-Good" : "Good";
    tempObj.name = textArea.value
    tempObj.feel = tempValue;
    console.log(tempObj);
    if (tempObj.name) {
        data.push(tempObj);
        localStorage.setItem('shayri', JSON.stringify(data));
        console.log(data);
        textArea.value = "";
        checkBox.checked = false;
    } else{
        alert("Please add shayri!")
    }
    showCodesFun();
}

// Manage Data Event Hanlder
closeBtn.addEventListener('click', closeContainer);
function closeContainer() {
    manageDataContainer.style.display = "none"
    addButton.style.display = 'inline';
    manageBtn.style.display = "inline";
}

// Manage Event for manage whole code-------
manageBtn.addEventListener('click', showContainer);
function showContainer() {
    cancel.style.display = "none";
    update.style.display = "none";
    let html = "";
    if (data.length > 0) {
        data.forEach((elem, index) => {
            html +=
                `
                <div id="${index}" class="card me-2 mb-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${index + 1}. ${elem.feel}</h5>
                        <p class="card-text">${elem.name}</p>
                        <button id="edit" class="btn btn-success" onclick="editFun(${index})">Edit</button>
                        <button id="delete" class="btn btn-danger" onclick="deleteFun(${index})">Delete</button>
                    </div>
                </div>
            `
        })
    } else {
        html = 'Data Not Found!';
    }
    cardsContainer.innerHTML = html;
    manageDataContainer.style.display = "block";
}

// Delete handler---------------
function deleteFun(value) {
    data = data.filter((elem, ind) => ind !== value);
    localStorage.setItem('shayri', JSON.stringify(data));
    showContainer();
    showCodesFun()
}

// Edit event handler ---------------
function editFun(value) {
    let edit = data.filter((elem, ind) => {
        if (ind === value) {
            editForTargetValue = ind;
            return true
        } else {
            return false;
        }
    });
    textArea.value = edit[0].name;
    manageDataContainer.style.display = "none";
    addButton.style.display = 'none';
    manageBtn.style.display = "none";
    cancel.style.display = "inline";
    update.style.display = "inline";
}

// Update event handler-------------
update.addEventListener('click', upDateFun);
function upDateFun() {
    let tempValue = checkBox.checked ? "Very-Good" : "Good";
    let tempUpdate = {name:textArea.value, feel: tempValue};
    data.splice(editForTargetValue,1,tempUpdate);
    // console.log("Up data: ",data);
    localStorage.setItem('shayri', JSON.stringify(data));
    tempUpdate = {};
    manageDataContainer.style.display = "block";
    cancel.style.display = "none";
    update.style.display = "none";
    textArea.value = "";
    checkBox.checked = false;
    showContainer();
    showCodesFun();
}

//Cancel Event handler--------------
cancel.addEventListener('click', cancelFun);
function cancelFun() {
    manageDataContainer.style.display = "block";
    cancel.style.display = "none";
    update.style.display = "none";
    showContainer();
}

// Print the whole code on display------
function showCodesFun() {
    let add = "";
    if (data.length > 0) {
        data.forEach((elem, index) => {
            add +=
            `
            {
                name: "${elem.name.replace(/\s+/g,' ').trim()}",
                feel: "${elem.feel}"
            },
            `;
        })
        responsePre.innerHTML = add;
    }else {
        responsePre.innerHTML = "Your code will apear here...";
    }
}


// Copy whole created data-------
copy.addEventListener('click', () => {
    if (data.length > 0) {
        let tempcode = responsePre.innerHTML;
        navigator.clipboard.writeText(tempcode);
        alert("Data copy successefully");
    } else {
        alert("Data Not Found");
    }
})



