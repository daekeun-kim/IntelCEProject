import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IIntelCEMainState } from '../../state/IIntelCEState';
import { BOMitemForm } from '../BOMitemform/BOMitemform';


export default class IntelCERequestForm extends React.Component<any,IIntelCEMainState>{
    
    
    constructor(props){
        super(props);
    }

    state = {} as IIntelCEMainState;
    
    public render(){
        
        return(
            
          <div>
           {/* Sent the props as well to the SubmitForm handler to use the Connected Dispatch. Renders custom dropdown component with validation*/}
           <form onSubmit={this.handleSubmit}>    
            <DatePicker
                placeholder="Select a date..."     
                value = {this.state.reqeuestdate}        
             />

            <TextField label="title" value = {this.state.title}  />
            <TextField label="Corp Tracker" value = {this.state.corp_tracker} />
            <TextField label="ECN #"  value = {this.state.ecn} />

            <Dropdown
                placeHolder="Select an Model"
                label="Model Affected"
                id="Basicdrop1"
                ariaLabel="Basic dropdown example"
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

            <TextField label="ECO #" value = {this.state.eco} />
            <TextField label="Dvision" value = {this.state.division} />
           
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

            <BOMitemForm {...this.props}  />

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

                
                <TextField label="System Cut-In Number " />
                <TextField label="Field Spares Cut-in Date " />
                <TextField label="POR part no longer avail " />

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