import {
	BaseBoxShapeUtil,
	HTMLContainer,
	RecordProps,
	T,
	TLBaseShape,
	stopEventPropagation,
} from 'tldraw'

import katex from 'katex'

type IMyEditableShape = TLBaseShape<
	'katex-shape',
	{
		w: number
		h: number
		text: string
	}
>

export class KatexShapeUtil extends BaseBoxShapeUtil<IMyEditableShape> {
	static override type = 'katex-shape' as const
	static override props: RecordProps<IMyEditableShape> = {
		w: T.number,
		h: T.number,
		text: T.string
	}

	// [1] !!!
	override canEdit = () => true

	getDefaultProps(): IMyEditableShape['props'] {
		return {
			w: 200,
			h: 200,
			text: "\\sin^2\\theta+\\cos^2\\theta=1"
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
					paddingTop: '4px',
					display: "flex",
					flexFlow: "column"
				}}
			>
				<div
					style={{
						fontSize: 24,
						textAlign: "center",
						flex: "0 1 auto"
					}}
					 dangerouslySetInnerHTML={renderedHtml}/>
				{isEditing &&
					<textarea 
					style={{
						backgroundColor: "rgba(82, 78, 183, 0.2)",
						color: "currentColor",
						width: "100%",
						border: "none",
						flex: "1 1 auto",
						padding: "5px",
						fontFamily: "monospace"
					}}
					onChange={(event)=>{this.editor.updateShape({
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