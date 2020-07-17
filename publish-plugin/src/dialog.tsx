import React from "react";
import { Classes, Dialog, Button, RadioGroup, Radio, FormGroup, Label } from "@blueprintjs/core";
import { GLTF2Export } from "babylonjs-serializers";
import { SceneSerializer } from "babylonjs";
import { Editor } from "babylonjs-editor";

export interface IPublishDialogProps {
  handleInvisible: Function;
  handleVisible: Function;
  isOpen: boolean;
  getWorkspacePreferences: Function;
  editor: Editor;
}

export interface IPublishDialogState {
  isOpen: boolean;
  format: string;
  filepath: string;
  distroId: string;

}

const DEFAULT_FORMAT = '.glb';

export class PublishDialog extends React.Component<
  IPublishDialogProps,
  IPublishDialogState
  > {
    //TODO: reference the workspace preferences first
  public state: IPublishDialogState = {
    isOpen: this.props.isOpen,
    format: 'glb',
    filepath: 'scenes/my_scene/babylon' + DEFAULT_FORMAT,
    distroId: '',
  };

  public render(): React.ReactNode {
    const prefs = this.props.getWorkspacePreferences();
    console.log("workspacePreferences: ", prefs);
    // console.log('userData: ', app.getPath('userData'));
 
    return (<Dialog
      isOpen={this.state.isOpen}
      // onClose={() => {
      //   this.props.handleInvisible();
      // }}
      autoFocus={true}
      usePortal={false}
      canOutsideClickClose={false}
      enforceFocus={true}
      transitionDuration={1000}
    >
      <div className={Classes.DIALOG_BODY} key={"hello-world"}>
      <FormGroup>
        <RadioGroup
          label="Publish Format"
          selectedValue={this.state.format}
          onChange={(event: React.FormEvent<HTMLInputElement>)  => { 
            this.setState({
              format: event.currentTarget.value
            })
           }}
        >
          <Radio label=".gLTF" value="gltf" />
          <Radio label=".gLB" value="glb" />
          <Radio label=".babylon" value="babylon" />
        </RadioGroup>  
        <Label>
          File Path
          <input placeholder={'scenes/my_scene/babylon' + DEFAULT_FORMAT} className={Classes.INPUT} id="publish-path" name="publish-path" />
        </Label>
        <Label>
           Bucket Name
          <input placeholder={'my-bucket-name'} className={Classes.INPUT} id="publish-bucket" name="publish-bucket" />
        </Label>
        <Label>
           Distribution ID
          <input placeholder={'ASDF'} className={Classes.INPUT} id="publish-distro-id" name="publish-distro-id" />
        </Label>
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={() => this.props.handleInvisible()}>Close</Button>
          <Button onClick={() => this._handlePublishScene()}>Publish</Button>
        </div>
      </div>
    </Dialog>);
  }

  private async _handlePublishScene(): Promise<void> {
    let exportedScene;
    try {

      if(!this.props.editor.scene) {
        throw new Error('No active scene to publish');
        return;
      }

      // const workspace = this.props.editor.();

      switch (this.state.format) {
        case 'glb': 
          exportedScene = await GLTF2Export.GLBAsync(this.props.editor.scene, name, {}); 
          break;
        case 'gltf': 
          exportedScene = await GLTF2Export.GLTFAsync(this.props.editor.scene, name, {}); 
          break;
        case 'babylon': 
          exportedScene = await SceneSerializer.Serialize(this.props.editor.scene);
        default: return;
      }

      console.log("exportedScene: ", exportedScene);

    } catch (e) {
      throw new Error('Error publishing scene');
    }
  }

  // private onClose(): Function {

  //   //finally, set the outer state to mark this dialog as invisible
  //   this.props.handleInvisible();
  // };
}
