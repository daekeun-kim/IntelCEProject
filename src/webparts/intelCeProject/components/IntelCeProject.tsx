import * as React from 'react';
import styles from './IntelCeProject.module.scss';
import { IIntelCeProjectProps } from './IIntelCeProjectProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class IntelCeProject extends React.Component<IIntelCeProjectProps, {}> {
  public render(): React.ReactElement<IIntelCeProjectProps> {
    return (
      <div className={ styles.intelCeProject }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to intel CE project!</span>
              <span className={ styles.title }>Thank you for visiting !</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
