import React, {useState, useEffect} from 'react';
import './Board.css';

function Board() {

	const [page, setPage] = useState(0);
	const [permalinks, setPermalinks] = useState({ links: [] });
	const [mediaUrls, setMediaUrls] = useState({ urls: [] });
	const [maxPage, setMaxPage] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			await fetch('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=IGQVJYaVlGeFNQN2hCMlpiUTVHUERVMUg3NjZA1dVM3bS10SjBDX1lJYmdjZADFDbllheEQ2clVzbVBfcGhxbms4V2xhVzRya0ltMzRMMEljVTFYY3JyOF9kUjd1OVY1QjJ3QWpjd0hvLXp6cllITERkbwZDZD');
			const result = await fetch('https://graph.instagram.com/me/media?fields=id,media_url,permalink&access_token=IGQVJYaVlGeFNQN2hCMlpiUTVHUERVMUg3NjZA1dVM3bS10SjBDX1lJYmdjZADFDbllheEQ2clVzbVBfcGhxbms4V2xhVzRya0ltMzRMMEljVTFYY3JyOF9kUjd1OVY1QjJ3QWpjd0hvLXp6cllITERkbwZDZD');
			const obj = await result.json(); 

			const media_url_list = obj.data.map(x => { return x.media_url });
			setMediaUrls(media_url_list);

			const permalinkList = obj.data.map(x => { return x.permalink });
			setPermalinks(permalinkList);

			setMaxPage(Math.floor(permalinkList.length/4));
		};
		fetchData();
	}, []);

	function next() {
		console.log('next button pressed');
		setPage(page + 1);
	};

	function prev() {
		console.log('prev button pressed');
		setPage(page - 1);
	};

	function enlarge() {
		
	}

	return (
		<div className="container">
			<div className="pics">
				<div className="pic">
					<a href={permalinks[page*4]}>
						<img src={mediaUrls[page*4]} alt="" />
					</a>
				</div>
				<div className="pic">
					<a href={permalinks[page*4+1]}>
						<img src={mediaUrls[page*4+1]} alt="" />
					</a>
				</div>
				<div className="pic">
					<a href={permalinks[page*4+2]}>
						<img src={mediaUrls[page*4+2]} alt="" />
					</a>
				</div>
				<div className="pic">
					<a href={permalinks[page*4+3]}>
						<img src={mediaUrls[page*4+3]} alt="" />
					</a>
				</div>
			</div>
			<div className="buttons">
				<button type="button" className="prevButton" id="prevButton" disabled={page===0}
					onClick={() => prev()}>
					newer
				</button>
				<button type="button" className="nextButton" id="nextButton" disabled={page>=maxPage}
					onClick={() => next()}>
					older
				</button>
			</div>
		</div>
	)
}

export default Board;