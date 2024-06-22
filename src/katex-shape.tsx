import {
	BaseBoxShapeUtil,
	HTMLContainer,
	RecordProps,
	T,
	TLBaseShape,
	TLOnEditEndHandler,
	stopEventPropagation,
} from 'tldraw'

// There's a guide at the bottom of this file!

const ANIMAL_EMOJIS = ['🐶', '🐱', '🐨', '🐮', '🐴']

type IMyEditableShape = TLBaseShape<
	'katex-shape',
	{
		w: number
		h: number
		animal: number
	}
>

export class KatexShapeUtil extends BaseBoxShapeUtil<IMyEditableShape> {
	static override type = 'katex-shape' as const
	static override props: RecordProps<IMyEditableShape> = {
		w: T.number,
		h: T.number,
		animal: T.number,
	}

	// [1] !!!
	override canEdit = () => true

	getDefaultProps(): IMyEditableShape['props'] {
		return {
			w: 200,
			h: 200,
			animal: 0,
		}
	}

	// [2]
	component(shape: IMyEditableShape) {
		// [a]
		const isEditing = this.editor.getEditingShapeId() === shape.id

		return (
			<HTMLContainer
				id={shape.id}
				// [b]
				onPointerDown={isEditing ? stopEventPropagation : undefined}
				style={{
					pointerEvents: isEditing ? 'all' : 'none',
					backgroundColor: '#efefef',
					fontSize: 24,
					padding: 16,
				}}
			>
				{ANIMAL_EMOJIS[shape.props.animal]}
				{/* [c] */}
				{isEditing ? (
					<button
						onClick={() => {
							this.editor.updateShape({
								id: shape.id,
								type: shape.type,
								props: {
									...shape.props,
									animal: (shape.props.animal + 1) % ANIMAL_EMOJIS.length,
								},
							})
						}}
					>
						Next
					</button>
				) : (
					// [d] when not editing...
					<p style={{ fontSize: 12 }}>Double Click to Edit</p>
				)}
			</HTMLContainer>
		)
	}

	indicator(shape: IMyEditableShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}

	// [3]
	override onEditEnd: TLOnEditEndHandler<IMyEditableShape> = (shape) => {
		this.editor.animateShape(
			{ ...shape, rotation: shape.rotation + Math.PI * 2 },
			{ animation: { duration: 250 } }
		)
	}
}