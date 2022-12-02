import React from 'react'

import {
  render,
  cleanup,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  waitForElement,
  fireEvent
} from '@testing-library/react'

import Application from 'components/Application'

afterEach(cleanup)

describe('Application', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', () => {
    const { getByText } = render(<Application />)

    return waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'))
      expect(getByText('Leopold Silvers')).toBeInTheDocument()
    })
  })

  it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container } = render(<Application />)

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'))

    // 3. Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[0]
    fireEvent.click(getByAltText(appointment, 'Add'))

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    })

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, 'Save'))

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, 'Saving...')).toBeInTheDocument()

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'))

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    )
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument()
  })

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container } = render(<Application />)

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'))

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    )
    fireEvent.click(queryByAltText(appointment, 'Delete'))

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument()

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, 'Confirm'))

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, 'Deleting...')).toBeInTheDocument()

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'))

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    )
    expect(queryByText(day, '2 spots remaining')).toBeInTheDocument()
  })

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    /*
    We want to start by finding an existing interview.
With the existing interview we want to find the edit button.
We change the name and save the interview.
We don't want the spots to change for "Monday", since this is an edit.
Read the errors because sometimes they say that await cannot be outside of an async function.
    */
    const { container} = render(<Application />)
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    )
    const days = getAllByTestId(container, 'day')
    const day = days.find(day => queryByText(day, 'Monday'))
    fireEvent.click(getByAltText(appointment, 'Edit'))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {
        value: 'Lydia Miller-Jones'
      }
    })
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    expect(getByText(appointment, 'Save')).toBeInTheDocument()
    fireEvent.click(getByText(appointment, 'Save'))
    expect(getByText(appointment, 'Saving...')).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'))

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    )
    expect(getByText(day,  remaining')).toBeInTheDocument()
  })
})
