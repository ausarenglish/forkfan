// import React from 'react';
// import ReactDom from 'react-dom';

// const HelloWorld = () => {
//   return (
//     <h1>
//       Hello World
//     </h1>
//   );
// }
import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom';
import UsernameForm from './components/form/UsernameForm';
import Datadisplay from './components/datadisplay/Datadisplay'

class Main extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
            userName: '',
            forks: {dummy: 'data'},
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({userName: e.target.value});
    }

    handleSubmit(event) {
        // console.log("handle submit test");
        fetch('https://api.github.com/users/' + this.state.userName)
          .then(result => {
          return result.json();
          })
          .then((result) => {
          console.log(result);
          this.setState({forks: result});
           })
  .catch(error => {
    // if error occurs
    console.log(error);
  })

      

        alert('A name was submitted: ' + this.state.userName);
        event.preventDefault();
      }
      render() {
        return (
            <div>
            <h1>
                Hello World test!
            </h1> 
          <UsernameForm handleSubmit = {this.handleSubmit} handleChange = {this.handleChange} userName = {this.state.userName} />
           <Datadisplay content = {JSON.stringify(this.state.forks)}/>
            </div>
        );
      }
  }






ReactDOM.render(<Main />, document.getElementById("root"));