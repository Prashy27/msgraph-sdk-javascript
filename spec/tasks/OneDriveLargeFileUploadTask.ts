import { assert } from "chai";
import { OneDriveLargeFileUploadTask } from "../../lib/src/OneDriveLargeFileUploadTask";

declare const describe, it;

describe('constructCreateSessionUrl', () => {
    let spaceFileName = " test.png ";
    let fileName = "test.png";
    let specialFileName = "test file.png";
    let encodedFileName = "test%20file.png";

    it('Should trim the extra spaces in the filename', () => {
        assert.equal(`/me/drive/root:/${fileName}:/createUploadSession`, OneDriveLargeFileUploadTask.constructCreateSessionUrl(spaceFileName));
    });

    it('Should encode space in the filename', () => {
        assert.equal(`/me/drive/root:/${encodedFileName}:/createUploadSession`, OneDriveLargeFileUploadTask.constructCreateSessionUrl(specialFileName));
    });

    it('Should return url with default root value', () => {
        assert.equal(`/me/drive/root:/${fileName}:/createUploadSession`, OneDriveLargeFileUploadTask.constructCreateSessionUrl(fileName));
    });

    it('Should return url with default root value for an empty path string', () => {
        assert.equal(`/me/drive/root:/${fileName}:/createUploadSession`, OneDriveLargeFileUploadTask.constructCreateSessionUrl(fileName, ""));
    });

    it('Should add / in front of the path', () => {
        assert.equal(`/me/drive/root:/Documents/${fileName}:/createUploadSession`, OneDriveLargeFileUploadTask.constructCreateSessionUrl(fileName, "Documents/"));
    });

    it('Should add / in back of the path', () => {
        assert.equal(`/me/drive/root:/Documents/${fileName}:/createUploadSession`, OneDriveLargeFileUploadTask.constructCreateSessionUrl(fileName, "/Documents"));
    });

    it('Should trim the extra spaces in the path', () => {
        assert.equal(`/me/drive/root:/Documents/${fileName}:/createUploadSession`, OneDriveLargeFileUploadTask.constructCreateSessionUrl(fileName, " /Documents/ "));
    });
});