import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  type User = {
    gender: string,
    name: {
      title: string,
      first: string,
      last: string
    },
    location: {
      street: {
        number: number,
        name: string,
      },
      city: string,
      state: string,
      country: string,
      postcode: string,
      coordinates: {
        latitude: string,
        longitude: string
      },
      timezone: {
        offset: string,
        description: string
      }
    },
    email: string,
    login: {
      uuid: string,
      username: string,
      password: string,
      salt: string,
      md5: string,
      sha1: string,
      sha256: string
    },
    dob: {
      date: Date,
      age: number
    },
    registered: {
      date: Date,
      age: number
    },
    phone: string,
    cell: string,
    id: {
      name: string,
      value: string
    },
    picture: {
      large: string,
      medium: string,
      thumbnail: string,
    },
    nat: string
  }

  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      if (response.status === 200) {
        setUsers(response.data.results);
      }   
    }

    fetchData();
  }, []);

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
    </>
  )
}

export default App
