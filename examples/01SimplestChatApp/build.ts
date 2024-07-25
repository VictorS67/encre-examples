import path from 'node:path';
import url from 'node:url';
import {
  globalNodeRegistry,
  SystemMessage,
  OpenAIChat,
  SubGraph,
  saveGraph,
} from '@encrejs/core';

// Configuration
const MOONSHOT_API_KEY = 'add_your_moonshot_api_here';
const APP_NAME = 'ChatApp';
const APP_DESCRIPTION = 'simplest graph for building a chat app';

// App Build
const systemMessageNode = globalNodeRegistry.createDynamicRaw(
  new SystemMessage('You are a comic character. Your name is SpongeBob.')
);

const userMessageNode = globalNodeRegistry.createDynamic('message', 'human');

const chatPromptNode = globalNodeRegistry.createDynamic('prompt', 'chat');

const openAIChatNode = globalNodeRegistry.createDynamicRaw(
  new OpenAIChat({
    openAIApiKey: MOONSHOT_API_KEY,
    modelName: 'moonshot-v1-8k',
    configuration: {
      baseURL: 'https://api.moonshot.cn/v1',
    },
  })
);

const graph = new SubGraph({
  title: APP_NAME,
  description: APP_DESCRIPTION,
  nodes: [systemMessageNode, userMessageNode, chatPromptNode, openAIChatNode],
  connections: [
    {
      fromNodeId: systemMessageNode.id,
      fromPortName: 'message',
      toNodeId: chatPromptNode.id,
      toPortName: 'input1',
    },
    {
      fromNodeId: userMessageNode.id,
      fromPortName: 'message',
      toNodeId: chatPromptNode.id,
      toPortName: 'input2',
    },
    {
      fromNodeId: chatPromptNode.id,
      fromPortName: 'prompt',
      toNodeId: openAIChatNode.id,
      toPortName: 'prompt',
    },
  ],
});

// Save App File
const filePath: string = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  './'
);

saveGraph(graph, filePath);
