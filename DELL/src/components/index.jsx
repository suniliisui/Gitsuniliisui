
// Render the top-level React component
import  React  from  'react';
import  ReactDOM  from  'react-dom';
import  Services  from  './common/services/services.jsx';
import cmsStaticData from '../assets/statics/cmsStaticData.json';

var  loadApp  =  ()  =>  {
  const  queryData  =  {
    "Keys":  [""],
    "LocaleInfo":  {
      "Region":  "us",
      "Country":  "us",
      "Language":  "en"
    }
  };
  Services.postCmsData(queryData)
    .then((response)  =>  {
      sessionStorage.removeItem('cmsData');
      sessionStorage.setItem('cmsData',  JSON.stringify(response.data));
      require('./routes.jsx');
    }).catch((error)  =>  {
      sessionStorage.setItem('cmsData', JSON.stringify(cmsStaticData));
      require('./routes.jsx');
    });
}

loadApp();
