let myLibrary = [];

addBookToLibrary("NDDF", "Jean Genet", 386, true);

addBookToLibrary("asd", "adkdk", 342, false);

document.querySelector("#new-book-btn").addEventListener("click", showNewBookForm);

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  let readText = (read) ? "read" : "not read";
  this.giveInfo = () => `${name} is a book by ${author}. It has ${pages} pages and I have ${readText} it`
}

function addBookToLibrary(name, author, pages, read) {
  myLibrary[myLibrary.length] = Object.create(new Book(name, author, pages, read))
  updateDisplay();
}

function updateDisplay() {
  document.querySelectorAll(".books").forEach(book => book.remove());

  myLibrary.forEach(book => displayBook());
}

function displayBook() {
  const newBook = document.createElement("div");
  newBook.classList.add("books");
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
