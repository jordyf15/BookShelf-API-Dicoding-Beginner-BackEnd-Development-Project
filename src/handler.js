const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);
  if (books.filter((b) => b.id === id)[0]) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooks = (request, h) => {
  let bookArr = books.map((b) => ({ ...b }));
  const { name, reading, finished } = request.query;
  if (name) {
    bookArr = bookArr.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading === '0') {
    bookArr = bookArr.filter((b) => b.reading === false);
  } else if (reading === '1') {
    bookArr = bookArr.filter((b) => b.reading === true);
  }

  if (finished === '0') {
    bookArr = bookArr.filter((b) => b.finished === false);
  } else if (finished === '1') {
    bookArr = bookArr.filter((b) => b.finished === true);
  }

  bookArr = bookArr.map((b) => ({
    id: b.id,
    name: b.name,
    publisher: b.publisher,
  }));
  const response = h.response({
    status: 'success',
    data: {
      books: bookArr,
    },
  });
  response.code(200);
  return response;
};

const getDetailBook = (request, h) => {
  const { bookId } = request.params;
  const searchedBook = books.filter((b) => b.id === bookId)[0];

  if (searchedBook) {
    const response = h.response({
      status: 'success',
      data: {
        book: searchedBook,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateBookHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const updatedBookIndex = books.findIndex((b) => b.id === bookId);

  if (updatedBookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  books[updatedBookIndex] = {
    ...books[updatedBookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt: new Date().toISOString(),
    finished: readPage === pageCount,
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  const deletedBookIndex = books.findIndex((b) => b.id === bookId);

  if (deletedBookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  books.splice(deletedBookIndex, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooks,
  getDetailBook,
  updateBookHandler,
  deleteBookHandler,
};
