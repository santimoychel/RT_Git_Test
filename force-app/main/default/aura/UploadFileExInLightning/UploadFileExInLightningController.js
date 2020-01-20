({
    handleUploadFinished: function (cmp, event) {
        var uploadedFiles = event.getParam("files");
        console.log('uploadedFiles'+uploadedFiles);
        alert("Files uploaded : " + uploadedFiles.length);
    }
})