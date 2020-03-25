import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import YouTube from 'react-youtube';
import searchYoutube from 'youtube-api-v3-search';
import './App.css';
import NavBar from './components/nav.bar';
import ThumbnailButton from './components/channel.thumbnail.button';

export const YT_KEY = 'AIzaSyAwLbnuIrnPqxjuP2jKqBPEgxX7PlsfM7w';
export const useSearch = YT_KEY => {
	const [searchResult, setSearchResult] = useState(null);

	const [searchQuery, search] = useState(null);
	const [searchType, setSearchType] = useState('video'); //channel - playlist - video;

	useEffect(() => {
		//search process
		if (searchQuery) {
			let subscribed = true;

			const options = {
				q: searchQuery.trim(),
				part: 'snippet',
				type: searchType
			};

			searchYoutube(YT_KEY, options).then(data => {
				if (subscribed) {
					console.log(data);
					setSearchResult(data);
				}
			});
			return () => (subscribed = false);
		}
	}, [searchQuery]);

	return [searchResult, search, setSearchType];
};

export const useChannel = YT_KEY => {
	const apiLink = 'https://www.googleapis.com/youtube/v3/channels?';
	const [channelResult, setChannelResult] = useState(null);
	const [channelId, getChannel] = useState(null);

	useEffect(() => {
		if (channelId) {
			let subscribed = true;
			axios
				.get(
					apiLink +
						'part=snippet&id=' +
						channelId +
						'&fields=items%2Fsnippet%2Fthumbnails&key=' +
						YT_KEY
				)
				.then(({ data }) => {
					if (subscribed) {
						console.log(channelId, data);
						setChannelResult(data.items[0].snippet);
					}
				});
			return () => (subscribed = false);
		}
	}, [channelId]);

	return [channelResult, getChannel];
};

const App = () => {
	const [searchResult, search, setSearchType] = useSearch(YT_KEY);

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
