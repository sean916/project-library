let myLibrary = [];


function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
};

function addBookToLibrary(x) {
    myLibrary.push(x);
};

function deleteRow(e) {
  var rowDelete = e.parentNode.parentNode
  indexNumber = rowDelete.dataset.index;
  myLibrary.splice(indexNumber, 1);
  render();
};

function readToggle(e) {
  var rowToggle = e.parentNode.parentNode;
  indexNumber = rowToggle.dataset.index;
  var inProgress = 'In Progress';
  var completed = 'Completed';
  var notStarted = 'Not Started';
  if (myLibrary[indexNumber]['readStatus'] == inProgress) {
    myLibrary[indexNumber]['readStatus'] = completed;
    render();
    return;
  } else if (myLibrary[indexNumber]['readStatus'] == completed) {
    myLibrary[indexNumber]['readStatus'] = notStarted;
    render();
    return;
  } else if (myLibrary[indexNumber]['readStatus'] == notStarted) {
    myLibrary[indexNumber]['readStatus'] = inProgress;
    render();
    return;
  } else {
     myLibrary[indexNumber]['readStatus'] = completed;
     render();
     return;
  }

}

const lib = document.querySelector('#lib');
function render() {
  lib.innerHTML = "";
  var row = document.createElement('tr');
  var title = document.createElement('th');
  title.innerHTML = 'Title';
  var author = document.createElement('th');
  author.innerHTML = 'Author';
  var pages = document.createElement('th');
  pages.innerHTML = 'Pages'
  var read = document.createElement('th');
  read.innerHTML = 'Read Status';
  lib.appendChild(row);
  row.appendChild(title);
  row.appendChild(author);
  row.appendChild(pages);
  row.appendChild(read);

  for (let i = 0; i < myLibrary.length; i++) {
    var item = myLibrary[i];
    row = document.createElement("tr");
    row.setAttribute('id', i);
    row.setAttribute('data-index', i);
    lib.appendChild(row);
    var values = Object.values(item);
    for (j = 0; j < values.length; j++) {
      var data = document.createElement("td");
      element = values[j];
      if (j == 3) {
        longString = element + '<br>' + '<button onClick="readToggle(this)">Change Status</button>';
        data.innerHTML = longString;
        row.appendChild(data);
      } else {
      data.innerHTML = element;
      row.appendChild(data);

      }
    }


    var removeButton = document.createElement("td");
    removeButton.innerHTML = '<button onClick="deleteRow(this)">Delete Entry</button>';
    row.appendChild(removeButton);

  }
  button = document.createElement('button');
  button.setAttribute("id", "button");
  button.innerHTML = "Add a new book";
  lib.appendChild(button);
  document.getElementById("button").addEventListener("click", buttonClick)
};

function buttonClick() {
 var form =  document.createElement("tr");
 lib.appendChild(form);

 var titleInput = document.createElement("td");
 titleInput.innerHTML = '<input type="text" id="bookTitle" placeholder="Title (required)" required>'
 form.appendChild(titleInput);

 var authorInput = document.createElement("td");
 authorInput.innerHTML = '<input type="text" id="bookAuthor" placeholder="Author (required)" required>'
 form.appendChild(authorInput);

 var pagesInput = document.createElement("td");
 pagesInput.innerHTML = '<input type="text" id="bookPages" placeholder="Number of Pages (required)" required>';
 form.appendChild(pagesInput);

 var readStatusInput = document.createElement("td");
 readStatusInput.innerHTML = '<input type="text"id="bookReadStatus" placeholder="Have you read it yet? (required)" required>';
 form.appendChild(readStatusInput);


 var submitBtn = document.createElement('td');
 submitBtn.innerHTML = '<input type="button" onclick="submitFunc()" value="submit">';
 form.appendChild(submitBtn);

}

function submitFunc() {
  var thisTitle = document.getElementById("bookTitle");
  var thisAuthor = document.getElementById("bookAuthor");
  var thisPages = document.getElementById("bookPages");
  var thisStatus = document.getElementById("bookReadStatus");
  if (thisTitle.validity.valueMissing || thisAuthor.validity.valueMissing || thisPages.validity.valueMissing || thisStatus.validity.valueMissing) {
    alert("Please ensure all fields are submitted");
    return;
  } else {
  var inputTitle = document.getElementById("bookTitle").value;
  var inputAuthor = document.getElementById("bookAuthor").value;
  var inputPages = document.getElementById("bookPages").value;
  var inputReadStatus = document.getElementById("bookReadStatus").value;
  var thisNewBook = new Book(inputTitle, inputAuthor, inputPages, inputReadStatus)
  addBookToLibrary(thisNewBook);
  render();
}}




const theHobbit = new Book("The Hobbit", "J.R.R Tolkein", 296, "I've already read");
addBookToLibrary(theHobbit);

const metamorph = new Book("The Metamorphosis", "Kafka", 172, "Have not read yet");
addBookToLibrary(metamorph);
render();

