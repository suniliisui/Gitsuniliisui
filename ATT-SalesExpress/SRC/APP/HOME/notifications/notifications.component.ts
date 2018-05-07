import { Component, Inject, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Rx'

import { UIResourceService } from '~/se-ui-services/resources'
import { NotificationsService } from '~/se-ui-services/notifications/notifications.service'
import { Notification } from '~/se-ui-services/notifications/notification'

@Component({
  selector: 'se-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = []

  constructor(
    private notificationsService: NotificationsService,
    private uiResourceService: UIResourceService,
  ) {
  }

  ngOnInit() {
    Observable
      .timer(0 /* fire immediately */, 900000 /* every 15 minutes */)
      .subscribe(this.update.bind(this))
  }

  /**
   * Update notifications
   */
  update(): void {
    console.log('Fetching notifications from service')
    this.notificationsService.fetch()
      .then(this.updateNotifications)
      .catch(this.notifyError)
  }

  updateNotifications = (notifications) => {
    const order = this.uiResourceService.strings.notifications_order
    this.notifications = notifications

    // add a COMP notification if there isn't one so we can display
    // the "View All notifications" button
    // Stacey Hart: for “Comp Reports” there will always be only be one here
    if (this.notifications.filter(notification => notification.type === 'COMP').length < 1)
      this.notifications.push(<Notification>{
        type: 'COMP',
        title: 'A new Comp Report is available',
      })

    // iterate and add 'all viewed' item only if type is not present
    const types = notifications.map(notification => notification.type)
    order.forEach((type, index) => {
      if (types.indexOf(type) < 0)
        notifications.splice(index, 0, <Notification>{
          type, all_viewed: true,
          title: `You have viewed all of your ${this.uiResourceService.strings.notfications_all_viewed[type]} Notifications!`
        })
    })

    // order notifications
    this.notifications.sort((left, right) => {
      if (order.indexOf(left.type) < order.indexOf(right.type))
        return -1
      if (order.indexOf(left.type) > order.indexOf(right.type))
        return 1
      return 0
    })

    console.log(`Updated notifications`, notifications)
  }

  notifyError = (err) => {
    // TODO -> Show toast err
    console.error('Fetching notifications failed ' + err)
  }

  isViewed(notification: Notification): boolean {
    return notification.viewed_timestamp && notification.viewed_timestamp > 0
  }

  getIconImage(notification: Notification): string {
    const key = notification.subtype
      ? `${notification.type}_${notification.subtype}`
      : notification.type
    if (!this.uiResourceService.icons.notfications[key]) {
      console.log(`Notification icon key not found: ${key}`)
      return
    }
    // Fix for DE257989 const status = notification.all_viewed || !this.isViewed(notification) ? 'active' : 'inactive'
    const status = 'active'
    if (!this.uiResourceService.icons.notfications[key][status]) {
      console.log(`Notification icon status not found: ${status}`)
      return
    }
    return this.uiResourceService.icons.notfications[key][status]
  }

  getIconColor(notification: Notification): string {
    // Notification has been viewed, mark color as gray
    if (notification.viewed_timestamp)
      return `gray`
    if (notification.type === 'OPPTY')
      return `blue-highlight`
    if (notification.type === 'ORDER')
      return `green`
    if (notification.type === 'LEAD' || notification.type === 'COMP')
      return `black`
    if (notification.type === 'ADMIN') {
      if (notification.subtype === 'URGENTADMIN')
        return `red`
      return `blue-highlight`
    }
    return `orange`
  }

}
