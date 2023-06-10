let resultsDiv = document.getElementById('resultsDiv');
document.getElementById('searchForm').addEventListener('submit', function (event) {
    let expression = document.getElementById('s').value
    if (expression.trim().length === 0) {
        resultsDiv.innerHTML = '';
        let notFound = document.createElement('p');
        notFound.className = 'notFound';
        notFound.innerHTML = 'Empty Query!';
        resultsDiv.appendChild(notFound);

        notFound.style.display = 'none';
        notFound.style.opacity = '0';
        notFound.style.transition = 'opacity 0.5s ease-in-out';

        setTimeout(() => {
            notFound.style.display = '';
            notFound.style.opacity = '1';
        }, 100);
    } else {
        fetch('/evalexpression', {
                method: 'POST',
                body: JSON.stringify({
                    expression: expression
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("hello",data.message)
                if (typeof data.message === 'string') {
                    resultsDiv.innerHTML = '';
                    let notFound = document.createElement('p');
                    notFound.className = 'notFound';
                    notFound.innerHTML = 'No Results Were Found!';
                    resultsDiv.appendChild(notFound);

                    notFound.style.display = 'none';
                    notFound.style.opacity = '0';
                    notFound.style.transition = 'opacity 0.5s ease-in-out';

                    setTimeout(() => {
                        notFound.style.display = '';
                        notFound.style.opacity = '1';
                    }, 100);
                } else {
                    if (data.message.length) {
                        res = `<h2 id="documentheading">List of Similar News for ${expression}</h2>`
                        for (let doc of data.message){
                            res += `<div class="webResult">
                                        <h2>
                                            News: ${doc}
                                        </h2>
                                    </div>`
                        }
                        resultsDiv.innerHTML = res
                    } else {
                        resultsDiv.innerHTML = '';
                        let notFound = document.createElement('p');
                        notFound.className = 'notFound';
                        notFound.innerHTML = 'No Results Were Found!';
                        resultsDiv.appendChild(notFound);

                        notFound.style.display = 'none';
                        notFound.style.opacity = '0';
                        notFound.style.transition = 'opacity 0.5s ease-in-out';

                        setTimeout(() => {
                            notFound.style.display = '';
                            notFound.style.opacity = '1';
                        }, 100);
                    }
                }
            })
    }

    event.preventDefault();
});
