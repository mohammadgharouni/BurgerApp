import React from 'react'
import classes from "./Input.module.css"
const input = (props) => {
    let inputElement = null;
    const inputclasses=[classes.InputElement]
    inputclasses.join(" ")
    if(props.invalid && props.shouldValidate && props.touched) {
        inputclasses.push(classes.invalid)
    }
    switch (props.elementType) {
        case("input"):
            inputElement = <input className={inputclasses.join(" ")} {...props.elementConfig} onChange={props.changed}></input>
            break;

        case("textarea"):
            inputElement = <textarea  onChange={props.changed} className={inputclasses.join(" ")} {...props.elementConfig}></textarea>
            break;

        case("select"):
            inputElement = (

                <select  onChange={props.changed} className={inputclasses.join(" ")} {...props.elementConfig}>

                        {props.elementConfig.options.map(option=>(
                            <option key={option.value}value={option.value}>{option.displayValue}</option>

                        ))}
                 
                </select>
                        );
            break;
        default:
            inputElement = <input 
            onChange={props.changed}
                className={classes.InputElement}
                value={props.value}
                {...props.elementConfig}></input>
    }
    
    return (

        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>

            {inputElement}

        </div>

    )
}

export default input