import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useMutation, useQuery } from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR} from './queries'



const App = () => {
  const [page, setPage] = useState('authors')

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS},{query: ALL_AUTHORS } ]
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS } ]
  })

  if(resultAuthors.loading || resultBooks.loading) {
    return <div>
      loading....
    </div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={resultAuthors.data.allAuthors} editAuthor={editAuthor} />

      <Books show={page === 'books'} books={resultBooks.data.allBooks} />

      <NewBook show={page === 'add'} newBook={addBook} />
    </div>
  )
}

export default App
