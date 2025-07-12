function SettingsPanel() {
  try {
    const [settings, setSettings] = React.useState({
      defaultVendor: 'openai',
      apiKeys: {
        openai: '',
        anthropic: '',
        google: '',
        custom: ''
      },
      preferences: {
        autoSave: true,
        darkMode: true,
        notifications: true
      }
    });

    const vendors = [
      { id: 'openai', name: 'OpenAI GPT', icon: 'brain' },
      { id: 'anthropic', name: 'Anthropic Claude', icon: 'cpu' },
      { id: 'google', name: 'Google Gemini', icon: 'search' },
      { id: 'custom', name: 'Custom API', icon: 'settings' }
    ];

    const handleApiKeyChange = (vendor, value) => {
      setSettings(prev => ({
        ...prev,
        apiKeys: { ...prev.apiKeys, [vendor]: value }
      }));
    };

    const handlePreferenceChange = (key, value) => {
      setSettings(prev => ({
        ...prev,
        preferences: { ...prev.preferences, [key]: value }
      }));
    };

    const saveSettings = () => {
      localStorage.setItem('videoPromptSettings', JSON.stringify(settings));
      alert('Pengaturan berhasil disimpan!');
    };

    React.useEffect(() => {
      try {
        const saved = localStorage.getItem('videoPromptSettings');
        if (saved) {
          setSettings(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }, []);

    return (
      <div className="space-y-6" data-name="settings-panel" data-file="components/SettingsPanel.js">
        <div className="card-glass">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <div className="icon-settings text-2xl mr-3"></div>
            Pengaturan AI Vendor
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white/90 font-medium mb-3">Vendor AI Default</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vendors.map(vendor => (
                  <button
                    key={vendor.id}
                    onClick={() => setSettings(prev => ({ ...prev, defaultVendor: vendor.id }))}
                    className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${
                      settings.defaultVendor === vendor.id
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <div className={`icon-${vendor.icon} text-xl mr-3`}></div>
                    {vendor.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">API Keys</h3>
              <div className="space-y-3">
                {vendors.map(vendor => (
                  <div key={vendor.id}>
                    <label className="block text-white/80 text-sm mb-1">{vendor.name}</label>
                    <input
                      type="password"
                      value={settings.apiKeys[vendor.id]}
                      onChange={(e) => handleApiKeyChange(vendor.id, e.target.value)}
                      placeholder={`Masukkan ${vendor.name} API key...`}
                      className="input-modern"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Preferensi</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-white/80">Auto-save Favorites</span>
                  <input
                    type="checkbox"
                    checked={settings.preferences.autoSave}
                    onChange={(e) => handlePreferenceChange('autoSave', e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-white/80">Dark Mode</span>
                  <input
                    type="checkbox"
                    checked={settings.preferences.darkMode}
                    onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-white/80">Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.preferences.notifications}
                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={saveSettings}
              className="btn-primary w-full"
            >
              <span className="flex items-center justify-center">
                <div className="icon-save text-xl mr-2"></div>
                Simpan Pengaturan
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SettingsPanel component error:', error);
    return null;
  }
}