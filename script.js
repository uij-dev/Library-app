function CreateBook(author, title, pages, read, coverPath) {
  if (!new.target) {
    throw Error('The "this" key is required to run a constructor')
  }
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.coverPath = coverPath;
}
CreateBook.prototype.updateReadStatus = function () {
  this.read = !this.read;
}

const grid = document.querySelector('.grid');
const bookTemplate = document.querySelector(".book-template");

const bookList = [
  new CreateBook('J.k. Rowling', 'Harry Potter and The Cursed Child', 320, false, './images/harry-porter-cover.jpg'),
  new CreateBook('Joe Hill', 'Black phone', 400, false, './images/black-phone-cover.webp'),
  new CreateBook('Jody Houser', 'Stranger Things: The Other Side (Graphic Novel)', 95, true, './images/stranger-things.jpg'),
  new CreateBook('Dale Carnegie', 'How To Win Friends and Influence People', 520, true, './images/how-to-make-friends-cover.webp'),
  new CreateBook('Callie Hart', 'Quicksilver', 622, true, './images/quick-silver-cover.jpg')
];

addBooksToPage(bookList)

// update book read value in array and add attach read text to the book cover based on the value.
grid.addEventListener('click', e => {
  if (e.target.classList.contains('book__read-display')) {
    const bookOnPage = e.target.closest('.book');
    const bookId = getBookId(bookOnPage)
    const bookInArr = getBookInArr(bookId);
    bookInArr.updateReadStatus()
    // console.log(bookInArr) - uncomment to see object update in array
    updateCoverShadow(bookInArr, bookOnPage)
  }

  
})

function addBooksToPage(bookList) {
  bookList.forEach(({
    id, author, title, pages, read, coverPath
  }) => {
    const book = getBookTemplate();

    // Get displays in book
    const bookCover = book.querySelector('.book__cover');
    const bookCoverContainer = book.querySelector('.book__cover-container');
    const authorDisplay = book.querySelector('.book__author-display');
    const titleDisplay = book.querySelector('.book__title-display');
    const pagesDisplay = book.querySelector('.book__pages-display');
    const readDisplay = book.querySelector('.book__read-display');

    // update book with info from book in array
    book.setAttribute('data-bookId', id)
    bookCover.src = coverPath;
    authorDisplay.innerText = author;
    titleDisplay.innerText = title;
    pagesDisplay.innerText = pages;
    readDisplay.checked = read;

    // check to add read text to book cover shadow
    !read ? bookCoverContainer.setAttribute('data-read-status', '') : null;

    // add to page
    grid.appendChild(book);
  })
}
function getBookTemplate() {
  return bookTemplate.content.querySelector(".book").cloneNode(true);
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