import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form({
	name,
	interviewers,
	interviewer,
	onSave,
	onCancel,
	create
}) {
	const [studentName, setName] = useState(name || '');
	const [chosenInterviewer, setInterviewer] = useState(interviewer || null);
	const [error, setError] = useState('');

	const reset = () => {
		setName('');
		setInterviewer(null);
	};

	const cancel = () => {
		reset();
		onCancel();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const validate = () => {
		if (studentName && chosenInterviewer) {
			setError('');
			onSave(studentName, chosenInterviewer, create);
		}

		if (!studentName) {
			setError('Student name must be included');
		} else if (chosenInterviewer === null) {
			setError('You must select an interviewer');
		}
	};

	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form
					data-testid='appointment-form'
					autoComplete='off'
					onSubmit={handleSubmit}
				>
					<input
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='Enter Student Name'
						data-testid='student-name-input'
						value={studentName}
						onChange={(e) => setName(e.target.value)}
					/>
				</form>
				<section className='appointment__validation'>{error}</section>
				<InterviewerList
					interviewers={interviewers}
					value={chosenInterviewer}
					onChange={(id) => {
						setInterviewer(id);
					}}
				/>
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
