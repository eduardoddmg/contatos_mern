import styled from 'styled-components';

export const Nav = styled.nav`
	background-color: #0D6EFD;
	color: white;
	padding: 0.5em 2em;
	
	display: flex;
	justify-content: start;

	button {
		color: white;
		border: none;
		display: none;
		position: relative;

		font-size: 20px;
		font-weight: bold;
	}

	section {
		display: flex;
		gap: 1em;
	}

	section a {
		padding: 0.5em 1em;
		border-radius: 6px;
		transition: .4s;
	}

	section a:hover {
		color: white;
		background-color: #0b56c4;
	}

	@media only screen and (max-width: 1000px) {
		flex-direction: column;
		position: fixed;
		width: 100%;
		top: 0;

		section {
			display: ${props => props.show ? "flex" : "none"};
			flex-direction: column;
			gap: 0;
		}

		button {
			display: block;
			margin-bottom: ${props => props.show ? "1em" : "0"};
		}
	}
`;

