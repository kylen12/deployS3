#NodeJS Project Deploying Files to AWS S3

##Blurb
Uploading to S3 works! That's about as far as I am in this project. I'm not even sure this will work on your machine. If it doesn't, we'll figure it out in class. I haven't learned how to write README.md files yet so forgive the formatting. I know you are used to seeing fabulous READMEs. Anyhoo, I hope this helps!

Oh! And let me know your bugs so we can add it to a FAQ or something.

##Overview
This app will render a homepage. A user can select an image. The image is uploaded to S3. You will need to refresh to see your new image.

Note: Every time you upload an image, it will override the existing image in your S3 bucket. 
Code needs to be updated to support unique image names. Maybe a random character generator?

##Prerequisites
* You must have an AWS S3 account

When you have it, log into your console and select "S3" from the "Services" tab

##S3 Setup
# Bucket Creation
1. Create a bucket (you will use this name later)
2. Set your region to be "Northern California" (this is important! Region configuration matters)
3. Click into your newly created bucket
4. Click "Properties" button
5. Click "Edit CORS Configuration"
6. Copy and paste this in

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

7. Click "Save" in the CORS configuration modal
8. Click "Save" again in the main bucket settings section
9. Select "IAM" from "Services" in the top navigation bar

##Group Setup
1. Click on "Groups" in the sidebar
2. Click "Create New Group" 
3. Enter a group name (i.e. "admin" -- you will use this later)
4. Click "Next Step"
5. Click "Select" next to "Administrator Access"
6. Click "Next Step"
7. Click "Create Group"


##User Setup
1. Click on "Users" in the sidebar
2. Click "Create New Users"
3. Enter a username(s)
4. Leave "Generate an access key for each user" checked
5. Click "Create"
6. In the content, click "Show User Security Credentials"
7. (IMPORTANT) Save both the Access Key ID and Secret Access Key (there is a download button). As far as I know, you will not be able to recover the secret access key and will have to generate a new key.
8. Click "Close"
8. Click "Close" again if you did not download the credential files
10. Click on your newly create user's name in the table
11. Click "Add User to Group"
12. Click on the group name you just created
13. Click "Add to Groups"


##Adding your credentials
Note: the symbol $ in this tutorial means you have to type these commands in the terminal. 
Do not type $

1. Open your terminal
2. $ touch ~/.aws/credentials
3. $ open ~/.aws/credentials
4. Copy and paste this into the file 
```
[default]

aws_access_key_id = ASDFOIJASDLKFJAEWIFJAWOEIFJ

aws_secret_access_key = bnASDFN+atJtASDFYOwg2JftmASDFASDFAE4SeAt32ASDF
```

5. Replace the values with the access and secret key you stored earlier. If you run the app now, it won't work. The keys above are for demo.
6. Save and close this file

## git Setup
1. In your terminal, cd into your projects directory

```
$ git clone https://github.com/kylen12/deployS3.git
$ npm install
$ subl .
```

## Project Configuration
1. Open index.js
2. Change "var bucketName" value to the name of the bucket you created in S3
3. (optional) You can change the default image name as well by changing var imageName
4. Save 

## Moment of Truth
1. Go back in your terminal
2. nodemon
3. Open localhost:3000 in your browser


## Fin
If all goes well, it should work. But there is probably another step that I forgot to include. I tried so many samples, maybe something I did configured something else. I guess we're about to find out.


##Helpful Links
http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-intro.html
http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html
https://devcenter.heroku.com/articles/s3-upload-node
https://github.com/KDawg/S3DeployJS
http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html
http://docs.aws.amazon.com/general/latest/gr/rande.html (S3 section)
http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html

