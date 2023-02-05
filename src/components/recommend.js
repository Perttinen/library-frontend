const Recommend = ({show, refetchMe, dataMe, refetchBooks, dataBooks}) => {
    if (!show) {
        return null
      }
    refetchMe()
    refetchBooks({genre: dataMe.me.favoriteGenre})
    const fBooks = dataBooks.allBooks   
    return(
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite <b>patterns</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {fBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend