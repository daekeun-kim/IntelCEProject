import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { BaseComponent, createRef } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IIntelCEMainState } from '../../state/IIntelCEState';
import { BOMitemForm } from '../BOMitemform/BOMitemform';
import { IIntelBOMStateList } from '../../../../../lib/webparts/intelCeProject/state/IIntelCEState';
import intelCEDataService from '../../services/intelCEDataService';


export default class IntelCERequestForm extends React.Component<any,IIntelCEMainState>{
    
    
    constructor(props){
        super(props);

        let currnetDate = this.GetCurrentDateString();        


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
            
            <div>
                <label>Date: 
                    <input type="text" name = "reqeuestdate"                
                    value = {this.state.reqeuestdate} onChange={this.handleChange} />
                </label>
            </div>

            <div>
                <label>Title: 
                    <input type="text" name = "title"                
                    value = {this.state.title} onChange={this.handleChange} />
                </label>
            </div>

            <div>
                <label>Corp tracker #: 
                    <input type="text" name = "corp_tracker"                
                    value = {this.state.corp_tracker} onChange={this.handleChange} />
                </label>
            </div>

            <div>
                <label>ECN #: 
                    <input type="text" name = "ecn"                
                    value = {this.state.ecn} onChange={this.handleChange} />
                </label>
            </div>

            <Dropdown                           
                placeHolder="Select an Model"
                label="Model Affected"                
                ariaLabel="Select an Model"
                multiSelect
                onChanged={this.handleChangeMultiSelect}
                options={affectedModelsUI.data}
                ref={ref => {
                    this.modeldropdown = ref;
                  }}
            />

            <div>
                <label>ECO #: <input type="text" name = "eco"                
                    value = {this.state.eco} onChange={this.handleChange} />
                </label>
            </div>

            <div>
                <label>Dvision #: <input type="text" name = "division"                
                    value = {this.state.division} onChange={this.handleChange} />
                </label>
            </div>
           
             <fieldset>
                <legend>class change</legend>
                <div>
                    <input type="radio" id="class_a" 
                        name="class_change" value="A" 
                        checked={this.state.class_change === 'A'} 
                        onChange={this.handleChange} />                        
                    <label htmlFor="class_a">Class A</label>
                </div>
                <div>
                    <input type="radio" id="class_b" 
                        name="class_change" value="B"
                        checked={this.state.class_change === 'B'}
                        onChange={this.handleChange} />                        
                    <label htmlFor="class_b">Class B</label>
                </div>
            </fieldset>

            <BOMitemForm IntelBOMState={this.state.IntelBOMState} affectedMOdels ={affectedModelsUI.data} onUpdate = {this.handleChildUpdate} />

            <div>
                change type
              
                <input id="change_type1" onChange={this.handleChangeCheckBox} 
                    type="checkbox"  value="Process Improvement/CIP Upgrade"/>                
                <label htmlFor="change_type1">Process Improvement/CIP Upgrade</label>

                <input id="change_type2" onChange={this.handleChangeCheckBox} 
                    type="checkbox"  value="Safety"/>                
                <label htmlFor="change_type2">Safety</label>
                
                <input id="change_type3" onChange={this.handleChangeCheckBox} 
                    type="checkbox"  value="Reliability"/>                
                <label htmlFor="change_type3">Reliability</label>
                
                <input id="change_type4" onChange={this.handleChangeCheckBox} 
                    type="checkbox"  value="Documentation"/>                
                <label htmlFor="change_type4">Documentation</label>
                
                <input id="change_type5" onChange={this.handleChangeCheckBox} 
                    type="checkbox"  value="Cost"/>                
                <label htmlFor="change_type5">Cost</label>
                
                <input id="change_type6" onChange={this.handleChangeCheckBox} 
                    type="checkbox"  value="EOL (Obsolescence)"/>                
                <label htmlFor="change_type6">EOL (Obsolescence)</label>
                
                <input id="change_type7" onChange={this.handleChangeCheckBox} 
                    type="checkbox"  value="Manufacturability"/>                
                <label htmlFor="change_type7">Manufacturability</label>
                
                <input id="change_type8" onChange={this.handleChangeCheckBox} 
                    type="checkbox"  value="Software"/>                
                <label htmlFor="change_type8">Software</label>
                
                <input id="change_type9" onChange={this.handleChangeCheckBox} 
                    type="checkbox"  value="Others"/>                
                <label htmlFor="change_type9">Others</label>                  
                
                {
                    this.state.isShowchange_type_freetext?
                <div>
                    <label>Free text: 
                        <input name ="change_type_freetext"  value = {this.state.change_type_freetext} onChange={this.handleChange} />
                    </label>
                </div>
                : null 
                } 

            </div>

            <div>
                <p>Forecasted Cut-in:
                    Based on supply and usage rate of POR part, estimate when New part needs to be cut-in
                </p>

                 <div>
                    <label>System Cut-in Number: 
                        <input name ="sys_cut_in_number" value = {this.state.sys_cut_in_number} onChange={this.handleChange}  />
                    </label>
                </div>
                
                <div>
                    <label>Field Spares Cut-in Date: 
                        <input name ="field_spares_cut_in_date" value = {this.state.field_spares_cut_in_date} onChange={this.handleChange}  />
                    </label>
                </div>

                
                <div>
                    <label>POR part no longer avail: 
                        <input name ="por_part_no_longer_avail" value = {this.state.por_part_no_longer_avail} onChange={this.handleChange}  />
                    </label>
                </div>

            </div>
            <div>
                <p>
                    Implementation Plan (mark all that apply):
                </p> 

                <input id="implementation_plan1" onChange={this.handleChangeImplementationPlanCheckBox} 
                    type="checkbox"  value="New Shippers"/>                
                <label htmlFor="implementation_plan1">New Shippers</label>

                <input id="implementation_plan2" onChange={this.handleChangeImplementationPlanCheckBox} 
                    type="checkbox"  value="Replace on Fail"/>                
                <label htmlFor="implementation_plan2">Replace on Fail</label>
                
                <input id="implementation_plan3" onChange={this.handleChangeImplementationPlanCheckBox} 
                    type="checkbox"  value="Elective Field Retrofit"/>                
                <label htmlFor="implementation_plan3">Elective Field Retrofit</label>

            </div>

            <div>
                <p>
                    Process Node: (update by BU Work group) Allowed for multiple selection 
                </p>

                <input id="process_node1" onChange={this.handleChangeProcessNodeCheckBox} 
                    type="checkbox"  value="1270"/>                
                <label htmlFor="process_node1">1270</label>

                <input id="process_node2" onChange={this.handleChangeProcessNodeCheckBox} 
                    type="checkbox"  value="1272"/>                
                <label htmlFor="process_node2">1272</label>
                
                <input id="process_node3" onChange={this.handleChangeProcessNodeCheckBox} 
                    type="checkbox"  value="1274"/>                
                <label htmlFor="process_node3">1274</label>

                <input id="process_node4" onChange={this.handleChangeProcessNodeCheckBox} 
                    type="checkbox"  value="1276"/>                
                <label htmlFor="process_node4">1276</label>

            </div>
            <div>
                <ChoiceGroup
                    options={[
                        {
                        key: 'A',
                        text: 'No Change',
                        'data-automation-id': 'auto1'
                        } as IChoiceGroupOption,
                        {
                        key: 'B',
                        text: 'Adder'
                        }
                        ,
                        {
                        key: 'C',
                        text: 'Savings'
                        }
                    ]}
                    label="Cost Impact"
                    required={true}
                />
            </div>

            <fieldset>
                <legend>Cost Impact</legend>
                <div>
                    <input type="radio" id="cost_impact1" 
                        name="cost_impact" value="No Change" 
                        checked={this.state.cost_impact === 'No Change'} 
                        onChange={this.handleChange} />                        
                    <label htmlFor="cost_impact1">Class A</label>
                </div>
                <div>
                    <input type="radio" id="cost_impact2" 
                        name="cost_impact" value="Adder"
                        checked={this.state.cost_impact === 'Adder'}
                        onChange={this.handleChange} />                        
                    <label htmlFor="cost_impact2">Adder</label>
                </div>
                <div>
                    <input type="radio" id="cost_impact3" 
                        name="cost_impact" value="Savings"
                        checked={this.state.cost_impact === 'Savings'}
                        onChange={this.handleChange} />                        
                    <label htmlFor="cost_impact3">Savings</label>
                </div>
            </fieldset>


                <br/>
                <button type="submit">Create</button>
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
        alert('A name was submitted: ');
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