import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IIntelCEMainState } from '../../state/IIntelCEState';
import { BOMitemForm, BOMitemForm2 } from '../BOMitemform/BOMitemform';


export default class IntelCERequestForm extends React.Component<any,IIntelCEMainState>{
    
    
    constructor(props){
        super(props);

        this.state = {

            requestid:"",
            reqeuestdate: new Date(),
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
            field_spares_cut_in_date :new Date(),
            por_part_no_longer_avail:"",
            implementation_plan :"",
            process_node:"",
            cost_impact:""
                  
        } ;
    }

    public render(){
        
        return(
            
          <div>
           {/* Sent the props as well to the SubmitForm handler to use the Connected Dispatch. Renders custom dropdown component with validation*/}
           <form onSubmit={this.handleSubmit}>    
            <DatePicker
                placeholder="Select a date..."     
                value = {this.state.reqeuestdate}        
             />

            <TextField name = "title" label="title" value = {this.state.title}  />
            <TextField name = "corp_tracker" label="Corp Tracker" value = {this.state.corp_tracker} />
            <TextField name = "ecn"  value = {this.state.ecn} />

            <Dropdown                           
                placeHolder="Select an Model"
                label="Model Affected"                
                ariaLabel="Select an Model"
                multiSelect
                options={[
                    { key: 'Header4', text: 'Colors', itemType: DropdownMenuItemType.Header },
                    { key: 'red', text: 'Red' },
                    { key: 'green', text: 'Green' },
                    { key: 'blue', text: 'Blue' },
                    { key: 'yellow', text: 'Yellow' },
                    { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
                    { key: 'Header5', text: 'Flower', itemType: DropdownMenuItemType.Header },
                    { key: 'rose', text: 'Rose' },
                    { key: 'lily', text: 'Lily' },
                    { key: 'sunflower', text: 'Sunflower' }
                ]}
            />

            <TextField name ="eco" label="ECO #" value = {this.state.eco} />
            <TextField name ="division" label="Dvision" value = {this.state.division} />
           
            <ChoiceGroup
            defaultSelectedKey="B"
            options={[
                {
                key: 'A',
                text: 'Class A',
                'data-automation-id': 'auto1'
                } as IChoiceGroupOption,
                {
                key: 'B',
                text: 'Class B'
                }
            ]}
            label="Class change"
            required={true}
            />

            <BOMitemForm2 IntelBOMState={this.state.IntelBOMState} />

            <div>change type
                <Checkbox label="Process Improvement/CIP Upgrade" ariaDescribedBy={'descriptionID'} />
                <Checkbox label="Safety" ariaDescribedBy={'descriptionID'} />
                <Checkbox label="Reliability" ariaDescribedBy={'descriptionID'} />
                <Checkbox label="Documentation" ariaDescribedBy={'descriptionID'} />
                <Checkbox label="Cost" ariaDescribedBy={'descriptionID'} />
                <Checkbox label="EOL (Obsolescence)" ariaDescribedBy={'descriptionID'} />
                <Checkbox label="Manufacturability" ariaDescribedBy={'descriptionID'} />
                <Checkbox label="Software/Automation" ariaDescribedBy={'descriptionID'} />
                <Checkbox label="Others" ariaDescribedBy={'descriptionID'} />                    
                <TextField label="Freetext" />
            </div>

            <div>
                <p>Forecasted Cut-in:
                    Based on supply and usage rate of POR part, estimate when New part needs to be cut-in
                </p>

                
                <TextField name ="sys_cut_in_number" value = {this.state.sys_cut_in_number} label="System Cut-In Number " />
                <DatePicker
                    placeholder="Select a date..."     
                    value = {this.state.field_spares_cut_in_date}        
                />
                <TextField name="por_part_no_longer_avail" value = {this.state.por_part_no_longer_avail} label="POR part no longer avail " />

            </div>
            <div>
                <p>
                    Implementation Plan (mark all that apply):
                </p> 
                    <Checkbox label="New Shippers" ariaDescribedBy={'descriptionID'} />
                    <Checkbox label="Replace on Fail" ariaDescribedBy={'descriptionID'} />
                    <Checkbox label="Elective Field Retrofit" ariaDescribedBy={'descriptionID'} />               
            </div>

            <div>
                <p>
                    Process Node: (update by BU Work group) Allowed for multiple selection 
                </p>
                    <Checkbox label="1270" ariaDescribedBy={'descriptionID'} />
                    <Checkbox label="1272" ariaDescribedBy={'descriptionID'} />
                    <Checkbox label="1274" ariaDescribedBy={'descriptionID'} />
                    <Checkbox label="1276" ariaDescribedBy={'descriptionID'} />                
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


                <br/>
                <button type="submit">Create</button>
                <br/>
            </form>
            
          </div>
        );
    }

    componentDidMount(){

    }

    handleSubmit(event) {
        alert('A name was submitted: ');
        event.preventDefault();
      }
}