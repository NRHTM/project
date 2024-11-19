const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static HTML form at the root route
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Roblox Item Viewer</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        margin-top: 50px;
                    }
                    input {
                        padding: 10px;
                        width: 300px;
                        margin-bottom: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                    }
                    button {
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        cursor: pointer;
                        border-radius: 4px;
                        transition: background-color 0.3s;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                    a {
                        margin-top: 20px;
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 4px;
                    }
                    a:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h1>Roblox Item Viewer</h1>
                <form action="/get-item-image" method="get">
                    <input type="text" name="itemId" placeholder="Enter Item ID" required />
                    <br />
                    <button type="submit">Get Image</button>
                </form>
            </body>
        </html>
    `);
});

// Define a route to fetch and display the Roblox item image
app.get('/get-item-image', async (req, res) => {
    const itemId = req.query.itemId;

    if (!itemId) {
        return res.status(400).send('Item ID is required');
    }

    try {
        // Fetch Roblox item image using the Roblox API
        const response = await axios.get(`https://thumbnails.roblox.com/v1/assets?assetIds=${itemId}&size=420x420&format=Png&isCircular=false`);

        if (response.data && response.data.data[0]) {
            const imageUrl = response.data.data[0].imageUrl;
            res.send(`
                <html>
                    <head>
                        <title>Roblox Item Image</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                text-align: center;
                                margin-top: 50px;
                            }
                            img {
                                max-width: 100%;
                                height: auto;
                                border-radius: 8px;
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            }
                            a {
                                margin-top: 20px;
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #007bff;
                                color: white;
                                text-decoration: none;
                                border-radius: 4px;
                            }
                            a:hover {
                                background-color: #0056b3;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Roblox Item Image</h1>
                        <img src="${imageUrl}" alt="Roblox Item" />
                        <br />
                        <a href="/">Back</a>
                    </body>
                </html>
            `);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        console.error('Error fetching item image:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
