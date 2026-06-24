import React, { useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    if (editId !== null) {
      setPosts(
        posts.map((post) =>
          post.id === editId
            ? { ...post, title, content, status }
            : post
        )
      );
      setEditId(null);
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content,
        status,
      };
      setPosts([...posts, newPost]);
    }

    setTitle("");
    setContent("");
    setStatus("Draft");
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setStatus(post.status);
    setEditId(post.id);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Content Creator Blog Manager</h1>

      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Write Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
        cols="40"
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Draft</option>
        <option>Published</option>
      </select>

      <br /><br />

      <button onClick={handleSubmit}>
        {editId ? "Update Post" : "Add Post"}
      </button>

      <hr />

      <input
        type="text"
        placeholder="Search Blogs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Blog Posts</h2>

      {filteredPosts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{post.title}</h3>

          <p>
            <strong>Status:</strong> {post.status}
          </p>

          <p>{post.content}</p>

          <button onClick={() => handleEdit(post)}>
            Edit
          </button>

          <button
            onClick={() => handleDelete(post.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;