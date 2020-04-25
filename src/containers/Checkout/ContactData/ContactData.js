import {Component} from "react";
import React from 'react'
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.module.css"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from '../../../components/UI/Input/Input'
import {connect} from "react-redux";
import {updateObject, checkValidity} from "../../../store/utility"
import * as actions from "../../../store/actions/index"
class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "zipCode"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {
                            value: "fastest ",
                            displayValue: "Fastest"
                        }, {
                            value: "cheapest ",
                            displayValue: "Cheapest"
                        }
                    ]

                },
                value: "fastest",
                valid: true,
                validation: {}
            }
        },
        formIsValid: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdenfire in this.state.orderForm) {
            formData[formElementIdenfire] = this.state.orderForm[formElementIdenfire].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            deliveryMethod: 'fastest',
            orderData: formData,
            userId: this.props.userId
        }
        this
            .props
            .onOrderBurger(order, this.props.token);

    }
    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {

            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.validation),
            touched: true
        })
        const updatedOrderForm = updateObject(this.state.orderForm, {[inputIdentifier]: updatedFormElement})

        var formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render() {
        const formElementsArray = []
        for (let key in this.state.orderForm) {
            formElementsArray.push({id: key, config: this.state.orderForm[key]})
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType="..." elementConfig="..." value="..."></Input> */}
                {formElementsArray.map(formElement => (<Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => {
                    this.inputChangedHandler(event, formElement.id)
                }}/>))}
                {/* <Input inputtype="input" type="email" name="email" placeholder="your email"></Input>
                <Input inputtype="input" type="text" name="street" placeholder="street"></Input>
                <Input inputtype="input" type="text" name="postal" placeholder="postal code"></Input> */}
                <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>

            </form>
        )
        if (this.props.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>

                <h4>enter your contact data</h4>
                {form}
            </div>
        );
    }

}
const mapStateToProps = (state) => ({ings: state.burgerBuilder.ingredients, price: state.burgerBuilder.totalPrice, loading: state.order.loading, token: state.auth.token, userId: state.auth.userId})

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);