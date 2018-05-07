import { Component, Input, OnInit } from '@angular/core'
import { HttpTspaceFeedsService } from '~/se-ui-services/tspace/http.tspace.service'

@Component({
  selector: 'se-tspace-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class TspacePostComponent implements OnInit {

  public attach: string = ""
  private fileName: string

  constructor(private tspaceFeedService: HttpTspaceFeedsService) {

  }

  ngOnInit() {

  }
  /**
   * Post the post
   * @data - post
   */
  createPost(data) {
    this.tspaceFeedService.postFeed(data.myPost, this.attach)
      .subscribe(
      err => this.notifyError,
      () => { console.log('Posted successfully') }
      )
  }

  /**
   * Attach file function - will be usign once the user select a file to attach - will work on onchnage and assign the object
   */
  attachFile(file) {
    this.attach = ""
    this.fileName = file.files[0].name  // this field is using in UI to display the selected file name
    this.attach = file.files[0] // this field will be using for post
    //  enable the below code and assign the attached files to this.attach if more than one file upload option exists
    /*let fileExisted = false;
    if (file.files[0] && this.filesData.length == 0) {
      this.filesData.push(file.files[0])
      fileExisted = true;
    } else {
      for (let i = 0; i < this.filesData.length; i++) {
        // console.log('file name', this.filesData[i].name);
        if (file.files[0] && this.filesData[i].name == file.files[0].name) {
          fileExisted = true;
          // alert("Could not upload the photo. Do you already have a file with this name?");
           this.seAlertMsg = true
           this.errorMsg = "Could not upload the photo. Do you already have a file with this name?"
        } 
      }
    }
    if (file.files[0] && fileExisted == false) {
      this.seAlertMsg = false
      this.filesData.push(file.files[0])
    }
    file.value = null; */
  }

  /*------- General error handling ----*/
  notifyError = (err) => {
    console.error('tSpace Post - Service call failed ' + err)
  }

}