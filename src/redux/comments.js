import * as ActionTypes from './ActionTypes';

//Split the Reducer
export const Comments = (state = { errMess: null, comments: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};
        default:
            return state;
    }
};

// Now, we cause this Reducer to update its part of the state when the ADD_COMMENT 'action'
// is dispatched to the 'store' by 'import'(ing) the 'ActionTypes' module by using the 
// "wild card" syntax, '*', notice above.

// Then, in our switch statement:
        // we set a 'case' for when the 'ActionTypes' is 'ADD.COMMENT'. i.e. :
        // < case ActionTypes.ADD_COMMENT: >
            // Then here, we put the content of 'action', 'payload' into a new variable, i.e. :
            // < const comment = action.payload; > , recalling that the content of 'action', 'payload',
            // is an object; therefore, we can add more properties to this object as such :
            // < comment.id = state.length; >    // adding an id, which will be the length of the 
            // comments array that's stored in this part of the state. 
            // Then, we'll add the current date with this line of code :
            // < comment.date = new Date().toISOString(); >
            // Then, finally, we'll return the new state by using the 'array.concat()' method. Which is a
            // built-in JS array method that lets us attach a new item to the end of an array w/o mutating the original.
            // In contrast, the 'push()' method would mutate the original array.
            // This line takes the existing state, which is an array of objects, and it 
            // concatenates the 'new' 'comment' object to the end of the array,
            // and then it returns that new state to the Redux 'store'.

//Next, we'll update several react components to enable dispatching this action. (Refer to MainComponent.js)
// in order to import the { addComment } function from ActionCreators.js.
// to which we'll then have to set up a new function known as mapDispatchToProps(),
// to which can be set up in two different ways: as a function, or an object (object recommended).

// And THEN, we'll need to update the campsiteInfoComponent.js file to use that 'addComment' ActionCreator function,
// by updating the 'function CampsiteInfo(props)' and the rendered return of <RenderComments /> by adding the addComment props.

// Then,
// still in CampsiteInfoComponent.js,
// we'll use object destructuring within the parameter list of 'function RenderComments({comments})' component to grab props by adding:
// ({ comments, addComment, campsiteId }) 

// Then,
// we'll pass these one more time to the <CommentForm /> component. By passing them to the child component comment form, as such:
//  From:   <CommentForm /> to:     <CommentForm campsiteId={campsiteId} addComment={addComment} />

// FINALLY, in the CommentForm component, we'll use these props in the handleSubmit() method by adding a line of code
// for when the form is submitted, the 'addComment' 'ActionCreator' will create an action using the values in this form.
// Then, that action will get dispatched to its Reducer which will update the 'state'.





//Split the Reducer
// ( ...If we were using the export { CAMPSITES } from shared folder as a simulated server...)
            // export const Comments = (state = COMMENTS, action) => {
            //     switch (action.type) {
            //         case ActionTypes.ADD_COMMENT:
            //             const comment = action.payload;
            //             comment.id = state.length;
            //             comment.date = new Date().toISOString();
            //             return state.concat(comment);
            //         default:
            //             return state;
            //     }
            // }

            // Now, we cause this Reducer to update its part of the state when the ADD_COMMENT 'action'
            // is dispatched to the 'store' by 'import'(ing) the 'ActionTypes' module by using the 
            // "wild card" syntax, '*', notice above.

            // Then, in our switch statement:
                    // we set a 'case' for when the 'ActionTypes' is 'ADD.COMMENT'. i.e. :
                    // < case ActionTypes.ADD_COMMENT: >
                        // Then here, we put the content of 'action', 'payload' into a new variable, i.e. :
                        // < const comment = action.payload; > , recalling that the content of 'action', 'payload',
                        // is an object; therefore, we can add more properties to this object as such :
                        // < comment.id = state.length; >    // adding an id, which will be the length of the 
                        // comments array that's stored in this part of the state. 
                        // Then, we'll add the current date with this line of code :
                        // < comment.date = new Date().toISOString(); >
                        // Then, finally, we'll return the new state by using the 'array.concat()' method. Which is a
                        // built-in JS array method that lets us attach a new item to the end of an array w/o mutating the original.
                        // In contrast, the 'push()' method would mutate the original array.
                        // This line takes the existing state, which is an array of objects, and it 
                        // concatenates the 'new' 'comment' object to the end of the array,
                        // and then it returns that new state to the Redux 'store'.

            //Next, we'll update several react components to enable dispatching this action. (Refer to MainComponent.js)
            // in order to import the { addComment } function from ActionCreators.js.
            // to which we'll then have to set up a new function known as mapDispatchToProps(),
            // to which can be set up in two different ways: as a function, or an object (object recommended).

            // And THEN, we'll need to update the campsiteInfoComponent.js file to use that 'addComment' ActionCreator function,
            // by updating the 'function CampsiteInfo(props)' and the rendered return of <RenderComments /> by adding the addComment props.

            // Then,
            // still in CampsiteInfoComponent.js,
            // we'll use object destructuring within the parameter list of 'function RenderComments({comments})' component to grab props by adding:
            // ({ comments, addComment, campsiteId }) 

            // Then,
            // we'll pass these one more time to the <CommentForm /> component. By passing them to the child component comment form, as such:
            //  From:   <CommentForm /> to:     <CommentForm campsiteId={campsiteId} addComment={addComment} />

            // FINALLY, in the CommentForm component, we'll use these props in the handleSubmit() method by adding a line of code
            // for when the form is submitted, the 'addComment' 'ActionCreator' will create an action using the values in this form.
            // Then, that action will get dispatched to its Reducer which will update the 'state'.

