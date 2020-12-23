import React, {Component} from 'react';
import CheckForm from '../components/CheckForm/CheckForm'
import ShareForm from '../components/ShareForm/ShareForm'
import axios from '../axios';


//imgs
import homeLogo from '../img/home_logo.png'
import happy from '../img/happy.png'
import lesshappy from '../img/less_happy.png'
import sad from '../img/sad.png'
import surprised from '../img/surprised.png'
import devil from '../img/devil.png'
import classes from './Page.module.css';
//imgs

class Page extends Component {
    state={
        tip: false,
        responseData: null,
        inputValueCheckForm: '',
        inputValueShareForm: ''
    }
    componentDidMount () {
        axios.get('https://react-my-burger-36d25-default-rtdb.firebaseio.com/slysh.json')
        .then(response => {
            let obj = {suggestions: []};
            let temp = response.data;
            for (let k in temp) {
                for (let i in temp[k]) {
                    for (let u in temp[k][i]) {
                        obj.suggestions.push(temp[k][i][u])
                    }
                }
            }
            this.setState({responseData: obj});
            console.log('this.state.responseData', this.state.responseData)
        })
        .catch(error => {
            this.setState({error: true})
        });
    }
    mainStateInputValueSetter = (value, id) => {
        if (id == 'share') {
            this.setState({inputValueShareForm: value})
        }
        if (id == 'check') {
            this.setState({inputValueCheckForm: value})
        }
    }

    submitPreventHandler = (event) => {
        let key = event.charCode || event.keyCode || 0;     
        if (key == 13) {
            event.preventDefault();
        }
    }
    retriggerDBDataReq = () => {
        axios.get('https://react-my-burger-36d25-default-rtdb.firebaseio.com/slysh.json')
        .then(response => {
            let obj = {suggestions: []};
            let temp = response.data;
            for (let k in temp) {
                for (let i in temp[k]) {
                    for (let u in temp[k][i]) {
                        obj.suggestions.push(temp[k][i][u])
                    }
                }
            }
            this.setState({responseData: obj});
            console.log('this.state.responseData', this.state.responseData)
        })
        .catch(error => {
            this.setState({error: true})
        });
    }
    gradesExplanationHandler = () => {
        this.setState({tip: !this.state.tip})
    }
    render () {
        let tip = this.state.tip ? (
        <p className={classes.Tip}>
        <ul>
            <li><h3>Мы предлагаем вам оценить слышимость в доме по пятибалльной шкале:</h3></li>
            <li> <img alt='happy' src={lesshappy}/> 1 балл: 'Ничего не слышно'.</li>
            <li> <img alt='lesshappy' src={happy}/> 2 балла: 'Можно что-то услышать (если прислушиваться)'.</li>
            <li> <img alt='sad' src={surprised}/> 3 балла: 'Отдаленно слышны разговоры, громкая музыка'.</li>
            <li> <img alt='surprised' src={sad}/> 4 балла: 'Слышна работа телевизора, тихая музыка'.</li>
            <li> <img alt='devil' src={devil}/> 5 баллов: 'Отчетливо слышны разговоры'.</li>
        </ul>       
        </p>
        ) : null;

        return (
            <div onClick={this.pageClickHandler} className={classes.Container}>
            <h1><img alt='house' src={homeLogo}></img> ТихийДом.ру</h1>
            <p>Хотите переехать, но переживаете,
                что попадутся <strong>шумные соседи?</strong> Проверьте отзывы жильцов о слышимости
                вашего нового места проживания или <strong>поставьте
                вашу оценку </strong>слышимости в вашем доме! 
                Все данные анонимны: <strong>вам не нужно указывать ваше имя
                или квартиру,</strong> достаточно указать <strong>лишь адрес дома</strong>.
            </p>

            <p className={classes.TipSwitcher} onClick={this.gradesExplanationHandler}>Подробнее об оценках</p>

            {tip}
            <h2>ПРОВЕРИТЬ СЛЫШИМОСТЬ</h2>
            <CheckForm 
            inputValue={this.state.inputValueCheckForm}
            response={this.state.responseData} 
            retrigger={this.retriggerDBDataReq} 
            preventSubmit={this.submitPreventHandler}
            setMainInputs={(value, id) => this.mainStateInputValueSetter(value, id)}
            /> 
            <h2>ПОСТАВИТЬ ОЦЕНКУ</h2>
            <ShareForm 
            inputValue={this.state.inputValueShareForm}
            preventSubmit={this.submitPreventHandler} 
            retrigger={this.retriggerDBDataReq}
            setMainInputs={(value, id) => this.mainStateInputValueSetter(value, id)}
            />
            </div>

            
        )
    }
}

export default Page;