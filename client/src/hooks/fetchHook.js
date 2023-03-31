import axios from 'axios';
import { useEffect, useState } from 'react';
import {getUsername} from '../helper/helper';

/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({apiData: undefined, status: null, serverError: null})

    useEffect(()=>{

        const fetchData = async() => {
            try {
                setData(prev => ({...prev}));
                const {username} = !query ?  await getUsername() : ''
                const {data, status} = !query ? await axios.get(`http://localhost:8080/api/user/${username}`) : await axios.get(`http://localhost:8080/api/${query}`);
                if(status === 200){
                    setData(prev => ({...prev, apiData: data, status: status}));
                }
            } catch (error) {
                setData(prev => ({...prev, serverError: error}))
            }
        };
        fetchData()
    },[query]);
    return [getData, setData];
}