import React, { Component } from 'react';
 // Make sure to import your CSS file

class MemesGenerator extends Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: ' https://picsum.photos/400/300', // Placeholder URL for testing
            allMemeImgs: [] // Array to store fetched meme images
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const { memes } = response.data;
            this.setState({ allMemeImgs: memes });
        })
        .catch(error => {
            console.error("Error fetching memes:", error);
        });
    }
 
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // Logic to generate a random meme image and display it
        if (this.state.allMemeImgs.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.state.allMemeImgs.length);
            const randomMeme = this.state.allMemeImgs[randomIndex];
            this.setState({
                randomImg: randomMeme.url
            });
        }
    }

    render() {
        return (
            <div className='meme-generator'>
                <form className='meme-form' onSubmit={this.handleSubmit}>
                    <input
                        name="topText"
                        type='text'
                        placeholder='Top Text'
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input
                        name="bottomText"
                        type='text'
                        placeholder='Bottom Text'
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className='meme-container'>
                    <div className='meme'>
                        <img src={this.state.randomImg} alt="meme" />
                        <h2 className='top'>{this.state.topText}</h2>
                        <h2 className='bottom'>{this.state.bottomText}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default MemesGenerator;
