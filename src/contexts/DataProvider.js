import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, collectionGroup, doc, getDoc, Timestamp, addDoc, orderBy, query, limit, setDoc } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = function(props) {
    const db = getFirestore()
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        async function getPosts() {
        
            // const q = query(collection(db, 'posts'), orderBy('date_created', 'desc'))

            // console.log(q)

            // const querySnapshot = await getDocs(q)
            const q = query(collectionGroup(db, 'posts'))

            const querySnapshot = await getDocs(q)
            // const querySnapshot = await getDocs(collection(db, 'posts'))
            // console.log(querySnapshot)
            const postDocs = []
            
            querySnapshot.forEach(async (doc) => {
                
                const userData = await getDoc(doc.ref.parent.parent)
                const username = userData.data().username

                postDocs.push({
                    id: doc.id,
                    uid: userData.id,
                    username: username,
                    ...doc.data()
                })
                // console.log(doc.data())
                setPosts(postDocs)
            }) 
        //     console.log(postDocs)
        }

        getPosts()
    }, [])

    async function loadPost(uid, id) {
        const docRef = doc(db, 'users', uid, 'posts', id)
        const docSnap = await getDoc(docRef)

        const userData = await getDoc(docSnap.ref.parent.parent)
        const username = userData.data().username

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                uid: uid,
                username: username,
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
            date_created: Timestamp.now()
        }

        const userDoc = await setDoc(doc(db, 'users', user.uid), {
            username: user.username
        })

        const postDoc = await addDoc(collection(db, 'users', user.uid, 'posts'), newPost)

        newPost.id = postDoc.id
        
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