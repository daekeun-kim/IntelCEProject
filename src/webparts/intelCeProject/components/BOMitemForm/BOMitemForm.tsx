import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { IIntelBOMState, IIntelBOMStateList } from '../../state/IIntelCEState';



export class BOMitemForm extends React.Component<any,IIntelBOMStateList>{

    constructor(props){
        super(props);

        this.state = {
            IntelBOMState:[    
                {
                    requestid:"",
                    model:"",
                    old_pn:"",
                    new_pn:"",
                    part_description:"",
                    impacts_ccl_yn:""
                }
            ]
        } ;
    }   

    id = 0  

    handleCreate = (data) => {
        const { IntelBOMState } = this.state;
        console.log(IntelBOMState);
        this.setState({
            IntelBOMState: IntelBOMState.concat({ requestid: this.id++, ...data })
        })
      }

      handleRemove = (id) => {
        const { IntelBOMState } = this.state;
        this.setState({
            IntelBOMState: IntelBOMState.filter(info => info.requestid !== id)
        })
      }

    public render(){
        
        const { IntelBOMState } = this.state;
        return(            
        <div>
            <button type="button" onClick={this.handleCreate} >Add impact intel BOM</button>
            
            <BOMitemList
                data ={IntelBOMState}
                onRemove={this.handleRemove}
            />
        </div>
        );
    }
}

class BOMitemList extends React.Component<any,any>{
    
    constructor(props){
        super(props);
    }
    static defaultProps = {
        data:[],
        list:[],
        onRemove: () => console.warn('onRemove not defined'),
      }

    render() {
      const { data, onRemove } = this.props;
      
      const list = data.map(
        info => (
          <BOMitem
            key = {info.requestid}
            data={info}
            onRemove = {onRemove}
          />)
      );
  
      return (
        <div>
          {list}    
        </div>
      );
    }
  }

class BOMitem extends React.Component<any,any>{

    static defaultProps = {
        data:[],
        list: [],
        onRemove: () => console.warn('onRemove not defined'),
      }

      handleRemove = () => {
        // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 호출
        const { data, onRemove } = this.props;
        console.log(data);
        onRemove(data.requestid);
      }

    public render(){
        return(            
        <div> 
            <div>
                    <Dropdown
                    placeHolder="Select an Model"
                    label="Model Affected"
                    id="Basicdrop1"
                    ariaLabel="Basic dropdown example"
                    options={[
                        { key: 'A', text: 'Option a', title: 'I am option a.' },
                        { key: 'B', text: 'Option b' },
                        { key: 'C', text: 'Option c', disabled: true },
                        { key: 'D', text: 'Option d' },
                        { key: 'E', text: 'Option e' },
                        { key: 'F', text: 'Option f' },
                        { key: 'G', text: 'Option g' },
                        { key: 'H', text: 'Option h' },
                        { key: 'I', text: 'Option i' },
                        { key: 'J', text: 'Option j' }
                        ]}
                    />


                    <TextField label="Old P/N"  />
                    <TextField label="New P/N" />
                    <TextField label="Part Description" />
                    <TextField label="Impacdts CCL (Y/N)" />
                    <button type="button" onClick={this.handleRemove} title="Remove Item" >Remove item</button>
                </div>
        </div>
        );
    }

}
