import React, {useState, useEffect} from 'react';
import './Board.css';

function Board() {

	const [page, setPage] = useState(0);
	const [permalinks, setPermalinks] = useState({ links: [] });
	const [mediaUrls, setMediaUrls] = useState({ urls: [] });
	const [x, setX] = useState();
	const [initX, setInitX] = useState();
	const [currentImage, setCurrentImage] = useState();
	const [modalOpen, setModalOpen] = useState(false);


	// get arrays of the urls needed to post instagram pics and hyperlinks 
	useEffect(() => {
		const fetchData = async () => {
			await fetch('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=IGQVJYaVlGeFNQN2hCMlpiUTVHUERVMUg3NjZA1dVM3bS10SjBDX1lJYmdjZADFDbllheEQ2clVzbVBfcGhxbms4V2xhVzRya0ltMzRMMEljVTFYY3JyOF9kUjd1OVY1QjJ3QWpjd0hvLXp6cllITERkbwZDZD');
			const result = await fetch('https://graph.instagram.com/me/media?fields=id,media_url,permalink&access_token=IGQVJYaVlGeFNQN2hCMlpiUTVHUERVMUg3NjZA1dVM3bS10SjBDX1lJYmdjZADFDbllheEQ2clVzbVBfcGhxbms4V2xhVzRya0ltMzRMMEljVTFYY3JyOF9kUjd1OVY1QjJ3QWpjd0hvLXp6cllITERkbwZDZD');
			const obj = await result.json(); 

			const media_url_list = obj.data.map(x => { return x.media_url });
			setMediaUrls(media_url_list);

			const permalinkList = obj.data.map(x => { return x.permalink });
			setPermalinks(permalinkList);
		};
		fetchData();

	}, []);

	const maxPage = Math.floor(permalinks.length/4);

	// adds the dots for the gallery to indicate pages 
	useEffect(() => {
		for(let i=1; i<=maxPage; i++) {
			let dot = document.createElement("span");
			dot.setAttribute("id", `dot-${i}`);
			document.getElementById("dots").appendChild(dot);
		}
	}, [maxPage]);

	// updates if the modal is open or not 
	useEffect(() => {
		document.documentElement.style.overflow = modalOpen ? 'hidden' : 'auto';
		document.getElementById("modal-div").style.display = modalOpen ? "flex" : "none";
	}, [modalOpen]);



	// update dots when the current page changes 
	useEffect(() => {
		for (var i = maxPage; i >= 0; i--) {
			document.getElementById(`dot-${i}`).setAttribute("style", `background-color: ${page===i ? "#e6e6e6A0":"#e6e6e650"}`);
		}
	}, [maxPage, page]);

	// updates when the current image in the modal changes 
	useEffect(() => {
		document.getElementById("modal-image").src = mediaUrls[currentImage];
		document.getElementById("modal-url").href = permalinks[currentImage];
	}, [currentImage, mediaUrls, permalinks])

	function openModal(imageNumber) {
		console.log(imageNumber, 'image clicked');
		setCurrentImage(imageNumber);
		setModalOpen(true);
	};

	return (
		<div className="container">
			<h2 className="heading">Instagram</h2>
			<p>Here are some of the crafts that I have made and posted on my Instagram, you can follow me at <a href="https://www.instagram.com/kellycraftng/">@kellycraftng</a> if you want to stay updated! I like to dabble in a number of different crafts but specialize in papercutting and card-making. I'm open for commissions via DM on Instagram!</p>
			<div id="modal-div" className="modal">
					<span className="closeButton" onClick={() => setModalOpen(false)}>&times;</span>
					{ currentImage > 0 && 
						<span className="arrow left" id="prevModalButton" onClick={() => setCurrentImage(currentImage-1)}>&larr;</span> 
					}
					<a id="modal-url" href={permalinks[currentImage]}>
						<img className="modalImage" id="modal-image" alt=""></img>
					</a>
					{ currentImage < permalinks.length-1 &&
						<span className="arrow right" id="nextModalButton" onClick={() => setCurrentImage(currentImage+1)}>&rarr;</span>
					}
			</div>	
			<div className="gallery">
				{ page !== 0 && 
						<span className="arrow left" id="prevButton" onClick={() => setPage(page - 1)}>&larr;</span> 
				}
				<div className="pics">
					<img className="pic" src={mediaUrls[page*4]} alt="" onClick={() => openModal(page*4)}/>
					<img className="pic" src={mediaUrls[page*4+1]} alt="" onClick={() => openModal(page*4+1)}/>
					<img className="pic" src={mediaUrls[page*4+2]} alt="" onClick={() => openModal(page*4+2)}/>
					<img className="pic" src={mediaUrls[page*4+3]} alt="" onClick={() => openModal(page*4+3)}/>
					<div id="dots">
						<span id="dot-0"></span>
					</div>
				</div>
					
				{ page !== maxPage &&
					<span className="arrow right" id="nextButton" onClick={() => setPage(page + 1)}>&rarr;</span>
				}	
			</div>
			x: {x}
			initX: {initX}
		</div>
	)
}

export default Board;