import { Injectable } from '@angular/core';
import { Message, MessageType } from 'src/app/utilities/messages';
import Swal from 'sweetalert2';

export enum AlertIconsType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Question = 'question'
}

export enum AlertConfirmationOption {
  Yes = 'yes',
  No = 'no',
  NoResponseYet = 'noresponseyet'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  async showConfirmationMessage(
    titleMessage: string,
    textMessage: string,
    iconMessage: AlertIconsType,
    confirmText: string
  ): Promise<Message>{
    Swal.fire({
      title: titleMessage,
      text: textMessage,
      icon: iconMessage,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText
    }).then((result) => {
      if (result.isConfirmed) {
        return {
          title: AlertConfirmationOption.Yes,
          type: MessageType.success
        }
      } else {

        return {
          title: AlertConfirmationOption.No,
          type: MessageType.success
        }
      }

    });

    return {
      title: AlertConfirmationOption.NoResponseYet,
      type: MessageType.error
    }
  }
}
