import React from 'react'
import { Link } from 'react-router-dom'

//will get all properties (probs not good security)
//const ListItem = (props) => {
//getting react values out of parameters {props.note.body} to access if using props

const ListItem = ({note}) => { //when calling this componenet need to set the note param
    console.log('ListItem: ', note)
    return(
        <div>
            <Link to={`notes/${note.id}`}>
                Note {note.id}
            </Link>
            <p> {note.body} </p>
        </div>
    )
}
//example call <ListItem note={note} />
export default ListItem
