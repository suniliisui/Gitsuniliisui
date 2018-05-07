import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

import { UIResourceService } from '~/se-ui-services/resources'
import { Notification } from '~/se-ui-services/notifications/notification'
import { NotificationsService } from '~/se-ui-services/notifications/notifications.service'

@Component({
  selector: 'se-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  private notifyType_SIP = 'SIP'

  @Input()
  notification: Notification

  @Input()
  color: string

  @Input()
  icon: string

  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    private uiResourceService: UIResourceService,
  ) {
  }

  handleClick($event) {
    // item has already been viewed, shortcut to navigate
    // Fix for DE257989 - Not updating the timestamp when a notification is viewed
    if (this.notification.viewed_timestamp || this.notification.viewed_timestamp == null) { 
      this.router.navigate(['support/notifications'])
      return
    }
    // call mark viewed only if it hasn't already been marked as viewed.
    this.notification.viewed_timestamp = +new Date()
    this.notificationsService.markViewed(this.notification)
      .then(() => {
        this.router.navigate(['support/notifications'])
      })
      .catch((err) => {
        this.notification.viewed_timestamp = null
        console.error(`Failed to mark notfication as viewed`, err)
      })
  }

  getIconColor(notification: Notification): string {
    if (notification.type === 'ADMIN') {
      if (notification.subtype === 'URGENTADMIN')
        return `red`
      return `blue-highlight`
    }
    return ''
  }

}
