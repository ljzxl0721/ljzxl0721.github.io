import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import { RoleProvider, useRole } from '../components/RoleContext';
import RoleSelector from '../components/RoleSelector';
import styles from './chat.module.css';

// New component for typing effect
function TypingText({ text, speed = 30 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) return;

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <>{displayedText}</>;
}

function ChatComponent() {
  const { selectedRole } = useRole();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState(null);
  const [contextResetCounter, setContextResetCounter] = useState(0);
  const [apiConfig, setApiConfig] = useState({
    apiKey: '',
    apiUrl: 'https://api.moonshot.cn/v1/chat/completions',
    model: 'moonshot-v1-8k',
    provider: 'moonshot'
  });
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 定义上下文重置常量
  const MAX_CONTEXT_TURNS = 10; // 调整为10轮对话

  // 初始化系统提示词
  useEffect(() => {
    if (selectedRole) {
      const initialSystemMessage = {
        role: 'system',
        content: selectedRole.systemPrompt
      };
      setMessages([]);
      // 不显示系统提示词，但在API调用时使用
    }
  }, [selectedRole]);

  // 扩展模型列表以包含 SiliconFlow 模型
  const moonshotModels = [
    { 
      name: 'moonshot-v1-8k', 
      description: '8k上下文长度，适用于短文本生成',
      provider: 'moonshot'
    },
    { 
      name: 'moonshot-v1-32k', 
      description: '32k上下文长度，适用于长文本生成',
      provider: 'moonshot'
    },
    { 
      name: 'moonshot-v1-128k', 
      description: '128k上下文长度，适用于超长文本生成',
      provider: 'moonshot'
    }
  ];

  const siliconflowModels = [
    { 
      name: 'THUDM/GLM-Z1-32B-0414', 
      description: '智谱',
      provider: 'siliconflow'
    },
    { 
      name: 'Qwen/Qwen3-235B-A22B', 
      description: '阿里巴巴开发的大语言模型',
      provider: 'siliconflow'
    },
    { 
      name: 'Pro/deepseek-ai/DeepSeek-R1', 
      description: '深度求索开发的聊天模型',
      provider: 'siliconflow'
    }
  ];

  const allModels = [...moonshotModels, ...siliconflowModels];

  // 根据提供商获取正确的 API 端点
  const getApiEndpoint = (provider) => {
    switch(provider) {
      case 'siliconflow':
        return 'https://api.siliconflow.cn/v1/chat/completions';
      case 'moonshot':
      default:
        return 'https://api.moonshot.cn/v1/chat/completions';
    }
  };

  useEffect(() => {
    // 从localStorage加载配置
    const savedConfig = localStorage.getItem('chatApiConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      // 确保配置包含 provider 字段
      const configWithProvider = {
        ...parsedConfig,
        provider: parsedConfig.provider || 'moonshot'
      };
      setApiConfig(configWithProvider);
    } else {
      // 如果没有保存的配置，打开配置模态框
      setIsConfigModalOpen(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  const ApiConfigModal = () => (
    <div className={styles.modalOverlay} onClick={() => setIsConfigModalOpen(false)}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
      >
        <h2>配置AI聊天API</h2>
        <div className={styles.configInput}>
          <label>API Key</label>
          <input
            type="text"
            name="apiKey"
            value={apiConfig.apiKey}
            onChange={(e) => setApiConfig(prev => ({
              ...prev,
              apiKey: e.target.value
            }))}
            placeholder="输入您的API Key"
          />
        </div>
        <div className={styles.configInput}>
          <label>服务提供商</label>
          <select
            name="provider"
            value={apiConfig.provider}
            onChange={(e) => {
              const newProvider = e.target.value;
              setApiConfig(prev => ({
                ...prev,
                provider: newProvider,
                apiUrl: getApiEndpoint(newProvider),
                // 重置模型为该提供商的默认模型
                model: newProvider === 'siliconflow' 
                  ? 'THUDM/GLM-Z1-32B-0414' 
                  : 'moonshot-v1-8k'
              }));
            }}
            className={styles.configInput}
          >
            <option value="moonshot">Moonshot</option>
            <option value="siliconflow">SiliconFlow</option>
          </select>
        </div>
        <div className={styles.configInput}>
          <label>API 地址</label>
          <input
            type="text"
            name="apiUrl"
            value={apiConfig.apiUrl}
            onChange={(e) => setApiConfig(prev => ({
              ...prev,
              apiUrl: e.target.value
            }))}
            placeholder="例如: https://api.moonshot.cn/v1/chat/completions"
          />
        </div>
        <div className={styles.configInput}>
          <label>模型选择</label>
          <select
            name="model"
            value={apiConfig.model}
            onChange={(e) => setApiConfig(prev => ({
              ...prev,
              model: e.target.value
            }))}
            className={styles.configInput}
          >
            {allModels
              .filter(model => model.provider === apiConfig.provider)
              .map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name} - {model.description}
                </option>
              ))
            }
          </select>
        </div>
        <button 
          onClick={() => {
            // 保存配置到 localStorage
            localStorage.setItem('chatApiConfig', JSON.stringify({
              apiKey: apiConfig.apiKey,
              apiUrl: apiConfig.apiUrl,
              model: apiConfig.model,
              provider: apiConfig.provider
            }));
            setIsConfigModalOpen(false);
          }}
          className={styles.configButton}
        >
          保存配置
        </button>
        <div className={styles.configHint}>
          <p>{apiConfig.provider === 'siliconflow' ? 'SiliconFlow' : 'Moonshot'}模型说明：</p>
          <ul>
            <li>模型区别主要在于参数规模和性能</li>
            <li>选择适合你需求的模型</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const sendMessage = async () => {
    if (!inputMessage.trim() || !selectedRole) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
    };

    // 检查是否需要重置上下文
    let updatedMessages = [...messages];
    if (messages.length / 2 >= MAX_CONTEXT_TURNS) {
      // 重置时不添加任何提示消息
      updatedMessages = [];
      setContextResetCounter(0);
    }

    // 添加用户消息
    updatedMessages = [
      ...updatedMessages, 
      userMessage
    ];

    setMessages(updatedMessages);
    setContextResetCounter(prev => prev + 1);

    // 重置输入
    setInputMessage('');
    setIsLoading(true);

    try {
      // 构建完整消息列表，包括系统提示词
      const fullMessageList = [
        { 
          role: 'system', 
          content: selectedRole.systemPrompt 
        },
        ...updatedMessages
      ];

      const response = await fetch(apiConfig.apiUrl || getApiEndpoint(apiConfig.provider), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.apiKey}`,
        },
        body: JSON.stringify({
          model: apiConfig.model,
          messages: fullMessageList,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      
      let assistantMessageContent;
      switch(apiConfig.provider) {
        case 'siliconflow':
          if (data.code && data.code !== 0) {
            console.error('SiliconFlow API Error:', data);
            assistantMessageContent = `API错误：${data.message || '未知错误'}`;
          } else {
            assistantMessageContent = data.choices && data.choices[0] 
              ? data.choices[0].message.content 
              : '未能获取到响应。';
          }
          break;
        case 'moonshot':
        default:
          assistantMessageContent = data.choices && data.choices[0] 
            ? data.choices[0].message.content 
            : '未能获取到响应。';
      }

      if (!assistantMessageContent) {
        console.error('Unexpected API Response:', data);
        assistantMessageContent = '抱歉，无法处理API响应。请检查模型和配置。';
      }

      // 分割消息并逐步显示
      const messageChunks = splitMessageIntoChunks(assistantMessageContent);
      
      // 逐步显示消息
      const displayChunksSequentially = async () => {
        for (const chunk of messageChunks) {
          await new Promise(resolve => {
            setTypingMessage({
              role: 'assistant',
              content: chunk
            });

            // 等待一段时间后添加到完整消息列表
            setTimeout(() => {
              setMessages(prev => [...prev, {
                role: 'assistant',
                content: chunk
              }]);
              setTypingMessage(null);
              resolve();
            }, 1000); // 每个消息块之间停顿1秒
          });
        }
        setIsLoading(false);
      };

      displayChunksSequentially();

    } catch (error) {
      console.error('Network or Fetch Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `网络错误：${error.message || '无法连接到服务器'}`,
      }]);
      setIsLoading(false);
    }
  };

  // 分割长消息的函数
  const splitMessageIntoChunks = (message, minLength = 50, maxLength = 150) => {
    // 如果消息很短，直接返回
    if (message.length <= maxLength) {
      return [message];
    }

    const sentences = message.split(/([。！？.!?])\s*/g);
    const chunks = [];
    let currentChunk = '';

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      
      // 处理标点符号
      if (['。', '！', '？', '.', '!', '?'].includes(sentence)) {
        if (currentChunk) {
          currentChunk += sentence;
        }
        continue;
      }

      const potentialChunk = currentChunk ? currentChunk + sentence : sentence;
      
      // 动态调整分割策略
      if (
        potentialChunk.length >= minLength && 
        (chunks.length === 0 || potentialChunk.length >= minLength) && 
        (chunks.length === 0 || chunks[chunks.length - 1].length >= minLength)
      ) {
        // 如果当前块足够长，或者是第一个块
        if (potentialChunk.length > maxLength) {
          // 如果超过最大长度，先保存当前块
          if (currentChunk) {
            chunks.push(currentChunk);
          }
          currentChunk = sentence;
        } else {
          currentChunk = potentialChunk;
        }

        // 当块足够长时添加到结果
        if (currentChunk.length >= minLength) {
          chunks.push(currentChunk);
          currentChunk = '';
        }
      } else {
        // 继续累积当前块
        currentChunk = potentialChunk;
      }

      // 处理最后一个块
      if (i === sentences.length - 1 && currentChunk) {
        chunks.push(currentChunk);
      }
    }

    // 如果最后一个块太短，尝试合并
    if (chunks.length > 1 && chunks[chunks.length - 1].length < minLength) {
      const lastChunk = chunks.pop();
      chunks[chunks.length - 1] += lastChunk;
    }

    // 确保至少有一个块
    return chunks.length > 0 ? chunks : [message];
  };

  // 渲染消息，包括角色头像
  const renderMessage = (message, index) => {
    const isUser = message.role === 'user';
    const avatar = isUser 
      ? '/img/logo.jpg' // 用户头像
      : (selectedRole ? selectedRole.avatar : '');

    return (
      <div 
        key={index} 
        className={`${styles.message} ${
          isUser ? styles.userMessage : styles.aiMessage
        }`}
      >
        {!isUser && selectedRole && (
          <img 
            src={avatar} 
            alt={selectedRole.name} 
            className={styles.messageAvatar} 
          />
        )}
        <div className={styles.messageContent}>
          {message.content}
        </div>
      </div>
    );
  };

  return (
    <Layout title="角色扮演聊天" description="选择角色进行对话">
      <div className={styles.chatContainer}>
        {!selectedRole ? (
          <RoleSelector />
        ) : (
          <>
            {isConfigModalOpen && <ApiConfigModal />}
            <div className={styles.chatHeader}>
              <h2>{selectedRole.name}</h2>
              <div className={styles.headerActions}>
                <span className={styles.contextCounter}>
                  死亡倒计时: {contextResetCounter}/{MAX_CONTEXT_TURNS}
                </span>
                <button 
                  onClick={() => setIsConfigModalOpen(true)}
                  className={styles.configButton}
                >
                  配置API
                </button>
              </div>
            </div>
            <div className={styles.messagesContainer}>
              {messages.map(renderMessage)}
              {typingMessage && (
                <div 
                  className={`${styles.message} ${styles.aiMessage}`}
                >
                  {selectedRole && (
                    <img 
                      src={selectedRole.avatar} 
                      alt={selectedRole.name} 
                      className={styles.messageAvatar} 
                    />
                  )}
                  <div className={styles.messageContent}>
                    <TypingText text={typingMessage.content} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
              {isLoading && !typingMessage && (
                <div className={styles.loadingMessage}>
                  处理中...
                </div>
              )}
            </div>
            <div className={styles.inputContainer}>
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="灌注消息..."
              />
              <button 
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
              >
                发射
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default function Chat() {
  return (
    <RoleProvider>
      <ChatComponent />
    </RoleProvider>
  );
} 