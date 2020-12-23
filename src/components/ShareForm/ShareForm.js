import React, {Component} from 'react';
import axios from '../../axios'
import Form from './Form/Form'
import Spinner from '../Spinner/Spinner'

class ShareForm extends Component {
    state = {
        commentVisibility: false,
        formAreaVisibility: true,
        commentValue: '',
        radio: {
            messages: {
                one: 'Коэффициент слышимости: 1. Абсолютно ничего не слышно',
                two: 'Коэффициент слышимости: 2. Можно что-то услышать (если прислушиваться)',
                three: 'Коэффициент слышимости: 3. Отдаленно слышны разговоры, громкая музыка',
                four: 'Коэффициент слышимости: 4. Слышна работа телевизора, тихая музыка, спать невозможно',
                five: 'Коэффициент слышимости: 5. Отчетливо слышны разговоры, забудьте о частной жизни'
            },
            radioValue: '',
            theLevelText: ''
        },
        commentHeader: 'Оставить комментарий',
        streetSuggestions: {
            suggestions: [{value: "г Екатеринбург"}]
        }
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        // здесь будет валидация
        this.setState({formAreaVisibility: 'pending'});
        let data = {
            suggestions: [
                    {
                    value: this.props.inputValue,
                    comment: this.state.commentValue,
                    mark: this.state.theLevelText
                }
            ],

        }
        axios.post('/slysh.json', data)
        .then(response => {
            setTimeout(() => {
                this.setState({formAreaVisibility: true})
            }, 2500)
            this.setState({formAreaVisibility: false});
            this.props.retrigger();
        })
        .catch(error => {
            this.setState({formAreaVisibility: 'pending'});
            console.log(error)
        });
    }
    inputValueHandler = (id, event, newValue) => {
        if (id === 'textarea') {
            let value = event.target.value;
            console.log(value);
            this.setState({commentValue: value});
        }
        if (id === 'radio') {
            let value = event.target.value;
            console.log(value);
            this.setState({radioValue: value, theLevelText: this.state.radio.messages[value]});
        }
        if (id === 'input') {
            console.log('shareform newvalue: ', newValue)
            this.props.setMainInputs(newValue, 'share');
            var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
            var token = "66b0e1924eea968c7fbf4d3fdd1a2f264d446267";
            var query = newValue;
    
            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({query: query})
            }
    
            fetch(url, options)
            .then(response => response.json())
            .then(result => this.setState({streetSuggestions: result}))
            .catch(error => console.log("error", error));
            console.log(this.state.streetSuggestions)
        }
    }

    commentAreaSwitcher = () => {
        this.setState({commentVisibility: !this.state.commentVisibility})
        this.state.commentVisibility === false ? this.setState({commentHeader: 'Скрыть поле комментария'}) 
        : this.setState({commentHeader: 'Оставить комментарий'});
    }
    render () {
        let formArea = this.state.formAreaVisibility === true
        ? <Form 
        formAreaVisibility={this.state.formAreaVisibility}
        inputValue={this.props.inputValue}
        radioButtonsObj={this.state.radio.messages}
        streetSuggestions={this.state.streetSuggestions}
        handleInputsInput={(newValue) => this.inputValueHandler('input', null, newValue)}
        handleInputsRadio={(event) => this.inputValueHandler('radio', event)}
        handleInputsText={(event) => this.inputValueHandler('textarea', event)}
        handleSubmit={this.formSubmitHandler}
        switchComment={this.commentAreaSwitcher}
        commentAreaProp={this.state.commentVisibility}
        commentHeader={this.state.commentHeader}
        setMainInputs={this.props.setMainInputs}
        preventSubmit={this.props.preventSubmit}
        /> 
        : this.state.formAreaVisibility === 'pending' ? <Spinner />
        : <div>Ваш отзыв отправлен, спасибо!</div>



        return formArea;
    }
}
export default ShareForm;