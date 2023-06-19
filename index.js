import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appInner = {
    databaseURL: "https://playground-3a918-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appInner)
const database = getDatabase(app)
const gratitudeList = ref(database, "Notes")

const inputField = document.getElementById("input-field") 
const noteListEL = document.getElementById("noteList")
const AddNotesBT = document.getElementById("Addnotes")

const dateField = document.getElementById("date-field")

function clearinputfield(){
    inputField.value = ""
}
function clearnotelist(){
    noteListEL.textContent = ""
}

AddNotesBT.addEventListener('click', function(){
    let inputValue = inputField.value
    let dateValue = dateField.value
    
    
    if (inputValue !== "") {
        const newNote = {
            text: inputValue,
            date: dateValue,
        };

        push(gratitudeList, newNote);
        clearinputfield();
    }
})


function displayfirebaseValues(EL){
    let iditems = EL[0]
    let Valueitems = EL[1]
    
    let newEl = document.createElement("li")
    let dateEl = document.createElement("p")
    newEl.textContent = Valueitems.text;
    
    if (Valueitems.date) {
        dateEl.textContent = Valueitems.date
    }
    
    newEl.addEventListener('dblclick',function(){
        
        let exactLocationOfItemInDB = ref(database, `Notes/${iditems}`)
            remove(exactLocationOfItemInDB)
        
    })
    newEl.append(dateEl)
    noteListEL.append(newEl)
}



onValue(gratitudeList, function(snapshot){
    if (snapshot.exists()){
        
        let itemArray = Object.entries(snapshot.val())
        clearnotelist()
        for (let i = 0; i < itemArray.length; i++ ){
            let elementHtml = itemArray[i]
            displayfirebaseValues(elementHtml)
    }
    }
    else{
        noteListEL.textContent = ""
    }
    

})





