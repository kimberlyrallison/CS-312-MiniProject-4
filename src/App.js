import Login from "./login.js"
import Register from "./register.js";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import PostList from "./PostList.js";
import Main from "./main.js";
import BlogPostForm from "./BlogPostForm.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route index element={<PostList/>}/>  
          <Route path="edit/:id?" element={<BlogPostForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
