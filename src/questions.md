# why do we we give key?

# firebase is now used as module. to tumhe wo dekhna hai.

## useReducer, useContext
    # Higher order component

# Understand this
new Date(message.timestamp?.toDate()).toUTCString()

# Read about this error.
react.development.js:220 Warning: Each child in a list should have a unique "key" prop.

# Remaining sidebarchat -> info
https://youtu.be/pUxrDcITyjg?t=11855


 <p>{messages[0]?.message}</p>
///////////////////////////////////////////////////////////////
// useEffect(() => {
  //   if (roomId) {
  //     db.collection("rooms")
  //       .doc(roomId)
  //       .onSnapshot((snapshot) => {
  //         setroomName(snapshot.data().name);
  //       });

  //     db.collection("rooms")
  //       .doc(roomId)
  //       .collection("messages")
  //       .orderBy("timestamp", "asc")
  //       .onSnapshot((snapshot) => {
  //         setMessages(
  //           snapshot.docs.map((doc) => {
  //             doc.data();
  //           })
  //         );
  //       });
  //   }
  // }, [roomId]);

////////////////////////////////////////////////////////////////
{messages.map((message) => {
          console.log("zyzdsds");
          console.log("messages", messages);
          <p className={`chat__message ${true && "chat__receiver"} `}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp.toDate()).toUTCString()}
            </span>
          </p>;
        })}
/////////////////////////////////////////////////////////////////////////////
         db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
         setMessages( snapshot.docs.map((doc) => {
          doc.data();
        }))
        });
/////////////////////////////////////////////////////////////////////////////
<div className="chat__body">
        {/* {messages.map((message) => {
          console.log("messages inside chat body", messages);
          <p className={`chat__message ${true && "chat__receiver"} `}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp.toDate()).toUTCString()}
            </span>
          </p>;
        })} */}
        {messages.map((message, i) => (
          <p
            key={message.id}
            className={`chat__message  ${
              true && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
            {new Date(message.timestamp.toDate()).toUTCString()}
            </span>
          </p>
        ))}
        {/* <p className={`chat__message ${true && "chat__receiver"} `}>
            {" "}
           
            <span className="chat__name">Khushboo Patel</span>Hey guyz...!!!
            <span className="chat_timestamp">5:00pm</span>
          </p> */}
        <p>{messages}</p>
      </div>