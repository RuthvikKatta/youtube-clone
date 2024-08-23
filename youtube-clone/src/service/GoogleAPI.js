const API_KEY = 'AIzaSyB4Q0m51wC1W2PoHK0vmlW5Es6zpqk8nDI'
const CLIENT_ID = '22029971743-4c39s4eou79d5c5i3lc49sem25f53ctd.apps.googleusercontent.com'

function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    return gapi.client.youtube.videos.list({
        "part": [
            "snippet,contentDetails,statistics"
        ],
        "chart": "mostPopular",
        "regionCode": "IN"
    }).then(response => {
        return response;
    },
    )
}

gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: CLIENT_ID });
});

export function getVideosData() {
    return new Promise((resolve, reject) => {
        loadClient()
            .then(() => execute())
            .then(response => {
                console.log(response);
                resolve(response); // Resolve the promise with the response
            })
            .catch(err => {
                console.log(err);
                reject(err); // Reject the promise with the error
            });
    });
}