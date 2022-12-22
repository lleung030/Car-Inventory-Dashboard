import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Post from '../components/Post'


export default function BlogSingle(){
    const [post, setPost] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()
    let idTag = id

    
    /*
    Take the id from useParams
    Use that Id in a useEffect to fetch data
    from our single post api endpoint
    https://chief-flat-goose.glitch.me/api/post/1

    use that to put post data on the page 
    */
        useEffect(() => {
            async function getPosts(){
                const response = await fetch(`https://my-json-server.typicode.com/Llang8/cars-api/cars/${id}`)
                const data = await response.json()
                // console.log(data)
                setPost(data)
            }
    
            getPosts()
        }, [id])
    
        return (
            <div className='posts'>
                <Post post={post} />
            {
                (id > 1) ?
                <button onClick={() => {
                    idTag--
                    navigate(`/blog/${idTag}`)
                }}>Previous Car</button>
                : <></>
            }
            {
                (id < 15) ?
                <button onClick={() => {
                    idTag++
                    navigate(`/blog/${idTag}`)
                }}>Next Car</button>
                : <></>
            }
            </div>
        )
    }
