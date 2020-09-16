//Tenker at ID løses backend med autoincrement, men la det til her.
    let currId=10;

//REPO:
    let todos = [{id:1,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air"},
                {id:2,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air"},
                {id:3,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air"}];

    let completedTodos = [{id:4,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air", completedDate:"22.12.20"},
                        {id:5,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air", completedDate:"22.12.20"},
                        {id:6,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air", completedDate:"22.12.20"} ]

window.onload = startup;

function startup(){
    // MODAL:
        let modal = document.getElementById("createTodoModal");
        let newTodoBtn = document.getElementById("newTodo");      
        let span = document.getElementsByClassName("close")[0];
        
        newTodoBtn.onclick = () =>  modal.style.display = "block"; 
       
        window.onclick = (event) =>{ 
            if(event.target == modal){
                modal.style.display = "none";
            }
        }
        
        span.onclick = () => modal.style.display = "none";

    //Create button    
        let createBtn = document.getElementById("createButton");
            createBtn.onclick = () =>{
                    createNewTodo();
                    modal.style.display = "none";
                }

    //Initiating writing of arrays to HTML    
        writeTodos();
        writeCompletedTodos();
}            
        
function writeTodos(){

//Sletter alt som var der fra før, lager alt på nytt.
    document.getElementById("todoList").innerHTML=null;
            
    for(const i in todos){
        let title = todos[i].title;
        let description = todos[i].description;
        let id = todos[i].id;

        let listElement = document.createElement("li")
            listElement.className = "todo";
            listElement.value = id;

        let h3 = document.createElement("h3");
            h3.innerHTML = title;

        let p = document.createElement("p");
            p.innerHTML = description;

        let deleteButton = document.createElement("button");
            deleteButton.onclick =  function(){
                deleteTodo(id);
            } 
            deleteButton.innerHTML = "Delete";
            deleteButton.className="deleteButton";

        let completeButton = document.createElement("button");
            completeButton.onclick = function(){
                completeTodo(id);
            } 
            completeButton.innerHTML = "Complete";
            completeButton.className = "completeButton";

        listElement.appendChild(h3);
        listElement.appendChild(p);
        listElement.appendChild(deleteButton);
        listElement.appendChild(completeButton);

        document.getElementById("todoList").appendChild(listElement);
    }
}


function writeCompletedTodos(){
    document.getElementById("completedTodos").innerHTML=null;

//Adder først headingene: Gjør programmatisk sånn at en ikke sletter disse når funksjonen kalles på ny.
    let headingRow = document.createElement("tr");
    let headingTitle = document.createElement("th");
        headingTitle.innerHTML = "Title";
    let headingAuthor = document.createElement("th");
        headingAuthor.innerHTML = "Author";
    let headingDescription = document.createElement("th");
        headingDescription.innerHTML = "Description";
    let headingDate = document.createElement("th");
        headingDate.innerHTML = "Completed Date:"

        headingRow.appendChild(headingTitle); headingRow.appendChild(headingAuthor);
        headingRow.appendChild(headingDescription);
        headingRow.appendChild(headingDate);

        document.getElementById("completedTodos").appendChild(headingRow);

    for(const i in completedTodos){
        let title = completedTodos[i].title;
        let description = completedTodos[i].description;
        let author = completedTodos[i].author;
        let date = completedTodos[i].completedDate;

        let tableRow = document.createElement("tr");

        let titleCell = document.createElement("td");
            titleCell.innerHTML = title;
        let descriptionCell = document.createElement("td"); 
            descriptionCell.innerHTML = description;

        let authorCell = document.createElement("td");
            authorCell.innerHTML = author;
        let dateCell = document.createElement("td");
            dateCell.innerHTML = date;

            tableRow.appendChild(titleCell);
            tableRow.appendChild(authorCell);
            tableRow.appendChild(descriptionCell);
            tableRow.appendChild(dateCell);

            document.getElementById("completedTodos").appendChild(tableRow);
    }
}


//================= CRUD ================

function createNewTodo(){
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let author = document.getElementById("author").value;
    
    currId++;
    let todo = {id: currId, title: title,author: author, description: description};
    todos.push(todo);
          
    writeTodos();
}

function deleteTodo(id){

    //Byttet til for...in
    for (const i in todos){
        if(todos[i].id == id){
            todos.splice(i,1);
        }
    }
    console.log(todos);
    writeTodos();
}

function completeTodo(id){
    //Setter todoen inn i complete og fjerner fra todos
    for(const i in todos){
        if(todos[i].id == id){
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth()+1;
            let year = date.getFullYear();
            let dato = day + "." + month + "." + year;
                        
            let completedObject = todos[i];
                completedObject.completedDate = dato;
                completedTodos.push(completedObject);

            //Slett den fra todos
            todos.splice(i,1);
        }
    }               
    //Skriver ut på nytt:
    writeTodos();
    writeCompletedTodos();
}