// book constructor
function Book(author, title, pages, read, coverPath, ratings) {
  if (!new.target) {
    throw Error('The "this" key is required to run a constructor')
  }
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.coverPath = coverPath;
  this.ratings = ratings;
}
Book.prototype.updateBook = function (property, value) {
  this[property] = value;
}

const bookList = [
  new Book('Callie Hart', 'Quicksilver', 622, true, './images/quick-silver-cover.jpg', 5),
  new Book('Dale Carnegie', 'How To Win Friends and Influence People', 520, true, './images/how-to-make-friends-cover.webp', 4),
  new Book('Jody Houser', 'Stranger Things: The Other Side (Graphic Novel)', 95, true, './images/stranger-things.jpg', 4),
  new Book('Joe Hill', 'Black phone', 400, false, './images/black-phone-cover.webp', 3),
  new Book('J.k. Rowling', 'Harry Potter and The Cursed Child', 320, false, './images/harry-porter-cover.jpg', 5),
];

// element references 
const grid = document.querySelector('.grid');
const bookCardTemplate = document.querySelector(".book-template");
const form = document.querySelector('.form');
const modal = document.querySelector('.modal');
const addBookBtn = document.querySelector('.add-book-btn');
const formAddBtn = document.querySelector('.form__add-btn');
const formCancelBtn = document.querySelector('.form__cancel-btn');
const authorNameInput = document.querySelector('#author-name');
const bookTitleInput = document.querySelector('#book-title');
const bookPagesInput = document.querySelector('#book-pages');
const bookReadInput = document.querySelector('#read');
const bookCoverInput = document.querySelector('#book-cover');

createBooks(bookList) // create books when page loads

// event listeners 
addBookBtn.addEventListener('click', e => {
  modal.showModal();
  handelScroll('hidden');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  // backup validation, in case form validation fails
  if (isInvalid(authorNameInput, bookTitleInput, bookPagesInput)) {
    alert('Invalid Entry!');
    return;
  }
  // create new book object from data collected and add to list (bookList)
  bookList.unshift(new Book(authorNameInput.value, bookTitleInput.value, bookPagesInput.value, bookReadInput.checked, './images/placeholder-img.jpg', 0))

  // add new book object in array to page
  bookAddPage(bookList[0]);
  clearForm()
  handelScroll('auto');
  modal.close();
})

formCancelBtn.addEventListener("click", e => {
  e.preventDefault();
  clearForm()
  handelScroll('auto');
  modal.close();
});

grid.addEventListener('click', e => {
  if (isAllowed(e.target)) {
    // variables all statements need
    const bookOnPage = e.target.closest('.book');
    const bookId = getBookId(bookOnPage)
    const bookInArr = getBookInArr(bookId);
    
    // update book cover shadow text
    if (e.target.classList.contains('book__read-display')) {
      bookInArr.updateBook('read', !bookInArr.read)
      updateCoverShadow(bookInArr, bookOnPage)
    }
    
    // fill stars with color
    if (e.target.classList.contains('book__star')) {
      const starTargetIndex = +e.target.getAttribute('data-index');
      const stars = e.target.closest('.book').querySelectorAll('.book__star');

      unFillStars(stars);
      tillTargetStarIndex(stars, starTargetIndex);
      bookInArr.updateBook('ratings', starTargetIndex);
    }
    
    if(e.target.classList.contains('book__remove-btn')){
      removeBook(bookList, bookInArr, bookOnPage);
    }
    console.log(bookInArr) // show object updates
    console.log(bookList) // show book list
  }
});

function createBooks(bookList) {
  bookList.forEach(bookAddPage);
}
function getbookCardTemplate() {
  return bookCardTemplate.content.querySelector(".book").cloneNode(true);
}
function getBookInArr(id) {
  return bookList.find(book => book.id === id);
}
function getBookId(bookOnPage) {
  return bookOnPage.getAttribute("data-bookId");
}
function updateCoverShadow(bookInArr, bookOnPage) {
  const bookCoverCont = bookOnPage.querySelector('.book__cover-container');
  if (bookInArr.read) {
    bookCoverCont.setAttribute('data-read-status', 'read');
  } else {
    bookCoverCont.setAttribute('data-read-status', '');
  }
}
function unFillStars(stars) {
  stars.forEach(star => {
    star.classList.remove('fill');
  });
}
function fillStar(star) {
  star.classList.add('fill');
}
function tillTargetStarIndex(stars, starTargetIndex) {
  for (let i = 0; i < starTargetIndex; i++) {
    fillStar(stars[i]);
  }
}
function bookAddPage(bookObj) {
  const book = getbookCardTemplate();
  // Get displays in book
  const bookCover = book.querySelector('.book__cover');
  const bookCoverContainer = book.querySelector('.book__cover-container');
  const authorDisplay = book.querySelector('.book__author-display');
  const titleDisplay = book.querySelector('.book__title-display');
  const pagesDisplay = book.querySelector('.book__pages-display');
  const readDisplay = book.querySelector('.book__read-display');
  const stars = book.querySelectorAll('.book__star');


  // update book with info from book in array
  book.setAttribute('data-bookId', bookObj.id)
  bookCover.src = bookObj.coverPath;
  authorDisplay.innerText = bookObj.author;
  titleDisplay.innerText = bookObj.title;
  pagesDisplay.innerText = bookObj.pages;
  readDisplay.checked = bookObj.read;

  // check to add read text to book cover shadow
  !bookObj.read ? bookCoverContainer.setAttribute('data-read-status', ''): null;

  tillTargetStarIndex(stars, bookObj.ratings);

  // add book to page
  grid.insertAdjacentElement('afterbegin', book);
}
function handelScroll(value) {
  document.body.style.overflow = value;
}
function clearForm() {
  authorNameInput.value = "";
  bookTitleInput.value = "";
  bookPagesInput.value = "";
  bookReadInput.checked = false;
}
function isInvalid(authorNameInput, bookTitleInput, bookPagesInput){
  return isNaN(bookPagesInput.value) || (authorNameInput.value.trim() === "") || (bookTitleInput.value.trim() === "");
}
function removeBook(bookList,bookInArr, bookOnPage){
  // remove book from bookList
  bookList.splice(bookList.indexOf(bookInArr), 1)
  // remove book from page
  bookOnPage.remove()
}
function isAllowed(element){
  return (element.classList.contains('book__read-display') || element.classList.contains('book__star') || element.classList.contains('book__remove-btn'))
}