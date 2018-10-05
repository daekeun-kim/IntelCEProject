import * as React from 'react';
import styles from './IntelCeProject.module.scss';

import { IIntelCeProjectProps }from './IIntelCeProjectProps'

import { escape } from '@microsoft/sp-lodash-subset';
import  InteIntelCERequestForm  from '../components/RequestForm/IntelCERequestForm'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import IntelCEListForm from './ListForm/IntelCEListForm';
import IntelCEDetailForm from './DetailForm/IntelCEDetailForm';

export default class IntelCeProject extends React.Component<any,{}> {

  public render() {
    return (
      <div>
      
      <Router basename="/teams/AsiaSPDevelopment/_layouts/15/workbench.aspx">

      <div>
        <div>
            <ul>
                <li><Link to="/Create">Create</Link></li>
                <li><Link to="/List">List</Link></li>                
            </ul>
        </div>

        <Switch>
          <Route exact path="/"component={(props)=> <IntelCEListForm {...props} {...this.props} /> } />
          <Route exact path="/Create" component={()=> <InteIntelCERequestForm {...this.props} /> }/>
          <Route path="/Edit" component={()=> <InteIntelCERequestForm {...this.props} /> }/>
          <Route path="/Details/:id" component={(props)=> <IntelCEDetailForm {...this.props} {...props} /> }/>
          <Route path="/List"  component={(props)=> <IntelCEListForm {...props} {...this.props} /> }/>
       </Switch>

      </div>
      </Router>
      </div>
    );
  }
}

