import { Component, Input, OnInit } from '@angular/core'

import { Article } from '~/se-ui-interfaces/article'
import { HttpNewsService } from '~/se-ui-services/newsfeed/http.news.service'

@Component({
  selector: 'se-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
  public collapseOthers = true
  public expandedIndex: Boolean[] = []
  public actionLabel = 'Attention News'

  /* templte interplation fileds*/
  actionValues: string[] = []

  /* news articles for current source, all pages viewed so far */
  newsArticles: Article[] = []

  /* Raw data for mapping back to server*/
  private newsSources: any
  private currentNewsSource: string
  private pageIdx: number
  private pageSize: number
  private totalElements: number


  constructor(
    private newsService: HttpNewsService
  ) {
  }

  /**
   * Trigger get News Sources.
   */
  ngOnInit() {
    // TODO get this from user preferences
    this.currentNewsSource = 'ATTENTION_NEWS'
    this.pageIdx = 0
    this.pageSize = 20

    // console.log('Fetching News Sources from service')
    this.newsService.getSources()
      .then(this.updateNewsSources)
      .catch(this.notifyError)

    // Trigger fetch of current news source feed
    this.setNewsSource(this.currentNewsSource)
  }

  actionSourceChange($event): void {
    // on source change, making all collapse/expand index to false - no need to preserve value/state from the previous selection
    this.expandedIndex = [false];
    if ($event.value) {
      this.actionLabel = $event.value
      // map to news source key to send it back in REST call
      let newSource = this.getNewsSourceKey(this.actionLabel)
      // console.log(`Swittching to ${newSource}`)
      this.setNewsSource(newSource)
    }
  }

  triggerCollapse(_event, _index): void {
    // this is to be added in case business wanted the other expanded divs 
    //to collapse when the current is collapsed
    /*
    this.expandedIndex.forEach(function (b) {
      b = false
      //console.log('my b is ' + b)
    })
    */
    this.expandedIndex[_index] = !this.expandedIndex[_index];
  }

  /*---- News Source handling ---*/
  updateNewsSources = (newsSources) => {
    // console.log('News sources =', newsSources)
    this.newsSources = newsSources
    this.actionValues = Object.keys(newsSources).map(function (key, index) {
      return newsSources[key]
    })
    // console.log(`News Sources labels = ${this.actionValues}`)
  }

  private getNewsSourceKey(value: string): string {
    for (let key in this.newsSources) {
      if (this.newsSources[key] === value) {
        return key
      }
    }
    return null
  }

  /*------ News feed handling ---- */
  private setNewsSource(newSource: string) {
    this.currentNewsSource = newSource
    // when we swith news source rest paging pointers
    this.pageIdx = 0
    this.newsArticles = []
    this.newsService.getArticles(this.currentNewsSource, this.pageIdx, this.pageSize)
      .then(this.updateNewsFeed)
      .catch(this.notifyError)
  }

  updateNewsFeed = (newsFeedEnvelope) => {
    /* We build the growing array; don't page out.
       So contact to the existing list using ts spread operator*/

    this.newsArticles.push(...<Article[]>newsFeedEnvelope.content)
    this.expandedIndex.push(false)
    //console.log('News feed = ');
    //console.table(this.newsArticles);

    // save additional information from envelope; we need only totalElements
    this.totalElements = newsFeedEnvelope.totalElements
  }

  /*------- General error handling ----*/
  notifyError = (err) => {
    console.error('Service call failed ' + err)
  }

  goToReadArticleUrl(url:string){    
    window.open(url,'_blank')
  }

}
