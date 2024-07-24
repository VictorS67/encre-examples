# 01: Simplest Chat App

The simplest graph for building a chat app.

## Graph Description

### Nodes

#### SystemMessage

This is the prompt message for the LLM Chat API. This can be modified from the graph inputs.

| Property | Value                                                |
| -------- | ---------------------------------------------------- |
| content  | "You are a comic character. Your name is SpongeBob." |

#### HumanMessage

This is the user message to input to the LLM Chat API. This can be modified from the graph inputs.

| Property | Value |
| -------- | ----- |
| content  | ""    |

#### ChatPrompt

This is the collection of the prompt message and the user message before inputting to the LLM Chat API.

| Property | Value |
| -------- | ----- |
| messages | []    |

#### OpenAIChat

This is the LLM Chat API. We are using [MoonShot API](https://platform.moonshot.cn/docs/api/chat) for LLM Chat since users in China are blocked from OpenAI API. For users who want to use OpenAI API, please modify the property `modelName` to OpenAI models, use OpenAI API Key, and remove `configuration`.

| Property         | Value                                       |
| ---------------- | ------------------------------------------- |
| modelName        | "moonshot-v1-8k"                            |
| frequencyPenalty | 0                                           |
| presencePenalty  | 0                                           |
| stream           | false                                       |
| temperature      | 1                                           |
| maxTokens        | 2048                                        |
| topP             | 1                                           |
| additionalKwargs | {}                                          |
| openaiApiKey     | OPEN_API_KEY                                |
| configuration    | { "baseURL": "https://api.moonshot.cn/v1" } |
