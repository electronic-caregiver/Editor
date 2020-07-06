import React from 'react';
import { Dialog, Button, } from '@blueprintjs/core';

export interface IPublishDialogProps {
  handleInvisible: Function,
};

export interface IPublishDialogState {

};

export class PublishDialog extends React.Component<IPublishDialogProps, IPublishDialogState> {

  public state: IPublishDialogState = {

  };

  public render(): React.ReactNode {
    return
    (<Dialog
      onClose={this.onClose()}
    >

    </Dialog>);
  }

  private onClose(): void {


    //finally, set the outer state to mark this dialog as invisible
    this.props.handleInvisible();
  };

};