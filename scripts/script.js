let myLibrary = [];

Book.prototype.toggleRead = function(book) {
  this.read = !this.read;
  return updateStorage();
}

Book.prototype.giveInfo = function () {
  let readText = (this.read) ? "read" : "not read";
  return `${this.name} is a book by ${this.author}. It has ${this.pages} pages and I have ${readText} it`
}

if(!localStorage.length) {
  addBookToLibrary("la nausée", "jean-Paul sartre", 249, true);
  addBookToLibrary("À la recherche du temps perdu", "marcel proust", 4328, true);
  addBookToLibrary("the lord of the rings", "j. r. r. tolkien", 1178, false);  
} else {
  retrieve()
}

document.querySelector("#new-book-btn").addEventListener("click", showNewBookForm);

document.querySelector("#stats-btn").addEventListener("click", showStats)

///

function updateStorage() {
  localStorage.clear();

  myLibrary.forEach((book, index) => {
    localStorage.setItem(("book" + index), JSON.stringify(myLibrary[index]));
  });
}


function retrieve() {

  const storageLen = localStorage.length;

  for (i = 0; i < storageLen; i++) {
    myLibrary.push(JSON.parse(localStorage.getItem("book" + i)));
  }

  myLibrary.forEach(book => {
    Object.setPrototypeOf(book, Book.prototype)
  })

  updateDisplay();
}


function Book(name, author, pages, read) {
  this.name = capitalize(name);
  this.author = capitalize(author);
  this.pages = pages;
  this.read = read;
}


function addBookToLibrary(name, author, pages, read) {
  myLibrary[myLibrary.length] = new Book(name, author, pages, read)
  updateDisplay();
}


function updateDisplay() {
  document.querySelectorAll(".books").forEach(book => book.remove());

  myLibrary.forEach((book, index) => displayBook(book, index));

  document.querySelector("#container").removeEventListener("click", removeBook);
  document.querySelector("#container").addEventListener("click", removeBook);

  updateStorage();
}


function removeBook(e) {
  if (!e.target.classList.contains("remove-book-btn")) return;
  const targetIndex = e.target.dataset.index;
  myLibrary.splice(targetIndex, 1);
  updateDisplay();
} 


function displayBook(book, index) {
  const newBook = document.createElement("div");
  newBook.classList.add("books");

  for (let key in book) {

    if ({}.hasOwnProperty.call(book, key)) {
      if (key === "read") {
        const labelOut = document.createElement("label");
        labelOut.classList.add("label-read");
        labelOut.textContent = "Read?";
        const labelIn = document.createElement("label");
        labelIn.classList.add("switch");
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.checked = book[key];
        labelIn.appendChild(input);
        const span = document.createElement("span");
        span.classList.add("slider", "round");
        labelIn.appendChild(span);
        labelOut.appendChild(labelIn);
        newBook.appendChild(labelOut);
        continue;
      }
      
    const displayKey = document.createElement("div");
    displayKey.classList.add(`${key}`);
    if (key === "pages") {
      displayKey.textContent = book[key] + " pages";
      newBook.appendChild(displayKey);
    } else {
      displayKey.textContent = book[key];
      newBook.appendChild(displayKey);
    }
    }
  }

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✖";
  removeBtn.classList.add("remove-book-btn");
  removeBtn.setAttribute("data-index", index);
  newBook.appendChild(removeBtn);

  document.querySelector("#container").appendChild(newBook);
  newBook.querySelector(`input`).addEventListener("change", () => book.toggleRead(book));
}


function showNewBookForm() {
  document.forms[0].classList.remove("visually-hidden");
  document.querySelector("#popup-background").classList.remove("visually-hidden");

  document.querySelector("#submit-btn").addEventListener("click", () => getFormValues(event));
  document.querySelector("#reset-btn").addEventListener("click", hideForm)
}


function hideForm() {
  document.forms[0].classList.add("visually-hidden");
  document.querySelector("#popup-background").classList.add("visually-hidden");
}


function getFormValues(e) {
  e.preventDefault();
  const form = document.forms[0];
  if (!form.name.value || !form.author.value) { 
    form.reset();
    return hideForm();
  }
  addBookToLibrary(form.name.value, form.author.value, form.pages.value, form.read.checked);
  form.reset();
  hideForm();
}

function showStats() {
  document.querySelector("#stats-div").classList.remove("visually-hidden");
  document.querySelector("#popup-background").classList.remove("visually-hidden");
  document.querySelector("#close-stats-btn").addEventListener("click", hideStats)
  
  const statsObj = getStats();
  
  document.querySelector("#books-total").textContent = document.querySelector("#books-total").textContent.substr(0, 13) + statsObj.totalBooks;
  
  document.querySelector("#books-read").textContent = document.querySelector("#books-read").textContent.substr(0, 18) + statsObj.totalBooksRead;

  document.querySelector("#pages-read").textContent = document.querySelector("#pages-read").textContent.substr(0, 18) + statsObj.totalPagesRead;

}

function getStats() {
    const totalBooks = myLibrary.length;
    const readBooks = myLibrary.filter(book => book.read === true);
    const totalBooksRead = readBooks.length;
    const totalPagesRead = readBooks.reduce((total, book) => {
      return total + Number(book.pages)
    }, 0)
    return {totalBooks, totalBooksRead, totalPagesRead};
  }

function hideStats() {
  document.querySelector("#stats-div").classList.add("visually-hidden");
  document.querySelector("#popup-background").classList.add("visually-hidden");
}

function capitalize(title) {
  let titleAsArray = title.split(" ");

  titleAsArray = titleAsArray.map((word, index) => {
    if (index !== 0 && index !== titleAsArray[titleAsArray.length - 1] && 
      ( word === "a" || word === "an" || word === "and" || word === "at" || 
      word === "but" || word === "by" || word === "for" || word === "in" || 
      word === "nor" || word === "of" || word === "on" || word === "or" || 
      word === "so" || word === "the" || word === "to" || word === "up" || 
      word === "yet" )) return word;
    return word[0].toUpperCase() + word.slice(1);
  })

  return titleAsArray.join(" ");
}