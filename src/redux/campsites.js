//import { CAMPSITES } from '../shared/campsites'; //deleting and importing from our ActionTypes module...(1)
import * as ActionTypes from './ActionTypes';
//Split the Reducer
// this is a reducer function: a 'name' export.
//  All reducers take two parameters:
                          // 1) Takes the previous 'state' (the Existing or Current State), 
                          // which basically means the 'state' that's already in the 'store'
                          // and is going to be changed by this reducer.
                          // The first time the reducer is called, the 'state' will not exist.
                                           // we'll use the default function parameter sintax, ','
                                           // to initialize the 'state'. At least, the part of the 'state'
                                           // that is handled by the reducer from the imported data.
                                             // 2) For the 2nd parameter, the reducer takes an 'action' object.
    // Then, within the body of this function, we'll check for the type of action & then return the 'state'
    // NOTE: Not required, but it's common to use a JS 'switch' statement for this.
        // If no action.type is defined, it's good to provide a 'default' case to 'return' of 'state'.

// export const Campsites = (state = CAMPSITES, action) => {   //and (1) changing the structure of the Campsites state (deleting CAMPSITES and adding an object)
//     switch (action.type) {
//         default:
//             return state;
//     }
// }

//New Campsites updated
export const Campsites = (state = {
    isLoading: true,
    errMess: null,
    campsites: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};
        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []};
        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};
    // 'campsites: []' = the campsites array which all its properties being initialized 
    // here with the default function parameter syntax, '[]'. 

        // Now, we'll start adding the responses to the different campsites related actions
    // to this reducer's switch() statement above, with 'case'.
            // For the ADD_CAMPSITES 'ActionTypes', we'll return a new 'state' that consists of
            // the previous date spread-out, we'll update its value to say "It's no longer loading",
            // "there's no error message" & the campsites array will be populated with the payload.
        // Next 'case', for the Campsites loading ActionType, we'll update the 'state' to say
            // is loading true, is there no errMess (error message) & campsites is an empty array, 
            // since the data hasn't finished loading.
        // Then this 'case', for CAMPSITES_FAIL,
            // set isLoading to false & errMess to the action's payload. (No need to update campsites array here.)

// end to changing this file from the redux folder.