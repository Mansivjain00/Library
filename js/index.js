console.log("College Library webpage");

// constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display constructor
function Display() {
    
}

// Add methods to display prototype

// Validating form
Display.prototype.validate = function (book) {
    if(book.name.length==0 || book.author.length==0){
        return false;
    }
    return true;
}


// Adding book
Display.prototype.add = function (book) {
    console.log("Adding to UI");
    let tableBody = document.getElementById('tablebody');
    let uiString = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    </tr>`;

    tablebody.innerHTML += uiString;
}

// to clear after adding
Display.prototype.clear = function () {
    let libraryform = document.getElementById('LibraryForm');
    libraryform.reset();
}

// To display a Success/Error alert
Display.prototype.show = function(type,message){
    let display_message = document.getElementById('message');
    if(type==='Success!'){
            display_message.innerHTML = `<div class="alert alert-success" role="alert">
             ${type} ${message}
            </div>` ;
    }
    else{
        display_message.innerHTML = `<div class="alert alert-danger" role="alert">
             ${type} ${message}
            </div>` ;
    }

    setTimeout(() => {
        display_message.innerHTML = '';
    },3000 );

}



// Add submit event listener to LibraryForm
let libraryform = document.getElementById('LibraryForm');
// console.log(libraryform);
libraryform.addEventListener('submit',LibrarySubmitForm);

function LibrarySubmitForm(e) {
    // We are preventing default behaviour as a submit buttons default behaviour is to reload the page
    e.preventDefault();
    // console.log("Book submission succesful");

    // What do we want when we submit
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('bookAuthor').value;

    // Grabbing both ID's and checking which one is checked
    let fiction = document.getElementById('Fiction');
    let non_fiction = document.getElementById('Non-Fiction');

    let type;
    if(fiction.checked){
        type = fiction.value;
    }
    else{
        type = non_fiction.value;
    }

    // Creating book object
    let book = new Book(name,author,type);

    // Displaying the added book
    let display = new Display();

    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('Success!', "Your book has been successfully added!")
    }
    else{
        display.show('Error!',"Sorry,cannot add your book. Please give a valid name and author name.");
    }
    

    // console.log(book);
}