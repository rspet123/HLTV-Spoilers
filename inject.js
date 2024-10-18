(function() {
    const hidingSpoilersDiv = document.createElement('div');
    hidingSpoilersDiv.id = 'hiding-spoilers';
    hidingSpoilersDiv.innerText = 'Loading...';
    hidingSpoilersDiv.style.position = 'fixed';
    hidingSpoilersDiv.style.top = '0';
    hidingSpoilersDiv.style.left = '0';
    hidingSpoilersDiv.style.width = '100%';
    hidingSpoilersDiv.style.height = '100%';
    hidingSpoilersDiv.style.backgroundColor = 'white';
    hidingSpoilersDiv.style.color = 'black';
    hidingSpoilersDiv.style.display = 'flex';
    hidingSpoilersDiv.style.justifyContent = 'center';
    hidingSpoilersDiv.style.alignItems = 'center';
    hidingSpoilersDiv.style.fontSize = '2em';
    hidingSpoilersDiv.style.zIndex = '9999';
    document.body.appendChild(hidingSpoilersDiv);
})();