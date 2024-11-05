import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/PostList.css';
import { Link } from "react-router-dom";

export default function PostList() {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");   

    useEffect(()=> {
        axios.get('http://localhost:5000/api/posts', {withCredentials: true})
        .then(res => {
            setPosts(res.data);
        })

        .catch(error => navigate("/login"));
    },[]);

    function deletePost( postid) {
        axios.post('/api/delete',{
            postID : postid
            })
            .then(()=>setPosts(posts=>{
                const tempPosts = JSON.parse(JSON.stringify(posts));
                const newPosts = tempPosts.filter(post=>post.id != postid)
                return newPosts;
            }))
            .catch(error=>setError(error.response.data))
        }

        return (
            <>
            <div className="blogContent">
                <div className="headerBlock"> 
                    <div className="blogTitle">
                        Basic Blog  
                    </div>
                    <div className="newPostButton">
                        <Link className="newPostButton" to={"/edit"}>New Post</Link>
                    </div>
                </div>
            {error}
            {   posts.map((post, index) =>
                    <div key={index}>
                        <div className="blogPost">
                        <div className="title">
                            {post.title}
                        </div> 
                        <a onClick={()=>deletePost(post.id)}>
                        <div className="editButton">delete</div>
                        </a>
                        <Link style={{textDecoration:'none'}} to={"/edit/"+post.id}><div className="editButton">edit</div></Link>
                        <div className="info">
                            Author: {post.name}<br/>
                            Last Edited: {post.date} 
                        </div>
                        <div className="postContent">
                            {post.content}
                        </div>
                        </div>
                    </div>
                )
            }
            </div>
            </>
        )

}