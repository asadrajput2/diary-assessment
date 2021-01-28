import axios from 'axios';

export default async function getPosts() {

    const response = await axios.post('http://quinncareapi-dev.us-east-2.elasticbeanstalk.com/graph',
        {
            "requestobjects": [
                {
                    "posts": {
                        "operationtype": "read",
                        "id": {
                            "return": true
                        },
                        "userid": {
                            "searchvalues": ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
                            "return": true
                        },
                        "iscalendarentry": {
                            "searchvalues": ["true"],
                            "return": true
                        },
                        "images": {
                            "return": true
                        },
                        "rating": {
                            "return": true
                        },
                        "text": {
                            "return": true
                        },
                        "privacy": {
                            "searchvalues": [
                                18
                            ],
                            "return": true
                        },
                        "typeofday": {
                            "return": true
                        },

                        // Don't change anything above ^^	
                        //editable variables start below //

                        "calendardatetime": { // Date Time of a particular post
                            "return": true, // please note: there can be multiple posts on a single day
                            "sort": "descending" // you can sort fetched dates by ascending/descending.
                        },
                        "maxitemcount": "50",   //you can ask between 1 to 50 posts (max) at a time.
                        "continuationtoken": null //replace with the continuation token from response to get the next set
                    }
                }
            ]
        })
}