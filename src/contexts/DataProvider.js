import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, doc, getDoc, Timestamp, addDoc, orderBy, query, limit } from '@firebase/firestore'

export const DataContext = createContext()

export const DataProvider = function(props) {
    const db = getFirestore()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
        
            // const q = query(collection(db, 'posts'), orderBy('date_created', 'desc'))

            // console.log(q)

            // const querySnapshot = await getDocs(q)
            
            const querySnapshot = await getDocs(collection(db, 'posts'))
            // console.log(querySnapshot)
            const postDocs = []
            
            querySnapshot.forEach((doc) => {
                postDocs.push({
                    id: doc.id,
                    ...doc.data()
                })
                // console.log(doc.data())
        })
        //     console.log(postDocs)
            setPosts(postDocs)
        }

        getPosts()
    }, [])

    async function loadPost(id) {
        const docRef = doc(db, 'posts', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            }
        } else {
            console.log(`Post with id ${id} does not exist.`)
        }
    }

    async function addPost(title, body) {
        const newPost = {
            title: title,
            body: body,
            username: 'ctemple',
            date_created: Timestamp.now()
        }

        const doc = await addDoc(collection(db, 'posts'), newPost)

        newPost.id = doc.id
        
        setPosts([newPost, ...posts])
    }
        
    async function getPosts(id) {
        const response = await fetch(`https://my-json-server.typicode.com/Llang8/cars-api/cars/${id}`)
        const data = await response.json()
        return data
    }

    const value = {
        posts,
        loadPost,
        addPost,
        getPosts
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}