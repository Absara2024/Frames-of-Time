const axios = require('axios');

const figmaToken = 'YOUR_FIGMA_PERSONAL_ACCESS_TOKEN';
const figmaFileId = 'YOUR_FIGMA_FILE_ID';

axios.get(`https://api.figma.com/v1/files/${figmaFileId}`, {
  headers: {
    'X-Figma-Token': figmaToken,
  }
})
.then(response => {
  console.log(response.data);  
})
.catch(error => {
  console.error('Error fetching Figma file:', error);
});
