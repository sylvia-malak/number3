function checkForName(inputText, validNames) {
    console.log("::: Running checkForName :::", inputText);
    
    const normalizedInput = inputText.trim().toLowerCase();
    const normalizedNames = validNames.map(name => name.toLowerCase());
    
    if (normalizedNames.includes(normalizedInput)) {
      return "Hello!"; // Return a success message
    } else {
      return "Enter a valid name"; // Return an error message
    }
  }
  
  const names = ["Picard", "Janeway", "Kirk", "Archer", "Georgiou"];
  export { checkForName };
  

