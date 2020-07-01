import React from 'react';
import axios from 'axios';
import Router from "../../Router";

class Test extends React.Component {
    state = {
        title: '',
        body: '',
        posts: ''
    }

    componentDidMount = () => {
        this.getBlogPost();
    }

    getBlogPost = () => {
        axios.get('http://localhost:8080/api')
            .then((response) => {
                const data = response.data;
                this.setState({posts: data});
                console.log("Data has been received");
            })
            .catch(() => {
                alert('Error retrieving data!!!');
            })
    }

    handleChange = ({target}) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }

    submit = (event) => {
        event.preventDefault();
        const payload = {
            title: this.state.title,
            body: this.state.body
        }
        console.log("submit")

        axios({
            url: 'http://localhost:8080/api/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('data has  been send to the server');
            })
            .catch(() => {
                console.log('data has been not sent the server')
            })

        this.resetUserInput();
        this.getBlogPost();
    }

    resetUserInput = () => {
        this.setState({
            title: '',
            body: ''
        })
    }

    displayBlogPost = (posts) => {
        if (!posts.length) return null;

        return posts.map((post, index) => (
            <div key={index} className="blog-post_display">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ));
    }

    render() {
        console.log("state:", this.state);
        return (
            <div className="App">
                <h2>Welcome to the best app ever</h2>
                <form className="form-input">
                    <div>
                        <input type="text" name="title" value={this.state.title} placeholder="Title"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <textarea name="body" cols="30" rows="10" value={this.state.body} placeholder="body"
                                  onChange={this.handleChange}></textarea>
                    </div>
                    <button onClick={this.submit}>Submit</button>
                </form>
                <div>
                    {this.displayBlogPost(this.state.posts)}
                </div>
            </div>
        );
    }
}


export default Test;
