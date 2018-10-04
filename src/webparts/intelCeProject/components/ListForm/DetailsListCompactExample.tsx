import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import styles from '../Assets/IntelCeProject.module.scss';
import Pagination from 'office-ui-fabric-react-pagination';
import intelCEDataService from '../../services/intelCEDataService';

import {
  Redirect,
  withRouter
} from 'react-router-dom'


export class DetailsListCompactExample extends React.Component<any,any> {

  
  private _selection: Selection;
  

  private _items: {
    reqeuestdate:string,
    corp_tracker:string,
    ecn:string,
    division : string,
    eco:string,
    affected_models: string,
    class_change: string,
    change_type:string, 
  }[] = [];
  
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

  pageitemCount = 3;


  history = this.props;

  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: true,
      contextualMenuProps: null,
      selectionDetails: this._getSelectionDetails(),
      currentPage: 0,
      pageSize: 3,
      items: [],
      totalCount :100,
      pageCount:3      
    };

    // Populate with items for demos.
    /*if (this._items.length === 0) {
      for (let i = 0; i < 10; i++) {
        this._items.push({
          key: i,
          name: 'Item ' + i,
          value: i
        });
      }
    }
*/
    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });
/*
    this.state = {
      items: _items,
      selectionDetails: this._getSelectionDetails()
    };
    */
  }

  componentDidMount(){

    let objintelCEDataService = new intelCEDataService();

    let resultItems;
    let resultCount:number = 0;

    objintelCEDataService.getIntelCEList(0,this.pageitemCount).then((resp) => {
        console.log("getIntelCEList");
        console.log(resp);

        resultItems = resp;

        objintelCEDataService.getIntelCEListTotalCount().then((resp2) => {
            console.log("getIntelCEListTotalCount");
            console.log(resp2);

            resultCount = resp2;


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
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
          />
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={1}
            /*itemsCountPerPage={isNaN(parseInt(this.props.pageSize)) ? 5 : parseInt(this.props.pageSize)}*/
            itemsCountPerPage={3}
            totalPages={Math.ceil(this.state.totalCount / (isNaN(parseInt(this.state.pageSize)) ? 5 : parseInt(this.state.pageSize)))}
            /*totalPages={10}*/

            onChange={(page) => this.changes(page)}
          />
        </div>
      </div>
    );
  }

  private _getSelectionDetails(): string {
    return "List";
  }

  private changes(page) {

    let objintelCEDataService = new intelCEDataService();

    let resultItems;
    let resultCount:number = 0;

    objintelCEDataService.getIntelCEList(page-1,this.pageitemCount).then((resp) => {
        console.log("getIntelCEList");
        console.log(resp);

        resultItems = resp;
        
        this.setState({
          ...this.state,
          items: resultItems,
        });

    }); 

  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    //this.setState({ items: text ? _items.filter(i => i.name.toLowerCase().indexOf(text) > -1) : _items });
  };

  private _onItemInvoked = (item: any) => {

    let {history} = this.props;

    let returnUrl = `/Details/${item.requestid}`;

    alert(returnUrl);

    history.push({
      pathname: returnUrl
     });

  }
}


export default withRouter(DetailsListCompactExample);

