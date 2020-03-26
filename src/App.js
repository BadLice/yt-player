import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import YouTube from 'react-youtube';
import searchYoutube from 'youtube-api-v3-search';
import './App.css';
import NavBar from './components/nav.bar';
import ThumbnailButton from './components/channel.thumbnail.button';
import { gapi } from 'gapi-script';

export const YT_KEY = 'AIzaSyAwLbnuIrnPqxjuP2jKqBPEgxX7PlsfM7w';

export const useSearch = () => {
	const [searchResult, setSearchResult] = useState(null);
	const [searchParams, search] = useState(null);

	useEffect(() => {
		if (gapi && gapi.client && searchParams) {
			let subscribed = true;
			searchParams.part = 'snippet';
			gapi.client.youtube.search.list(searchParams).then(res => {
				if (subscribed) {
					setSearchResult(res.result);
					search(null);
				}
			});
			return () => (subscribed = false);
		}
	}, [gapi, searchParams, search]);

	return [searchResult, search];
};

export const useChannels = () => {
	const [channelResult, setChannelResult] = useState(null);
	const [channelId, getChannel] = useState(null);

	useEffect(() => {
		if (gapi && gapi.client && channelId) {
			let subscribed = true;
			gapi.client.youtube.channels
				.list({
					part: 'snippet',
					id: channelId
				})
				.then(res => {
					if (subscribed) {
						setChannelResult(res.result);
						getChannel(null);
					}
				});
			return () => (subscribed = false);
		}
	}, [gapi, channelId]);

	return [channelResult, getChannel];
};

export const useGapi = () => {
	const [resApi, setGapi] = useState(null);

	useEffect(() => {
		if (!resApi) {
			//load the gapi
			const script = document.createElement('script');
			script.src = 'https://apis.google.com/js/client.js';

			script.onload = () => {
				gapi.load('client', () => {
					gapi.client.setApiKey(YT_KEY);
					gapi.client.load('youtube', 'v3', () => {
						setGapi(gapi);
					});
				});
			};
			document.body.appendChild(script);
		}
	}, [resApi]);

	return resApi;
};

const App = () => {
	const gapi = useGapi(YT_KEY);
	const [searchResult, search] = useSearch();

	return (
		<div className='app-background'>
			<NavBar search={search} />
			<Container>
				{searchResult &&
					searchResult.items.map(video => (
						<Card
							key={video.id.videoId}
							className='d-inline-block m-2 w-45'
							border='danger'
						>
							<YouTube
								videoId={video.id.videoId}
								className='card-img-top'
							/>
							<Card.Body>
								<Card.Title>{video.snippet.title}</Card.Title>
								<Card.Text>
									{video.snippet.description}
								</Card.Text>
								<ThumbnailButton
									channelTitle={video.snippet.channelTitle}
									channelId={video.snippet.channelId}
								/>
							</Card.Body>
						</Card>
					))}
			</Container>
		</div>
	);
};

export default App;
