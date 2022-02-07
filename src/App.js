import PhoneBook from './components/PhoneBook';
import Footer from './components/Footer';
import {useState} from 'react';
import {PhoneList} from './components/PhoneList';

export default function App() {

  const [countRequest, setRequest] = useState(0);

  const [inputsUser, setInputsUser] = useState({
      firstName: '',
      lastName: '',
      phone: ''
  });

  
  const [spinner, setSpinner] = useState(true);

  const [updateMode, setUpdateMode] = useState(false);

  return (
    <>
        <PhoneBook 
        inputsUser={inputsUser}
        setInputsUser={setInputsUser}
        countRequest={countRequest}
        setRequest={setRequest}
        updateMode={updateMode}
        setUpdateMode={setUpdateMode}
        setSpinner={setSpinner}
        />
        <PhoneList 
        inputsUser={inputsUser}
        setInputsUser={setInputsUser}
        countRequest={countRequest}
        setRequest={setRequest}
        setUpdateMode={setUpdateMode}
        spinner={spinner}
        setSpinner={setSpinner}
        />
        <Footer />
    </>
  );
}
