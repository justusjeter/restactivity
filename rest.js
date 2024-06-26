// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // get the results div where we will display the output
    const results = document.getElementById('results');

    // clear the results div
    const clearResults = () => {
        results.innerHTML = '';
    };

    // render JSON data in the results div
    const renderResults = (data) => {
        results.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    };

    // function to fetch data from the API
    const fetchData = async (url, options = {}) => {
        clearResults();
        try {
            // fetch request with the given URL and options
            const response = await fetch(url, options);
            // check if the response is not ok (status code not in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // parse the response as JSON
            const data = await response.json();
            renderResults(data);
        } catch (error) {
            // error message in case of failure
            renderResults({ error: error.message });
        }
    };

    // Add event listener for the "Get All Posts" button
    document.getElementById('getAllPosts').addEventListener('click', () => {
        fetchData('http://jsonplaceholder.typicode.com/posts');
    });

    // Add event listener for the "Get Post with ID 10" button
    document.getElementById('getPost10').addEventListener('click', () => {
        fetchData('http://jsonplaceholder.typicode.com/posts/10');
    });

    // Add event listener for the "Create New Post" button
    document.getElementById('createPost').addEventListener('click', () => {
        // Define the new post data
        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };

        // Fetch data to create a new post
        fetchData('http://jsonplaceholder.typicode.com/posts', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // set the content type to JSON
            },
            body: JSON.stringify(newPost) // convert the new post data to JSON string
        }).then(data => {
            if (data && data.id) {
                renderResults({ id: data.id });
            }
        });
    });

    // Add event listener for the "Replace Post with ID 12" button
    document.getElementById('replacePost12').addEventListener('click', () => {
        // define the updated post data
        const updatedPost = {
            id: 12,
            title: 'foo',
            body: 'bar',
            userId: 1
        };

        // Fetch data to replace the post with ID 12
        fetchData('http://jsonplaceholder.typicode.com/posts/12', {
            method: 'PUT', // HTTP method
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(updatedPost) 
        });
    });

    // Add event listener for the "Update Title of Post with ID 12" button
    document.getElementById('updatePost12').addEventListener('click', () => {
        const updatedTitle = {
            title: 'updated title'
        };

        // Fetch data to update the title of the post with ID 12
        fetchData('http://jsonplaceholder.typicode.com/posts/12', {
            method: 'PATCH', // HTTP method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTitle) // convert the updated title data to JSON string
        });
    });

    // Add event listener for the "Delete Post with ID 12" button
    document.getElementById('deletePost12').addEventListener('click', () => {
        clearResults();
        // fetch data to delete the post with ID 12
        fetch('http://jsonplaceholder.typicode.com/posts/12', {
            method: 'DELETE' // HTTP method
        }).then(response => {
            // check if the response is ok
            if (response.ok) {
                renderResults({ message: 'Post with ID 12 successfully deleted' }); 
            } else {
                renderResults({ error: `Failed to delete post with ID 12. Status: ${response.status}` }); 
            }
        }).catch(error => {
            renderResults({ error: error.message });
        });
    });
});
