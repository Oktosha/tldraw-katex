import {
  DefaultKeyboardShortcutsDialog,
  DefaultToolbar,
  TLComponents,
  TLUiAssetUrlOverrides,
  TLUiOverrides,
  Tldraw,
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
  useIsToolSelected,
  useActions,
  useTools,
  ArrowDownToolbarItem,
  ArrowLeftToolbarItem,
  ArrowRightToolbarItem,
  ArrowToolbarItem,
  ArrowUpToolbarItem,
  AssetToolbarItem,
  CheckBoxToolbarItem,
  CloudToolbarItem,
  DiamondToolbarItem,
  DrawToolbarItem,
  EllipseToolbarItem,
  EraserToolbarItem,
  FrameToolbarItem,
  HandToolbarItem,
  HexagonToolbarItem,
  HighlightToolbarItem,
  LaserToolbarItem,
  LineToolbarItem,
  NoteToolbarItem,
  OvalToolbarItem,
  RectangleToolbarItem,
  RhombusToolbarItem,
  SelectToolbarItem,
  StarToolbarItem,
  TextToolbarItem,
  TriangleToolbarItem,
  XBoxToolbarItem,
} from 'tldraw'
import { KatexTool } from './katex-tool'

import 'tldraw/tldraw.css'
import './index.css'

const uiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    tools.katex = {
      id: 'katex',
      icon: 'sigma-icon',
      label: 'Katex',
      kbd: 'm',
      onSelect: () => {
        editor.setCurrentTool('katex')
      },
    }
    return tools
  },
}

const components: TLComponents = {
  Toolbar: (props) => {
    const tools = useTools()
    const isKatexSelected = useIsToolSelected(tools['katex'])
    return (
      <DefaultToolbar {...props}>
        <SelectToolbarItem />
        <HandToolbarItem />
        <DrawToolbarItem />
        <EraserToolbarItem />
        <ArrowToolbarItem />
        <TextToolbarItem />
        <TldrawUiMenuItem {...tools['katex']} isSelected={isKatexSelected} />
        <AssetToolbarItem />
        <NoteToolbarItem />
        <RectangleToolbarItem />
        <EllipseToolbarItem />
        <TriangleToolbarItem />
        <DiamondToolbarItem />
        <HexagonToolbarItem />
        <OvalToolbarItem />
        <RhombusToolbarItem />
        <StarToolbarItem />
        <CloudToolbarItem />
        <XBoxToolbarItem />
        <CheckBoxToolbarItem />
        <ArrowLeftToolbarItem />
        <ArrowUpToolbarItem />
        <ArrowDownToolbarItem />
        <ArrowRightToolbarItem />
        <LineToolbarItem />
        <HighlightToolbarItem />
        <LaserToolbarItem />
        <FrameToolbarItem />
      </DefaultToolbar>
    )
  },
  KeyboardShortcutsDialog: (props) => {
    const actions = useActions()
    const tools = useTools()
    return (
      <DefaultKeyboardShortcutsDialog {...props}>
        <TldrawUiMenuGroup label="shortcuts-dialog.tools" id="tools">
          <TldrawUiMenuItem {...actions['toggle-tool-lock']} />
          <TldrawUiMenuItem {...actions['insert-media']} />
          <TldrawUiMenuItem {...tools['select']} />
          <TldrawUiMenuItem {...tools['draw']} />
          <TldrawUiMenuItem {...tools['eraser']} />
          <TldrawUiMenuItem {...tools['hand']} />
          <TldrawUiMenuItem {...tools['rectangle']} />
          <TldrawUiMenuItem {...tools['ellipse']} />
          <TldrawUiMenuItem {...tools['arrow']} />
          <TldrawUiMenuItem {...tools['line']} />
          <TldrawUiMenuItem {...tools['text']} />
          <TldrawUiMenuItem {...tools['katex']} />
          <TldrawUiMenuItem {...tools['frame']} />
          <TldrawUiMenuItem {...tools['note']} />
          <TldrawUiMenuItem {...tools['laser']} />
        </TldrawUiMenuGroup>
        <TldrawUiMenuGroup label="shortcuts-dialog.preferences" id="preferences">
          <TldrawUiMenuItem {...actions['toggle-dark-mode']} />
          <TldrawUiMenuItem {...actions['toggle-focus-mode']} />
          <TldrawUiMenuItem {...actions['toggle-grid']} />
        </TldrawUiMenuGroup>
        <TldrawUiMenuGroup label="shortcuts-dialog.edit" id="edit">
          <TldrawUiMenuItem {...actions['undo']} />
          <TldrawUiMenuItem {...actions['redo']} />
          <TldrawUiMenuItem {...actions['cut']} />
          <TldrawUiMenuItem {...actions['copy']} />
          <TldrawUiMenuItem {...actions['paste']} />
          <TldrawUiMenuItem {...actions['select-all']} />
          <TldrawUiMenuItem {...actions['delete']} />
          <TldrawUiMenuItem {...actions['duplicate']} />
        </TldrawUiMenuGroup>
        <TldrawUiMenuGroup label="shortcuts-dialog.view" id="view">
          <TldrawUiMenuItem {...actions['zoom-in']} />
          <TldrawUiMenuItem {...actions['zoom-out']} />
          <TldrawUiMenuItem {...actions['zoom-to-100']} />
          <TldrawUiMenuItem {...actions['zoom-to-fit']} />
          <TldrawUiMenuItem {...actions['zoom-to-selection']} />
        </TldrawUiMenuGroup>
        <TldrawUiMenuGroup label="shortcuts-dialog.transform" id="transform">
          <TldrawUiMenuItem {...actions['bring-to-front']} />
          <TldrawUiMenuItem {...actions['bring-forward']} />
          <TldrawUiMenuItem {...actions['send-backward']} />
          <TldrawUiMenuItem {...actions['send-to-back']} />
          <TldrawUiMenuItem {...actions['group']} />
          <TldrawUiMenuItem {...actions['ungroup']} />
          <TldrawUiMenuItem {...actions['flip-horizontal']} />
          <TldrawUiMenuItem {...actions['flip-vertical']} />
          <TldrawUiMenuItem {...actions['align-top']} />
          <TldrawUiMenuItem {...actions['align-center-vertical']} />
          <TldrawUiMenuItem {...actions['align-bottom']} />
          <TldrawUiMenuItem {...actions['align-left']} />
          <TldrawUiMenuItem {...actions['align-center-horizontal']} />
          <TldrawUiMenuItem {...actions['align-right']} />
        </TldrawUiMenuGroup>
      </DefaultKeyboardShortcutsDialog>
    )
  },
}

export const customAssetUrls: TLUiAssetUrlOverrides = {
  icons: {
    'sigma-icon': 'src/assets/sigma.svg',
  },
}

const customTools = [KatexTool]

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        tools={customTools}
        overrides={uiOverrides}
        components={components}
        assetUrls={customAssetUrls}
      />
    </div>
  )
}
