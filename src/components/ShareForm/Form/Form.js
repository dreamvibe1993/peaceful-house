import React from 'react';
import classes from './Form.module.css'
import DataInput from '../../DataInput/DataInput'
import Spinner from '../../Spinner/Spinner'

const form = (props) => {
    let radioButtons = Object.keys(props.radioButtonsObj)
    let commentArea = props.commentAreaProp ? <textarea 
    onChange={props.handleInputsText} 
    className={classes.ShareFormComment} placeholder="ОСТАВЬТЕ КОММЕНТАРИЙ" />
    : null;
    console.log('props.validRadio', props.validRadio)
    let inputClass = props.validValue !== false ? classes.ShareFormSearch
    : classes.ShareFormWarning
    let [radioClass, radioWarning] = props.validRadio !== false ? [classes.ShareFormRadiobuttons, null]
    : [classes.ShareFormRadiobuttonsWarning, <div>Пожалуйста, поставьте оценку :)</div>]
    let dataInputArea = props.streetSuggestions !== null ? (
        <DataInput
        handleInputsInput={props.handleInputsInput} 
        streetSuggested={props.streetSuggestions}
        setMainInputsId='share'
        class={inputClass}
        setLocalShareData={props.setLocalShareData}
        />
    ) : <Spinner />
    
    return (
        <form onKeyPress={props.preventSubmit} className={classes.ShareFormContainer}>
        <div className={classes.ShareFormInput}>
        {dataInputArea}
        </div>
            <div className={radioClass}>
            <div className={classes.radioButtonsWidth}>


            <p>Выберите оценку:</p>
            {radioButtons.map((i, index) => {
                return <p key={i+index}><input name="evaluate" type="radio" value={i} onChange={props.handleInputsRadio}/>{index+1}</p>
            })}
  
            </div>
            </div>
            {radioWarning}
            <h3 onClick={props.switchComment} className={classes.LeaveAComment}>{props.commentHeader}</h3>
            {commentArea}
            <input onClick={props.handleSubmit} className={classes.ShareFormSubmit} type="button" value="ОТПРАВИТЬ" />
        </form>
)}
export default form;