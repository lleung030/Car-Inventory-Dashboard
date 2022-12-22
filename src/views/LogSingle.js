import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'
import { DataContext } from '../contexts/DataProvider'

export default function BlogSingle() {
    const [post, setPost] = useState({})
    const { id } = useParams()
    const { loadPost } = useContext(DataContext)

    useEffect(() => {
        async function handleLoadPost() {
            const data = await loadPost(id)
            setPost(data)
        }

        handleLoadPost()
    }, [id])

    return (
        <div className="post">
            Post Single: {id}
            <Post post={post} />
        </div>
    )
}