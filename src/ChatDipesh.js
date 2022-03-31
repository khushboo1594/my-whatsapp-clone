import SearchOutlined from '@mui/icons-material/SearchOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import LogoutIcon from '@mui/icons-material/Logout';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import MicIcon from '@mui/icons-material/Mic';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./chat.css"
import { useParams } from 'react-router';
import db from '../../firebase';
import { useStateValue } from '../../context/Stateprovider';
import * as firebase from 'firebase';
import { useHistory } from "react-router-dom";
import { actionTypes } from '../../context/Reducer';
import moment from 'moment';

const Chat = ({ setProgress }) => {
    const [seed, setseed] = useState('')
    const [input, setinput] = useState('')
    const { roomId } = useParams()


    const [roomname, setroomname] = useState('')
    const [messages, setmessages] = useState([])
    const [{ user },] = useStateValue()
    let history = useHistory()
    const [{ }, dispatch] = useStateValue()





    // MESSAGES==>
    useEffect(() => {
        if (roomId) {

            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setroomname(snapshot.data().name)
            ))



            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => setmessages(snapshot.docs.map((doc => doc.data()))))







        }
    }, [roomId])

    // RANDOM AVATAR 
    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000))

    }, [roomId])
    const sendMessage = (e) => {
        e.preventDefault()

        setProgress(50)
        db.collection('rooms').doc(roomId).collection('messages').add({
            id: new Date().getTime().toString(),

            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        setinput('')
        setProgress(100)


    }


    function googleSignout() {
        firebase.auth().signOut()

            .then(res => dispatch({
                type: actionTypes.REMOVE_USER,

            })).catch(err => alert(err.message))
        history.push('/')




    }



    const handleDelete = (i) => {

        const newarray = messages.filter((item, index) => i !== index)
        setmessages(newarray)

    }





    const deleteall = () => {

        db.collection('rooms').doc(roomId).collection('messages').get()
            .then(snapshot => {
                snapshot.forEach(doc => {


                    db.collection('rooms').doc(roomId).collection('messages').doc(doc.id).delete()





                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });


    }








    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='chat__headerInfo'>
                    <h3>{roomname}</h3>
                    <p>last seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlinedIcon />
                    </IconButton>

                    <IconButton onClick={googleSignout}>
                        <LogoutIcon />
                    </IconButton>

                </div>
            </div>
            <div className='chat__body'>

                <DeleteForeverOutlinedIcon onClick={() => deleteall()} style={{ textAlign: 'center' }} />

                {messages.map((message, i) => (

                    <p key={message.id} className={`chat__message  ${message.name === user.displayName && "chat__receiver"}`}>
                        <DeleteOutlineOutlinedIcon onClick={() => handleDelete(i)} />
                        <span className='chat__name'>{message.name}</span>
                        {message.message}<span className='chat__timestamp'>{message.timestamp && moment(new Date(message.timestamp?.toDate()).toUTCString()).fromNow()}</span></p>

                ))}

            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setinput(e.target.value)} type='text' placeholder='type a message'></input>
                    <button type='submit' onClick={sendMessage}>Send Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat