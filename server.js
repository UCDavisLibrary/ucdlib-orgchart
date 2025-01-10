const express = require('express');
const path = require('path');
const dotenv = require('dotenv');  // Import dotenv to load environment variables
const sftp = require('./src/lib/sftp'); // Import your custom SFTP class

dotenv.config(); // Load environment variables
const useSftp = process.env.ORGCHART_USE_SFTP === "true" ? true : false;

const app = express();
const PORT = process.env.ORGCHART_PORT || 4000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

let sftpConfig = {
    host: process.env.ORGCHART_SFTP_SERVER,
    port: 22,
    username: process.env.ORGCHART_SFTP_USERNAME,
    password: process.env.ORGCHART_SFTP_PASSWORD, // Use token as a password if the SFTP server supports Keycloak
};

const distName = "org_bundle";

// Function to run SFTP tasks
async function runSftpTasks() {
    //  Run sftp class with environment variables

    if(useSftp) {
        console.log("SFTP is enabled. Performing SFTP operations...");

        const sftpClient = new sftp(sftpConfig);

        try {
            // send a org_bundle.js file to SFTP
            let distStatus = await sftpClient.sendDistToSftp(distName);

            if(distStatus && distStatus.error) console.error("Error uploading dist file to sftp.")

            console.log("File uploaded successfully!");
    
        } catch (error) {
            console.log("Error Uploading the org_bundle. Please Try Again.");
            console.error(error);
        }
    } else {
        console.log("SFTP is disabled. Skipping SFTP operations.");
    }
}

// Run SFTP tasks before starting the server
runSftpTasks().then(() => {
    // Start the server after completing the SFTP tasks
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch(error => {
    console.log("Error in SFTP initialization:", error);
});
