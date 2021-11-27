import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './components/css/index.scss';
import PostsList from './components/NotesList';
import IdeaImage from './assets/image.png';

const App = () => {
  return (
    <div>
      <div className="home">
        <div className="container">
          <div className="heading">
            <h1>Collect Your <br/> Thoughts.</h1>
          </div>
          <div className="headingImg">
            <img src={IdeaImage} alt="collect ideas" />
          </div>
        </div>
      </div>
      <Router>
        <Switch>
          <Route
            path='/'
            exact
            render={(props) => (
              <PostsList
                {...props}
              />
            )}
          />
          <Route />
        </Switch>
      </Router>
    </div>
  );
};

export default App;