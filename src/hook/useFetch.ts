import axios from "axios"
import { useEffect, useState } from "react"

export function useFetch(url: string) {
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(url);
          setUsers(response.data.results);
      } catch (error) {
        console.log(error);
      }
      finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000)
      } 
    }

    fetchData();
  }, []);

  return {users, isLoading};
}