import * as React from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { GLTF2Export } from 'babylonjs-serializers';

import { Editor, Alert, ProjectExporter } from "babylonjs-editor";

export interface IToolbarProps {
  /**
   * Defines the reference to the editor.
   */
  editor: Editor;
}

export class Toolbar extends React.Component<IToolbarProps> {
  /**
   * Renders the component.
   */
  public render(): React.ReactNode {
    return (
      <Menu>
        <MenuItem text="Publish Scene..." icon="export" onClick={() => this._handlePublishScene()} />
      </Menu>
    );
  }

  private _handlePublishScene(): void {

  }
}
