import React from 'react';
import { Redirect } from 'react-router-dom';
import { PageContainer, Card } from '../styled/containers';

class Jokes extends React.Component {
   render() {
      if (!this.props.loaded) {
         return <h1>Loading...</h1>;
      } else if (!this.props.loggedIn) {
         return <Redirect to="/login" />;
      } else if (this.props.loaded) {
         return (
            <PageContainer>
               {this.props.jokes.map(joke => (
                  <Card>
                     <h4 key={joke.id}>{joke.joke}</h4>
                  </Card>
               ))}
            </PageContainer>
         );
      }
   }
}

export default Jokes;
