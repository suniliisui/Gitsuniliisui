import axios from 'axios';
import urls from '../../common/constants/apiurls.jsx';
import swal from 'sweetalert2';
import cmsStaticData from '../../../assets/statics/cmsStaticData.json';

class SessionValidation{
  constructor(){    
    this.warningTime =  1000 * 60 * 30;
    this.signoutTime = 10000;
    this.isTimerStarted = false;
    /*
    this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];
    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    } 
    */
    this.setTimeout();
  }
  setTimeout = () => {
    this.warnTimeout = setTimeout(this.warn, this.warningTime);
    //this.logoutTimeout = setTimeout(this.logout, this.signoutTime);    
  };
  resetTimeout = () => {
    if(!this.isTimerStarted){
      this.clearTimeoutFunc();
      this.setTimeout();
    }
  };
  showWarnModal = (timer) => {
    let logT;
    swal({
      title: '<span class="swal-title">Session Timeout Warning</span>',
      html: '<hr><p>For security reasons, your Premier session will timeout at ' + window.sessionExp + 'due to inactivity and you will be logged out.</p><p>If you wish to continue working in Premier then please select Continue.</p><hr>',
      timer: !this.isTimerStarted ? timer * 1000 : undefined,
      allowOutsideClick: false,
      showConfirmButton: true,
      confirmButtonText: 'Continue',
      animation : false,
      width: 600,
      padding: 40
    }).then((result) => {
        this.isTimerStarted = false;
        if(result.value){
          clearInterval(logT);
          this.resetTimeout();
        }
        else if (result.dismiss === 'timer' || result.dismiss === 'cancel') {
          clearInterval(logT);
          location.href = 'http://premier.dell.com';
        }
    });
      /*
      this.isTimerStarted = true;
      let countDown = document.getElementById('swal2-content');
      function updateTicker() {
        timer--;
        countDown.textContent = 'Do you want to Continue ' + timer;
        if(!timer)
          clearInterval(logT);
      }
      if(timer) {
        logT = setInterval(updateTicker, 1000);
      }
      */
  }
  warn = () => {
    var timer = 30; // timer in seconds
    this.showWarnModal(timer);
  };
  logout = () => {
    this.destroy();
  };
  destroy = () => {
    //clear the session
    //browserHistory.push('/');
    window.location.href = "http://premier.dell.com";
  };
  clearTimeoutFunc = () => {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  };
}

class ErrorResponder{
  showErrorModal = (error) => {
    if(location.hostname.search("localhost") < 0 ) {
      swal({
        title: 'HTTP Error '+ error.response.status,
        text: error.response.statusText,
        type: 'error',      
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        animation: false
      });
    }
  }
}

class Services { 
    constructor() {
        this.api = axios.create({
            withCredentials: true,
            headers: { "b2b-username": window.sessionStorage.getItem("b2bUserName") }
        });
        sessionStorage.setItem('cmsData', JSON.stringify(cmsStaticData));
        const queryData = {
          "Keys": [""],
          "LocaleInfo": {
            "Region": "us",
            "Country": "us",
            "Language": "en"
          }
        };
        this.postCmsData(queryData)
          .then((response) => {
            sessionStorage.removeItem('cmsData');
            sessionStorage.setItem('cmsData', JSON.stringify(response.data));
          }).catch((error) => {
            // error alert
          });
        this.sessionValidation = new SessionValidation();
        this.errorResponder = new ErrorResponder();
        let that = this;
        /*
        this.api.interceptors.response.use(function (response) {
            that.sessionValidation.resetTimeout();
            return response;
        }, function (error) {
            that.errorResponder.showErrorModal(error);
            return Promise.reject(error);
        });
        */
        window.sessionExp = "";
        this.getUserClaims()
          .then(function (response) {
              sessionStorage.setItem("userclaims",JSON.stringify(response.data));
              window.sessionExp = new Date(response.data.exp * 1000 );
          })
          .catch(function (error) {
              console.log(" getUserClaims failed:  " + error);
          });
    }
    get(url) {
      console.info(url);
      return this.api.get(url).catch(e => console.log(e));
    }
    post(url, data) {
      console.info(url);
      return this.api.post(url, data).catch(e => console.log(e));
    }
    patch(url, data) {
      console.info(url);
      return this.api.patch(url, data).catch(e => console.log(e));
    }
    addSpaces = (str) => str.replace(/([a-z])([A-Z])/g, '$1 $2'); 

    /* api calls */    
    getIntegrationReqs() {
        return this.get(urls.IntegrationApi + urls.IntegrationRequest);
    }
    getIntegrationReqsAdmin(){
        return this.get(urls.IntegrationApiAdmin + urls.IntegrationRequestAdmin);
    }
    postCmsData(faqdata) {
        // NEED TO FIND RIGHT Approach, interim fix. //
        let cmsAxios = axios.create({
        });
        // END //        
        return cmsAxios.post(urls.IntegrationApi + urls.CMS_URL, faqdata);        
    }
    postIntegrationReq(formData) {
      return this.post(urls.IntegrationApi + urls.IntegrationRequest, formData);
    }
    patchIntegrationReq(id, formData) {
      return this.patch(urls.IntegrationApi + urls.IntegrationRequest + "?id=" + id, formData);
    }
    patchIntegrationReqAdmin(id, formData) {
      return this.patch(urls.IntegrationApiAdmin + urls.IntegrationRequestAdmin + "/" + id, formData);
    }
    postIntegrationReqAdmin(formData) {
        return this.post(urls.IntegrationApiAdmin + urls.IntegrationRequestAdmin, formData);
    }
    postPartialUpdate(data){
        return this.post(urls.IntegrationApiAdmin + urls.IntegrationRequestAdmin, data);
    }
    getGiaList() {
        return this.get(urls.IntegrationApiAdmin + urls.GiaList);
    }
  //To send notification and update assistance required flag
    sendContactUsEmail(emailRequest)
    {
        return this.post(urls.IntegrationApiAdmin + urls.NotifyAssistance, emailRequest);    
    }
    getUserClaims(){
        return this.get( urls.userClaimsApi + urls.userClaims);
    }
}

export default new Services;
