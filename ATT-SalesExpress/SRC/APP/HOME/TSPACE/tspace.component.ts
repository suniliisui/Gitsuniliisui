import { Component, Input, OnInit } from '@angular/core'

import { HttpTspaceFeedsService } from '~/se-ui-services/tspace'
import { TSpaceFeed } from '~/se-ui-interfaces/tspace'

@Component({
  selector: 'se-tspace',
  templateUrl: './tspace.component.html',
  styleUrls: ['./tspace.component.scss']
})
export class TspaceComponent implements OnInit {

  public feedTypes: string
  public defaultFeedType: string

  private pageIdx: number
  private pageSize: number
  private feedType: string
  private searchKey: string
  private postContent: string
  private comment: { comment: string }
  private likeActionValue: { like: boolean }
  private strResult: string

  feedList: TSpaceFeed[] = []
  fetched :boolean = false;

  constructor(
    private tspaceFeedService: HttpTspaceFeedsService
  ) {
  }

  ngOnInit() {

    // Need to define later - temporary
    this.defaultFeedType = 'newsFeed'
    this.pageIdx = 0
    this.pageSize = 20

    /*this.tspaceFeedService.getFeedType()
      .then( this.getFeedTypes )
      .catch(this.notifyError)*/

    // post content test - without attachment
    //this.createPost()

    // call feedItemList - Temporary
    this.feedItemList(this.defaultFeedType)

    //call to feedItemsSearch - Temporary
    //this.feedItemsSearch(this.defaultFeedType, 'test')    

    // call to postComment
    //this.postComment('AbhilashtestingComment', '280fa817-acc5-46aa-b472-5fc8a9b2f701')

    // call to like function
    //this.likeAction(true, '280fa817-acc5-46aa-b472-5fc8a9b2f701')

  }

  /**
   * To get all the feed type
   * Right now we are using only newsfeed, hence this function is not used - In future we can use it for getting the feed tyoe
  */
  getFeedTypes = (feedType) => {
    this.feedTypes = feedType
    //console.log('feedtype==>', this.feedTypes)
  }

  /**
   * Ge the feed item list
   * @param feedType: string - feed type 
   */
  feedItemList(fType) {
    this.feedList = []
    this.feedType = fType
    this.tspaceFeedService.getFeedList(this.feedType, this.pageIdx, this.pageSize)
      .then(this.refineFeeds)
      .catch(this.notifyError)
      .then(() => { this.fetched = true  } )
  }

  /**
   * Refining/process the feeditemlist
   * Currently using same function for feedlist and search - can change in future based on the requirement
   */
  refineFeeds = (response) => {
    response.content.forEach(element => {
      if(element.text) {
        this.strResult = element.text.replace(/\S*urn\S* /gi, "(<span class='highlightLink'>")
        element.text = this.strResult.replace(/[)]/gi, "</span>)")
      }
      element.date = new Date(element.date)
      return element
    })
    this.feedList.push(...<TSpaceFeed[]>response.content)  // push all the feeds here
    //console.log("Feed Item List ==>")
    //console.table(this.feedList)
  }


  /**
   * Get the feed items list based on the search key
   * @param feedType: string - feed type
   * @param searchKey: string - searck key
   */
  /*  This functionality is not going to implement now - UI is not avialble as per the spec -can be use in future
   feedItemsSearch(fType, searchKey) {
     this.feedType = fType
     this.searchKey = searchKey   
     if( this.feedType && this.searchKey ) {
       this.tspaceFeedService.getFeedListOnSearch(this.feedType, this.searchKey, this.pageIdx, this.pageSize)
         .then( this.refineFeeds )
         .catch(this.notifyError)  
     } else {
       this.notifyError('No search key or feed type')
     }
   }*/

  /**
   * Create Post
   * @param postContent: string - The content 
   * @param attachment: string
   */
  /* Moved this functionality to tspace-post
   createPost(content: string, attachment: string) {
     // get the post content from form data - front end
     if(attachment)
       attachment = `@`+attachment+`;type=text/plain`  
     this.tspaceFeedService.postFeed(content, attachment )
       .subscribe(
         err => this.notifyError,
         ()  => { console.log('Posted successfully') }
       )
   } */

  /**
   * Post comment on a post
   * @param postId - string
   * @param comment
   */
  postComment(comment: string, postId: string) {
    this.comment = { "comment": comment }
    this.tspaceFeedService.postCommentOrLike(JSON.stringify(this.comment), postId)
      .then()
      .catch(this.notifyError)
  }

  /**
  * Like/dislike on a post/comment - true -> like, false -> dislike
  * @param feedId - string - post id/comment id
  * @param like/dislike - boolean
  */
  likeAction(like: boolean, feedId) {
    this.likeActionValue = { "like": like }
    this.tspaceFeedService.postCommentOrLike(JSON.stringify(this.likeActionValue), feedId)
      .then()
      .catch(this.notifyError)
  }


  /*------- General error handling ----*/
  notifyError = (err) => {
    console.error('tSpace - Service call failed ' + err)
  }

}
