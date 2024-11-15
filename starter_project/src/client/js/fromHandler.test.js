// Import necessary functions
import { handleSubmit } from './formHandler';

// Mocking the sendDataToServer function
jest.mock('./formHandler', () => ({
  ...jest.requireActual('./formHandler'),
  sendDataToServer: jest.fn(),
}));

describe('handleSubmit', () => {
  let event;

  beforeEach(() => {
    // Create a mock event object and set up a valid value
    event = {
      preventDefault: jest.fn(),
    };

    // Set up DOM elements using jsdom (no need for @jest-environment jsdom)
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" value="http://example.com" />
      </form>
    `;
  });

  test('should call sendDataToServer with the input value', () => {
    const { sendDataToServer } = require('./formHandler');

    // Call the function being tested
    handleSubmit(event);

    // Check if preventDefault was called
    expect(event.preventDefault).toHaveBeenCalled();

    // Check if sendDataToServer was called with the correct value
    expect(sendDataToServer).toHaveBeenCalledWith('http://example.com');
  });

  test('should alert if input is empty', () => {
    // Simulate an empty input field
    document.getElementById('name').value = '';
    
    // Mock the alert function to avoid actually triggering alerts
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Call the function being tested
    handleSubmit(event);

    // Ensure the alert function was called with the correct message
    expect(alertMock).toHaveBeenCalledWith('Please enter some text to analyze');

    // Restore the original alert function
    alertMock.mockRestore();
  });
});
