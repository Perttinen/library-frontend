import {useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({setToken, setPage, show}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.error(error.graphQLErrors[0].message)
            setUsername('')
            setPassword('')
        }
    })
    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) // eslint-disable-line
    if (!show) {
        return null
    }
    const submit = async (event) => {
        event.preventDefault()
        login({variables: {username, password}})
        setUsername('')
        setPassword('')
        setPage('books')
    }
    return(
        <form onSubmit={submit}> 
            <div>
                name <input
                value={username}
                name='sdf'
                onChange={(e) => setUsername(e.target.value)}             
                />
            </div>
            <div>
                password<input
                type={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )
}

export default Login