import { PureComponent } from "react";
import './ProgressBar.style'
import { withRouter } from 'react-router-dom'

export class ProgressBar extends PureComponent {

    constructor(props){
        super(props)
        
        this.state = {
            currentCompletedIndex: -1,
            currentStep: this.props.steps[0]
        }

        this.shouldComplete = this.shouldComplete.bind(this)
        this.renderBar = this.renderBar.bind(this)
        this.renderStep = this.renderStep.bind(this)
        this.renderProgressBar = this.renderProgressBar.bind(this)
    }

    shouldComplete(index, discount=0){
        return this.state.currentCompletedIndex >= index - discount
    }

    renderBar(index){
        return (
            <div className={
                `${this.shouldComplete(index, 1) ?
                "bar completed" : "bar"}`}>
            </div>
        )
    }

    renderStep(step, index) {
        return (
            <div className="step-container">
                <div className={
                    `${this.shouldComplete(index) ?
                    "step completed" : "step"}`}>

                    <span>{`
                    ${this.shouldComplete(index) ?
                    "✓" : index+1}`}</span>
                </div> 
                <span className="step-name">
                    {step}
                </span>
            </div>
        )
    }

    renderProgressBar(){
        const content = this.props.steps.map((step, index) => {
            if(index < this.props.steps.length-1){
                return (
                    <>
                        {this.renderBar(index)}
                        {this.renderStep(step, index)}
                    </>
                )
            }
        })

        return (
            <>
                {content}
                {this.renderBar(this.props.steps.length-1)}
            </>
        )
    }


    componentDidUpdate(){
        const step = this.props.location.pathname.split("/checkout/")[1]
        if(this.state.currentStep !== step)
            this.setState({currentStep: step, currentCompletedIndex: this.state.currentCompletedIndex+1})
    }

    render(){
        return (
            <div className="container">
                {this.renderProgressBar()}
                {this.props.step}
            </div>
        )
    }
}


export default withRouter(ProgressBar)