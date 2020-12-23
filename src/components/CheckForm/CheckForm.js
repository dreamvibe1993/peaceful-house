import React, {Component} from 'react';
import classes from './CheckForm.module.css'
import DataInput from '../DataInput/DataInput'
import Spinner from '../Spinner/Spinner'

// преобразователь текста
// валидация
// приладить кнопки (свернуть)
// приладить загрузки и индикацию статуса

class CheckForm extends Component {
    state={
        checkVisibility: false,
        checkData: '',
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({checkVisibility: true})
        for (let key in this.props.response.suggestions) {
            if (this.props.response.suggestions[key].value == this.props.inputValue) {
                this.setState({checkData: `
                Адрес: ${this.props.response.suggestions[key].value}
                Оценка: ${this.props.response.suggestions[key].mark}
                Комментарий: ${this.props.response.suggestions[key].comment}
                `})
            } else {
                this.setState({checkData: `
                К сожалению, по вашему запросу ничего не найдено. Но вы можете быть первым! Оставьте ваш отзыв ниже :)
                `})
            }
            console.log('inputval', this.props.inputValue)
            console.log('checkresponse', this.props.response)
        }
    }

    render () {
        let checkResp = this.state.checkVisibility ? <div className={classes.CheckFormOutput}>{this.state.checkData}</div>
        : null;
        let dataInputField = this.props.response 
        ? ( <div className={classes.RestrictWidth}>
            <DataInput 
            setMainInputs={this.props.setMainInputs} 
            setMainInputsId='check'
            handleInputsInput={this.props.setMainInputs}
            streetSuggested={this.props.response}
            class={classes.CheckFormSearch}
            />
            <input className={classes.CheckFormSubmit} onClick={this.formSubmitHandler} type="submit" value="Найти"/>
            </div>
            )
        : <Spinner />
        return (
        <div className={classes.CheckFormContainer}>
            <form className={classes.CheckFormInput} onKeyPress={this.props.preventSubmit}>
                {dataInputField}
            </form>
                {checkResp}
        </div>
        )   
    }
} 
export default CheckForm;