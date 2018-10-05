import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import styles from '../Assets/IntelCeProject.module.scss';
import Pagination from 'office-ui-fabric-react-pagination';
import intelCEDataService from '../../services/intelCEDataService';

import {
  withRouter
} from 'react-router-dom'


export class IntelCEListForm extends React.Component<any,any> {
  
  private _columns = [
    {
      key: 'column1',
      name: 'reqeuestdate',
      fieldName: 'reqeuestdate',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: 'column2',
      name: 'corp_tracker',
      fieldName: 'corp_tracker',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: 'column3',
      name: 'ecn',
      fieldName: 'ecn',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: 'column4',
      name: 'affected_models',
      fieldName: 'affected_models',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    }
    ,
    {
      key: 'column5',
      name: 'class_change',
      fieldName: 'class_change',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    }
    ,
    {
      key: 'column6',
      name: 'change_type',
      fieldName: 'change_type',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    }
  ];

  ItemCountPerPage:number = 5;

  constructor(props: {}) {
    super(props);

    // set initial state.     
    this.state = {
      currentPage: 1,
      items: [],
      totalCount :100
    };

  }

  componentDidMount(){

    let objintelCEDataService = new intelCEDataService();

    let resultItems;
    let resultCount:number = 0;

    objintelCEDataService.getIntelCEList(0,this.ItemCountPerPage).then((r) => {

        resultItems = r;        

        objintelCEDataService.getIntelCEListTotalCount().then((r2) => {
            resultCount = r2;
            this.setState({
              items: resultItems,
              totalCount: resultCount
        });

        });    
    });   


    console.log("ListcomponentDidMount1");
}

  public render(){
    const { items, selectionDetails } = this.state;

    return (
      <div>
        <div>{selectionDetails}</div>

          <DetailsList
           {...this.props}
            items={items}
            columns={this._columns}
            setKey="set"
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
          />
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={this.state.currentPage}
            
            itemsCountPerPage={this.ItemCountPerPage}

            totalPages={Math.ceil(this.state.totalCount / (isNaN(this.ItemCountPerPage) ? 5 : this.ItemCountPerPage))}            

            onChange={(page) => this.changes(page)}
          />
        </div>
      </div>
    );
  }

  // Page changed
  private changes(page) {

    let objintelCEDataService = new intelCEDataService();

    console.log(page);

    let resultItems;
    let resultCount:number = 0;

    objintelCEDataService.getIntelCEList(page-1,this.ItemCountPerPage).then((r) => {

        resultItems = r;        

        objintelCEDataService.getIntelCEListTotalCount().then((r2) => {
            resultCount = r2;
            this.setState({
              ...this.state,
              currentPage :page,
              items: resultItems,
              totalCount: resultCount
        });

        });    
    });   

  }

  // when rows are double-clicked then go to details page for the row
  private _onItemInvoked = (item: any) => {

    let {history} = this.props;

    let returnUrl = `/Details/${item.requestid}`;

    history.push({

      pathname: returnUrl
     
    });

  }
}


export default withRouter(IntelCEListForm);

