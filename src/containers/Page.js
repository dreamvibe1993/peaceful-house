import React, {Component} from 'react';
import CheckForm from '../components/CheckForm/CheckForm'
import ShareForm from '../components/ShareForm/ShareForm'
import axios from '../axios';
import './Page.css'



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
        responseKeys: null,
        shareFormVisibility: false,
        checkFormVisibility: false,
        classForPolly: classes.HeaderCheckFormActive  
    }
    componentDidMount () {
       this.retriggerDBDataReq()
    }
    mainStateInputValueSetter = (value) => {
        this.setState({inputValueCheckForm: value})
    }


    submitPreventHandler = (event) => {
        let key = event.charCode || event.keyCode || 0;     
        if (key === 13) {
            event.preventDefault();
        }
    }
    retriggerDBDataReq = () => {
        axios.get('https://react-my-burger-36d25-default-rtdb.firebaseio.com/slysh.json')
        .then(response => {
            let temp = response.data;
            let objKeys = Object.keys(temp);
            let obj = {suggestions: objKeys.map(i => temp[i]['suggestions'][0])}
            const uniqueArray = obj.suggestions.filter((value,index) => {
                return index === obj.suggestions.findIndex(obj => {
                    return JSON.stringify(obj.value) === JSON.stringify(value.value);
                });
            });
            let keys = {suggestions: uniqueArray.map(i => {
                return { value: i.value }
            })}
            this.setState({responseData: obj});
            this.setState({responseKeys: keys})
        })
        .catch(error => {
            this.setState({error: true})
        });
    }
    componentVisibilityHandler = (value) => {
        if (this.state.checkFormVisibility === false) {
            this.setState({inputValueCheckForm: ''})
        }
        this.setState(value)
    }
    classesHandler = (value) => {
        this.setState({classForPolly: value})
    }
    render () {
        let tip = this.state.tip ? (
        <div className={classes.Tip}>
        <ul>
            <li><h3>Мы предлагаем вам оценить слышимость в доме по пятибалльной шкале:</h3></li>
            <li> <img alt='happy' src={lesshappy}/> 1 балл. Абсолютно ничего не слышно.</li>
            <li> <img alt='lesshappy' src={happy}/> 2 балла. Что-то слышно только если хорошо прислушаться.</li>
            <li> <img alt='sad' src={surprised}/> 3 балла. Слышна только громкая музыка. Спать можно если у вас тихие соседи.</li>
            <li> <img alt='surprised' src={sad}/> 4 балла. Слышна даже тихая музыка. Можете забыть о спокойном сне.</li>
            <li> <img alt='devil' src={devil}/> 5 баллов. Отчетливо слышны разговоры. Можете забыть о покое в любое время.</li>
        </ul>       
        </div>
        ) : null;

        let shareForm = this.state.shareFormVisibility ? (<ShareForm 
            preventSubmit={this.submitPreventHandler} 
            retrigger={this.retriggerDBDataReq}
            />) : null;
        let checkForm = this.state.checkFormVisibility 
        ?   (<div className={this.state.classForPolly}>
            <h2  
            onClick={() => this.componentVisibilityHandler({checkFormVisibility: !this.state.checkFormVisibility})}
            >ПРОВЕРИТЬ СЛЫШИМОСТЬ</h2>
                <CheckForm 
                inputValue={this.state.inputValueCheckForm}
                response={this.state.responseData} 
                keys={this.state.responseKeys}
                preventSubmit={this.submitPreventHandler}
                setMainInputs={this.mainStateInputValueSetter}
                classesHandler={this.classesHandler}
                />  
            </div>)
        :   (<div className={classes.HeaderCheckFormPassive}>
                <h2  
                onClick={() => this.componentVisibilityHandler({checkFormVisibility: !this.state.checkFormVisibility})}
                >ПРОВЕРИТЬ СЛЫШИМОСТЬ</h2>
             </div>);
        

        return (
            <div className={classes.Container}>
                <h1><img alt='house' src={homeLogo}></img> ТихийДом.ру</h1>
                <p>Хотите переехать, но переживаете,
                    что попадутся <strong>шумные соседи?</strong> Проверьте отзывы жильцов о слышимости
                    вашего нового места проживания или <strong>поставьте
                    вашу оценку </strong>слышимости в вашем доме! 
                    Все данные анонимны: <strong>вам не нужно указывать ваше имя
                    или квартиру,</strong> достаточно указать <strong>лишь адрес дома</strong>.
                </p>

                <p className={classes.TipSwitcher} 
                onClick={() => this.componentVisibilityHandler({tip: !this.state.tip})}
                >Подробнее об оценках</p>
                {tip}


                    {checkForm}
                    
                    <div className={classes.HeaderShareForm}>
                    <h2  
                    onClick={() => this.componentVisibilityHandler({shareFormVisibility: !this.state.shareFormVisibility})}
                    >ПОСТАВИТЬ ОЦЕНКУ</h2>
                    {shareForm}
                    </div>
            </div>

            
        )
    }
}

export default Page;