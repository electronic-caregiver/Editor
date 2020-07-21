import React from "react";
import { Classes, Dialog, Button, RadioGroup, Radio, FormGroup, Label } from "@blueprintjs/core";
import { GLTF2Export } from "babylonjs-serializers";
import { SceneSerializer } from "babylonjs";
import { Editor } from "babylonjs-editor";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront-node/CloudFrontClient";
import { Buffer } from "buffer";


// const S3 : AWS.S3 = new AWS.S3();

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
  bucket: string;

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
    bucket: '',
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
          <input onChange={(evt) => {this.setState({filepath: evt.target.value})}} placeholder={'scenes/my_scene/babylon' + DEFAULT_FORMAT} className={Classes.INPUT} id="publish-path" name="publish-path" />
        </Label>
        <Label>
           Bucket Name
          <input onChange={(evt) => {this.setState({bucket: evt.target.value})}} placeholder={'my-bucket-name'} className={Classes.INPUT} id="publish-bucket" name="publish-bucket" />
        </Label>
        <Label>
           Distribution ID
          <input onChange={(evt) => {this.setState({distroId: evt.target.value})}} placeholder={'ASDF'} className={Classes.INPUT} id="publish-distro-id" name="publish-distro-id" />
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


  private async _handleCacheInvalidation(): Promise<void> {
    const params = {
      DistributionId: this.state.distroId,              //addison-cdn constant
      InvalidationBatch: { /* required */
        CallerReference: (new Date(Date.now())).toUTCString(), 
        Paths: { 
          Quantity: 1, 
          Items: [
            this.state.filepath,
          ]
        }
      }
    };

    const client = new CloudFrontClient({region: 'us-east-1'});
    const command = new CreateInvalidationCommand(params);

    await client.send(command);
  }
  
  private async _handlePublishScene(): Promise<void> {
    let exportedScene : any;
    const client = new S3Client({region: 'us-east-1'});
    try {

      if(!this.props.editor.scene) {
        throw new Error('No active scene to publish');
        return;
      }

      // const workspace = this.props.editor.();

      switch (this.state.format) {
        case 'glb': 
          exportedScene = await GLTF2Export.GLBAsync(this.props.editor.scene, name, {}); 
          exportedScene.downloadFiles();
          let glbBlob = exportedScene.glTFFiles[".glb"];
          const buffer : ArrayBuffer = await glbBlob.arrayBuffer();
          const stringified : Buffer = Buffer.from(buffer);
          const command = new PutObjectCommand({
            Body: stringified,
            Bucket: this.state.bucket,
            Key: this.state.filepath,
          })

          await client.send(command);
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
      throw new Error('Error publishing scene, e: ' + e);
    }
  }
}
