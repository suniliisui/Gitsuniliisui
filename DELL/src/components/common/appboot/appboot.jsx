import services from '../services/services.jsx';
import swal from 'sweetalert2';

class SessionValidation{
  
  constructor(){
    console.log("in sessionValidation");  
    this.warningTime =  1000 * 60 * 30;
    this.signoutTime = 10000;
    this.isTimerStarted = false;
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
            title: 'Session Timing Out',
            text: 'Do you want to Continue ' + timer,
            type: 'warning',
            timer: !this.isTimerStarted ? timer * 1000 : undefined,
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Continue',
            showCancelButton: true
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
      this.isTimerStarted = true;
      function updateTicker() {
        timer--;
        document.getElementById('swal2-content').textContent = 'Do you want to Continue ' + timer;
        if(!timer)
          clearInterval(logT);
      }
      if(timer) {
        logT = setInterval(updateTicker, 1000);
      }
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
function initSessionValidation(){
    const t  = new SessionValidation();
}
const AppBoot = {
  initSessionValidation
}
export default AppBoot;
