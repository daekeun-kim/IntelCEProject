import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class IntelCERequestForm extends React.Component{
    
    constructor(props){
        super(props);
    }
 
    public render(){
        return(
            
          <div>
           {/* Sent the props as well to the SubmitForm handler to use the Connected Dispatch. Renders custom dropdown component with validation*/}
           <form onSubmit={this.handleSubmit}>    
            <DatePicker
                 placeholder="Select a date..."
                onAfterMenuDismiss={() => console.log('onAfterMenuDismiss called')}
             />

            <TextField label="title" />
            <TextField label="Corp Tracker" />
            <TextField label="ECN #" />

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

            <TextField label="ECO #" />
            <TextField label="Dvision" />
           
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

                <TextField label="Old P/N" />
                <TextField label="New P/N" />
                <TextField label="Part Description" />
                <TextField label="Impacdts CCL (Y/N)" />

            </div>

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
                <TextField label=" POR part no longer avail " />

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