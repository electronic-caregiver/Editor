import { TransformNode} from 'babylonjs';
import { LiteGraph } from "litegraph.js";

import {
  GraphNode,
  ICodeGenerationOutput,
  CodeGenerationOutputType,
} from "../node";

export class Emote extends GraphNode {
    /**
     * Constructor.
     */
    public constructor() {
      super("Emote");

      this.addInput("", LiteGraph.EVENT as any);
      this.addInput("node *", "TransformNode");

      this.addProperty("emote_name", "vannaMid", "string", (v) => this.properties.emote_name = v);

      this.addWidget("text", "emote_name", this.properties.emote_name, (v) => this.properties.emote_name = v);

      this.addOutput("", LiteGraph.EVENT as any);
  }

  /**
   * Called on the node is being executed.
   */
  public execute(): void {
      const node = this.getInputData<TransformNode>(1);
      if (!node?.metadata?.host) { return; }

      node.metadata.host.GestureFeature.playGesture("Emote", this.properties.emote_name);

      this.triggerSlot(0, null);
  }

  /**
   * Generates the code of the graph.
   */
  public generateCode(node: ICodeGenerationOutput): ICodeGenerationOutput {
      return {
          type: CodeGenerationOutputType.Function,
          code: `${node.code}.metadata.host.GestureFeature.playGesture("Emote", "${this.properties.emote_name}")`
      };
  }
}
