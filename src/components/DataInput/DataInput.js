import React, {useMemo} from "react";
import DataListInput from "react-datalist-input";
import { v4 as uuidv4 } from 'uuid';
 
const DataInput = (props) => {

  const onSelect = (selectedItem) => {
    props.setMainInputs(selectedItem.label, props.setMainInputsId);
  };
  console.log(props.streetSuggested)
  const items = useMemo(
    () =>
        props.streetSuggested.suggestions.map((oneItem, index) => ({
            label: oneItem.value,
            key: uuidv4()
        })),
    [props.streetSuggested]
  );
  const match = (currentInput, item) =>
  {
    let arr = []
    if (currentInput.includes(' ')) {
      arr = currentInput.toLowerCase().split(' ')
      return item.label.toLowerCase().includes(arr[arr.length-1]);
    } else {
      return item.label.toLowerCase().replace(/[\s.,%]/g, '').includes(currentInput.toLowerCase().replace(/[\s.,%]/g, ''));
    }
  }
  
  return (
    <DataListInput
      dropDownLength={5}
      inputClassName={props.class}
      match={match}
      onInput={props.handleInputsInput}
      placeholder="ВВЕДИТЕ АДРЕС"
      items={items}
      onSelect={onSelect}
    />
  );
};

export default DataInput;