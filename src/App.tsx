import {
	DefaultKeyboardShortcutsDialog,
	DefaultKeyboardShortcutsDialogContent,
	DefaultToolbar,
	DefaultToolbarContent,
	TLComponents,
	TLUiAssetUrlOverrides,
	TLUiOverrides,
	Tldraw,
	TldrawUiMenuItem,
	useIsToolSelected,
	useTools,
} from 'tldraw'
import { StickerTool } from './katex-tool'

import 'tldraw/tldraw.css'
import './index.css'

// [1]
const uiOverrides: TLUiOverrides = {
	tools(editor, tools) {
		// Create a tool item in the ui's context.
		tools.sticker = {
			id: 'sticker',
			icon: 'heart-icon',
			label: 'Sticker',
			kbd: 's',
			onSelect: () => {
				editor.setCurrentTool('sticker')
			},
		}
		return tools
	},
}

// [2]
const components: TLComponents = {
	Toolbar: (props) => {
		const tools = useTools()
		const isStickerSelected = useIsToolSelected(tools['sticker'])
		return (
			<DefaultToolbar {...props}>
				<TldrawUiMenuItem {...tools['sticker']} isSelected={isStickerSelected} />
				<DefaultToolbarContent />
			</DefaultToolbar>
		)
	},
	KeyboardShortcutsDialog: (props) => {
		const tools = useTools()
		return (
			<DefaultKeyboardShortcutsDialog {...props}>
				<DefaultKeyboardShortcutsDialogContent />
				{/* Ideally, we'd interleave this into the tools group */}
				<TldrawUiMenuItem {...tools['sticker']} />
			</DefaultKeyboardShortcutsDialog>
		)
	},
}

// [3]
export const customAssetUrls: TLUiAssetUrlOverrides = {
	icons: {
		'heart-icon': 'src/assets/sigma.svg',
	},
}

// [4]
const customTools = [StickerTool]

export default function App() {
	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw
				// Pass in the array of custom tool classes
				tools={customTools}
				// Set the initial state to the sticker tool
				initialState="sticker"
				// Pass in our ui overrides
				overrides={uiOverrides}
				// pass in our custom components
				components={components}
				// pass in our custom asset urls
				assetUrls={customAssetUrls}
			/>
		</div>
	)
}
