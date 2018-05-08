import React, { Component } from "react";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import axios from "axios";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(results => {
      console.log(results.data);
      this.setState({ posts: results.data });
    });
  }

  updatePost(id, text) {
    console.log(text);
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(results => {
        console.log(results.data);
        this.setState({ posts: results.data });
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  createPost(text) {
    console.log(text);
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then(results => {
        console.log(results.data);
        this.setState({ posts: results.data });
      })
      .catch(console.log);
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFN={this.createPost} />
          {posts.map(posts => (
            <Post
              key={posts.id}
              text={posts.text}
              date={posts.date}
              updatePostFn={this.updatePost}
              id={posts.id}
              deletePostFN={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
