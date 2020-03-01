import React from 'react';
import axios from 'axios';
import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	getAllByTestId,
	getByPlaceholderText,
	getByAltText,
	queryByText,
	queryByAltText
} from '@testing-library/react';
import Application from 'components/Application';
// import useVisualMode from '../../hooks/useVisualMode';

afterEach(() => {
	cleanup();
});

describe('Application', () => {
	it('changes the schedule when a new day is selected', async () => {
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText('Monday'));

		fireEvent.click(getByText('Tuesday'));

		expect(getByText('Leopold Silvers')).toBeInTheDocument();
	});

	it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointments = getAllByTestId(container, 'appointment');
		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, 'Add'));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Lydia Miller-Jones' }
		});

		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		fireEvent.click(getByText(appointment, 'Save'));

		expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(day, 'Monday')
		);

		expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
	});

	it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointment = getAllByTestId(
			container,
			'appointment'
		).find((appointment) => queryByText(appointment, 'Archie Cohen'));

		fireEvent.click(queryByAltText(appointment, 'Delete'));

		expect(
			getByText(appointment, 'Are you sure you want to delete this interview?')
		).toBeInTheDocument();

		fireEvent.click(queryByText(appointment, 'Confirm'));

		expect(getByText(appointment, 'Deleting...')).toBeInTheDocument();

		await waitForElement(() => getByAltText(appointment, 'Add'));

		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(day, 'Monday')
		);

		expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
	});

	it('shows the save error when failing to save an appointment', async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, 'Archie Cohen'));
		axios.put.mockRejectedValueOnce();

		const appointments = getAllByTestId(container, 'appointment');
		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, 'Add'));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Lydia Miller-Jones' }
		});

		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		fireEvent.click(getByText(appointment, 'Save'));

		expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, 'Error saving'));
	});

	it('shows the delete error when failing to delete an appointment', async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, 'Archie Cohen'));
		axios.delete.mockRejectedValueOnce();

		const appointment = getAllByTestId(
			container,
			'appointment'
		).find((appointment) => queryByText(appointment, 'Archie Cohen'));

		fireEvent.click(queryByAltText(appointment, 'Delete'));

		expect(
			getByText(appointment, 'Are you sure you want to delete this interview?')
		).toBeInTheDocument();

		fireEvent.click(queryByText(appointment, 'Confirm'));

		expect(getByText(appointment, 'Deleting...')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, 'Error deleting'));
	});

	it('loads data, edits an interview and does not affect the spots remaining', async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointment = getAllByTestId(
			container,
			'appointment'
		).find((appointment) => queryByText(appointment, 'Archie Cohen'));

		fireEvent.click(queryByAltText(appointment, 'Edit'));

		expect(getByText(appointment, 'Save')).toBeInTheDocument();

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Thomas Aquinas' }
		});

		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		fireEvent.click(getByText(appointment, 'Save'));

		expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, 'Thomas Aquinas'));

		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(day, 'Monday')
		);

		expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
	});

	// it('switches modes if there is an interview in empty mode', async () => {
	//   let mode = 'SHOW';

	//   const setMode = m => {
	//     mode = m;
	//   };

	//   const transition = m => {
	//     setMode(m);
	//   };

	//   const back = undefined;

	//   jest.mock('../../hooks/useVisualMode', () => ({
	//     useVisualMode: jest.fn().mockReturnValue({ mode, transition, back })
	//   }));

	//   const { container } = render(<Application />);

	//   await waitForElement(() => getByText(container, 'Archie Cohen'));

	//   const appointment = getAllByTestId(
	//     container,
	//     'appointment'
	//   ).find(appointment => queryByText(appointment, 'Archie Cohen'));
	// });
});
