import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom";
import ListItem from '../components/ListItem'

const NotePage = () => {
    const {id}  = useParams() // this is how u get dynamic params from the url
    let [note, setNote] = useState(null)
    useEffect(() => { //first load of component (when user visits page calling this component)
        getNote()
    }, [id])//list of dependencies

    let getNote = async () => {//this is an async function because it needs to wait for Promises
        let response = await fetch(`/api/notes/${id}`)
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        let note = await response.json()
        //returns Promise use await to get data

        console.log('getNote: ', note)
        setNote(note)
    }

    return(
        <div>
            <h1> Note {id} </h1>
            <div className="note-item">
                    <p>{note?.body}</p>
            </div>
        </div>
    )
}

export default NotePage
