import { StateNode } from 'tldraw'

export class KatexTool extends StateNode {
	static override id = 'katex'

	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onPointerDown = () => {
		const { currentPagePoint } = this.editor.inputs
		this.editor.createShape({ 
			type: 'katex-shape', 
			x: currentPagePoint.x, 
			y: currentPagePoint.y })
	}
}
