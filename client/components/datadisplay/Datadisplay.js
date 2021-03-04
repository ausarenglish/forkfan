import React, { Component } from 'react';

// set up form component
const Datadisplay = (props) => {
 
  return ( <div>
          <div>
            <button style = {styles.container} >
            {props.content}  
            </button>
          </div>

          </div>
            );
}


const styles = {
  container: {
    border: '1px black solid',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '10px',
  },
};

export default Datadisplay;