import React, { useEffect, useState, useRef } from 'react';
import {
	FormControl,
	Navbar,
	Form,
	Button,
	Nav,
	NavDropdown
} from 'react-bootstrap';

const NavBar = props => {
	const searchInput = useRef();

	const search = e => {
		e && e.preventDefault();
		props.search({
			maxResults: 2,
			q: searchInput.current.value.trim()
		});
	};

	return (
		<>
			<Navbar bg='dark' expand='lg'>
				<Navbar.Brand className='text-white'>
					<span className='text-danger border border-danger rounded-pill p-2'>
						Youtube
					</span>
					<span>Player</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'></Nav>
					<Form inline onSubmit={search}>
						<Form.Control
							ref={searchInput}
							type='text'
							placeholder='Search'
							className='mr-sm-2'
						/>
						<Button variant='outline-success' onClick={search}>
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default NavBar;
