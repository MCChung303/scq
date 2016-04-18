/*
*
* Multiple Choice
* Get the length of how many options there are, and initialize an array of that size to hold false at each
* index, then check to see if the answer was previously answered, if it is we set the previous answers that
* were marked to true in the array. Set the final response state as this.state.data
*/
var MultipleChoice = React.createClass({
    getInitialState: function(){       
        return {
            data: [],
        };
    },
    
    componentDidMount: function(){
        this.setState({
            data: this.props.questionState
        });
        
    },
    
    componentDidUpdate: function(){
      componentHandler.upgradeDom();
    },
    /*if a checkbox is checked/unchecked, send which option got checked (i) and whether it was true or false in
    this.state.data, then use that info to flip it's value in the this.state.data array'*/
    handleChange: function(i,value){
        var NewValue = null;
        if(value == 0){
            NewValue = 1;
        }
        else{
            NewValue = 0;
        }
        var changeAnswer = this.state.data;
        changeAnswer[i] = NewValue;
        this.setState({
            data: changeAnswer,
        })
    },
    
    /*made keys for each tag, or react put up warnings, we iterate through each option attaching an iterator i that we
    use to simultaneously index this.state.data, if it's true we render a checked checkbox, else we render it unchecked
    unchecked*/
    render: function(){
    
      var questionID = this.props.questionID;
      const renderedOptions = this.props.options.map((option,i) => {
      var inputKey = String(questionID)+"."+option+"."+i+"."+"input";
      var labelKey = String(questionID)+"."+option+"."+i+"."+"label";
      var spanKey = String(questionID)+"."+option+"."+i+"."+"span";
      if(this.state.data[i] == 1){
        return (
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" key = {labelKey} id={labelKey}>
                <input
                    type="checkbox"
                    value = {this.state.data[i]}
                    name = {option}
                    key = {inputKey}
                    id = {inputKey}
                    className="mdl-checkbox__input"
                    onChange= {this.handleChange.bind(this,i, this.state.data[i])}
                    checked>
                </input>
                <span className="mdl-checkbox__label" key={spanKey} id={spanKey}> { option } </span>
            </label>
        )
      }
      else{
          return (
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" key = {labelKey} id = {labelKey}>
                    <input
                        type="checkbox"
                        value = {this.state.data[i]}
                        name = {option}
                        key = {inputKey}
                        id = {inputKey}
                        className="mdl-checkbox__input"
                        onChange= {this.handleChange.bind(this,i, this.state.data[i])}>
                    </input>
                    <span className="mdl-checkbox__label" key = {spanKey} id = {spanKey}> { option } </span>
                </label>
        )
      }
      });
      var footerKey = String(this.props.surveyID) + "." + "footer";
      return (
        <div className="options mdl-card__supporting-text mdl-color-text--grey-600" key = {footerKey}>
            { renderedOptions }
            <Footer
            prevHandler={this.props.prevHandler}
            nextHandler={this.props.nextHandler}
            onSubmit={this.props.onSubmit}
            key={footerKey}
            id={footerKey}
            surveyData={this.state.data}
            questionID={this.props.questionID}
            response_format={this.props.response_format}
            questionNum={this.props.questionNum}
            numQuestions={this.props.numQuestions}
            responseSize={this.props.responseSize}/>
        </div>
      );
    }
})
/*
*
*
* Single Choice
* This is the same as multiple choice, but the handlers are different
* so that once a new option is chosen all other options are set to false
* since it simulates a radio form
*/
var SingleChoice = React.createClass({

getInitialState: function(){
        return {
            data: [],
        };
    },

    componentDidMount: function(){
        this.setState({
            data: this.props.questionState
        });
        
    },

    componentDidUpdate: function(){
      componentHandler.upgradeDom();
    },

    handleChange: function(i,value){
        var NewValue = null;
        var length = Object.keys(this.props.options).length;
        var questionObj=[];
        var changeAnswer = this.state.data;
        for(var iter = 0; iter < length; iter++){
            changeAnswer[iter]=0;
        }
        changeAnswer[i] = 1;
        this.setState({
            data: changeAnswer,
        });
    },

    render: function(){
        var surveyID = String(this.props.surveyID);
        var questionID = this.props.questionID
        const renderedOptions = this.props.options.map((option, i) => {
        var inputKey = String(questionID)+"."+option+"."+i+"."+"input";
        var labelKey = String(questionID)+"."+option+"."+i+"."+"label";
        var spanKey = String(questionID)+"."+option+"."+i+"."+"span";
        var divKey = String(questionID)+"."+option+"."+i+"."+"div";
        if(this.state.data[i] == 1){
            return (
            <div key={divKey} id={divKey}>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" key={labelKey} id={labelKey}>
                    <input 
                    type="radio" 
                    className="mdl-radio__button"
                    name = {surveyID}
                    key={inputKey}
                    id={inputKey}
                    value= {i}
                    onChange={this.handleChange.bind(this,i,this.state.data[i])}
                    checked>
                    </input>
                    <span className="mdl-radio__label" key={spanKey} id={spanKey}> { option } </span>
                    </label>
                </div>
            )
        }
        else{
            return (
            <div key={divKey} id={divKey}>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" key={labelKey} id={labelKey}>
                    <input 
                    type="radio" 
                    className="mdl-radio__button"
                    name = {surveyID}
                    value= {i}
                    key={inputKey}
                    id={inputKey}
                    onChange={this.handleChange.bind(this,i,this.state.data[i])}>
                    </input>
                    <span className="mdl-radio__label" key={spanKey} id={spanKey}> { option } </span>
                    </label>
                </div>
            )
        }
        });
        var footerKey = String(this.props.surveyID) + "." + "footer";
        return (
            <div
            className="mdl-card__supporting-text mdl-color-text--grey-600" key={footerKey}>
              { renderedOptions }
              <Footer
              prevHandler={this.props.prevHandler}
              nextHandler={this.props.nextHandler}
              onSubmit={this.props.onSubmit}
              key={footerKey}
              surveyData={this.state.data}
              questionID={this.props.questionID}
              response_format={this.props.response_format}
              questionNum={this.props.questionNum}
              numQuestions={this.props.numQuestions}
              responseSize={this.props.responseSize}/>
            </div>
        );
    }
});
/*
*
*
* Free
* Same as the other cards, but simpler, we just take whatever is in the
* textfield and get it to POST after all the previous question answer checking
*/
var FreeResponse = React.createClass({

    getInitialState: function(){
        return {
            answer: 'Change me!'
        };
    },
    
    componentDidMount: function(){
        this.setState({
            answer: this.props.questionState
        });
        
    },

    componentDidUpdate: function(){
      componentHandler.upgradeDom();
    },

    handleChange: function(e){
        this.setState({answer: e.target.value});
    },

  render: function(){
    var questionID = this.props.questionID;
    var inputKey = String(questionID)+"."+"input";
    var labelKey = String(questionID)+"."+"label";
    var spanKey = String(questionID)+"."+"span";
    var divKey = String(questionID)+"."+"div";
    var textareaKey = String(questionID)+"."+"textarea";
    var footerKey = String(this.props.surveyID) + "." + "footer";
    return (
      <div
      className="mdl-card__supporting-text mdl-color-text--grey-600" key={divKey}>

        <textarea
        className="mdl-textfield__input"
        type="text"
        rows="4"
        id="test"
        placeholder="Your answer"
        value={this.state.answer}
        onChange={this.handleChange}/>
        <br/>
        <Footer
        key={footerKey}
        prevHandler={this.props.prevHandler}
        nextHandler={this.props.nextHandler}
        onSubmit={this.props.onSubmit}
        surveyData={this.state.answer}
        questionID={this.props.questionID}
        response_format={this.props.response_format}
        questionNum={this.props.questionNum}
        numQuestions={this.props.numQuestions}
        responseSize={this.props.responseSize}/>
      </div>
     );
  }
});
/*
*Rating slider
*Nothing special here either relative to the other ones.
*/
var Rating = React.createClass({
   	getInitialState: function(){
        return{
            answer: null,
        }
	},

    componentDidMount: function(){
        this.setState({
            answer: this.props.questionState
        });
    },
    
    componentDidUpdate: function(){
      componentHandler.upgradeDom();
    },

	handleChange:function(e){
		this.setState({answer: e.target.value});
	},
	 render: function(){
    var questionID = this.props.questionID;
    var inputKey = String(questionID)+"."+"input";
    var spanKey = String(questionID)+"."+"span";
    var divKey = String(questionID)+"."+"div";
    var footerKey = String(this.props.surveyID) + "." + "footer";
      return (
      <div className="mdl-card__supporting-text mdl-color-text--grey-600" key={divKey}>
        <div key={divKey}>
                <input className="mdl-slider mdl-js-slider"
                    type="range"
                    key={inputKey}
                    min="0"
                    max="10"
                    value={this.state.answer}
                    step="1"
                    onChange={this.handleChange}
                />
                <span id="sliderStatus" key={spanKey}>{this.state.answer}</span>
            </div>
            <Footer
            prevHandler={this.props.prevHandler}
            key={footerKey}
            nextHandler={this.props.nextHandler}
            onSubmit={this.props.onSubmit}
            surveyData={this.state.answer}
            questionID={this.props.questionID}
            response_format={this.props.response_format}
            questionNum={this.props.questionNum}
            numQuestions={this.props.numQuestions}
            responseSize={this.props.responseSize}/>
            </div>
      );
    }
});
