import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import MenuButtons from './components/MenuButtons'
import Recommend from './components/recommend'
import { useMutation, useQuery, useApolloClient, useSubscription } from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR, GENRES, ME, BOOK_ADDED} from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const resultAuthors = useQuery(ALL_AUTHORS)
  const {loading:loadingMe, data:dataMe, refetch:refetchMe} = useQuery(ME)
  const {loading:loadingBooks,data:dataBooks,refetch:refetchBooks} = useQuery(ALL_BOOKS)
  const {data:dataGenres, loading:loadingGenres, refetch:refetchGenres} = useQuery(GENRES)
  const [addBook] = useMutation(ADD_BOOK, {refetchQueries: [ {query: ALL_AUTHORS }, {query: ALL_BOOKS } ]})
  const [editAuthor] = useMutation(EDIT_AUTHOR, {refetchQueries: [ {query: ALL_AUTHORS } ]})

  const value = useSubscription(BOOK_ADDED, { 
    onSubscriptionData: ({subscriptionData: data}) =>{
      const addedBook = data.data.bookAdded
      // console.log(`${addedBook.title} added`)
      window.alert(`${addedBook.title} added`)
      refetchBooks({genre: null})
      refetchGenres()
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  console.log(value)
  
  if(resultAuthors.loading || loadingBooks || loadingGenres || loadingMe) {
    return <div>
      loading..
    </div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <MenuButtons
        setPage={setPage}
        token={token}
        logout={logout}
        refetchBooks={refetchBooks}
        refetchGenres={refetchGenres}/>
      <Authors
        show={page === 'authors'}
        authors={resultAuthors.data.allAuthors}
        editAuthor={editAuthor} />
      <Books
        show={page === 'books'} 
        dataGenres={dataGenres}
        dataBooks={dataBooks}
        refetchBooks={refetchBooks}/>
      <NewBook
        show={page === 'add'}
        newBook={addBook}
        refetchBooks={refetchBooks}/>
      <Login
        show={page ==='login'}
        setToken={setToken}
        setPage={setPage}/>
      <Recommend
        show={page ==='recommend'}
        refetchMe={refetchMe}
        dataMe={dataMe}
        refetchBooks={refetchBooks}
        dataBooks={dataBooks}/>
    </div>
  )
}

export default App
