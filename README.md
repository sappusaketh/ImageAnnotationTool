# ImageAnnotationTool
Image annotation tool is an application that lets the user load images from the user's local disk, view, resize and annotate them.

# Technologies used
<ul>
  <li> FrontEnd: React bootstrapped with <a href="https://facebook.github.io/create-react-app/" target="_blank">Create-React-App</a></li>
  <li> Backend: Node with Express</li>
  <li> DataBase: MongoDB</li>
</ul>

# Application Startup steps
To run this on your local machine
1. Download/Clone Repository
2. Unzip
3. Run `npm install` from unzipped root folder
4. `cd client` 
5. `npm install`
6. `cd ../`
7. `npm start`

Application will run on port 3000 and 5000

# Routes in application
<ul>
  <li>To add/edit Image <a href="http://localhost:3000/">http://localhost:3000/</a></li>
</ul>

# How to Connect to your own Database
To change the database url 
1. Go to models/db.js from root folder.
2. Modify url string to your DB connection URL.

# How to use
### *To upload and edit image*
1. Start the application go to <a href="http://localhost:3000/">http://localhost:3000/</a>.
2. Click on choose file button then select a file from local storage and click ok.
3. Selected Image will be displayed in the image display area.
4. By default image will have dimensions of 200px X 200px.
5. To resize image, input on the desired values in the provided input boxes labels with width and height.
6. To add annotation text add the desired data in Annotation text input field and view the changes made on the image.
7. To draw the Bounding boxes or region of interest on image by clicking on any point on the image and move the mouse on the image region and left click on the image again to select the rectangular area drawn.
8. After all the edits click on the Add new button to add image and save changes to the  Data base. 
### *Multiple Uploads*
1. Follow the above steps for as many images as required.
### *View uploaded images*
1. If there are any images in database the by going to <a href="http://localhost:3000/">http://localhost:3000/</a> will display the latest uploaded image in image display area with recent changes made. 
2. To go to Previous images click on previous button left to image.
3. To go to Next images click on Next button right to image.
4. If any of the Previous/ Next buttons are disabled indicates you have reached the last/ first image.
5. By cycling through the images you can edit the images as required and click the save changes button to save the changes to database.<br/>
***Note: All the images can be found in `uploads/` which will be in the root folder of the application***
### *View Selected region of interest or Bounding boxes*
1. The Bounding box data is formated as Json object and stored in data base. Go to images collection on your mongDB and view the Bounding box array to see the Bounding box regions.
2. Bounding box Array will have `posInPixel` and `posInPercent` objects which indicate the  values of `{x1,x2,y1,y2,height,width}` of the bounding box in pixels and percentages respectively.
