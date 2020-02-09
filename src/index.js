import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

class DApp extends React.Component{
    render(){
        return(
            <Router><App /></Router>
        )
    }
}


ReactDOM.render( <DApp/>, document.getElementById('root'));



serviceWorker.unregister();
