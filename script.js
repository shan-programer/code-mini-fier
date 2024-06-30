async function minifyCode() {
    const inputCode = document.getElementById('inputCode').value;
    const mode = document.getElementById('mode').value;

    if (mode === 'professional') {
        // Use Terser for professional minification with mangle disabled
        try {
            const minifiedCode = await Terser.minify(inputCode, {
                mangle: false // Disable variable and function name mangling
            });
            if (minifiedCode.error) {
                throw minifiedCode.error;
            }
            document.getElementById('outputCode').value = minifiedCode.code;
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        let outputCode = '';

        if (mode === 'removeSpaces') {
            outputCode = removeExtraSpaces(inputCode);
        } else if (mode === 'removeComments') {
            outputCode = removeComments(inputCode);
        } else if (mode === 'removeSpacesAndComments') {
            outputCode = removeSpacesAndComments(inputCode);
        }

        document.getElementById('outputCode').value = outputCode;
    }
}

function removeExtraSpaces(code) {
    return code.replace(/\s+/g, ' ').trim();
}

function removeComments(code) {
    return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
}

function removeSpacesAndComments(code) {
    let noComments = removeComments(code);
    return removeExtraSpaces(noComments);
}
