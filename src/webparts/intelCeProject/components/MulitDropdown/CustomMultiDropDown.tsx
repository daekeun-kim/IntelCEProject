import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { BaseComponent, createRef } from 'office-ui-fabric-react/lib/Utilities';
import './Dropdown.Basic.Example.scss';

export class DropdownBasicExample extends BaseComponent<
  {},
  {
    selectedItem?: { key: string | number | undefined };
    selectedItems: string[];
  }
> {
  private _basicDropdown = createRef<IDropdown>();

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selectedItems: []
    };
  }

  public render() {
    const { selectedItem, selectedItems } = this.state;

    return (
      <div className="docs-DropdownExample">
        <Dropdown
          placeHolder="Select options"
          label="Multi-Select controlled example:"
          selectedKeys={selectedItems}
          onChanged={this.onChangeMultiSelect}
          onFocus={this._log('onFocus called')}
          onBlur={this._log('onBlur called')}
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
      </div>
    );
  }

  public changeState = (item: IDropdownOption): void => {
    console.log('here is the things updating...' + item.key + ' ' + item.text + ' ' + item.selected);
    this.setState({ selectedItem: item });
  };

  public onChangeMultiSelect = (item: IDropdownOption): void => {
    const updatedSelectedItem = this.state.selectedItems ? this.copyArray(this.state.selectedItems) : [];
    if (item.selected) {
      // add the option if it's checked
      updatedSelectedItem.push(item.key);
    } else {
      // remove the option if it's unchecked
      const currIndex = updatedSelectedItem.indexOf(item.key);
      if (currIndex > -1) {
        updatedSelectedItem.splice(currIndex, 1);
      }
    }
    this.setState({
      selectedItems: updatedSelectedItem
    });
  };

  public copyArray = (array: any[]): any[] => {
    const newArray: any[] = [];
    for (let i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  };

  private _log(str: string): () => void {
    return (): void => {
      console.log(str);
    };
  }
}