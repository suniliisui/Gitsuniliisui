import React, { Component } from 'react';
import Services from '../../common/services/services.jsx';
import FormData from '../../common/constants/faqrequestData';
import cmsStaticData from '../../../assets/statics/cmsStaticData.json';

const FetchCmsContent = () => {
    Services.postCmsData(FormData)
        .then((response) => {
            sessionStorage.removeItem('cmsData');
            sessionStorage.setItem('cmsData', JSON.stringify(response.data));
        }).catch((error) => {
            sessionStorage.setItem('cmsData', JSON.stringify(cmsStaticData));
        });
}

const getDataFromCms = (key) => {
    let keyVal = '';
    const staticContent = JSON.parse(sessionStorage.getItem('cmsData'));
    if(window.sessionStorage && sessionStorage.getItem('cmsData')){
        keyVal = staticContent[key];
    } else {
        FetchCmsContent();
        keyVal = staticContent[key];
    }
    return keyVal;
}

const  getCMSValuesforKeys  =  (keysArr)  =>  {
    let  displayKeyData  =  {};
    keysArr.forEach(function  (key) {
        displayKeyData[key]  =  getDataFromCms(key);
    });
    return  displayKeyData;
}

export { FetchCmsContent, getDataFromCms, getCMSValuesforKeys };
