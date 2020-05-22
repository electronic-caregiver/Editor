import { Sound } from "babylonjs";
import { LiteGraph } from "litegraph.js";

import { GraphNode, ICodeGenerationOutput, CodeGenerationOutputType } from "../node";

export class StopSound extends GraphNode {
    /**
     * Constructor.
     */
    public constructor() {
        super("Stop Sound");

        this.addInput("", LiteGraph.EVENT as any);
        this.addInput("sound *", "Sound");

        this.addOutput("", LiteGraph.EVENT as any);
    }

    /**
     * Called on the node is being executed.
     */
    public execute(): void {
        const sound = this.getInputData(1) as Sound;
        if (sound) {
            sound.stop();
        }

        this.triggerSlot(0, null);
    }

    /**
     * Generates the code of the graph.
     */
    public generateCode(value: ICodeGenerationOutput): ICodeGenerationOutput {
        return {
            type: CodeGenerationOutputType.Function,
            code: `${value.code}.stop()`,
        };
    }
}
