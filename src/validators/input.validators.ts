export const emailValidationFormat = (input: string) => {
    const validEmails = ['gmail', 'outlook', 'hotmail', 'yahoo'];
    const domainPattern = validEmails.join('|');  // Crea una cadena 'gmail|outlook|hotmail|yahoo'

    // Expresión regular completa
    const emailPattern = new RegExp(`^[\\w.-]+@(${domainPattern})\\.com$`);
    const isInputValid = emailPattern.test(input);

    return isInputValid
}
