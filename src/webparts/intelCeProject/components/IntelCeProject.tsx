import * as React from 'react';
import styles from './IntelCeProject.module.scss';

import { IIntelCeProjectProps }from './IIntelCeProjectProps'

import { escape } from '@microsoft/sp-lodash-subset';
import  InteIntelCERequestForm  from '../components/RequestForm/IntelCERequestForm'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  HashRouter,
  Redirect
} from 'react-router-dom'

import IntelCEListForm from './ListForm/IntelCEListForm';



export default class IntelCeProject extends React.Component<IIntelCeProjectProps,{}> {
  public render() {
    return (


      <Router basename="/teams/AsiaSPDevelopment/_layouts/15/workbench.aspx">


      <div>
      <div>
            <ul>
                <li><Link to="/">Create</Link></li>
                <li><Link to="/Edit">Edit</Link></li>
                <li><Link to="/List">List</Link></li>
            </ul>
            <hr/>
        </div>
       <Switch>
          <Route exact path="/" component={()=> <InteIntelCERequestForm {...this.props} /> }/>
          <Route path="/Edit" component={()=> <InteIntelCERequestForm {...this.props} /> }/>
          <Route path="/List" component={()=> <IntelCEListForm {...this.props} /> }/>
      </Switch>

      </div>
      </Router>

    );
  }
}
