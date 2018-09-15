import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { IIntelBOMState, IIntelBOMStateList } from '../../state/IIntelCEState';



export class BOMitemForm extends React.Component<IIntelBOMStateList,IIntelBOMStateList>{

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

    componentDidMount(){

        this.setState({
            IntelBOMState:this.props.IntelBOMState
        });

    }   

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
                items ={IntelBOMState}
                onRemove={this.handleRemove}
            />
        </div>
        );
    }
}


export class BOMitemForm2 extends React.Component<IIntelBOMStateList,IIntelBOMStateList>{

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

    componentDidMount(){

        this.setState({
            IntelBOMState:this.props.IntelBOMState
        });

    }   

    handleCreate = (data) => {
        const { IntelBOMState } = this.state;
        console.log("TESt");
        console.log(IntelBOMState);
        this.setState({
            IntelBOMState: IntelBOMState.concat({ requestid: this.id++, ...data })
        })
      }

      handleRemove = (id) => {
       
        const { IntelBOMState } = this.state;

        if (IntelBOMState.length < 2)
        {
            alert("You can't delete if item is less than 1");
        }
        else
        {
            this.setState({
            IntelBOMState: IntelBOMState.filter(info => info.requestid !== id)
        })
    }


        console.log(id);
        console.log(IntelBOMState);
      }


      handleInputChange = (e) => {
    
        console.log("change3");
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(e.target);
        console.log(e.target.dataset.index);
        console.log(e.target.dataset.name);

        const { IntelBOMState } = this.state;
        let changneIntelbomstate =  [...this.state.IntelBOMState];
        let chaneitem = 
        changneIntelbomstate[e.target.dataset.index][e.target.dataset.name] = e.target.value;
        console.log(changneIntelbomstate[e.target.dataset.index][e.target.dataset.name]);

        this.setState({
            IntelBOMState: IntelBOMState.map((item,index) =>
            {
             if (index === e.target.dataset.index)
             {
                return chaneitem;
             }
             else
             {
                return item;
             }
            })
        })

        console.log(this.state);
        
    }

    public render(){
        
        const { IntelBOMState } = this.state;
        return(            
        <div>
            <button type="button" onClick={this.handleCreate} >Add impact intel BOM</button>
            {this.state.IntelBOMState.map((item, index) =>
                <div key = {item.requestid} >
                    <Dropdown
                        
                        placeHolder="Select an Model"
                        label="Model Affected"
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

                    <input onChange={this.handleInputChange } data-index={index} data-name="old_pn"  />
                    <input onChange={this.handleInputChange } data-index={index} data-name="new_pn"   />
                    <input onChange={this.handleInputChange } data-index={index} data-name="part_description"   />
                    <input onChange={this.handleInputChange } data-index={index} data-name="impacts_ccl_yn"  />

                    <button type="button" onClick={() => this.handleRemove(item.requestid)} title="Remove Item" >Remove item</button>
                </div>
            )}
        </div>
        );
    }
}


class BOMitemList extends React.Component<any,any>{
    
    constructor(props){
        super(props);
    }
    static defaultProps = {
        items:[],
        onRemove: () => console.warn('onRemove not defined'),
      }

    render() {
      const { items, onRemove } = this.props;
      console.log(items);
      
      const itemlist = items.map((item,index) =>    
        <BOMitem
            key = {item.requestid}
            item={item}
            onRemove = {onRemove}
            index = {index}
        />
    );
    
    console.log(itemlist);
      return (
        <div>
            {itemlist} 
        </div>
      );
    }
  }

class BOMitem extends React.Component<any,any>{

    static defaultProps = {
        onRemove: () => console.warn('onRemove not defined'),
      }

      handleRemove = () => {

        const { item, onRemove } = this.props;
        console.log(item);
        onRemove(item.requestid);        
      }

      handleChange = (e) => {

        const { name, value } = e.target;
        this.setState({
          [name]: value
        });            
      }


    public render(){
        console.log(this.props.item);
        return(            
        <div> 
            <div>
                <Dropdown
                    placeHolder="Select an Model"
                    label="Model Affected"
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
                <TextField name={`${"TEst"}.old_pn`} label="Old P/N"  />
                <TextField onChange={this.handleChange} label="New P/N" />
                <TextField onChange={this.handleChange} label="Part Description" />
                <TextField onChange={this.handleChange} label="Impacdts CCL (Y/N)" />
                <button type="button" onClick={this.handleRemove} title="Remove Item" >Remove item</button>
            </div>
        </div>
        );
    }

}
