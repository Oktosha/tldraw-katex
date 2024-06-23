import { 
	createShapeId,
	StateNode 
} from 'tldraw'

export class KatexTool extends StateNode {
	static override id = 'katex'

	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onPointerDown = () => {
		const { currentPagePoint } = this.editor.inputs;
		const id = createShapeId();
		this.editor.createShape({ 
			id: id,
			type: 'katex-shape', 
			x: currentPagePoint.x, 
			y: currentPagePoint.y })
		this.editor.select(id);
		this.editor.setEditingShape(id);
		this.editor.setCurrentTool('select');
	}
}
