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

    // Let's add our first input which is the "trigger" pin
    this.addInput(
      "", // This is the name of the input. We don't really set a name for the trigger input as it is visually understandable.
      LiteGraph.EVENT as any // "as any" is mandatory as litegraph.js still has problems in its typings.
    );
    
    this.addProperty(
      "Emote name",
      "vannaMid",
      "string",
      (v) => (this.properties.emote_name = v)
    );
    this.addProperty(
      "Dummy Node Name",
      "HostDummyNode",
      "string",
      (v) => (this.properties.node_name = v)
    );

    this.addWidget("text", "emote_name", this.properties.emote_name, (v) => {
      this.properties.emote_name = v;
    });
    this.addWidget("text", "node_name", this.properties.node_name, (v) => {
      this.properties.node_name = v;
    });

    this.addOutput("", LiteGraph.EVENT as any);
  }

  /**
   * Called on the node is being executed.
   */
  public execute(): void {
    const node = this.getScene().getNodeByName(this.properties.node_name);

    const host = node && node.metadata.host;

    const emote = this.properties.emote_name;

    host.GestureFeature.playGesture("Emote", emote);

    this.triggerSlot(0, null);
  }

  /**
   * Generates the code of the graph.
   */
  public generateCode(): ICodeGenerationOutput {
    const code = `
        const node = this.getScene().getNodeByName('${this.properties.node_name}');
        node.metadata.host.GestureFeature.playGesture("Emote", '${this.properties.emote_name}');
    `;

    return {
      type: CodeGenerationOutputType.Function,
      code,
    };
  }
}
