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
CreateBook.prototype.updateReadStatus = function() {
  this.read = !read;
}

const grid = document.querySelector('.grid');
const bookTemplate = document.querySelector(".book-template");
const bookList = [
  new CreateBook('J.k. Rowling', 'Harry Potter and The Cursed Child', 320, true, './images/harry-porter-cover.jpg'),
  new CreateBook('Joe Hill', 'Black phone', 400, true, './images/black-phone-cover.webp'),
  new CreateBook('Jody Houser', 'Stranger Things: The Other Side (Graphic Novel)', 95, false, './images/stranger-things.jpg'
  ),
  new CreateBook('Dale Carnegie', 'How To Win Friends and Influence People', 520, true, './images/how-to-make-friends-cover.webp'),

  new CreateBook('Callie Hart', 'Quicksilver', 622, false, './images/quick-silver-cover.jpg'
  )
];

addBooksToPage(bookList)
grid.addEventListener('click', e => {
  const elem = e.target;
  if (elem.classList.contains('book__read-status-display')){
    const bookId = elem.closest(".book").getAttribute("data-bookId")
    
  }
})

function addBooksToPage(books) {
  if (!Array.isArray(books)) throw Error('addBooksToPage() takes an array');
  
  const bookInfoDisplays = bookTemplate.querySelectorAll('.book__author-display, .book__title-display1book__pages-display, .book__read-status-display');

  books.forEach(({
    id, author, title, pages, read, coverPath
  }) => {
    const bookElem = bookTemplate.content.querySelector(".book").cloneNode(true);
    const bookCover = bookElem.querySelector('.book__img');
    const authorDisplay = bookElem.querySelector('.book__author-display');
    const titleDisplay = bookElem.querySelector('.book__title-display');
    const pagesDisplay = bookElem.querySelector('.book__pages-display');
    const readDisplay = bookElem.querySelector('.book__read-status-display');
    
    bookElem.setAttribute('data-bookId', id)
    bookCover.src = coverPath;
    authorDisplay.innerText = author;
    titleDisplay.innerText = title;
    pagesDisplay.innerText = pages;
    readDisplay.checked = read;
    
  grid.appendChild(bookElem);
  })
}
function updateObjInArr(id,bookList){
  bookList
}