import React, { useEffect, useState, useRef } from 'react';
import {
	FormControl,
	Navbar,
	Form,
	Button,
	Nav,
	NavDropdown
} from 'react-bootstrap';
import { useChannels } from '../App';

const ChannelThumbnailButton = props => {
	const [channelsResult, getChannels] = useChannels();

	useEffect(() => {
		if (props.channelId) {
			getChannels(props.channelId);
		}
	}, [props.channelId]);

	if (!channelsResult) return <></>;
	return (
		<>
			<Button variant='outline-danger' className='pl-1'>
				{!channelsResult ? (
					<div className='img-thumbnail size-thumbnail rounded-circle mr-2 bg-secondary' />
				) : (
					<img
						src={
							channelsResult.items[0].snippet.thumbnails.default
								.url
						}
						alt={props.channelId + '-thumbnail'}
						className='img-thumbnail size-thumbnail rounded-circle mr-2'
					/>
				)}
				{props.channelTitle}
			</Button>
		</>
	);
};

export default ChannelThumbnailButton;
