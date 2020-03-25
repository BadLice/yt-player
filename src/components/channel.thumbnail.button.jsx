import React, { useEffect, useState, useRef } from 'react';
import {
	FormControl,
	Navbar,
	Form,
	Button,
	Nav,
	NavDropdown
} from 'react-bootstrap';
import { useChannel, YT_KEY } from '../App';

const ChannelThumbnailButton = props => {
	const [channelResult, getChannel] = useChannel(YT_KEY);

	useEffect(() => {
		if (props.channelId) {
			getChannel(props.channelId);
		}
	}, [props.channelId]);

	if (!channelResult) return <></>;
	return (
		<>
			<Button variant='outline-danger' className='pl-1'>
				<img
					src={channelResult.thumbnails.default.url}
					alt={props.channelId + '-thumbnail'}
					className='img-thumbnail size-thumbnail rounded-circle mr-2'
				></img>
				{props.channelTitle}
			</Button>
		</>
	);
};

export default ChannelThumbnailButton;
