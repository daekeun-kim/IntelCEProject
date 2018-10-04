import * as React from 'react';

import styles from '../Assets/IntelCeProject.module.scss'
import intelCEDataService from '../../services/intelCEDataService';

import {
    MarqueeSelection, DetailsList, Selection, Image, ImageFit,
    SelectionMode, Spinner, SpinnerSize, Fabric, ColumnActionsMode, IColumn, CheckboxVisibility,IDetailsList,
    Callout, Panel, PanelType, IContextualMenuItem, autobind, ContextualMenu, IContextualMenuProps, DirectionalHint,
    css,
    createRef
  } from 'office-ui-fabric-react';

  import Pagination from 'office-ui-fabric-react-pagination';


  const _items: any[] = [];

  const _columns: IColumn[] = [
    {
      key: 'column1',
      name: 'Name',
      fieldName: 'name',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      ariaLabel: 'Operations for name'
    },
    {
      key: 'column2',
      name: 'Value',
      fieldName: 'value',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      ariaLabel: 'Operations for value'
    }
  ];

export default class IntelCEListForm extends React.Component<
    {},
    {
      items: {}[];
      selectionDetails: {};
      showItemIndexInView: boolean;
    }
  > {

    private _selection: Selection;


    private _detailsList = createRef<IDetailsList>();
  
    constructor(props: {}) {
      super(props);

      this._selection = new Selection({
       
    }); 
  
      // Populate with items for demos.
      if (_items.length === 0) {
        for (let i = 0; i < 200; i++) {
          _items.push({
            key: i,
            name: 'Item ' + i,
            value: i
          });
        }
      }
    }

    


    componentDidMount(){

        let objintelCEDataService = new intelCEDataService();

/*
        objintelCEDataService.getIntelCEList(0).then((resp) => {
            console.log("getIntelCEList");
            console.log(resp);

            objintelCEDataService.getIntelCEListTotalCount().then((resp2) => {
                console.log("getIntelCEListTotalCount");
                console.log(resp2);
            });    
        });    
*/
        console.log("ListcomponentDidMount1");
    }

    public render(){
        
        return(            
       <div>

        <div>

        </div>
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            componentRef={this._detailsList}
            items={_items}
            columns={_columns}

            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
 
          />
        </MarqueeSelection>
      </div>
        );
    }

}