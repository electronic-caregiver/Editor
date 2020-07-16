import React from "react";
import { Classes, Dialog, Button, AnchorButton, Intent } from "@blueprintjs/core";
// import Modal from 'react-modal';

export interface IPublishDialogProps {
  handleInvisible: Function;
  handleVisible: Function;
  isOpen: boolean;
}

export interface IPublishDialogState {
  isOpen: boolean,
}

export class PublishDialog extends React.Component<
  IPublishDialogProps,
  IPublishDialogState
  > {
  public state: IPublishDialogState = {
    isOpen: this.props.isOpen
  };

  public componentDidUpdate(prevProps): any {
    console.log("updating");
    console.log("prevProps: ", prevProps);
    console.log("props: ", this.props);
  }

  public componentWillUnmount(): any {
    console.log("unmounting...");
    console.log(this.state);
  }

  public render(): React.ReactNode {
    console.log("rendering PublishDialog");
    console.log("Classes.DIALOG_BODY: ", Classes.DIALOG_BODY);

    return (<Dialog
      isOpen={this.state.isOpen}
      // onClose={() => {
      //   this.props.handleInvisible();
      // }}
      autoFocus={true}
      usePortal={true}
      canOutsideClickClose={false}
      enforceFocus={true}
      transitionDuration={1000}
    >
      <div className={Classes.DIALOG_BODY} key={"hello-world"}>{"Hello world!"}</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => this.props.handleInvisible()}>Close</Button>
          <AnchorButton
            intent={Intent.PRIMARY}
            href="https://www.palantir.com/palantir-foundry/"
            target="_blank"
          >
            Publish
          </AnchorButton>
        </div>
      </div>
    </Dialog>);
  }

  // private onClose(): Function {

  //   //finally, set the outer state to mark this dialog as invisible
  //   this.props.handleInvisible();
  // };
}
