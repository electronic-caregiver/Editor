import * as React from "react";
import { Callout, Intent, FormGroup, RadioGroup, Radio, Button } from "@blueprintjs/core";

import WorkspaceSettingsWindow from "./index";

export interface IDeveloperSettingsProps {
    /**
     * Defines the reference to the settings window.
     */
    settings: WorkspaceSettingsWindow;
}

export interface IDeveloperSettingsState {
    enableDevtools: boolean;
}

export class DeveloperSettings extends React.Component<IDeveloperSettingsProps, IDeveloperSettingsState> {
    /**
     * Renders the component.
     */
    public render(): React.ReactNode {
         return (
            <div key="snapping-main-div">
                <Callout key="position-snapping-callout" intent={Intent.NONE} title="Developer Preferences">
                    <FormGroup key="position-snapping-form" label="Gizmo Snapping Values">
                        { /** TODO: add input / select / switch element for toggling devtools */}
                        <RadioGroup
                            label="Enable Devtools?"
                            onChange={(evt) => { this.setState({ enableDevtools: evt.currentTarget.value === "true" ? true : false })}}
                        >
                            <Radio {...this.state} label="Yes" value="true" />
                            <Radio {...this.state} label="No" value="false" />
                        </RadioGroup>
                        <Button key="add-position-snapping" text="Apply..." icon="add" fill={true} onClick={() => this._handleSelectDevtools()} />
                    </FormGroup>
                </Callout>
            </div>
        );
    }

    /**
     * Called on the user wants to add a new position gizmo snapping value.
     */
    private _handleSelectDevtools(): void {
        
    }
}
