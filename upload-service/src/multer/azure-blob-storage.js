const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

const ACCOUNT           = 'account1';
const ACCOUNT_KEY       = 'key1';
const BLOB_STORAGE_URL  = `http://${ACCOUNT}.localhost:52004`;
const CONTAINER_NAME    = 'photos';

const _sharedKeyCredential  = new StorageSharedKeyCredential(ACCOUNT, ACCOUNT_KEY);
const _client               = new BlobServiceClient(BLOB_STORAGE_URL, _sharedKeyCredential);
const _containerClient      = _client.getContainerClient(CONTAINER_NAME);

const _handleFile = (_, file, cb) => {
    const blobName   = `blob-${new Date().getTime()}`;
    const blobClient = _containerClient.getBlockBlobClient(blobName);

    blobClient
        .uploadStream(file.stream)
        .then(response => {
            console.log(`uploaded ${response.requestId}`)
            cb(null, { path: `http://127.0.0.1:52004/${ACCOUNT}/${CONTAINER_NAME}/${blobName}` });
        })
        .catch(err => cb(err))
}

const _removeFile = (err, file, cb) => {
    console.log("_remove");
}

module.exports = {
    _handleFile,
    _removeFile
}