import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'

const NotesListPage = () => {
    //React Hooks
    let [notes, setNotes] = useState([])
    useEffect(() => { //first load of component (when user visits page calling this component)
        getNotes()
    }, [])

    //Defining a function
    let getNotes = async () => {//this is an async function because it needs to wait for Promises
        let response = await fetch("/api/notes")
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        
        let notes = await response.json()
        console.log(notes)
        //returns Promise use await to get data

        console.log('getNotes: ', notes)
        setNotes(notes)
    }

    return (
        <div>
            <div className="notes-list">
                {notes.map((note) => ( //for each note in notes
                    <ListItem note={note} /> //passing params to react components
                    //see ../components/ListItem.js
                ))}
            </div>
        </div>
    )
}

export default NotesListPage
