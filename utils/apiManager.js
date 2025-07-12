class APIManager {
  constructor() {
    this.settings = this.loadSettings();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('videoPromptSettings');
      return saved ? JSON.parse(saved) : {
        defaultVendor: 'openai',
        apiKeys: {
          openai: '',
          anthropic: '',
          google: '',
          custom: ''
        },
        preferences: { autoSave: true, darkMode: true, notifications: true }
      };
    } catch {
      return { 
        defaultVendor: 'openai', 
        apiKeys: {
          openai: '',
          anthropic: '',
          google: '',
          custom: ''
        }, 
        preferences: { autoSave: true, darkMode: true, notifications: true } 
      };
    }
  }

  async generatePrompt(systemPrompt, userPrompt) {
    try {
      // Use the built-in invokeAIAgent function
      return await invokeAIAgent(systemPrompt, userPrompt);
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Gagal menghasilkan prompt. Silakan coba lagi.');
    }
  }

  getVendorInfo() {
    return {
      openai: { name: 'OpenAI GPT', status: 'active' },
      anthropic: { name: 'Anthropic Claude', status: 'available' },
      google: { name: 'Google Gemini', status: 'available' },
      custom: { name: 'Custom API', status: 'configurable' }
    };
  }
}

const apiManager = new APIManager();