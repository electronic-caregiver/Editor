import * as React from "react";
import { Menu, MenuItem } from "@blueprintjs/core";
// import { GLTF2Export } from "babylonjs-serializers";

import { Editor } from "babylonjs-editor";

import { PublishDialog } from "./dialog";

export interface IToolbarProps {
  /**
   * Defines the reference to the editor.
   */
  editor: Editor;
  getWorkspacePreferences: (preferences: any) => void;
}

export interface IToolbarState {
  dialogVisible: boolean;
}

export class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  public state: IToolbarState = {
    dialogVisible: false,
  };

  /**
   * Renders the component.
   */
  public render(): React.ReactNode {
    return (
      <>
        <Menu>
          <MenuItem
            text="Publish Scene..."
            icon="export"
            onClick={() => this._handleVisible()}
          />
        </Menu>
        this.state.dialogVisible &&{" "}
        <PublishDialog handleInvisible={this._handleInvisible} />
      </>
    );
  }

  private _handleVisible(): void {
    this.setState({
      dialogVisible: true,
    });
  }

  private _handleInvisible(): void {
    this.setState({
      dialogVisible: true,
    });
  }

  // private async _handlePublishScene(): Promise<void> {
  //   let exportedScene;
  //   try {

  //     if(!this.props.editor.scene) {
  //       throw new Error('No active scene to publish');
  //       return;
  //     }

  //     // const workspace = this.props.editor.();

  //     switch (format) {
  //       case 'GLB': exportedScene = await GLTF2Export.GLBAsync(this.props.editor.scene, name, {}); break;
  //       case 'GLTF': exportedScene = await GLTF2Export.GLTFAsync(this.props.editor.scene, name, {}); break;
  //       default: return;
  //     }

  //   } catch (e) {
  //     throw new Error('Error publishing scene');
  //   }
  // }
}
