console.log("ES6 version of index.js ");


class Book{
    constructor (name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display{

    // displaying all books
    static showbooks(){
        let newBook = localStorage.getItem('books');
        let booksObj;
        if(newBook == null){
            booksObj = [];
        }
        else{
            booksObj = JSON.parse(newBook);
        }
        console.log("Adding to UI");
        let uiString="";
        booksObj.forEach(function(element,index){
             uiString += `<tr>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td scope="col"><button type="submit" class="btn btn-primary" id=${index} onclick="Display.deletebook(this.id)">Remove</button></td>
                        </tr>`;
        });

        let tableBody = document.getElementById('tablebody');
        
        if(booksObj.length!=0){
            tablebody.innerHTML = uiString;
        }
        else{
            tableBody.innerHTML = `Add books to your collection!`;
        }

        localStorage.setItem('books',JSON.stringify(booksObj));


    }

    // Validating form
    validate(book) {
        if(book.name.length==0 || book.author.length==0){
            return false;
        }
    return true;
    }

    // Adding book
    add (book) {

        // Adding  book to local storage
        let newBook = localStorage.getItem('books');
        let booksObj;
        if(newBook == null){
            booksObj = [];
        }
        else{
            booksObj = JSON.parse(newBook);
        }

        if(book!=null){
            booksObj.push(book);
        }

        localStorage.setItem('books',JSON.stringify(booksObj));
        Display.showbooks();
        
    }

    

    // to clear after adding
    clear() {
        let libraryform = document.getElementById('LibraryForm');
        libraryform.reset();
    }


    // To display a Success/Error alert
    show(type,message){
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


    // To remove a book
    static deletebook(index){
        let newBook = localStorage.getItem('books');
        let booksObj;
        if(newBook == null){
            booksObj = [];
        }
        else{
            booksObj = JSON.parse(newBook);
        }

        booksObj.splice(index,1);
        localStorage.setItem('books',JSON.stringify(booksObj));
        Display.showbooks();
    }
}

// Displaying the added book
Display.showbooks();

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




