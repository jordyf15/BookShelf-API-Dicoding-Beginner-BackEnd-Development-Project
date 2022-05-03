# BookShelf-API
BookShelf-API is an API that allows it users to do these following things: 
- Add book to the bookshelf
- Get all books from the bookshelf
- Get a book from the bookshelf by it's id
- Change a book's detail in the bookshelf
- Delete a book from the bookshelf  

The BookShelf-API saves the book's datas in memory and haven't use any database, so it will lose it's data when the it restarted or shut down. This project is made in order to pass Dicoding's Beginner BackEnd Development Course.

## Live Demo
https://jordy-bookshelf-api.herokuapp.com/
  
Note:  
This is just the base url for the api deployed at heroku. As for the front end application, it will be developed in the future.

## Setup
### Installation
    git clone https://github.com/jordyf15/BookShelf-API-Dicoding-Beginner-BackEnd-Development-Project.git
    npm install

### Scripts
- To start on development environment using nodemon `npm run dev`
- To start using node `npm run start`

## Information about the course
There is only 1 submission in this course which have requirements that are already fulfilled by this BookShelf-API. Thus the BookShelf-API has the following features.

### The API can save books
#### Request
The api can save books through the route:
- Method: `POST`
- URL: `/books`
- Body Request:   
        {  
            "name": string,  
            "year": number,  
            "author": string,  
            "summary": string,  
            "publisher": string,  
            "pageCount": number,  
            "readPage": number,  
            "reading": boolean  
        }  
        
#### Error Handling
The api also will to respond againt failure with the appropriate error handling.
1. When the client doesn't give the name in the request body then the server will respond like the following:  
- Status Code: 400
- Response Body:
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        }

2. When the client input the readPage with value bigger than the pageCount, then the server will respond like the following:  
- Status Code: 400
- Response Body:
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }
3. When the server failed to save the books due to generic error, then the server will respond like the following:  
- Status Code: 500
- Response Body:
        {
            "status": "error",
            "message": "Buku gagal ditambahkan"
        }

#### Response
If the book is successfully added, then the server will respond like the following:  
- Status Code: 201
- Response Body:

        {
            "status": "success",
            "message": "Buku berhasil ditambahkan",
            "data": {
                "bookId": "1L7ZtDUFeGs7VlEt"
            }
        }

### The API can display all books
#### Request
The api can display all saved books through the route
- Method: `GET`
- URL: `/books`  

The api also have additional feature regarding displaying all books. The client or user can add query parameters to the route `GET /books` to filter the results:
- `?name`: will display all books that contain the name given in the query.
- `?reading`:  will have the value either 0 or 1. 0 means that the book is not currently being read (reading: false), while 1 means that the book is currently being read (reading: true).
- `?finished`: will have the value either 0 or 1. 0 means that the book is not finished readed (finished: false), while 1 means that the book is finished readed (finished: true).

#### Response
The server will respond the request like the following:  
- Status Code: 200
- Response Body:

        {
            "status": "success",
            "data": {
                "books": [
                    {
                        "id": "Qbax5Oy7L8WKf74l",
                        "name": "Buku A",
                        "publisher": "Dicoding Indonesia"
                    },
                    {
                        "id": "1L7ZtDUFeGs7VlEt",
                        "name": "Buku B",
                        "publisher": "Dicoding Indonesia"
                    },
                    {
                        "id": "K8DZbfI-t3LrY7lD",
                        "name": "Buku C",
                        "publisher": "Dicoding Indonesia"
                    }
                ]
            }
        }

If there are no books saved in the server, then the server will respond the request like the following:

        {
            "status": "success",
            "data": {
                "books": []
            }
        }
        

### The API can display details of a book
#### Request
The API can display details of a book through the route:
- Method: `GET`
- URL: `/books/{bookId}`

#### Error Handling
When the book id that is attached by the user in the request parameter is not found. Then the server will respond like the following:  
- Status Code: 404
- Response Body:

        {
            "status": "fail",
            "message": "Buku tidak ditemukan"
        }

#### Response
When the attached book id is found, then the server will respond like the following:  
- Status Code: 200
- Response Body:

        {
            "status": "success",
            "data": {
                "book": {
                    "id": "aWZBUW3JN_VBE-9I",
                    "name": "Buku A Revisi",
                    "year": 2011,
                    "author": "Jane Doe",
                    "summary": "Lorem Dolor sit Amet",
                    "publisher": "Dicoding",
                    "pageCount": 200,
                    "readPage": 26,
                    "finished": false,
                    "reading": false,
                    "insertedAt": "2021-03-05T06:14:28.930Z",
                    "updatedAt": "2021-03-05T06:14:30.718Z"
                }
            }
        }

### The API can change or update book data
#### Request
The API allow the user to change a data of book based on it's id through the route:
- Method: `PUT`
- URL: `/books/{bookId}`
- Body Request:

        {
            "name": string,
            "year": number,
            "author": string,
            "summary": string,
            "publisher": string,
            "pageCount": number,
            "readPage": number,
            "reading": boolean
        }

#### Error Handling
1. If the client or user doesn't attach the name in the request body, then the server will respond like the following:
- Status Code: 400
- Response Body:

        {
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        }
2. If the client or user attach the readPage property with a value bigger than the pageCount property, then the server will respond like the following:
- Status Code: 400
- Response Body:

        {
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }
3. If the id attached by the client or user is not found, then the server will respond like the following:
- Status Code: 404
- Response Body:

        {
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }

#### Response
When the book is successfully updated, then the server will respond like the following:
- Status Code: 200
- Response Body:

        {
            "status": "success",
            "message": "Buku berhasil diperbarui"
        }

### The API can delete a book
#### Request 
The API can delete a book by it's id through the route:
- Method: `DELETE`
- URL: `/books/{bookId}`

#### Error Handling
1. If the id that is attached in not owned by any book then the server will respond like the following:
- Status Code: 404
- Response Body:

        {
            "status": "fail",
            "message": "Buku gagal dihapus. Id tidak ditemukan"
        }

#### Response
If the id is owned by a book and it is successfully deleted then the server will respond like the following:
- Status Code: 200
- Response Body:

        {
            "status": "success",
            "message": "Buku berhasil dihapus"
        }
