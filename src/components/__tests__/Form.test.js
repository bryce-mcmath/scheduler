import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
	const interviewers = [
		{
			id: 1,
			name: 'Sylvia Palmer',
			avatar: 'https://i.imgur.com/LpaY82x.png'
		}
	];

	it('renders without student name if not provided', () => {
		const { getByPlaceholderText } = render(
			<Form interviewers={interviewers} />
		);
		expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
	});

	it('renders with initial student name', () => {
		const { getByTestId } = render(
			<Form interviewers={interviewers} name='Lydia Miller-Jones' />
		);
		expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
	});

	it('validates that the student name is not blank', () => {
		const onSave = jest.fn();
		const { getByText } = render(
			<Form interviewers={interviewers} interviewer={1} onSave={onSave} />
		);

		fireEvent.click(getByText('Save'));

		expect(getByText(/Student name must be included/i)).toBeInTheDocument();

		expect(onSave).not.toHaveBeenCalled();
	});

	it('validates that an interviewer has been chosen', () => {
		const onSave = jest.fn();
		const { getByText } = render(
			<Form interviewers={interviewers} name={'Gary'} onSave={onSave} />
		);

		fireEvent.click(getByText('Save'));

		expect(getByText(/You must select an interviewer/i)).toBeInTheDocument();

		expect(onSave).not.toHaveBeenCalled();
	});

	it('can successfully save after trying to submit an empty student name', () => {
		const onSave = jest.fn();
		const { getByText, getByPlaceholderText, queryByText } = render(
			<Form interviewers={interviewers} interviewer={1} onSave={onSave} />
		);

		fireEvent.click(getByText('Save'));

		expect(getByText(/Student name must be included/i)).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();

		fireEvent.change(getByPlaceholderText('Enter Student Name'), {
			target: { value: 'Lydia Miller-Jones' }
		});

		fireEvent.click(getByText('Save'));

		expect(queryByText(/Student name must be included/i)).toBeNull();

		expect(onSave).toHaveBeenCalledTimes(1);
		expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1, undefined);
	});

	it('calls onCancel and resets the input field', () => {
		const onCancel = jest.fn();
		const { getByText, getByPlaceholderText, queryByText } = render(
			<Form
				interviewers={interviewers}
				name='Lydia Miller-Jones'
				onSave={jest.fn()}
				onCancel={onCancel}
				interviewer={1}
			/>
		);

		fireEvent.click(getByText('Save'));

		fireEvent.change(getByPlaceholderText('Enter Student Name'), {
			target: { value: 'Lydia Miller-Jones' }
		});

		fireEvent.click(getByText('Cancel'));

		expect(queryByText(/Student name must be included/i)).toBeNull();

		expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');

		expect(onCancel).toHaveBeenCalledTimes(1);
	});

	it('prevents default behaviour if someone attemps to submit the form', () => {
		const { getByPlaceholderText, getByTestId } = render(
			<Form
				interviewers={interviewers}
				interviewer={1}
				name='Lydia Miller-Jones'
			/>
		);

		fireEvent.submit(getByTestId('appointment-form'));

		// Verify the view has not changed as it would if default was not prevented
		expect(getByPlaceholderText('Enter Student Name')).toBeInTheDocument();
	});
});
