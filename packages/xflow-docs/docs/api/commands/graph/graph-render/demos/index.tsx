import React from 'react'
import type { NsGraph, NsGraphCmd, IAppLoad } from '@antv/xflow'
import { XFlow, XFlowCanvas, createGraphConfig, XFlowGraphCommands } from '@antv/xflow'
import './index.less'

/** graphConfig hook */
export const useGraphConfig = createGraphConfig(config => {
  config.setX6Config({ grid: true })
  config.setNodeRender('NODE1', props => <div className="react-node">{props.data?.info}</div>)
  config.setNodeTypeParser(node => node?.renderKey)
})

const GraphRenderDemo: React.FC<{}> = () => {
  const onLoad: IAppLoad = async app => {
    const graphData: NsGraph.IGraphData = {
      nodes: [
        {
          id: 'root1',
          x: 200,
          y: 50,
          width: 120,
          height: 40,
          renderKey: 'NODE1',
          info: 'React节点1',
        },
        {
          id: 'down1',
          x: 550,
          y: 50,
          width: 120,
          height: 40,
          renderKey: 'NODE1',
          info: 'React节点2',
        },
      ],
      edges: [{ id: 'root1-down1', source: 'root1', target: 'down1', label: 'text' }],
    }
    /** 执行画布渲染命令 */
    app.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, {
      graphData,
    } as NsGraphCmd.GraphRender.IArgs)

    return app
  }
  return (
    <XFlow
      onLoad={onLoad}
      className="xflow-render-graph-demo"
      meta={{ flowId: 'graph-render-demo-id' }}
    >
      <XFlowCanvas config={useGraphConfig()} />
    </XFlow>
  )
}
export default GraphRenderDemo