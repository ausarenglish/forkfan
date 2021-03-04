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
            forks: [],
            isRetrievalError: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({userName: e.target.value});
    }

    handleSubmit(event) {
        // console.log("handle submit test");
        fetch(`https://api.github.com/users/${this.state.userName}/repos?per_page=1000`)
          .then(result => {
          return result.json();
          })
          .then((result) => {
            console.log(result);
            if(!Array.isArray(result))
            { 
              // update state
          this.setState({forks: []});
             this.setState({isRetrievalError: true});
            } else { 
               this.setState({isRetrievalError: false});
              
              // iterate through repos
              const repoForkArr = result.map((repo) => {
                return [repo.full_name, repo.forks]
              })
              // sort in descending order of number of forks
              const sortedRepoForkArr = repoForkArr.sort((a, b) => b[1] - a[1]);
              // format array elements
              const formattedRepoForkArr = sortedRepoForkArr.map((repo) => {
                const formatted = `Repo: ${repo[0]} Forks#: ${repo[1]}`;
                return formatted;
              })
               // update state
          this.setState({forks: formattedRepoForkArr});
            }
          event.target.firstElementChild.firstElementChild.value = "";
      
           })
  .catch(error => {
    // if error occurs
    console.log(error);
  })

      
        // alert('A name was submitted: ' + this.state.userName);
        event.preventDefault();
      }
      // 
    

      render() {
        let {isRetrievalError} = this.state;
        // const listItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // const mappedLists = this.state.forks;
        let mappedLists = this.state.forks.map((fork, idx) => {
           return (
             <div key = {idx}> 
               <h3 style={{textAlign: 'left'}}>
              {`${idx + 1}. ${fork}`}
               </h3>
             </div>
           )
        })
           console.log("retrival error: ", isRetrievalError)
          return (
              <div className = "main" style = {mainStyles.container} >
              <h1>
                  Forkfan
              </h1> 
            <UsernameForm handleSubmit = {this.handleSubmit} handleChange = {this.handleChange} userName = {this.state.userName} />
              <Datadisplay content = {mappedLists}/>
              </div>
          );
      }
  }
 {/* {mappedLists} */}
  // {JSON.stringify(this.state.forks)}

  // fetch('https://api.github.com/users/' + this.state.userName)

  const mainStyles = {
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
    
    
    },
  };

  



ReactDOM.render(<Main />, document.getElementById("root"));

// `https://api.github.com/users/${this.state.userName}/repos?per_page=1000`
// isRetrievalError ? <div> <p>user does not exist</p></div> :