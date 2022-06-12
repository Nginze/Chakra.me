import axios from 'axios'
import {React, createContext, useState, useEffect} from 'react'

export const usersContext = createContext()

const UsersProvider = ({children}) => {
  const [progress, setProgress] = useState(0)
  const [users, setUsers] = useState(null)
  const getUsers = () => {
    axios({
        method: 'get',
        url: 'http://localhost:5000/user/all',
        withCredentials: true,
        })
        .then(response => {setUsers(response.data)})
        .catch(err => {console.log(err)})
  }

  useEffect(() => {
      getUsers()
  }, [])
  return (
    <usersContext.Provider value = {{users, setUsers, progress, setProgress}}>
            {children}
    </usersContext.Provider>
  )
}

export default UsersProvider