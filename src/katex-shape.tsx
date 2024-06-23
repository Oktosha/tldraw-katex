import {
	Geometry2d,
	HTMLContainer,
	RecordProps,
	Rectangle2d,
	T,
	TLBaseShape,
	ShapeUtil,
	stopEventPropagation,
} from 'tldraw'

import katex from 'katex'

type IMyKatexShape = TLBaseShape<
	'katex-shape',
	{
		w: number
		h: number
		text: string
	}
>

export class KatexShapeUtil extends ShapeUtil<IMyKatexShape> {
	static override type = 'katex-shape' as const
	static override props: RecordProps<IMyKatexShape> = {
		w: T.number,
		h: T.number,
		text: T.string
	}

	override canEdit = () => true
	override canResize = () => false
	override isAspectRatioLocked = () => false

	getGeometry(shape: IMyKatexShape): Geometry2d {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	getDefaultProps(): IMyKatexShape['props'] {
		return {
			w: 200,
			h: 45,
			text: "\\sin^2\\theta+\\cos^2\\theta=1"
		}
	}

	component(shape: IMyKatexShape) {
		// [a]
		const isEditing = this.editor.getEditingShapeId() === shape.id

        let renderedHtml = {__html: katex.renderToString(shape.props.text, {
            throwOnError: false,
            output: "mathml"
        })}

		const parentPadding = 5

		return (
			<HTMLContainer
				id={shape.id}
				// [b]
				onPointerDown={isEditing ? stopEventPropagation : undefined}
				style={{
					pointerEvents: isEditing ? 'all' : 'none',
					paddingTop: parentPadding + "px",
				}}
			>
				<div
					style={{
						margin: 0,
						padding: "5px",
						fontSize: 24,
						textAlign: "center"
					}}
					 dangerouslySetInnerHTML={renderedHtml}/>
				{isEditing &&
					<textarea 
					style={{
						margin: 0,
						padding: "5px",
						paddingTop: "10px",
						position: "absolute",
						backgroundColor: "rgba(82, 78, 183, 0.2)",
						color: "currentColor",
						width: "150%",
						height: "200%",
						border: "none",
						fontFamily: "monospace"
					}}
					onChange={(event)=>{
						const text = event.target.value;
						const parent = event.target.parentNode! as HTMLElement;
						const formula = parent.children[0] as HTMLElement;
						const h = formula.scrollHeight + parentPadding;
						const w = formula.scrollWidth;
						this.editor.updateShape({
						id: shape.id,
						type: shape.type,
						props: {
							...shape.props,
							text: text,
							h: h,
							w: w
						},
					})}}
					value={shape.props.text}
					/>
				}
			</HTMLContainer>
		)
	}

	indicator(shape: IMyKatexShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}