        const display = document.getElementById('display');
        let currentInput = '0';
        let shouldResetDisplay = false;
        
        function updateDisplay() {
            display.value = currentInput;
        }
        
        function appendToDisplay(value) {
            if (currentInput === '0' || shouldResetDisplay) {
                currentInput = value;
                shouldResetDisplay = false;
            } else {
                currentInput += value;
            }
            updateDisplay();
        }
        
        function clearDisplay() {
            currentInput = '0';
            updateDisplay();
        }
        
        function deleteLast() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }
        
        function calculate() {
            try {
                // Reemplazar el símbolo de multiplicación para evaluación
                let expression = currentInput.replace(/×/g, '*');
                
                // Validar la expresión antes de evaluar
                if (/[^0-9+\-*/.()]/.test(expression)) {
                    throw new Error('Expresión inválida');
                }
                
                let result = eval(expression);
                
                // Mostrar resultado
                currentInput = result.toString();
                shouldResetDisplay = true;
                updateDisplay();
            } catch (error) {
                currentInput = 'Error';
                shouldResetDisplay = true;
                updateDisplay();
            }
        }
        
        // Manejo de teclado
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (/[0-9]/.test(key)) {
                appendToDisplay(key);
            } else if (key === '+' || key === '-' || key === '*') {
                appendToDisplay(key);
            } else if (key === '/') {
                event.preventDefault();
                appendToDisplay('/');
            } else if (key === '.' || key === ',') {
                appendToDisplay('.');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'Delete') {
                clearDisplay();
            } else if (key === 'Backspace') {
                deleteLast();
            }
        });
        
        // Inicializar la calculadora
        updateDisplay();