let myLibrary = [];

//Object.defineProperty(Book.prototype, "")

addBookToLibrary("NDDF", "Jean Genet", 386, true);

addBookToLibrary("the last of the summer wine", "adkdk asda", 342, false);

document.querySelector("#new-book-btn").addEventListener("click", showNewBookForm);

function Book(name, author, pages, read) {
  this.name = capitalize(name);
  this.author = capitalize(author);
  this.pages = pages + " pages";
  this.read = read;
}

Book.prototype.giveInfo = function () {
  let readText = (this.read) ? "read" : "not read";
  return `${this.name} is a book by ${this.author}. It has ${this.pages} and I have ${readText} it`
}

function addBookToLibrary(name, author, pages, read) {
  myLibrary[myLibrary.length] = Object.create(new Book(name, author, pages, read))
  updateDisplay();
}

function updateDisplay() {
  document.querySelectorAll(".books").forEach(book => book.remove());

  myLibrary.forEach(book => displayBook(book));
}

function displayBook(book) {
  const newBook = document.createElement("div");
  newBook.classList.add("books");

  for (let key in book) {
    if (book.hasOwnProperty(key)) {
    const displayKey = document.createElement("div");
    displayKey.classList.add(`${key}`);
    displayKey.textContent = book[key];
    newBook.appendChild(displayKey);
    }
  }
  

  document.querySelector("#container").appendChild(newBook);
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
  addBookToLibrary(form.name.value, form.author.value, form.pages.value, form.read.checked)
  hideForm();
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