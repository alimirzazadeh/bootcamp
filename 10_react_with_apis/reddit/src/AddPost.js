import * as React from "react";
import * as _ from "underscore";




class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      title: '',
      text: '',
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(type, event) {
    this.setState({[type]: event.target.value});
  }

  submit(event) {
    this.setState({error: this.state.author === '' || this.state.title === '' || this.state.text === ''}, () => {
      if (!this.state.error) {
        this.handleSubmit(_.pick(this.state, ['author', 'title', 'text']));
      }
    });

    event.preventDefault();
  }
  handleSubmit(data) {
    console.log(data);
    this.props.onSubmit(data);
  }
  render() {
    return (
      <div>

        <form>
          <label>
            Author:
            <input type="text" value={this.state.author} onChange={(e) => this.handleChange("author", e)} />
            <br/>
            Title:
            <input type="text" value={this.state.title} onChange={(e) => this.handleChange("title", e)} />
            <br/>
            Text:
            <input type="text" value={this.state.text} onChange={(e) => this.handleChange("text", e)} />
          </label>
          <input type="submit" value="Submit"  onClick={this.submit}/>
        </form>
        <h3>{this.state.error && "Make sure all fields  are filled in properly"}</h3>
      </div>
    )
  }
}


export default AddPost;
