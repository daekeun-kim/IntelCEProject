import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { BaseComponent, createRef } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { DefaultButton, IButtonProps ,ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IIntelCEMainState } from '../../state/IIntelCEState';
import { BOMitemForm } from '../BOMitemform/BOMitemform';
import { IIntelBOMStateList } from '../../../../../lib/webparts/intelCeProject/state/IIntelCEState';
import intelCEDataService from '../../services/intelCEDataService';
import styles from '../Assets/IntelCeProject.module.scss'


export default class IntelCERequestForm extends React.Component<any,IIntelCEMainState>{
    
    
    constructor(props){
        super(props);

        let currnetDate = this.GetCurrentDateString();        

        this.handleSubmit = this.handleSubmit.bind(this);


        this.state = {

            requestid:"",
            reqeuestdate:currnetDate,
            title:"",
            corp_tracker:"",
            ecn:"",
            division :"",
            eco:"",
            affected_models:"",
            class_change:"",
            change_type:"",            
            IntelBOMState:[    
                {
                    requestid:"",
                    seq:"1",
                    model:"",
                    old_pn:"",
                    new_pn:"",
                    part_description:"",
                    impacts_ccl_yn:""                                
                }                
            ]
            ,
            sys_cut_in_number :"",
            field_spares_cut_in_date :"",
            por_part_no_longer_avail:"",
            implementation_plan :"",
            process_node:"",
            cost_impact:"",

            affectedModelsList:[],  
            isShowchange_type_freetext :false,
            change_type_freetext:""              
        } ;

        
    }

    modeldropdown = null;
    seletectedModels= null;
    changeTypeList = null;
    implementation_planList = null;
    processNodeList = null ;


    private GetCurrentDateString()
    {
        var x = new Date();
        var y = x.getFullYear().toString();
        var m = (x.getMonth() + 1).toString();
        var d = x.getDate().toString();
        (d.length == 1) && (d = '0' + d);
        (m.length == 1) && (m = '0' + m);
        var yyyymmdd = y + m + d;

        
        return yyyymmdd.toString();
    }

    public render(){
    
        console.log("render");

        /* Get affected Model list from state */
        let affectedModelist = this.state.affectedModelsList;
        var affectedModelsUI= {'data':[]};

        affectedModelist.map( item =>{ item
            affectedModelsUI.data.push({key:item,text:item});        
        });        

        return(            
        
        <div>
           <form onSubmit={this.handleSubmit}>    
           <table className={styles.tableW3c}>
           <tr>
               <th>
                <div>
                    <label className={styles.labelW3c} htmlFor="intel_date">Date</label>
                </div>
               </th>
               <td>
                <div>
                    <input id="intel_date"className={styles.inputW3c} type="text" name = "reqeuestdate"     
                        placeholder="Date"           
                        value = {this.state.reqeuestdate} onChange={this.handleChange} />   
                </div>
               </td>
               <th>
                    <label className={styles.labelW3c} htmlFor="intel_title">title</label>
               </th>
               <td>
                <input id="intel_title" className={styles.inputW3c} type="text" name = "title"                
                    value = {this.state.title} onChange={this.handleChange} />  
               </td>
           </tr>
           <tr>
              <th>
                <div>
                    <label className={styles.labelW3c}>Corp tracker #</label>
                </div>
               </th>
               <td>
                <div>
                    <input className={styles.inputW3c} type="text" name = "corp_tracker"                
                        value = {this.state.corp_tracker} onChange={this.handleChange} />
                </div>
               </td>
               <th>
                    <label className={styles.labelW3c} >ECN #</label>
               </th>
               <td>
                 <input className={styles.inputW3c} type="text" name = "ecn"                
                    value = {this.state.ecn} onChange={this.handleChange} />
               </td>                
           </tr>
           <tr>
              <th>
                <div>
                    <label className={styles.labelW3c}>Division</label>
                </div>
               </th>
               <td>
                <div>
                    <input className={styles.inputW3c} type="text" name = "division"                
                        value = {this.state.division} onChange={this.handleChange} />   
                </div>
               </td>
               <th>
                    <label  className={styles.labelW3c} >ECO #</label>
               </th>
               <td>
                <input className={styles.inputW3c} type="text" name = "eco"                
                      value = {this.state.eco} onChange={this.handleChange} />
               </td>                
           </tr>
           <tr>
              <th>
                <div>
                    <label className={styles.labelW3c}>Affected Models</label>
                </div>
               </th>
               <td colSpan={3}>
                <div>
                    <Dropdown                           
                        placeHolder="Select an Model"                           
                        ariaLabel="Select an Model"
                        multiSelect
                        onChanged={this.handleChangeMultiSelect}
                        options={affectedModelsUI.data}
                        ref={ref => {
                            this.modeldropdown = ref;
                        }}
                    /> 
                </div>
               </td>               
           </tr>
           </table>
           
           <div>

            <br></br>            
            <table className={styles.tableW3c}>
                <tr>
                    <th>Clsss Change</th>
                </tr>
                <tr>
                    <td>  
                    <div className={styles.formInline}>
                    <label className={styles.radioContainer}> Class A
                        <input type="radio" 
                            name="class_change" value="A" 
                            checked={this.state.class_change === 'A'} 
                            onChange={this.handleChange} /> 
                            <span className={styles.checkmark}></span>                       
                    </label>

                    <label className={styles.radioContainer}> Class B
                        <input type="radio"
                            name="class_change" value="B"
                            checked={this.state.class_change === 'B'}
                            onChange={this.handleChange} />   
                            <span className={styles.checkmark}></span>                     
                    </label>
                     </div>       
                    </td>
                </tr>
            </table>


           </div>
           
           <br></br>
            <BOMitemForm IntelBOMState={this.state.IntelBOMState} affectedMOdels ={affectedModelsUI.data} onUpdate = {this.handleChildUpdate} />
        <br></br>
        <div>
            <table className={styles.tableW3c}>
            <tr>
                <th colSpan={2}>
                Change type
                    </th>
            </tr>
            <tr>
                <td>
                <label className={styles.checkContainer}>Process Improvement/CIP Upgrade
                    <input onChange={this.handleChangeCheckBox} 
                        type="checkbox"  value="Process Improvement/CIP Upgrade"/>      
                    <span className={styles.checkBoxmark}></span>          
                </label>

                <label className={styles.checkContainer}>Safety
                    <input onChange={this.handleChangeCheckBox} 
                        type="checkbox"  value="Safety"/>      
                    <span className={styles.checkBoxmark}></span>          
                </label>

                <label className={styles.checkContainer}>Reliability
                    <input onChange={this.handleChangeCheckBox} 
                        type="checkbox"  value="Reliability"/>      
                    <span className={styles.checkBoxmark}></span>          
                </label>

                <label className={styles.checkContainer}>Documentation
                    <input onChange={this.handleChangeCheckBox} 
                        type="checkbox"  value="Documentation"/>      
                    <span className={styles.checkBoxmark}></span>                              
                </label>

                <label className={styles.checkContainer}>Cost
                    <input onChange={this.handleChangeCheckBox} 
                        type="checkbox"  value="Cost"/>      
                    <span className={styles.checkBoxmark}></span>          
                </label>
                </td>
                <td>


                 <label className={styles.checkContainer}>EOL (Obsolescence)
                    <input onChange={this.handleChangeCheckBox} 
                        type="checkbox"  value="EOL (Obsolescence)"/>      
                    <span className={styles.checkBoxmark}></span>          
                </label>


                <label className={styles.checkContainer}>Manufacturability
                    <input onChange={this.handleChangeCheckBox} 
                        type="checkbox"  value="Manufacturability"/>      
                    <span className={styles.checkBoxmark}></span>          
                </label>


                <label className={styles.checkContainer}>Software
                    <input onChange={this.handleChangeCheckBox} 
                        type="checkbox"  value="Software"/>      
                    <span className={styles.checkBoxmark}></span>          
                </label>


                 <label className={styles.checkContainer}>Others
                    <input onChange={this.handleChangeCheckBox} 
                        type="checkbox"  value="Others"/>      
                    <span className={styles.checkBoxmark}></span>          
                </label>

                {
                    this.state.isShowchange_type_freetext?
                <div>
                    <label>Free text: 
                        <input name ="change_type_freetext"  value = {this.state.change_type_freetext} onChange={this.handleChange} />
                    </label>
                </div>
                : null 
                } 
                </td>
            </tr>
            </table>
            </div>
            <br></br>
            <table className={styles.tableW3c}>
                <tr>
                    <th colSpan={2}> Forecasted Cut-in: <br></br>
                    Based on supply and usage rate of POR part, estimate when New part needs to be cut-in
                    </th>                    
                </tr>
                <tr>
                    <td>
                        System Cut-in Number
                    </td>
                    <td>
                     <input className={styles.inputW3c} name ="sys_cut_in_number" value = {this.state.sys_cut_in_number} onChange={this.handleChange}  />    
                    </td>                  
                </tr>
                <tr>
                    <td>
                        Field Spares Cut-in Date
                    </td>
                    <td>
                        <input className={styles.inputW3c} name ="field_spares_cut_in_date" value = {this.state.field_spares_cut_in_date} onChange={this.handleChange}  />    
                    </td>                  
                </tr>
                <tr>
                    <td>
                        POR part no longer avail
                    </td>
                    <td>
                    <input className={styles.inputW3c} name ="por_part_no_longer_avail" value = {this.state.por_part_no_longer_avail} onChange={this.handleChange}  />    
                    </td>                  
                </tr>
            </table>

<br></br>
            <table className={styles.tableW3c}>
                <tr>
                    <th> Implementation Plan (mark all that apply)</th>
                </tr>
                <tr>
                    <td>  

                        <label  className={styles.checkContainer}>  New Shippers
                        <input  onChange={this.handleChangeImplementationPlanCheckBox} 
                            type="checkbox"  value="New Shippers"/> 
                        <span className={styles.checkBoxmark}></span>                       
                        </label>

                        <label  className={styles.checkContainer}>  Replace on Fail
                        <input  onChange={this.handleChangeImplementationPlanCheckBox} 
                            type="checkbox"  value="Replace on Fail"/> 
                        <span className={styles.checkBoxmark}></span>                       
                        </label>


                        <label  className={styles.checkContainer}>  Elective Field Retrofit
                        <input  onChange={this.handleChangeImplementationPlanCheckBox} 
                            type="checkbox"  value="Elective Field Retrofit"/> 
                        <span className={styles.checkBoxmark}></span>                       
                        </label>

                    </td>
                </tr>
            </table>


            <br></br>
            <table className={styles.tableW3c}>
                <tr>
                    <th>  Process Node: (update by BU Work group) Allowed for multiple selection </th>
                </tr>
                <tr>
                    <td>  

                        <label  className={styles.checkContainer}>1270
                        <input  onChange={this.handleChangeProcessNodeCheckBox} 
                            type="checkbox"  value="1270"/> 
                        <span className={styles.checkBoxmark}></span>                       
                        </label>

                        <label  className={styles.checkContainer}>1272
                        <input  onChange={this.handleChangeProcessNodeCheckBox} 
                            type="checkbox"  value="1272"/> 
                        <span className={styles.checkBoxmark}></span>                       
                        </label>


                        <label  className={styles.checkContainer}>1274
                        <input  onChange={this.handleChangeProcessNodeCheckBox} 
                            type="checkbox"  value="1274"/> 
                        <span className={styles.checkBoxmark}></span>                       
                        </label>

                        <label  className={styles.checkContainer}>1276
                        <input  onChange={this.handleChangeProcessNodeCheckBox} 
                            type="checkbox"  value="1276"/> 
                        <span className={styles.checkBoxmark}></span>                       
                        </label>

                    </td>
                </tr>
            </table>

            <br></br>
            <table className={styles.tableW3c}>
                <tr>
                    <th>Cost Impact</th>
                </tr>
                <tr>
                    <td>  
                    <div className={styles.formInline}>
                    <label className={styles.radioContainer}> No Change
                        <input type="radio" 
                            name="cost_impact" value="No Change" 
                            checked={this.state.cost_impact === 'No Change'} 
                            onChange={this.handleChange} /> 
                            <span className={styles.checkmark}></span>                       
                    </label>

                    <label className={styles.radioContainer}> Adder
                        <input type="radio"
                            name="cost_impact" value="Adder"
                            checked={this.state.cost_impact === 'Adder'}
                            onChange={this.handleChange} />   
                            <span className={styles.checkmark}></span>                     
                    </label>

                    <label className={styles.radioContainer}> Savings
                        <input type="radio"
                            name="cost_impact" value="Savings"
                            checked={this.state.cost_impact === 'Savings'}
                            onChange={this.handleChange} />   
                            <span className={styles.checkmark}></span>                     
                    </label>
                    </div>
                    </td>
                </tr>
            </table>
                <br/>

                <ActionButton
                    iconProps={{ iconName:'Accept' }}
                    onClick= {this.handleSubmit}
                        >
                    Submit
                </ActionButton>
                <br/>
            </form>
            
          </div>
        );
    }

    componentDidMount(){

        let objintelCEDataService = new intelCEDataService();
        let resultModelListfromSharePoint= {} as IIntelCEMainState;
        
        objintelCEDataService.getProductModelList().then((resp) => {
            console.log("componentDidMount");
            console.log("componentDidMount2.2");
            console.log(resp);
            resultModelListfromSharePoint = resp;       

            console.log(resultModelListfromSharePoint.affectedModelsList)
            
            this.setState({
                ...this.state,
                affectedModelsList : resultModelListfromSharePoint.affectedModelsList
            });
            console.log("componentDidMount2.23333");
        });        
        console.log("componentDidMount1");

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    
        console.log("componentDidUpdate");
        console.log(this.state);        
    

        //this.props.onUpdate(this.state.IntelBOMState);

    }

    handleSubmit(event) {

        console.log("handleSubmit");
        console.log(this.state);
        let objintelCEDataService = new intelCEDataService();

        let sendData = this.state;

        objintelCEDataService.createIntelCERequest(sendData,this.props.siteUrl);

        event.preventDefault();
    }

    handleChildUpdate = (fromChildState:any) => {

        console.log("handleChildUpdate");
        console.log(fromChildState);
        console.log(this.state);

        let newIntelBOM = this.state.IntelBOMState;
        newIntelBOM = fromChildState;

        this.setState({
            ...this.state,
            IntelBOMState : newIntelBOM
        })           
        
        console.log(this.state.IntelBOMState);        
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });      
    };

    private handleChangeMultiSelect = (option: IDropdownOption, index?: number) => {
        
        console.log("handleChildUpdate2");
        console.log(option);
        console.log(this.modeldropdown);

        const updatedSelectedItem =  this.seletectedModels ? this.copyArray(this.seletectedModels) : [];

        let ModelListWithComma = "";

        if (option.selected) {
          // add the option if it's checked
          updatedSelectedItem.push(option.key);
        } else {
          // remove the option if it's unchecked
          const currIndex = updatedSelectedItem.indexOf(option.key);
          if (currIndex > -1) {
            updatedSelectedItem.splice(currIndex, 1);
          }
        }
        
        this.seletectedModels = updatedSelectedItem;

        ModelListWithComma= updatedSelectedItem.join(',');

        this.setState({
          affected_models: ModelListWithComma
        });


    }

    private handleChangeCheckBox = (ev) => {
        
        console.log("handleChangeCheckBox");
        console.log(ev);


        let ChangeTypeWithComma = "";
        let isShowFreeText = this.state.isShowchange_type_freetext;

        const updateCheckboxItems =  this.changeTypeList ? this.copyArray(this.changeTypeList) : [];

        let CheckboxItemWithComma = "";

        if (ev.target.checked === true) {
          // add the option if it's checked
          updateCheckboxItems.push(ev.target.value);

          if ( ev.target.value === "Others")
          {
            isShowFreeText = true;
          }


        } else {
          // remove the option if it's unchecked
          const currIndex = updateCheckboxItems.indexOf(ev.target.value);
          if (currIndex > -1) {
            updateCheckboxItems.splice(currIndex, 1);
          }

          if ( ev.target.value === "Others")
          {
            isShowFreeText = false;
          }

        }
          
        this.changeTypeList = updateCheckboxItems;

        ChangeTypeWithComma= updateCheckboxItems.join(',');

        this.setState({
            isShowchange_type_freetext : isShowFreeText,
            change_type: ChangeTypeWithComma
        });
    }

    private handleChangeImplementationPlanCheckBox = (ev) => {
        
        console.log("handleChangeImplementationPlanCheckBox");
        console.log(ev);

        let impPlanWithComma = "";

        const impPlanList =  this.implementation_planList ? this.copyArray(this.implementation_planList) : [];

        let CheckboxItemWithComma = "";

        if (ev.target.checked === true) {
          // add the option if it's checked
          impPlanList.push(ev.target.value);

        } else {
          // remove the option if it's unchecked
          const currIndex = impPlanList.indexOf(ev.target.value);
          if (currIndex > -1) {
            impPlanList.splice(currIndex, 1);
          }
        }
          
        this.implementation_planList = impPlanList;

        CheckboxItemWithComma= impPlanList.join(',');

        this.setState({
            implementation_plan: CheckboxItemWithComma
        });
    }

    private handleChangeProcessNodeCheckBox = (ev) => {
        
        console.log("handleChangeImplementationPlanCheckBox");
        console.log(ev);

        let impPlanWithComma = "";

        const iProcessNodeList =  this.processNodeList ? this.copyArray(this.processNodeList) : [];

        let processNodeListwithComma = "";

        if (ev.target.checked === true) {
          // add the option if it's checked
          iProcessNodeList.push(ev.target.value);

        } else {
          // remove the option if it's unchecked
          const currIndex = iProcessNodeList.indexOf(ev.target.value);
          if (currIndex > -1) {
            iProcessNodeList.splice(currIndex, 1);
          }
        }
          
        this.processNodeList = iProcessNodeList;

        processNodeListwithComma= iProcessNodeList.join(',');

        this.setState({
            process_node: processNodeListwithComma
        });
    }
    
    private copyArray = (array: any[]): any[] => {
        const newArray: any[] = [];
        for (let i = 0; i < array.length; i++) {
          newArray[i] = array[i];
        }
        return newArray;
    };
 
}