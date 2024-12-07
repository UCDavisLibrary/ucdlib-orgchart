# Ucdlib-Orgchart

This is an orgchart that runs off of the [https://files.library.ucdavis.edu](https://files.library.ucdavis.edu) which is connected to the orgchart functionality in the [https://iam.staff.library.ucdavis.edu/](https://iam.staff.library.ucdavis.edu/). After uploading to the files server, you make changes to the org chart functionality and push up new bundled functionality from this project.

1.  Add an .env file to the root of this project:
    
    1.  **ORGCHART\_SFTP\_USERNAME** - files.library.ucdavis.edu username for org chart folder
        
    2.  **ORGCHART\_SFTP\_PASSWORD** - files.library.ucdavis.edu password for org chart folder
        
    3.  **ORGCHART\_SFTP\_SERVER** - files.library.ucdavis.edu server for org chart folder which should be bnl.library.ucdavis.edu
        
    4.  **ORGCHART\_USE\_SFTP -** tells whether or not to send the changes to the files.library.ucdavis.edu server
        
    5.  **PORT -** port to run to application
        

## Change Orgchart:
----------------

1.  `npm install` in the root directory
    
2.  Change the **ORGCHART\_USE\_SFTP** to **false** so they don't go to the files.library.ucdavis.edu server
    
3.  Run a `npm run watch` to reflect changes
    
4.  Make changes to the chart in the ./src/components folder which should reflect on localhost in whichever port you choose in .env
    

## Push to [https://files.library.ucdavis.edu](https://files.library.ucdavis.edu) server without bash:
--------------------------------------------------------------------------------------

1.  Run an `npm run dist` to bundle code
    
2.  Make sure **ORGCHART\_USE\_SFTP** is marked true
    
3.  Re-start the server with a `node server.js`

## Push to [https://files.library.ucdavis.edu](https://files.library.ucdavis.edu) server:
--------------------------------------------------------------------------------------
Run ./transfer_orgchart.sh which:

1.  Run an `npm run dist` to bundle code
    
2.  Make sure **ORGCHART\_USE\_SFTP** is marked true
    
3.  Re-start the server with a `node server.js`