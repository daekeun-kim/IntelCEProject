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

    componentDidMount(){

        this.setState({
            ...this.state,
            IntelBOMState:this.props.IntelBOMState
        });

    }   

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleCreate = (data) => {

        const { IntelBOMState } = this.state;
        console.log("HandleCreate :");
        console.log(IntelBOMState);  

        let newIntelBOMState = {
            requestid: ""+this.id++,
            model:"",
            old_pn:"",
            new_pn:"",
            part_description:"",
            impacts_ccl_yn:""
        } as IIntelBOMState

        let resultState = IntelBOMState.concat(newIntelBOMState);

        this.setState({
            IntelBOMState: resultState
        });

        this.props.onUpdate(resultState);

      }

      handleRemove = (id) => {
       
        const { IntelBOMState } = this.state;

        let resultState;

        if (IntelBOMState.length < 2)
        {
            alert("You can't delete if item is less than 1");
        }
        else
        {

            resultState = IntelBOMState.filter(info => info.requestid !== id);

            this.setState({
            IntelBOMState: IntelBOMState.filter(info => info.requestid !== id)
            })

            this.props.onUpdate(resultState);
        }



        console.log(IntelBOMState);
      }


      handleInputChange = (e) => {
    
        console.log("handleInputChange");

        const { IntelBOMState } = this.state;
        let changneIntelbomstate =  [...this.state.IntelBOMState];
        let chaneitem = 
        changneIntelbomstate[e.target.dataset.index][e.target.dataset.name] = e.target.value;

        console.log(changneIntelbomstate[e.target.dataset.index][e.target.dataset.name]);

        let resultState = IntelBOMState.map((item,index) =>
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


        this.setState({
            IntelBOMState: resultState
        })

        this.props.onUpdate(resultState);
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
