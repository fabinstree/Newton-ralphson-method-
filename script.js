document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const equation = document.getElementById('equation').value;
    const initialGuess = parseFloat(document.getElementById('initial-guess').value);
    const maxIterations = parseInt(document.getElementById('max-iterations').value);
    const convergenceCriteria = parseFloat(document.getElementById('convergence-criteria').value);

    const resultsTableBody = document.querySelector('#results-table tbody');
    resultsTableBody.innerHTML = '';

    try {
        const f = math.parse(equation);
        const df = math.derivative(equation, 'x');

        let x = initialGuess;
        let iteration = 0;

        while (iteration < maxIterations) {
            const fx = f.evaluate({ x: x });

            const newRow = resultsTableBody.insertRow();
            newRow.innerHTML = `<td>${iteration}</td><td>${x.toFixed(6)}</td><td>${fx.toFixed(6)}</td>`;

            if (Math.abs(fx) < convergenceCriteria) {
                break;
            }

            const dfx = df.evaluate({ x: x });
            if (dfx === 0) {
                alert("Derivative is zero. Newton-Raphson method failed.");
                return;
            }

            x = x - fx / dfx;
            iteration++;
        }

    } catch (error) {
        alert('Error: ' + error.message);
    }
});