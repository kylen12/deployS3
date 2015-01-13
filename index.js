var express = require('express');
var http = require('http');
var path = require('path');
var AWS = require('aws-sdk');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
// These 2 are probably the same commands but keeping it until I know for sure
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// Set the 'port' to 3000 here in case I ever need to change it
// I can do it from this line of code
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));




// Change string into the name of the bucket you created
var bucketName = "yourbucketname";




app.get('/', function(req, res){
    // This will be the default name of the image
    var imageName = "default_name";

    // I created an array in case I need more buckets in the future
    // Each element has the url of the images in the bucket
    var images =
    [
        "https://"+bucketName+".s3.amazonaws.com/"+imageName
    ]

    // Renders the homepage with the image from the bucket
    res.render('index', { images : images });
});

// Not entirely sure what this does but I know you need it
app.get('/sign_s3', function(req, res){
    var s3 = new AWS.S3();

    var s3_params = {
        Bucket: bucketName,
        Key: req.query.s3_object_name,
        Expires: 60,
        ContentType: req.query.s3_object_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+bucketName+'.s3.amazonaws.com/'+req.query.s3_object_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});


// This section will create a bucket and list your S3 buckets in the console
// var s3 = new AWS.S3();
// // Create a bucket using bound parameters and put something in it.
// // Make sure to change the bucket name from "myBucket" to something unique.
// var s3bucket = new AWS.S3({params: {Bucket: 'myBucket123alsdfjadlfkjdsadsa'}});
// s3bucket.createBucket(function() {
//   var params = {Key: 'myKey', Body: 'Hello!'};
//   s3bucket.upload(params, function(err, data) {
//     if (err) {
//       console.log("Error uploading data: ", err);
//     } else {
//       console.log("Successfully uploaded data to myBucket/myKey");
//     }
//   });
// });

// s3.listBuckets(function(err, data) {
//   for (var index in data.Buckets) {
//     var bucket = data.Buckets[index];
//     console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
//   }
// });

