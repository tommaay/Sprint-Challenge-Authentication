import React from 'react';

class Jokes extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <React.Fragment>
            {this.props.jokes.map(joke => (
               <h4>{joke.joke}</h4>
            ))}
         </React.Fragment>
      );
   }
}

export default Jokes;
