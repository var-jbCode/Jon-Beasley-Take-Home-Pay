import React, { useState } from 'react';
import Results from './Results'


const TaxApp = () => {
    const [salary, setSalary] = useState()
    const [annualTaxDue, setannualTaxDue] = useState()
    const [annualNIDue, setannualNIDue] = useState()
    const [takeHome, setTakeHome] = useState()
    const [resultsVisible, setResultsVisisble] = useState()
    const [inputError, setInputError] = useState(false)

    const calculateLogic = () => {
        if (salary) {
            if (salary.match(/\d+/)) {
                setInputError(false)
                if (salary < 15000) {
                    setTakeHome(salary)
                    setannualNIDue(0)
                    setannualTaxDue(0)
                    setResultsVisisble(true)
                } else if (salary > 15000 && salary < 50000) {
                    let taxFree = 15000
                    let midTax = (salary - taxFree) * 0.2
                    let midNI = (salary - taxFree) * 0.12
                    setTakeHome(salary - midTax - midNI)
                    setannualNIDue(midNI)
                    setannualTaxDue(midTax)
                    setResultsVisisble(true)
                } else if (salary > 50000) {
                    let aboveFiftyK = salary - 50000
                    let topTax = 7000 + (aboveFiftyK * 0.4)
                    let topNI = 4200 + (aboveFiftyK * 0.02)
                    setTakeHome(salary - topTax - topNI)
                    setannualNIDue(topNI)
                    setannualTaxDue(topTax)
                    setResultsVisisble(true)
                }

            } else {
                setInputError(true)
                setResultsVisisble(false)
            }
        } else {
            setInputError(true)
            setResultsVisisble(false)
        }
    }

    return (
        <div className="container">
            <div>
                <h1>Your "Take Home" Pay Calculator</h1>
                {inputError && <p>Please only enter a integer salary without comma seperation :)</p>}
                £ <input
                    className="text-input"
                    type="text"
                    name="salaryInput"
                    id="salaryInput"
                    placeholder="Put your Salary in here!"
                    onChange={(e) => setSalary(e.target.value)}
                />
                <button
                    className="button"
                    onClick={calculateLogic}
                >Calculate Take Home Pay</button>
            </div> {
                resultsVisible &&
                <Results
                    takeHome={takeHome}
                    annualTaxDue={annualTaxDue}
                    annualNIDue={annualNIDue}
                />
            }

        </div>
    );
}

export default TaxApp;