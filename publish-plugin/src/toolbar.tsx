import * as React from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { GLTF2Export } from 'babylonjs-serializers';

import { Editor, Alert, ProjectExporter } from "babylonjs-editor";

import { PublishDialog } from './dialog';

export interface IToolbarProps {
  /**
   * Defines the reference to the editor.
   */
  editor: Editor;
}

export interface IToolbarState {
  dialogVisible: boolean,
};

export class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  private state = {
    dialogVisible: false,
  };

  /**
   * Renders the component.
   */
  public render(): React.ReactNode {
    return (
      <>
        <Menu>
          <MenuItem text="Publish Scene..." icon="export" onClick={() => this._handleVisible()} />
        </Menu>
        <PublishDialog handleInvisible={this._handleInvisible} />
      </>
    );
  }

  private _handleVisible(): void {
    this.setState({
      dialogVisible: true
    })
  }

  private _handleInvisible(): void {
    this.setState({
      dialogVisible: true
    })
  }

  private _handlePublishScene(): void {
    let exportedScene;
    try {

      switch (format) {
        case 'GLB': exportedScene = await GLTF2Export.GLBAsync(this.props.scene, name, {}); break;
        case 'GLTF': exportedScene = await GLTF2Export.GLTFAsync(this.props.scene, name, {}); break;
        default: return;
      }
    } catch (e) {
      Window.CreateAlert(e.message, 'Error when exporting the scene');
    }

  }
}
