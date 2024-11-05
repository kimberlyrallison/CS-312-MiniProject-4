import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BlogPostForm() {
    const { id } = useParams();
    const [post, setPost] = useState({id:undefined, name:undefined, title:undefined, content:undefined});
    const navigate = useNavigate();
    const [error, setError] = useState("");  

    useEffect(()=> {
        if(id) {
            axios.get('http://localhost:5000/api/getPost?id='+id, {withCredentials: true})
            .then(res => {
                setPost(res.data);
                console.log(res.data);
            })
            .catch(error=>setError(error.response.data));
        }
    },[])

    function savePost () {
        axios.post('/api/save', {post})
        .then(()=>navigate("/"))
        .catch(error => setError(error.response.data));
    }

    function editPost ( event ) {
        setPost(oldPost=>{
        const newPost = JSON.parse(JSON.stringify(oldPost));
        newPost[event.target.name]=event.target.value;
        return newPost;
        })
    }

    return (
    <div className="editFormGrid">
    <div className="label">
        Edit Post
    </div>
    {error}
    <div className="form">
        <input type="hidden" id="id" name="id" value={post.id}/>
        <div className="formItem">
            Name:
            {post.name}
            <br/>
        </div>
        <div className="formItem">
            Post Title:
            <input type="text" id="title" name="title" value={post.title} onChange={editPost}/><br/>
        </div>
        <div className="formItem">
            Post Content:
            <textarea id="content" name="content" value={post.content} onChange={editPost}/><br/>
        </div>
        <button onClick={()=>savePost()}>
            Save
        </button>
    </div>
    </div>
    )
}