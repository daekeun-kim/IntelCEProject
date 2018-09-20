import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { IIntelBOMState, IIntelBOMStateList } from '../../state/IIntelCEState';
import styles from '../Assets/IntelCeProject.module.scss'
import { ActionButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class BOMitemForm extends React.Component<any,IIntelBOMStateList>{

    constructor(props){
        super(props);

        this.state = {
            IntelBOMState:[    
                {
                    requestid:"",
                    seq:"",
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

        if (IntelBOMState.length >= 10 )
        {
            alert("You can't add more than 10");

            return;
        }

        let newIntelBOMState = {
            requestid: ""+this.id++,
            seq:"",
            model:"",
            old_pn:"",
            new_pn:"",
            part_description:"",
            impacts_ccl_yn:""
        } as IIntelBOMState

        let resultState = IntelBOMState.concat(newIntelBOMState);

        for (let index = 0; index < resultState.length; index++) {
            resultState[index].seq = (index +1).toString();
       }

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

            resultState = IntelBOMState.filter(info => info.seq !== id);

            for (let index = 0; index < resultState.length; index++) {
                resultState[index].seq = (index +1).toString();
            }

            this.setState({
            IntelBOMState: resultState
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
            
            <table className={styles.tableW3c}>  
            <tr>
                <th colSpan={6}>
                Impact to Intel BOM: <br></br>
                    (if more than one model is affected, list new/old PNs separately)
                </th>
            </tr>
            <tr>
                <td colSpan={6}>
                    <ActionButton
                    iconProps={{ iconName:'Add' }}
                    onClick= {this.handleCreate}
                        >
                    Add impact intel BOM
                    </ActionButton>            
            </td>
            </tr>        
            <tr> 
                <th>Model</th>
                <th>Old P/N</th>
                <th>New P/N</th>         
                <th>Part <br></br> descdription</th>         
                <th>Impacts <br></br> CCL <br></br> (Y/N)</th>        
                <th></th> 
            </tr>
            {this.state.IntelBOMState.map((item, index) =>
                <tr  key = {item.requestid} >
                    <td>                    
                        <select onChange={this.handleInputChange} data-index={index} data-name="model">  
                            <option key="initial" value="">Select an Model...</option>
                        {
                            this.props.affectedMOdels.map(modelitem =>{
                            return <option key={modelitem.key} value={modelitem.key}>{modelitem.text}</option>                          
                            }) 
                        }                       
                        </select>
                    </td>
                    <td><input className={styles.inputW3c} onChange={this.handleInputChange } data-index={index} data-name="old_pn"  /></td>
                    <td><input className={styles.inputW3c} onChange={this.handleInputChange } data-index={index} data-name="new_pn"   /></td>
                    <td><input className={styles.inputW3c} onChange={this.handleInputChange } data-index={index} data-name="part_description"   /></td>
                    <td>
                        <select onChange={this.handleInputChange} data-index={index} data-name="impacts_ccl_yn">  
                                <option value="">Y/N</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>                    
                        </select>
                    </td>
                    <td>
                        <ActionButton
                            iconProps={{ iconName:'Delete' }}
                            onClick= {() => this.handleRemove(item.seq)}
                                >                            
                        </ActionButton>
                    </td>                    
                </tr>           
            )}
            </table>
        </div>
        );
    }

}
