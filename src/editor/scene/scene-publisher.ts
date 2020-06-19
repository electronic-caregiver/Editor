import {
    Scene, Mesh,
    Tools as BabylonTools,
    SceneSerializer as BabylonSceneSerializer } from 'babylonjs';
import { GLTF2Export, OBJExport } from 'babylonjs-serializers';

import Tools from '../tools/tools';

import Window from '../gui/window';
import Form from '../gui/form';

export default class ScenePublisher {
    /**
     * Constructor
     * @param scene: the scene to publish
     */
    constructor (scene: Scene) {
        // Create window
        const window = new Window('Scene Publisher');
        window.buttons = ['Publish', 'Cancel'];
        window.width = 410;
        window.height = 300;
        window.body = `<div id="SCENE-PUBLISHER-WINDOW" style="width: 100%; height: 100%"></div>`;
        window.open();

        // Form
        const form = new Form('ScenePublisher');
        form.fields = [
            { name: 'format', type: 'list', required: true, options: { items: ['GLTF','GLB'] } },
            { name: 'provider', type: 'list', required: true, options: { items: ['AWS',] } },
            { name: 'profile name', type: 'text', required: true },
            { name: 'bucket name', type: 'text', required: true },
            { name: 'file path', type: 'text', required: true },
            { name: 'distribution ID', type: 'text', required: false }
        ];
        form.build('SCENE-PUBLISHER-WINDOW');

        // Set default values
        form.element.record['profile name'] = 'default';
        form.element.refresh();

        // Events
        window.onButtonClick = async (id) => {
            window.close();

            if (id === 'Cancel')
                return form.element.destroy();

            if (!form.isValid())
                return Window.CreateAlert('Error when publishing the scene');

            const profile = form.element.record['profile name'];
            const filePath = form.element.record['file path'];
            const distributionId = form.element.record['distribution ID']
            const provider = form.element.record['provider'].id;
            const format = form.element.record['format'].id;

            try {
                switch (format) {
                    case 'GLB': (await GLTF2Export.GLBAsync(scene, name, { })).downloadFiles(); break;
                    case 'GLTF': (await GLTF2Export.GLTFAsync(scene, name, { })).downloadFiles(); break;
                    default: return;
                }
            } catch (e) {
                Window.CreateAlert(e.message, 'Error when exporting the scene');
            }

            // Clear
            form.element.destroy();
        };
    }
}
