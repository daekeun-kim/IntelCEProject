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
  withRouter,
  HashRouter,
  Redirect
} from 'react-router-dom'

import IntelCEListForm from './ListForm/IntelCEListForm';
import IntelCEDetailForm from './DetailForm/IntelCEDetailForm';
import { DetailsListCompactExample } from './ListForm/DetailsListCompactExample';



export default class IntelCeProject extends React.Component<any,{}> {


  

  public render() {
    return (
      <div>
      
      <Router basename="/teams/AsiaSPDevelopment/_layouts/15/workbench.aspx">
      <div>

        <div>
            <ul>
                <li><Link to="/">Create</Link></li>
                <li><Link to="/Edit">Edit</Link></li>
                <li><Link to="/List">List</Link></li>
                <li><Link to="/testList">test</Link></li>
            </ul>
        </div>

        <Switch>
          <Route exact path="/" component={()=> <InteIntelCERequestForm {...this.props} /> }/>
          <Route path="/Edit" component={()=> <InteIntelCERequestForm {...this.props} /> }/>
          <Route path="/List" component={()=> <IntelCEListForm {...this.props} /> }/>
          <Route path="/Details/:id" component={(props)=> <IntelCEDetailForm {...this.props} {...props} /> }/>
          <Route path="/testList"  component={(props)=> <DetailsListCompactExample {...props} {...this.props} /> }/>
         }
       </Switch>

      </div>
      </Router>
      </div>
    );
  }
}

