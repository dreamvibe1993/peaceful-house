import React from 'react';
import classes from './Form.module.css'
import DataInput from '../../DataInput/DataInput'

const form = (props) => {
    let radioButtons = Object.keys(props.radioButtonsObj)
    let commentArea = props.commentAreaProp ? <textarea 
    onChange={props.handleInputsText} 
    className={classes.ShareFormComment} placeholder="ОСТАВЬТЕ КОММЕНТАРИЙ" />
    : null;


    return (
        <form onKeyPress={props.preventSubmit} className={classes.ShareFormContainer}>
        <div className={classes.ShareFormInput}>
        <DataInput setMainInputs={props.setMainInputs} 
        handleInputsInput={props.handleInputsInput} 
        streetSuggested={props.streetSuggestions}
        setMainInputsId='share'
        class={classes.ShareFormSearch}
        />
        </div>
            <div className={classes.ShareFormRadiobuttons}>

            <p>Выберите оценку:</p>
            {radioButtons.map((i, index) => {
            return <p key={i+index}><input name="evaluate" type="radio" value={i} onChange={props.handleInputsRadio}/>{index+1}</p>
            })}
            </div>
            <h3 onClick={props.switchComment} className={classes.LeaveAComment}>{props.commentHeader}</h3>
            {commentArea}
            <input onClick={props.handleSubmit} className={classes.ShareFormSubmit} type="button" value="ОТПРАВИТЬ" />
        </form>
)}
export default form;