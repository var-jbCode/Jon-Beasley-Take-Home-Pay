import React, { useState } from 'react';


const TaxApp = () => {
    const [salary, setSalary] = useState()

    return (
        <section>
            <h1>Your "Take Home" Pay Calculator</h1>
            <input
                type="text"
                name="salaryInput"
                id="salaryInput"
                placeholder="Put your Salary in here!"
                onChange={(e) => setSalary(e.target.value)}
            />
            <button
                onClick={() => console.log(` Hello your salsary is ${salary}`)}
            >Calculate Take Home Pay</button>


        </section>
    );
}

export default TaxApp;