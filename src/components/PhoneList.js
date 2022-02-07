import { useState, useEffect } from 'react';
import Table from './Table';
import clientAxios from '../config/axios'

export const PhoneList = ({inputsUser, setInputsUser,countRequest, setRequest, setUpdateMode, spinner, setSpinner}) => {

    const [users, setUsers] = useState([]);

    const handleUpdate = (_id) => {
        clientAxios.get(`/users/${_id}`)
            .then(res => {
                const {_id, firstName, lastName, phone} = res.data
                setInputsUser({
                    id: _id,
                    firstName,
                    lastName,
                    phone
                })
                setUpdateMode(true)
            })
    }

    const handleDelete = (_id) => {
        setSpinner(true)
        clientAxios.delete(`/users/${_id}`)
            .then(() => setRequest(countRequest + 1))
    }

    useEffect( () => {
        clientAxios.get('/users')
        .then(res => {
            setSpinner(false)

            const data = res.data.map(({_id, firstName, lastName, phone}) => {
                return {
                    firstName,
                    lastName,
                    phone,
                    actions: <>
                        <button className='btn btn-sm btn-warning me-1' onClick={() => handleUpdate(_id)}><i className="far fa-edit"></i></button>
                        <button className='btn btn-sm btn-danger' onClick={() => handleDelete(_id)}><i className="far fa-trash-alt"></i></button>
                    </>
                }
            })

            setUsers(data)
        })
    }, [countRequest] )

    return (
        spinner ? <div className='spinner'></div> 
            : (users.length ? <Table 
                                    users={users}
                                /> 
        : <h2 className="mt-5">Data no found</h2>)
      )
}
