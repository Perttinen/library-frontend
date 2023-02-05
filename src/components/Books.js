const Books = ({show, dataGenres, dataBooks, refetchBooks}) => {
  const books = dataBooks.allBooks
  if (!show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}      
        </tbody>
      </table>
      {dataGenres.genres.map(g => <button
        onClick={(e) => refetchBooks({genre: e.target.innerHTML})}
        key={g}>{g}</button>)}
      <button
      onClick={(e) => refetchBooks({genre: null})}
      >all genres</button>
    </div>
  )
}

export default Books
