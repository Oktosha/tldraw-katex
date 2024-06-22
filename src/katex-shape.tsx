import {
	BaseBoxShapeUtil,
	HTMLContainer,
	RecordProps,
	T,
	TLBaseShape,
	TLOnEditEndHandler,
	stopEventPropagation,
} from 'tldraw'

import katex from 'katex'

// There's a guide at the bottom of this file!

const ANIMAL_EMOJIS = ['🐶', '🐱', '🐨', '🐮', '🐴']

type IMyEditableShape = TLBaseShape<
	'katex-shape',
	{
		w: number
		h: number
		animal: number
		text: string
	}
>

export class KatexShapeUtil extends BaseBoxShapeUtil<IMyEditableShape> {
	static override type = 'katex-shape' as const
	static override props: RecordProps<IMyEditableShape> = {
		w: T.number,
		h: T.number,
		animal: T.number,
		text: T.string
	}

	// [1] !!!
	override canEdit = () => true

	getDefaultProps(): IMyEditableShape['props'] {
		return {
			w: 200,
			h: 200,
			animal: 0,
			text: "\\sin^2\\theta"
		}
	}

	// [2]
	component(shape: IMyEditableShape) {
		// [a]
		const isEditing = this.editor.getEditingShapeId() === shape.id

        let renderedHtml = {__html: katex.renderToString(shape.props.text, {
            throwOnError: false,
            output: "mathml"
        })}

		return (
			<HTMLContainer
				id={shape.id}
				// [b]
				onPointerDown={isEditing ? stopEventPropagation : undefined}
				style={{
					pointerEvents: isEditing ? 'all' : 'none',
				}}
			>
				<div style={{fontSize: 24, textAlign: "center"}} dangerouslySetInnerHTML={renderedHtml}/>
				{isEditing &&
					<textarea onChange={(event)=>{this.editor.updateShape({
						id: shape.id,
						type: shape.type,
						props: {
							...shape.props,
							text: event.target.value,
						},
					})}}>
						{shape.props.text}
					</textarea>
				}
			</HTMLContainer>
		)
	}

	indicator(shape: IMyEditableShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}