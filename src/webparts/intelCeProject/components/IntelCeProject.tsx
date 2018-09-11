import * as React from 'react';
import styles from './IntelCeProject.module.scss';

import { IIntelCeProjectProps }from './IIntelCeProjectProps'

import { escape } from '@microsoft/sp-lodash-subset';
import  InteIntelCERequestForm  from '../components/RequestForm/IntelCERequestForm'

export default class IntelCeProject extends React.Component<IIntelCeProjectProps,{}> {
  public render() {
    return (
      <InteIntelCERequestForm {...this.props}/>
    );
  }
}
