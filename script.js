function calculateTax() {
    const payeIncome = parseFloat(document.getElementById("payeIncome").value);
    const selfEmploymentIncome = parseFloat(document.getElementById("selfEmploymentIncome").value);
    const totalExpenses = parseFloat(document.getElementById("totalExpenses").value);
    const personalAllowance = 12570;
    const taxRate = 0.20;
    const class1NI = 0.12; // For PAYE Income
    const class2NI = 179.40; // For Self-Employment (fixed rate)
    const class4NI = 0.09; // For Self-Employment

    // Calculate self-employment profits
    const selfEmploymentProfits = Math.max(0, selfEmploymentIncome - totalExpenses);

    // Personal allowance split
    const personalAllowanceLeft = Math.max(0, personalAllowance - payeIncome);

    // Taxable income
    const taxablePAYE = Math.max(0, payeIncome - personalAllowance);
    const taxableSelfEmployment = Math.max(0, selfEmploymentProfits - personalAllowanceLeft);

    // Calculations for PAYE Income
    const incomeTaxPAYE = taxRate * taxablePAYE;
    const niPAYE = class1NI * Math.max(0, payeIncome - personalAllowance);

    // Calculations for Self-Employment
    const incomeTaxSelfEmployment = taxRate * taxableSelfEmployment;
    const niSelfEmploymentClass2 = (selfEmploymentProfits > personalAllowance) ? class2NI : 0;

    // Class 4 NI calculation
    let niSelfEmploymentClass4 = 0;

    if (selfEmploymentProfits > 50270) {
        niSelfEmploymentClass4 += 0.02 * (selfEmploymentProfits - 50270); // 2% on profits over £50,270
        niSelfEmploymentClass4 += 0.09 * (50270 - 12570); // 9% on profits between £12,570 and £50,270
    } else if (selfEmploymentProfits > 12570) {
        niSelfEmploymentClass4 += 0.09 * (selfEmploymentProfits - 12570); // 9% on profits between £12,570 and £50,270
    }

    // Totals
    const totalIncomeTax = incomeTaxPAYE + incomeTaxSelfEmployment;
    const totalNI = niPAYE + niSelfEmploymentClass2 + niSelfEmploymentClass4;
    const totalTax = totalIncomeTax + totalNI;

    // Calculate Total Self-Employed Tax
    const totalSelfEmployedTax = incomeTaxSelfEmployment + niSelfEmploymentClass2 + niSelfEmploymentClass4;

    // Breakdown of results
    const breakdown = `
        <div class="breakdown">
            <div>
                <strong>PAYE Income Breakdown:</strong><br>
                Income Tax (PAYE): £${incomeTaxPAYE.toFixed(2)}<br>
                Class 1 NI (PAYE): £${niPAYE.toFixed(2)}
            </div>
            <div>
                <strong>Self-Employment Income Breakdown:</strong><br>
                Self-Employment Income: £${selfEmploymentIncome.toFixed(2)}<br>
                Total Expenses: £${totalExpenses.toFixed(2)}<br>
                <div class="self-employment-profit">Self-Employment Profits: £${selfEmploymentProfits.toFixed(2)}</div>
                Income Tax (Self-Employment): £${incomeTaxSelfEmployment.toFixed(2)}<br>
                Class 2 NI (Self-Employment): £${niSelfEmploymentClass2.toFixed(2)}<br>
                Class 4 NI (Self-Employment): £${niSelfEmploymentClass4.toFixed(2)}
            </div>
        </div>

        <div class="total-section">
            <strong>Total Income Tax: £${totalIncomeTax.toFixed(2)}</strong><br>
            <strong>Total NI: £${totalNI.toFixed(2)}</strong><br><br>
            <strong><u>TOTAL Tax and NI: £${totalTax.toFixed(2)}</u></strong><br><br>
            <strong>Total Self-Employed Tax: £${totalSelfEmployedTax.toFixed(2)} <span class="emoji">🫠</span></strong>

        </div>
    `;

    // This line updates the HTML with the calculated results
    document.getElementById("result").innerHTML = breakdown;
}
