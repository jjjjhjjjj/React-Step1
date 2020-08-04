import React, { Component } from 'react';

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h2>Create</h2>
        <form 
          action="/create_process" 
          method="POST"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(e.target.title.value,e.target.desc.value)
          }.bind(this)}
        >
          <input type="text" name="title" placeholder="title" />
            <br />
          <textarea name="desc" placeholder="description"></textarea>
            <br />
          <button type="submit">submit</button>
        </form>
      </article>
    );
  }
}

export default CreateContent;