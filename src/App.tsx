import { useState } from 'react';
import './App.css';
import { useFetch } from './hook/useFetch';
import logo from './assets/loading.jpg';

function App() {

  const {users, isLoading} = useFetch('https://randomuser.me/api/?results=10');
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  function handleClick(target: string) {
    setCurrentUser(target);
  
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <>
      <h1>Random User</h1>

      {isLoading ? 
        <div className='center'>
          <h3>Récupération les utilisateurs en cours...</h3>
          <img className='logo logo-spin' src={logo} alt="loading" />
        </div> 
        :

       <section className='container'>
        {users.map((user) => 
          <article key={user.email} className="card">
            <img className='profil-img' src={user.picture.medium} alt="" />
            <h2>{user.name.title} {user.name.first} {user.name.last}</h2>
            <p>{user.email}</p>
            
            {isOpen && currentUser === user.email ? 
              <div className='box-infos'>
                <p>Téléphone : {user.phone}</p>
                <p>Adresse : {user.location.street.number} {user.location.street.name}, {user.location.city}</p> 
              </div>
            : <div></div>}

            <button type='button' onClick={() => handleClick(user.email)}>Infos {isOpen && currentUser === user.email ? '-' : '+'}</button>
          </article>
        )}
        </section>
      }
    </>
  )
}

export default App
