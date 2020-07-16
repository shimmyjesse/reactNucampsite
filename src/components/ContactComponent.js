import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';


// NOTE: All 'form' inputs, even numbers, are received as strings.

// defining these 5 variables to help with validation:

const required = val => val && val.length;
//REQUIRED:      //1st, receives 'val' as an argument...
                        //2nd, inside function: checks for retrieval of value (if it isn't undefined or null, which would evaluate as falsy)...
                            //3rd, inside child function: 
                                // checks to make sure the length of the string > 0. 
//summation: this function makes sure a field has something in it, & it'll return TRUE if so, FALSE if not. 
// IF FALSE, means it would have failed this test and create an 'error'.

const maxLength = len => val => !val || (val.length <= len);
//MAXLENGTH:            //NOTE: the way that this function will be called later requires to wrap a function inside a function, hence '=> =>'
                  //1st =>, 'len' takes the MAX. length; 2nd => 'val' takes the value (the input string).
                                //3rd, inside the inner function, we want to return TRUE if the MAX. length hasn't been exceeded.
                                // SO, '!val' (not val) will return TRUE because if there's no value then MAX. length clearly hasn't been exceeded.
                                     //4th, '||' (or, as in we'll also evaluate that) if... 
                                        // ...the value's length is <= 'len' (the MAX.) THEN we'll return 'TRUE'.
//summation: if both these conditions are FALSE, this function will return FALSE for MAX. length, 
// meaning it has failed the test for MAX. length, to which will create an 'error'.

const minLength = len => val => val && (val.length >= len);
//MINLENGTH:            //NOTE: works similarly to const 'maxLength', wrapping a function in a function 
                        // where the inner function will return TRUE IF there's a value 
                                    // && (AND) the value is >= the MIN.
//summation: this declaration will return FALSE IF either of these conditions return FALSE (it has failed the test for minLength; creates 'error').

const isNumber = val => !isNaN(+val);
//ISNUMBER:      //1st, we want to check to see if the value is a number...
                               //...so, 2nd, we'll use the unary '+' operator (turn the value to a number, if possible);
                               // and if 'val' (value of 'val') is NOT a valid number, '+' will turn this value into a special value:NaN.
                        //NEXT, 3rd, we'll check to see if this value is the opposite(!, a logical operator is used to determine) of 'isNaN'
//summation: if this value is NOT a valid number, the function returns FALSE; IF it is a valid number, it'll return TRUE (it's not NOT a number).

const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
//VALIDEMAIL:      //1st, we want to check to see if the value of 'val' holds a valid email address
                          //    enter REGULAR EXPRESSION format     //  // which will check if input matches the fallowing rules:
                          //1st, A-Z...
                          //2nd, other characters only valid for email: 0-9, '.', '_', '%', '+', '-'...
                          //then, 3rd, (+@) is there an '@' symbol placed here after the previous characters...
                          //then, 4th, following the '@' where the domain name would be, permit characters A-Z or 0-9, (.-) = any number of times...
                          //then, fif, (+\.) = add only '.', which is required for email...
                          //then, 6th, followed by the domain extension which ([A-Z]{2, 4}) can be 2 to 4 letters
                    //then, we'll use the built-in JavaScript method called test(), 
                    //which will test whatever value is passed in to see if it matches the REGEX pattern 

//  //  //  //  //  To use these functions in 'form' validation, we'll add the appropriate code below in <LocalForm> //  //  //  //  //
        //  // we'll add new attributes in each of the <Control.> components called 'validators', giving it an object within the value 
        //  //  that contains the functions that are appropriate for that component.

class Contact extends Component {

    constructor(props) {

        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,
            contactType: 'By Phone',
            feedback: '',
            touched: {
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.postFeedback(values);
        this.props.resetFeedbackForm();
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone"></i> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o"></i> campsites@nucamp.co</a>
                    </div>
                </div>
                
                <div className="row row-content">
                   <div className="col-12">
                      <h2>Send us your Feedback</h2>
                      <hr />
                   </div>
                    <div className="col-md-10">
                        <Form model="feedbackForm" onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstName" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".firstName"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />                                   
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name" 
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".lastName"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number" 
                                        className="form-control"
                                        validators={{
                                            isNumber,
                                            required,
                                            minLength: minLength(10),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".phoneNum"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            isNumber: 'Must be a number',
                                            required: 'Required',
                                            minLength: 'Must be at least 10 digits',
                                            maxLength: 'Must be 15 digits or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email" 
                                        className="form-control"
                                        validators={{
                                            validEmail,
                                            required
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            validEmail: 'Invalid email address',
                                            required: 'Required'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 4, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox 
                                                model=".agree"
                                                name="agree" 
                                                className="form-check-input" /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Control.select model="contactType" name="contactType"
                                        className="form-control">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}                

export default Contact;