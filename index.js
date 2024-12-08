const sdk = require('node-appwrite');

// Initialize Appwrite Client
const client = new sdk.Client();
client.setEndpoint('https://cloud.appwrite.io/v1')  // Replace with your endpoint
      .setProject('6746180f00032d4506a5')  // Replace with your project ID
      .setKey('standard_f235e6dede393eb5f0e7b779884499e7aa5d94001601bf37bbefe641a0291233c58918d6bc23ff6f919209cc43bb6ee7b08824f2dfb5091837cb7ad48386fe39613033783253ddaf77a269481e1b5a06ae67e9c6df83ea4f7a0b9ef720fb237cc7a5622745aa218ac64173ae12d76be31ae438eb0f54cef13b432b37861d316b');  // Replace with your API key

const storage = new sdk.Storage(client);
const databases = new sdk.Databases(client);

module.exports = async function (req, res) {
    try {
        const fileId = '675608fb00238594487b';
        const file = await storage.getFile(fileId);  // Fetch the file

        // Parse the file content (assuming it's a JSON file)
        const fileContent = JSON.parse(file);  // Expecting an array of documents

        for (let i = 0; i < fileContent.length; i++) {
            const doc = fileContent[i];  // Each document in the array

            // Insert document into Appwrite database
            await databases.createDocument(
                '67477b73000f7229abf1',  // Replace with your database ID
                '67477b7d0005f3d464a4',  // Replace with your collection ID
                'unique()',  // Generate a unique ID
                doc  // Document content (JSON object)
            );
        }

        res.send('Documents inserted successfully');
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
};
