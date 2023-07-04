import React, { useState } from 'react';
import axios from 'axios';

function FileUploader() {
    const [file, setFile] = useState(null);
    const [exclusionNumber, setExclusionNumber] = useState(0);
    const [uploadedData, setUploadedData] = useState('');
    const [convertedData, setConvertedData] = useState('');
    const [error, setError] = useState('');
    const [sortedData, setSortedData] = useState('');
    const [dataToShow, setDataToShow] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleExclusionNumberChange = (event) => {
        setExclusionNumber(parseInt(event.target.value));
    };


    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        

        try {
            const response = await axios.post("http://localhost:8080/api/convert", formData);

            console.log('response', response.data)
            if (response.data.error) {
                setError(response.data.error);
                setUploadedData('');
                setConvertedData('');
            } else {
                setError('');
                setUploadedData(response.data);
                setConvertedData('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleOriginalData = () => {
        setDataToShow(uploadedData.originalData);
    };

    const handleUppercase = () => {
        setDataToShow(uploadedData.uppercaseData);
    };

    const handleLowercase = () => {
        setDataToShow(uploadedData.lowercaseData);
    };

    const handleCamelcase = () => {
        setDataToShow(uploadedData.camelCaseData);
    };

    const handleSort = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('exclusionNumber', exclusionNumber);

            axios
                .post("http://localhost:8080/api/sort?exclusionNumber",formData)
                .then((response) => {
                    console.log("+++++++================",response)
                    // setConvertedData(response.data);
                    setDataToShow(response.data)
                })
                .catch((error) => {
                    setError('Failed to sort words');
                    console.error(error);
                });
        }
    };



    function convertToCamelCase(data) {
        var result = '';

        // Split the data into words
        var words = data.split(' ');

        for (var i = 0; i < words.length; i++) {
            var word = words[i];

            // Capitalize the first letter of each word
            if (i !== 0) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
            }

            // Append the word to the result
            result += word;
        }

        return result;
    }


    return (
        <div>
            <div class="container">
                <div class="card">
                    <h3>Upload Files</h3>
                    <div class="drop_box">
                        <header>
                            <h4>Select File here</h4>
                        </header>
                        <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
                        <input type="file" className="file" onChange={handleFileChange} />
                        <button class="upload-button" onClick={handleUpload}>Upload</button>
                        <label className="exclusion">Exclusion Number:</label>
                        <div class="container__item">
                            <form class="form">
                                <input type="number" value={exclusionNumber} onChange={handleExclusionNumberChange} />
                                <button type="button" class="btn btn--primary btn--inside uppercase" onClick={handleSort}>Sort Words</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-first-parent">
                <div class="card-first">
                    <div>
                        <h2>Show File Data Here:</h2>
                        <div class="drop_box_show">
                            <p>{uploadedData.originalData}</p>
                        </div>
                    </div>
                </div>
            </div>




            <div>
                {/* <button class="original-button" onClick={handleOriginalData}>Original</button> */}
                <button class="uppercase-button" onClick={handleUppercase}>Uppercase</button>
                <button class="lowercase-button" onClick={handleLowercase}>Lowercase</button>
                <button class="camelcase-button" onClick={handleCamelcase}>Camel Case</button>
                {/* <button onClick={handleSort}>Sort Words</button> */}
            </div>

            {uploadedData.originalData && (
                <div className="card-second-parent">
                    <div class="card-second">
                        <div>
                            <h2>Output Data:</h2>
                            <div class="drop_box_show">
                                <p>{dataToShow}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {error && <p>{error}</p>}
  

    
        </div>
    );
}

export default FileUploader;