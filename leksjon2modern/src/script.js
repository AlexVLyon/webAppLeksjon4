//Tenker at ID løses backend med autoincrement, men la det til her.
    var currId=10;

//REPO:
    var todos = [{id:1,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air"},
                {id:2,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air"},
                {id:3,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air"}];

    var completedTodos = [{id:4,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air", completedDate:"22.12.20"},
                        {id:5,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air", completedDate:"22.12.20"},
                        {id:6,title:"Todotitle",author:"Author Author",description:"I'm baby sriracha hot chicken mixtape pabst organic air", completedDate:"22.12.20"} ]

window.onload = startup;

function startup(){
    // MODAL:
        var modal = document.getElementById("createTodoModal");
        var newTodoBtn = document.getElementById("newTodo");      
        var span = document.getElementsByClassName("close")[0];
        
        newTodoBtn.onclick = function() {
            modal.style.display = "block";
        }
       
        window.onclick = function(event){
            if(event.target == modal){
                modal.style.display = "none";
            }
        }
        
        span.onclick = function() {
            modal.style.display = "none";
        }

    //Create button    
        var createBtn = document.getElementById("createButton");
            createBtn.onclick = function(){
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
            
    for(i=0;i<todos.length;i++){
        var title = todos[i].title;
        var description = todos[i].description;
        var id = todos[i].id;

        var listElement = document.createElement("li")
            listElement.className = "todo";
            listElement.value = id;

        var h3 = document.createElement("h3");
            h3.innerHTML = title;

        var p = document.createElement("p");
            p.innerHTML = description;

        var deleteButton = document.createElement("button");
            deleteButton.onclick =  function(){
                deleteTodo(id);
            } 
            deleteButton.innerHTML = "Delete";
            deleteButton.className="deleteButton";

        var completeButton = document.createElement("button");
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
    var headingRow = document.createElement("tr");
    var headingTitle = document.createElement("th");
        headingTitle.innerHTML = "Title";
    var headingAuthor = document.createElement("th");
        headingAuthor.innerHTML = "Author";
    var headingDescription = document.createElement("th");
        headingDescription.innerHTML = "Description";
    var headingDate = document.createElement("th");
        headingDate.innerHTML = "Completed Date:"

        headingRow.appendChild(headingTitle); headingRow.appendChild(headingAuthor);
        headingRow.appendChild(headingDescription);
        headingRow.appendChild(headingDate);

        document.getElementById("completedTodos").appendChild(headingRow);

    for(i=0;i<completedTodos.length;i++){
        var title = completedTodos[i].title;
        var description = completedTodos[i].description;
        var author = completedTodos[i].author;
        var date = completedTodos[i].completedDate;

        var tableRow = document.createElement("tr");

        var titleCell = document.createElement("td");
            titleCell.innerHTML = title;
        var descriptionCell = document.createElement("td"); 
            descriptionCell.innerHTML = description;

        var authorCell = document.createElement("td");
            authorCell.innerHTML = author;
        var dateCell = document.createElement("td");
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
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var author = document.getElementById("author").value;
    
    currId++;
    var todo = {id: currId, title: title,author: author, description: description};
    todos.push(todo);
          
    writeTodos();
}

function deleteTodo(id){
    for(i=0;i<todos.length;i++){
        if(todos[i].id == id){
            todos.splice(i,1);
        }
    }
    console.log(todos);
    writeTodos();
}

function completeTodo(id){
    //Setter todoen inn i complete og fjerner fra todos
    for(i=0;i<todos.length;i++){
        if(todos[i].id == id){
            var date = new Date();
            var day = date.getDay();
            var month = date.getMonth()+1;
            var year = date.getFullYear();
            var dato = day + "." + month + "." + year;
                        
            var completedObject = todos[i];
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