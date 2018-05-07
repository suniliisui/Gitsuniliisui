import { Component, Input, OnInit } from '@angular/core'
import { TspaceComponent } from '~/home/tspace/tspace.component'
import { HttpTspaceFeedsService } from '~/se-ui-services/tspace/http.tspace.service'
import { PersonService } from '~/se-ui-services/person/person.service'

@Component({
  selector: 'se-tspace-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class TspaceUpdatesComponent implements OnInit {
  private pageIdx: number
  private pageSize: number
  private feedType: string
  public personId: string
  private likeAction: boolean
  private likeActionValue: { "like": boolean }
  public isClassVisible: boolean[] = []
  public isPreviousComments: boolean[] = []
  private comment: { "comment": string }
  public previousCommentsList: Array<string> = []
  public originResp: Array<string> = []
  public myFeed: Array<any> = []
  private strResult: string

  constructor(private tspaceServ: HttpTspaceFeedsService, private personService: PersonService, ) {

  }

  ngOnInit() {
    this.feedType = 'newsFeed'  // should load from config

    this.tspaceServ.getFeedList(this.feedType, this.pageIdx, this.pageSize)
      .then(this.refine)
      .catch(this.notifyError)

    this.personService.fetch()
      .then(this.getPerson)
      .catch(this.notifyError)
  }

  /**
   * Gettign the person details from the person Object
   * Need personId to proceed
   */
  getPerson = (person) => {
    this.personId = person.userId
  }

  /**
   * Refining the search - Getting the feed list, looping the feedlist and compare the posterId equal to the 

personId
   * If yes, pushing the data to an array - will use this array in fornt end use the list - UPDATES TAB
   */
  refine = (response) => {
    this.myFeed = []
    if (response.content.length > 0) {
      response.content.forEach(element => {
        if (element.posterId === this.personId) {
          element.date = new Date(element.date)
          this.strResult = element.text.replace(/\S*urn\S* /gi, "(<span class='highlightLink'>")
          element.text = this.strResult.replace(/[)]/gi, "</span>)")
          this.myFeed.push(element)
        }

      })
    }
    //console.table(this.myFeed)
  }


  /**
  * Like/dislike on a post - true -> like, false -> dislike
  * @param feedId - string - post id
  * @param like/dislike - boolean
  */
  likeBtnAction(event, feedId) {
    this.likeAction = true
    this.likeActionValue = { "like": this.likeAction }
    this.tspaceServ.postCommentOrLike(JSON.stringify(this.likeActionValue), feedId)
      .then()
      .catch(this.notifyError)
  }

  /**
   * Like on comment
   * @param commentId
   * @param postId
   */
  likeOnComment(commentId: string, postId: string): void {
    this.likeAction = true
    this.likeActionValue = { "like": this.likeAction }
    this.tspaceServ.likeActionOnComment(JSON.stringify(this.likeActionValue), commentId, postId)
      .then()
      .catch(this.notifyError)
  }  

  /**
   * Toggle the comment box based on the index
   */
  commentToggle(_event, _index): void {
    this.isClassVisible[_index] = !this.isClassVisible[_index]
  }

  /**
   * Comment post function
   */
  postComment(data, postId) {
    this.comment = { "comment": data.commentText }
    this.tspaceServ.postCommentOrLike(JSON.stringify(this.comment), postId)
      .then()
      .catch(this.notifyError)
  }

  /**
   * Fetch the previous comments
   * @param postId
   */
  previousComments(postId) {
    this.tspaceServ.fetchAllComments(postId)
      .then(this.showPreviousComments)
      .catch(this.notifyError)
  }

  /**
   * Response will get all the comments of the postId
   * The output should contains only more comments - removing first and second array(It will be available by default)
   * reversing the array to sort correctly
   * @param response:Object
   */
  showPreviousComments = (reponse) => {
    this.originResp = reponse
    this.previousCommentsList = this.originResp.splice(0, 2)
    this.originResp.reverse()
  }

/**
 * cancel the comment box
 */
    handleClickerk(_event, _index): void {
    this.isClassVisible[_index] = !this.isClassVisible[_index];
  }

  /**
 * Toggle the previous comments for a particular post
 */
  previousCommentToggle(_event, _index): void {
    this.isPreviousComments[_index] = !this.isPreviousComments[_index];
  }


  /*------- General error handling ----*/
  notifyError = (err) => {
    console.error('tSpace Updates - Service call failed ' + err)
  }

}
