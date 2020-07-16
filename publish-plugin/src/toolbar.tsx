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
  isOpen: boolean;
}

// let _isOpen = false;

export class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  public state: IToolbarState = {
    isOpen: true,
  };

  /**
   * Renders the component.
   */
  public render(): React.ReactNode {
    return (
      <>
        <Menu key={"publish-menu"}>
          <MenuItem
            key = {"publish-menu-item-scene"}
            text="Publish Scene..."
            icon="export"
            onClick={() => this._handleVisible()}
          />
        </Menu>
        <PublishDialog isOpen={this.state.isOpen} key={"publish-dialog"} handleInvisible={this._handleInvisible} handleVisible={this._handleVisible} />
        
      </>
    );
  }

  private _handleVisible(): void {
    this.setState({
      isOpen: true,
    });
  }

  private _handleInvisible(): void {
    this.setState({
      isOpen: false,
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
