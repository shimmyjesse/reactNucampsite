// Basic Structure of 'class component' coded below //
import React from 'react';
// Adding a Reactstrap Card Component:
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
//import CampsiteInfo from './CampsiteInfoComponent'; -- moved this line of code to MainComponent.js.
import { Link } from 'react-router-dom';
//last module to update for the exercise: Redux-Thunk 
import { Loading } from './LoadingComponent';
//import for server communication
import { baseUrl } from '../shared/baseUrl';

// This component will be responsible for rendering each <Card> with different campsite details.
// functional components always receive any data pass to them as properties of a single (props) object
// and that (props) object is passed in as the only argument as such: --RenderDirectoryItem(props)--
    // In this case, we're going to de-structure the props object, and we'll do that right here
                            // in the parameter list with this syntax: -- RenderDirectoryItem({campsite, onClick})
// A functional component has no constructor and no render method It only needs a 'return' statement.
function RenderDirectoryItem({campsite}) {
    return (
        <Card>
            <Link to={`/directory/${campsite.id}`}>
                <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Directory(props) {
// for functional components, we no longer use the 'this' keyword when accessing (props)

    const directory = props.campsites.campsites.map(campsite => { 
        return (
            // (1) we'll add that UNIQUE KEY id here in the div, since it's the topmost element,
            // by sticking a 'key' element syntax: ...key={campsite.id}...
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} />
            </div>
                // Where <Card> once lived, we will call the 'RenderDirectoryItem()' component 
                // passing both the {campsite} and {onCLick} props.
        );
    });
    // THEN, 
    // that whole ARRAY will be rendered inside the bootstrap, "row", just below.

    if (props.campsites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.campsites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    return (
                // Inside 'row' div, we'll use the JS var, {directory}.
                // Must use {} in order to use JS inside of JSX.
                // 2nd thing we do, is set up the {directory} var above 'return'..
                
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {directory}
            </div>
        </div>
    );
}

// When we are ready to break out of this 'class Directory...' component and send some data back to the Parent component,
//  it'll happen in the above return of the entire Directory component, which can be identified as the top-level return 
//  inside the render() method. All other returns are inside other methods.
                // Create new div, below the div where the array of campsites gets rendered, as a new bootstrap grid? "row".
                // inside it, we'll add a "col" div, and call the 'renderSelectedCampsite()' method and pass it
                // the (campsite) object that's stored in the "selectedCampsite"'s 'state'.   

//NOW, we'll connect this Directory Component with the rest of our App with the below export.

// Not required for the component, in a way, but the 'Component' is useless without.
// We will need to 'export' the 'Directory' component as a 'default' 

export default Directory;

//then, go to the [ App.js ] file and we'll 'import the 'Directory' component at the top..


/*********** here is our basic structure for the class component before adding properties
import React, { Component } from 'react';

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (

        );
    }
}
*************************************************************************************/

/* AFTER RUNNING THE $npm install typeface-lobster & $npm install typeface-open-sans,
    refer to the directory (file) index.js to add the 'import' function,
    then,
    we'll move the "import App from './App'; " just below those two new imports.
    then,
    open App.css, delete all code within this directory,
    then add in the following code that should now have the new body and h5 font-families */ 




/***********   **************   ***************   ***********   ************   *******
 * 
 * 
 * the following code below has been removed and working code 'noted' out by me from the 
 * 
 * top (priority) of this page in order to preserve the notes taken 
 * 
 * in the beginning of this React project instruction.
 * 
 * 
 ***********   **************   ***************   ***********   ************   *******/



 
// Basic Structure of 'class component' coded below //
//import React, { Component } from 'react';

// Adding a Reactstrap Card Component:
//import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
//import CampsiteInfo from './CampsiteInfoComponent';

// Now, where we were mapping out each campsite to JSX (this.props.campsites.map...), you'll add these components
// starting by wrapping the <img src.../> with this JSX <Card> component --[To Note.(2) in const directory]-- ..


// Every React component must RETURN a single React element (One, and only one).
//class Directory extends Component {
    
    // Whenever you create a 'class' component in React that has a
    // 'constructor' method, you must include this argument
    // keyword, 'props' [short for properties].
    //constructor(props) {

        // Instead of 'this.props = props' used here, you use super(props),
        // since 'this' method is going to happen inside the base component
        // in the parent class.
        // super(props) method is REQUIRED by React to be the very first line
        // EVERY TIME you make a React 'class' component with a constructor method.
        //
        //super(props);
        //
        // The property, 'state' gets defined here inside the constructor.
        // Not to be confused as getting passed in, it gets defined here.
        // special property in React, always needs to hold an object.
        // for now, we can create an outer wrapping '{}' of an object to store 
        // in this '.state' property and will define later.
        // Or... NOW! inside the object ({}), we'll begin
        // storing data (property: value) for different campsites:
        // NOTE: storing multiple campsites will call for an ARRAY.

        // (3) this new property, 'selectedCampsite', will keep track of whatever campsite was last selected by the user
        // we give an initial value of null (...Campsite: null), for when nothing is selected yet.
        // --[Navigate below this constructor, above the render() method. (4) ]--
        //this.state = {
            //selectedCampsite: null
        //};
    //}

    // In a 'class' component, you MUST wrap your 'return' statement inside a special method:
    // 'render()'.
    // This is a skeleton for a React 'class' component
    // the constructor is sometimes required, sometimes not. 

    //      TO 'render' AN ARRAY OF ELEMENTS MOST EFFICIENTLY, ADD A UNIQUE KEY ATTRIBUTE
    //                                          TO THE TOPMOST ELEMENT IN EACH ARRAY ITEM.
    //      This helps react keep track of this list of items and render 
    //      any changes to it efficiently. --[Go to Note.(1) in the render method]--

    // Now, we'll create a method that we want to have fire whenever a campsite is clicked on &
    // the 'campsite' object will get passed into this method. Then,
        // inside, we'll use a React method (component), 'this.setState', 
        // to change the value of the campsite's selected property of '.state'.
    //onCampsiteSelect(campsite) {
        //this.setState({selectedCampsite: campsite});
    //}

    // !NOTE:
        // you never want to update the 'state' directly. If instead otherwise 'this.setState', 
        // you were to write 'this.state.selectedCampsite = campsite;', in the console you'd get
        // a message:" Line **.**: Do not mutate directly. Use setSate() react/no-direct-mutation-state "
        // Because, the constructor is the ONLY place you can assign a value to 'state' properties directly
        // with the assignment operator. Conclusion: Outside of constructor, ***  ALWAYS USE  setState() !!!  ***

    // Next, (in const directory) we'll have to trigger this method by adding a React 'onClick' handler to each Reactstrap <Card> component
    // and add an arrow (=>) function which contains a call to the 'onCampsiteSelect()' method, passing in the current
    // (campsite) object that we got from the (props) data: <Card onClick={() => this.onCampsiteSelect(campsite)}>

    // Now, we need to display that campsite's details to the view. To do that, we create a new method:
    // renderSelectedCampsite(), and we'll pass in a 'campsite' object: 
    // renderSelectedCampsite(campsite){}.
        // Make an if() statement passing (campsite). This makes sure the campsite has an object in it; otherwise,
        // this condition would 'return' FALSE if that campsite's value is null, or undefined.
            // Then, inside the if() block, return not only campsite's image and name, but the description as well. 
        // Then, outside of the if() block, set up a return for IF we didn't make it inside this if() block.
        // That is, if the campsite's value was null, undefined or otherwise falsy.
    //renderSelectedCampsite(campsite) {
        //if(campsite) {
            //return ( { CampsiteInfo } );
        //};
        //return <div />;
    //}
    // FINALLY, we must call this method. --[Navigate to the 'return' for the entire class Directory Component, below]--

    //render() {
        // .. which contains an ARRAY of elements.
        // We will use the existing 'campsites' data (property's values) from the local 'state' property 
        // within the constructor of the React class 'Directory' 'extends' 'component'.
        // And we'll grab it with this syntax: this.state.campsites.map()
        // map() needs a callback function that tells it what to do for each of the ARRAY's items.
        // For the parameter name for the current item, we'll use 'campsite', or anything relevant.
        
        // Then, after the "fat arrow"(=>), inserting inside this "callback arrow function body",
        // is a 'return' (to which requires a {} wrap for the body).
            // This return is ONLY for the "arrow function".
                // div wraps around everything else, with bootstrap class: "col".
                // then add the corresponding tags and elements wrapped in {}, since it's in JSX.
                          // Here, I've updated this directory with changes from App.js by 
                          // replacing '.state' with '.props'.
        //
        //const directory = this.props.campsites.map(campsite => { 
            //return (
                // (1) we'll add that UNIQUE KEY id here in the div, since it's the topmost element,
                // by sticking a 'key' element syntax: ...key={campsite.id}...
                    // (2) .. while adding a <CardImg> component & width to replace the <img /> element
                        // and a <CardTitle> component (replace <h2>) inside a <CardImgOverlay
                            // while getting rid of the <p> {campsite.description}. All still wrapped in a div with an unique key.
                
                // Then we just changed the "col" class by adding "md-5" with a margin: 1 ("m-1").
                //<div key={campsite.id} className="col-md-5 m-1">
                    //<Card onClick={() => this.onCampsiteSelect(campsite)}>
                        //<CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        //<CardImgOverlay>
                            //<CardTitle>{campsite.name}</CardTitle>
                        //</CardImgOverlay>
                    //</Card>
                //</div>
                // Now, we'll want to set a Card Handler, so that when we click on each card, it'll give us more info.
                // So, we'll go to the constructor above and set up its first and new property for the Card Handler. 
                // --[To Note.(3) in class Directory]--

            //);
        //});

        // And what will happen, this map() will go through all of the campsites from the 
        // local '.state' and it'll make a new ARRAY where each ARRAY item contains this
        // same set of JSX elements but using a campsite for each item.
        // THEN, 
        // that whole ARRAY will be rendered inside the bootstrap, "row", just below.

        //return (
                    // Inside 'row' div, we'll use the JS var, {directory}.
                    // Must use {} in order to use JS inside of JSX.
                    // 2nd thing we do, is set up the {directory} var above 'return'..
                    
            //<div className="container">
                //<div className="row">
                    //{directory}
                //</div>
               //<CampsiteInfo campsite={this.state.selectedCampsite } />
            //</div>
        //);
    //}
//}