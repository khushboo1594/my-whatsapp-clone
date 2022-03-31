# onsnapshot firestore react
You can listen to a document with the onSnapshot() method. An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. Then, each time the contents change, another call updates the document snapshot.
Local writes in your app will invoke snapshot listeners immediately. This is because of an important feature called "latency compensation." When you perform a write, your listeners will be notified with the new data before the data is sent to the backend.

# Get data with Cloud Firestore
There are two ways to retrieve data stored in Cloud Firestore. Either of these methods can be used with documents, collections of documents, or the results of queries:

Call a method to get the data.
Set a listener to receive data-change events.
When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data, and then another snapshot each time the document changes.

# Difference between get() and onSnapshot() in Cloud Firestore
47

As explained in the doc:

There are two ways to retrieve data stored in Cloud Firestore. Either of these methods can be used with documents, collections of documents, or the results of queries:

Call a method to get the data.
Set a listener to receive data-change events.
When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data, and then another snapshot each time the document changes.

When you use get() you "retrieve the content of a single document" only once. It's a kind of "get and forget": If the document changes in the (back-end) Firestore database you will need to call get() again to see the change.

On the opposite, if you use the onSnapshot() method you constantly listen to a document as explained in the doc:

You can listen to a document with the onSnapshot() method. An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. Then, each time the contents change, another call updates the document snapshot.

As explained in these docs, these two methods apply to one document or to a collection of documents (including a query).

# Firebase utilizes listeners to watch for changes in a specified node. It is similar to an event handler in the sense that a code is triggered based on a certain circumstance. In our case, whenever changes in that node's data occur, the listener automatically provides the application updated data, called a snapshot.

# study destructuring