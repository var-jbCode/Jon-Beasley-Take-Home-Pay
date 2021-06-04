import React from 'react';

const Results = (props) => {
    return (
        <div className="results">
            <p><b>Your Take Home Pay is £{props.takeHome}</b></p>
            <p>Your Annual Tax due is £{props.annualTaxDue}</p>
            <p>Your Annual NI due is £{props.annualNIDue}</p>
        </div>

    );
}

export default Results;