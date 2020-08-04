import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css'; 

class App extends Component {
  //render보다 먼저 실행, 컴포넌트 초기화 
  constructor(props){
    super(props);
    this.state = {
      mode: 'read',
      selected_content_id: 1,
      content_count: 3,
      subject: {
        title: 'WEB', 
        sub: 'wolrd wide web!!'
      },
      welcome: {title: 'Welcome', desc: 'Hello, React!!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is for information'},
        {id: 2, title: 'CSS', desc: 'Css is for design'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive'}
      ]
    }  
  }
  render() {
    var _title, _desc, _article, _content = null;
    if (this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === "read") {
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }

      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === "create") {
      _article = 
        <CreateContent 
          onSubmit={function(_title,_desc){ 
            _content = {id : this.state.content_count+1, title : _title, desc : _desc}
            //var add_content = this.state.contents.concat(_content);
            // 배열 복사 : Array.form(), 객체 복사 : Object.assign()
            var add_content = Array.from(this.state.contents);
            add_content.push(_content);
            this.setState({
              contents: add_content,
              mode: 'read',
              selected_content_id: this.state.content_count+1
            });
          }.bind(this)}>
        </CreateContent>
    } else if (this.state.mode === "update") {
      _article = 
        <UpdateContent 
          data= {this.state.contents[this.state.selected_content_id-1]}
          onSubmit={function(_id,_title,_desc){ 
            //원본 복사
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length){
              if(_contents[i].id === _id){
                _contents[i] = {id: _id, title: _title, desc: _desc};
                break;
              }
              i = i + 1;
            }
            this.setState({
              contents: _contents
            })
          }.bind(this)}>
        </UpdateContent>
    }

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub} 
          onChangePage={function(){
            this.setState({
              mode: 'welcome'
            });
          }.bind(this)}
        >
        </Subject>
        <TOC 
          data={this.state.contents}
          onChangePage={function(id){
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
        >
        </TOC>
        <Control
          onChangeMode={function(_mode){

            if (_mode === "delete"){
              if(window.confirm('really?')){
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i,1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents

                });
              }
            }else {
              this.setState({
                mode: _mode
              });
            }
            
          }.bind(this)}
        ></Control>
        {_article}
      </div>
    );
  }
}

export default App;
