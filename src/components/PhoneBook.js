import { set } from 'mongoose';
import { useState } from 'react';
import clientAxios from '../config/axios';
import Alert from './Alert'

const PhoneBook = ({inputsUser, setInputsUser, countRequest, setRequest, updateMode, setUpdateMode, setSpinner}) => {

    const [error, setError] = useState('');

    const handleInput = (e) => {
        setInputsUser({
            ...inputsUser,
            [e.target.name]: e.target.value
        })
    }

    const sendUser = (e) => {
        e.preventDefault();
        setSpinner(true);
        if(inputsUser.firstName !== '' && inputsUser.lastName !== '' && inputsUser.phone !== ''){
            clientAxios.post('/users', inputsUser)
            .then((res) => {
                setRequest(countRequest + 1 );
                setInputsUser({
                    firstName: '',
                    lastName: '',
                    phone: ''
                })
            })
            .catch(() => {
                setError('The number already exists.');
                setSpinner(false);

                setTimeout(() => {
                    setError('');
                }, 3000);
            })
        }else{
            setError('All fields are required.');
            setSpinner(false);

            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    const handleCancel = () => {
        setUpdateMode(false)
        setInputsUser({
            firstName: '',
            lastName: '',
            phone: ''
        });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        setSpinner(true)
        if(inputsUser.firstName !== '' && inputsUser.lastName !== '' && inputsUser.phone !== ''){
            clientAxios.put(`/users/${inputsUser.id}`, inputsUser)
            .then(() => {
                setInputsUser({
                    firstName: '',
                    lastName: '',
                    phone: ''
                });
                setRequest(countRequest + 1)
                setUpdateMode(false);
            });
        }else{
            setError('All fields are required.');
            setSpinner(false);

            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    return (
          <form 
                id="form"
                className="phone-form flex column card shadow">
                <h5 className="mb-0">Add a contact</h5>
                <hr/>
              <label className="form-label small mb-1">First Name</label>
              <input 
                    type="text" 
                    name="firstName"
                    onChange={handleInput}
                    value={inputsUser.firstName}
                    className="form-control"
                    placeholder='First Name'>
              </input>
              <label className="form-label small mb-1 mt-2">Last Name</label>
              <input 
                    type="text" 
                    name="lastName"
                    onChange={handleInput}
                    value={inputsUser.lastName}
                    className="form-control"
                    placeholder='Last Name'>
              </input>
              <label className="form-label small mb-1 mt-2">Phone</label>
              <input 
                  type="text" 
                  name="phone"
                  onChange={handleInput}
                  value={inputsUser.phone}
                  className="form-control"
                  placeholder='Phone'>
              </input>
              {updateMode ? <div className='self-end'><button className="btn btn-primary mt-3 me-2" type='submit' onClick={handleUpdate}>Update</button><button className="btn btn-secondary mt-3" onClick={handleCancel}>Cancel</button></div> : <button onClick={sendUser} className="self-end btn btn-primary mt-3">Submit</button>}
              {error.length ? <Alert error={error}/> : null}
          </form>
      );
}

export default PhoneBook;