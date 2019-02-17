import React from 'react';

const Error = ({error}) => {
    if(!error){
        return(
            <div></div>
        );
    }
    return(
        <div className="error">{error}</div>
    );
}

export default Error;