function CreateBook(author, title, pages, read, coverPath, ratings) {
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
CreateBook.prototype.updateBook = function (property, value) {
  this[property] = value;
}

const grid = document.querySelector('.grid');
const bookCardTemplate = document.querySelector(".book-template");
const bookList = [
  new CreateBook('J.k. Rowling', 'Harry Potter and The Cursed Child', 320, false, './images/harry-porter-cover.jpg', 5),
  new CreateBook('Joe Hill', 'Black phone', 400, false, './images/black-phone-cover.webp', 3),
  new CreateBook('Jody Houser', 'Stranger Things: The Other Side (Graphic Novel)', 95, true, './images/stranger-things.jpg', 4),
  new CreateBook('Dale Carnegie', 'How To Win Friends and Influence People', 520, true, './images/how-to-make-friends-cover.webp', 4),
  new CreateBook('Callie Hart', 'Quicksilver', 622, true, './images/quick-silver-cover.jpg', 5)
];
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


createBooks(bookList)

addBookBtn.addEventListener('click', e => {
  modal.showModal();
  handelScroll('hidden');
});
form.addEventListener('submit', e => {
  e.preventDefault();
  // backup validation, in case form validation fails
  if (isInvalid(authorNameInput, bookTitleInput, bookPagesInput)) {
    alert('invalid');
    return;
  }
  // create new book object from data collected and add to book list (bookList)
  bookList.push(new CreateBook(authorNameInput.value, bookTitleInput.value, bookPagesInput.value, bookReadInput.checked, './images/body-img.jpg', 0))

  // add last book object in array to page
  bookAddPage(bookList[bookList.length - 1]);
  
  clearForm()
  handelScroll('auto');
  modal.close();
})
formCancelBtn.addEventListener("click", e => {
  e.preventDefault();
  clearForm()
  modal.close();
  handelScroll('auto');
});
grid.addEventListener('click', e => {
  if (e.target.classList.contains('book__read-display') || e.target.classList.contains('book__star')) {

    const bookOnPage = e.target.closest('.book');
    const bookId = getBookId(bookOnPage)
    const bookInArr = getBookInArr(bookId);

    if (e.target.classList.contains('book__read-display')) {
      bookInArr.updateBook('read', !bookInArr.read)
      updateCoverShadow(bookInArr, bookOnPage)
    }
    if (e.target.classList.contains('book__star')) {
      const starTargetIndex = +e.target.getAttribute('data-index');
      const stars = e.target.closest('.book').querySelectorAll('.book__star');

      unFillStars(stars);
      tillTargetStarIndex(stars, starTargetIndex);
      bookInArr.updateBook('ratings', starTargetIndex);
    }

    console.log(bookInArr) // - uncomment to see object update in array
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
  grid.appendChild(book);
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