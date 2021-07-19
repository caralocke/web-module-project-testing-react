//1. Add in nessisary imports and values to establish the testing suite.
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Display from '../Display'
import userEvent from '@testing-library/user-event'
import  fetchShow  from './../../api/fetchShow'
jest.mock('./../../api/fetchShow')

const button = () => screen.getByRole('button')

//2. Test that the Display component renders without any passed in props.
test ('the display component renders without any passed in props', () => {
    render(<Display/>)
})

//3. Rebuild or copy a show test data element as used in the previous set of tests.
const testShow = {
    name: 'Test Show',
    summary: 'Test Summary',
    seasons: [{
        id: 1,
        name: 'Test Season',
        episodes: []
    }]
}

//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
test('when the fetch button is pressed the show component will display', async () => {
    render(<Display />)
    fetchShow.mockResolvedValue(testShow)
    userEvent.click(button())
    await waitFor(() => {
        const showComponent = screen.queryByTestId('show-container')
        expect(showComponent).toBeVisible()
        expect(showComponent).toHaveTextContent(/test season/i)
    })
})

//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
test('when the fetch button is pressed, the amount of select options rendered is equal to the amount of season in test data', async () => {
    render(<Display />)
    fetchShow.mockResolvedValue(testShow)
    userEvent.click(button())
    await waitFor(() => {
        const showContainer = screen.getByTestId('show-container');
        expect(showContainer).toBeVisible();
    });
    // Assert number of seasons equal to test data (3)
    const seasonOptions = screen.getAllByTestId("season-option");
    expect(seasonOptions.length).toEqual(testShow.seasons.length);
})

//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
test('when the fetch button is pressed the displayFunc function is called', async () => {
    const mockDisplayFunc = jest.fn()
    render(<Display displayFunc={mockDisplayFunc}/>)
    userEvent.click(button())
    const show = await screen.findByTestId('show-container')
    expect(mockDisplayFunc).toHaveBeenCalledTimes(1)
    expect(show).toBeInTheDocument()
    expect(show).toHaveTextContent(/test show/i)
})

///Tasks: