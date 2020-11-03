document.addEventListener("DOMContentLoaded", ()=>{

    const fetchBooks = ()=>{
        fetch("http://localhost:3000/books")
        .then(r=>r.json())
        .then(renderBooksTitle)
    }

    const renderBooksTitle = (books)=>{
        const ul = document.querySelector('#list')
        books.forEach(book=>{
            const li = document.createElement('li')
            li.dataset.number = book.id
            li.textContent = book.title
            ul.append(li)

            //to show book info on show panel
            const showPanel = document.querySelector('#show-panel')
            // console.log(book.users)
            li.addEventListener('click', event=>{
                showPanel.innerHTML = ""
                const bookDiv = document.createElement('div')
                    bookDiv.dataset.bookId = book.id
                const bookImg = document.createElement('img')
                    bookImg.src = book.img_url
                const bookTitle = document.createElement('h3')
                    bookTitle.textContent = book.title
                const bookSubTitle = document.createElement('h3')
                    bookSubTitle.textContent = book.subtitle
                const bookAuthor = document.createElement('h3')
                    bookAuthor.textContent = book.author
                const bookDescription = document.createElement('p')
                    bookDescription.textContent = book.description
                const bookLikesUl = document.createElement('ul')

                const likeBtn = document.createElement('button')
                    likeBtn.classList.add('like-btn')
                    likeBtn.textContent = 'LIKE'

                const addUser = (user)=>{
                    const li = document.createElement('li')
                    li.dataset.userId = user.id
                    li.textContent = user.username
                    bookLikesUl.append(li)
                }

                book.users.forEach((user)=>{
                    addUser(user)
                    // const li = document.createElement('li')
                    // li.dataset.userId = user.id
                    // li.textContent = user.username
                    // bookLikesUl.append(li)
                })

                bookDiv.append(bookImg, bookTitle, bookSubTitle, bookAuthor, bookDescription, bookLikesUl, likeBtn)



                showPanel.append(bookDiv)

                ///likeBtn event listener
                // console.log(likeBtn)

                likeBtn.addEventListener('click', event=>{

                    const newUserLike = [...book.users, {"id":1, "username":"pouros"}]

                    // debugger
                    const bookObj = {
                        users: newUserLike
                    }


                    const bookObjConfig = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(bookObj)
                    }

                    const renderNewLike = (bookObj)=>{
                        const newUser = bookObj.users[bookObj.users.length - 1]
                        addUser(newUser)
                    }

                    fetch(`http://localhost:3000/books/${book.id}`, bookObjConfig)
                    .then(r=>r.json())
                    .then(renderNewLike)

                })
                
            })

        })
    }
    
    fetchBooks()
});
