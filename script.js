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
CreateBook.prototype.updateBook = function (property, to) {
  this[property] = to;
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

createBooks(bookList)

// update book read value in array and add attach read text to the book cover based on the value.
grid.addEventListener('click', e => {
  const bookOnPage = e.target.closest('.book');
  const bookId = getBookId(bookOnPage)
  const bookInArr = getBookInArr(bookId);

  if (e.target.classList.contains('book__read-display')) {
    bookInArr.updateBook('read', !bookInArr.read)
    updateCoverShadow(bookInArr, bookOnPage)
  }
  if (e.target.classList.contains('book__star')) {
    const starTargetIndex = +e.target.getAttribute('data-index');
    console.log(starTargetIndex)
    const stars = e.target.closest('.book').querySelectorAll('.book__star');

    unFillStars(stars);
    tillTargetStarIndex(stars, starTargetIndex);
    bookInArr.updateBook('ratings', starTargetIndex);
  }

  console.log(bookInArr) // - uncomment to see object update in array
})

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