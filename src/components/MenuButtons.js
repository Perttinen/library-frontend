const MenuButtons = ({setPage, token, logout, refetchBooks, refetchGenres}) => {
    const commonButtons = (
        <span>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => {
                setPage('books')
                refetchBooks({genre: null})
                refetchGenres()
            }}>books</button>
        </span>
    )
    const loggedButtons = (
        <span>     
            <button onClick={() => setPage('add')}>add book
            </button>
            <button
                onClick={() => setPage('recommend')}>recommend
            </button>
            <button onClick={() => {
                setPage('books')
                logout()
            }}>logout</button>
  
        </span>
    )
    const loginButton = (
        <span>
            <button onClick={() => setPage('login')}>login
            </button>
        </span>
    )
    if(!token){
        return(
            <div>
                {commonButtons}
                {loginButton}
            </div>
        )
    }
    return(  
        <div>
            {commonButtons}
            {loggedButtons}
        </div>
    )
}

export default MenuButtons