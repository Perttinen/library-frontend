import Select from 'react-select'
import { useState } from 'react'

const Authors = (props) => {
  const [name,setName] = useState('')
  const [year, setYear] = useState('')

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const options = authors.map(a => ({value: a.name, label: a.name}))

  const submit = async (event)=> {
    event.preventDefault()
    props.editAuthor({variables: {setBornTo: parseInt(year) ,name: name}})
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Set birthyear
        <form onSubmit={submit}>
          <div>
          name 
          <Select 
            options={options}
            onChange={(choice) => setName(choice.value)}/>
          </div>
          <div>
            born <input 
              value={year}
              onChange={({ target }) => setYear(target.value)}>
            </input>
          </div>
          <button type='submit'>
            update author
          </button>
        </form>
      </h3>
    </div>
  )
}

export default Authors
