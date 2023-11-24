document.addEventListener('DOMContentLoaded', () => {
	// create a new Headers class and assign the api key to it
	const headers = new Headers();
	headers.append('apikey', 'HZEd64rmT476RhO2bQ5h0TO9WEnTpES2');

	const requestOptions = {
		method: 'GET',
		headers,
	};
	document
		.querySelector('#currency-converter')
		.addEventListener('submit', async (event) => {
			// using event.preventDefault() to avoid a page refresh upon submitting the form.
			event.preventDefault();

			const {
				target: { from, to, amount },
			} = event;

			try {
				const response = await fetch(
					`https://api.apilayer.com/exchangerates_data/convert?to=${to.value}&from=${from.value}&amount=${amount.valueAsNumber}`,
					requestOptions
				);
				const data = await response.json();

				const { info, date, result } = data;

				document.querySelector(
					'#result'
				).textContent = `Exchange rate: ${info.rate.toFixed(
					0
				)}, Today: ${date}. ----- You changed from ${amount.valueAsNumber.toFixed(
					0
				)}${from.value}, you get ${result.toFixed(0)}${to.value}`;
			} catch (error) {
				console.error(error);
			}
		});
});
