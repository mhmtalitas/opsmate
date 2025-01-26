import { useState } from 'react'
import devopsTools from '../data/devops-tools.json'
import CopyButton from './CopyButton'
import CommandBlock from './CommandBlock'
import installationGuides from '../data/installation-guides.json'

// Apache kurulum adımları
const apacheSetupAWS = {
  title: "AWS Linux'ta Apache Kurulumu",
  steps: [
    {
      command: "sudo apt update && sudo apt upgrade -y",
      description: "Sistem paketlerini güncelle",
      explanation: "Bu komut, sistemdeki tüm paketleri en son sürümlerine günceller ve güvenlik yamalarını yükler."
    },
    {
      command: "sudo apt install apache2 -y",
      description: "Apache'yi yükle",
      explanation: "Apache web sunucusunu ve gerekli bağımlılıklarını otomatik olarak yükler."
    },
    {
      command: "sudo systemctl start apache2",
      description: "Apache'yi başlat",
      explanation: "Apache servisini başlatır ve web sunucusunu aktif hale getirir."
    },
    {
      command: "sudo systemctl enable apache2",
      description: "Otomatik başlatmayı etkinleştir",
      explanation: "Sistem yeniden başlatıldığında Apache'nin otomatik olarak başlamasını sağlar."
    },
    {
      command: "sudo ufw allow 'Apache Full'",
      description: "Güvenlik duvarı kurallarını ayarla",
      explanation: "HTTP (80) ve HTTPS (443) portlarına gelen trafiğe izin verir."
    }
  ],
  notes: [
    "Kurulumdan sonra http://sunucu-ip-adresi adresini ziyaret ederek test edin",
    "AWS güvenlik grubunda 80 ve 443 portlarının açık olduğundan emin olun",
    "Varsayılan web dizini: /var/www/html/"
  ]
};

// InstallationSteps bileşenini ekleyelim
const InstallationSteps = ({ guide, provider, technology }) => {
  if (!guide) return null;

  return (
    <div className="space-y-8">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {technology} Kurulum Rehberi
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({provider})
          </span>
        </h2>
      </div>

      {/* Gereksinimler */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Sistem Gereksinimleri
        </h3>
        <ul className="space-y-3">
          {guide.requirements?.map((req, index) => (
            <li key={index} className="flex items-start text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Kurulum Adımları */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Kurulum Adımları
        </h3>
        <div className="space-y-4">
          {guide.commands?.map((cmd, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
            >
              {/* Adım Numarası ve Açıklama */}
              <div className="flex items-center mb-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {cmd.description}
                </span>
              </div>

              {/* Komut ve Kopyalama Butonu */}
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                  {cmd.command}
                </code>
                <CopyButton text={cmd.command} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kurulum Sonrası */}
      {guide.postInstallation && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Kurulum Sonrası Adımlar
          </h3>
          <ul className="space-y-3">
            {guide.postInstallation.map((step, index) => (
              <li key={index} className="flex items-start text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sorun Giderme */}
      {guide.troubleshooting && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Sorun Giderme
          </h3>
          <div className="space-y-4">
            {guide.troubleshooting.map((issue, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">
                  {issue.problem}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {issue.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Özel bir dropdown bileşeni oluşturalım
const StyledDropdown = ({ label, value, options, onChange }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 
                rounded-xl py-3 px-4 appearance-none cursor-pointer
                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
                hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
    >
      {Object.entries(options).map(([key, label]) => (
        <option key={key} value={key}>{label}</option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-400 mt-8">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

// Adım kartı bileşeni
const StepCard = ({ step, index }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
        {index + 1}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          {step.description}
        </h3>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-3 group hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
              {step.command}
            </code>
            <CopyButton text={step.command} />
          </div>
        </div>
        {step.note && (
          <p className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            💡 {step.note}
          </p>
        )}
      </div>
    </div>
  </div>
);

function ToolGuide() {
  const [selectedOS, setSelectedOS] = useState('windows')
  const [selectedTool, setSelectedTool] = useState(devopsTools.tools[0])
  const [selectedProvider, setSelectedProvider] = useState('aws')
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedTaskOption, setSelectedTaskOption] = useState(null)

  const osNames = {
    windows: 'Windows',
    macos: 'macOS'
  }

  const providers = {
    aws: 'Amazon Web Services',
    gcp: 'Google Cloud Platform',
    azure: 'Microsoft Azure',
    digitalocean: 'DigitalOcean'
  }

  const tasks = {
    webserver: {
      id: 'webserver',
      name: 'Web Sunucu',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      options: ['NGINX', 'Apache']
    },
    database: {
      id: 'database',
      name: 'Veritabanı',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z" />
        </svg>
      ),
      options: ['MySQL', 'PostgreSQL', 'MongoDB']
    },
    language: {
      id: 'language',
      name: 'Programlama Dili',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      options: ['PHP', 'Node.js', 'Python', 'Ruby']
    },
    container: {
      id: 'container',
      name: 'Konteyner',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      options: ['Docker', 'Kubernetes']
    }
  }

  // Function to get tool icon based on ID
  const getToolIcon = (toolId) => {
    switch (toolId) {
      case 'docker':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 7h2v2h-2V7zM9 7h2v2H9V7zM5 7h2v2H5V7zM13 3h2v2h-2V3zM9 3h2v2H9V3zM5 3h2v2H5V3zM17 7h2v2h-2V7zM17 3h2v2h-2V3zM21 11H3c0-3.9 3.1-7 7-7h4c3.9 0 7 3.1 7 7z"/>
          </svg>
        )
      case 'kubernetes':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zM5 15.5l6 3.3v-3.6l-6-3.3v3.6zm7-10.4L5.8 8.3l6.2 3.4 6.2-3.4L12 5.1z"/>
          </svg>
        )
      case 'nginx':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 19.5h4L12 6l6 13.5h4L12 2zm0 9.5L8 19.5h8l-4-8z"/>
          </svg>
        )
      case 'jenkins':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.2 2c-1.7 0-3 1.3-3 3v14c0 1.7 1.3 3 3 3h9.6c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3H7.2zm.8 3h8v2H8V5zm0 4h8v2H8V9zm0 4h8v2H8v-2zm0 4h4v2H8v-2z"/>
          </svg>
        )
      case 'aws-cli':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.7 12.4c-.1-.3-.3-.5-.6-.6l-3.2-1v-.8c.9-.7 1.5-1.8 1.5-3C16.4 5 15 3.6 13 3.6S9.6 5 9.6 7c0 1.2.6 2.3 1.5 3v.8l-3.2 1c-.3.1-.5.3-.6.6L4 20h16l-1.3-7.6zM13 5.6c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4z"/>
          </svg>
        )
      case 'gcloud':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L4 7.8V16.2L12 21l8-4.8V7.8L12 3zm-6 12.8v-7.2l6-3.6 6 3.6v7.2l-6 3.6-6-3.6z"/>
            <path d="M12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        )
      case 'git':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.62 11.108l-8.731-8.729a1.292 1.292 0 00-1.823 0L9.257 4.19l2.299 2.3a1.532 1.532 0 011.939 1.95l2.214 2.217a1.53 1.53 0 11-.919.919l-2.065-2.064v5.418a1.533 1.533 0 11-1.258-.044V9.342a1.53 1.53 0 01-.83-2.005L8.38 5.079l-5.99 5.99a1.292 1.292 0 000 1.823l8.731 8.729a1.292 1.292 0 001.823 0l8.676-8.676a1.292 1.292 0 000-1.823"/>
          </svg>
        )
      default:
        return null
    }
  }

  // OS ikonları için yeni bir fonksiyon
  const getOSIcon = (os) => {
    switch (os) {
      case 'windows':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 5.557l7.357-.967.004 7.097-7.354.042L3 5.557zm7.354 6.913l.007 7.103-7.354-.974-.001-6.173 7.348.044zm.885-8.074L21.001 3v8.562l-9.762.077-.001-7.243zM21 12.421L21.002 21l-9.762-1.396-.013-7.134L21 12.421z"/>
          </svg>
        )
      case 'macos':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        )
      default:
        return null
    }
  }

  // Provider ikonları için yeni fonksiyon
  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'aws':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.75 11.35a4.32 4.32 0 0 1-.79-.08 3.9 3.9 0 0 1-.73-.23l-.17-.08-.37.43a5.25 5.25 0 0 1-4.32 2.25 5.31 5.31 0 0 1-4.33-2.25l-.37-.43-.17.08a3.9 3.9 0 0 1-.73.23 4.32 4.32 0 0 1-.79.08A4.45 4.45 0 0 1 2 6.95a4.45 4.45 0 0 1 4.45-4.4 4.45 4.45 0 0 1 4.45 4.4v.85l.65-.65a5.18 5.18 0 0 1 7.35 0l.65.65v-.85a4.45 4.45 0 0 1 4.45-4.4A4.45 4.45 0 0 1 22 6.95a4.45 4.45 0 0 1-3.25 4.4z"/>
          </svg>
        )
      case 'gcp':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L4 7.8V16.2L12 21l8-4.8V7.8L12 3zm-6 12.8v-7.2l6-3.6 6 3.6v7.2l-6 3.6-6-3.6z"/>
          </svg>
        )
      case 'azure':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.483 21c-.629 0-1.111-.537-.99-1.145l4.345-21.71c.088-.438.47-.753.915-.753h4.494c.445 0 .827.315.915.753l4.345 21.71c.121.608-.361 1.145-.99 1.145h-12.034z"/>
          </svg>
        )
      case 'digitalocean':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12 6.627 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm0 18.384c-3.914 0-7.088-3.174-7.088-7.088 0-3.914 3.174-7.088 7.088-7.088 3.914 0 7.088 3.174 7.088 7.088 0 3.914-3.174 7.088-7.088 7.088z"/>
          </svg>
        )
      default:
        return null
    }
  }

  const handleToolSelect = (tool) => {
    setSelectedTool(tool)
  }

  // getInstallationGuide fonksiyonunu güncelleyelim
  const getInstallationGuide = (os, provider, task, taskOption) => {
    if (!task || !taskOption) return null

    // installation-guides.json'dan ilgili rehberi al
    const guide = installationGuides[taskOption.toLowerCase()]?.[provider]?.linux

    if (!guide) return null

    return {
      requirements: guide.requirements,
      commands: guide.commands
    }
  }

  // Yeni fonksiyon: Komutları getir
  const getCommandGuide = (os, provider, task, taskOption) => {
    if (!task || !taskOption) return null

    const commands = {
      webserver: {
        NGINX: {
          aws: [
            {
              command: 'sudo apt update && sudo apt upgrade -y',
              description: 'Sistem paketlerini güncelle'
            },
            {
              command: 'sudo apt install nginx -y',
              description: 'NGINX\'i yükle'
            },
            {
              command: 'sudo systemctl start nginx',
              description: 'NGINX servisini başlat'
            },
            {
              command: 'sudo systemctl enable nginx',
              description: 'NGINX\'i sistem başlangıcında otomatik başlat'
            }
          ],
          gcp: [
            {
              command: 'sudo apt update && sudo apt upgrade -y',
              description: 'Sistem paketlerini güncelle'
            },
            {
              command: 'sudo apt install nginx -y',
              description: 'NGINX\'i yükle'
            },
            {
              command: 'sudo ufw allow \'Nginx HTTP\'',
              description: 'Firewall\'da HTTP portunu aç'
            }
          ]
        },
        Apache: {
          aws: [
            {
              command: 'sudo apt update',
              description: 'Sistem paketlerini güncelle'
            },
            {
              command: 'sudo apt install apache2 -y',
              description: 'Apache\'yi yükle'
            },
            {
              command: 'sudo systemctl start apache2',
              description: 'Apache servisini başlat'
            }
          ]
        }
      },
      database: {
        MySQL: {
          aws: [
            {
              command: 'sudo apt update',
              description: 'Sistem paketlerini güncelle'
            },
            {
              command: 'sudo apt install mysql-server -y',
              description: 'MySQL sunucusunu yükle'
            },
            {
              command: 'sudo mysql_secure_installation',
              description: 'MySQL güvenlik yapılandırmasını başlat'
            }
          ]
        },
        PostgreSQL: {
          aws: [
            {
              command: 'sudo apt update',
              description: 'Sistem paketlerini güncelle'
            },
            {
              command: 'sudo apt install postgresql postgresql-contrib -y',
              description: 'PostgreSQL\'i yükle'
            },
            {
              command: 'sudo systemctl start postgresql',
              description: 'PostgreSQL servisini başlat'
            }
          ]
        }
      }
      // ... diğer görevler için komutlar
    }

    return commands[task]?.[taskOption]?.[provider] || []
  }

  // Önerilen teknolojileri getiren fonksiyon
  const getSuggestions = (provider, task, taskOption) => {
    const suggestions = {
      webserver: {
        NGINX: {
          aws: [
            {
              title: 'AWS Security Groups',
              description: 'Güvenlik grubu oluşturarak NGINX sunucunuzu koruyun',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              link: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html'
            },
            {
              title: 'AWS Route 53',
              description: 'Domain yönetimi ve DNS yapılandırması için Route 53 kullanın',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              ),
              link: 'https://aws.amazon.com/route53/'
            }
          ],
          gcp: [
            {
              title: 'Cloud Armor',
              description: 'DDoS koruması ve Web Application Firewall için Cloud Armor kullanın',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                </svg>
              ),
              link: 'https://cloud.google.com/armor'
            }
          ]
        }
      },
      container: {
        Docker: {
          all: [
            {
              title: 'Kubernetes',
              description: 'Konteyner orkestrasyonu için Kubernetes\'i düşünün',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              link: 'https://kubernetes.io'
            },
            {
              title: 'Jenkins',
              description: 'CI/CD pipeline\'ları için Jenkins kullanın',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              ),
              link: 'https://www.jenkins.io'
            }
          ]
        }
      }
    }

    const providerSuggestions = suggestions[task]?.[taskOption]?.[provider] || []
    const generalSuggestions = suggestions[task]?.[taskOption]?.all || []

    return [...providerSuggestions, ...generalSuggestions]
  }

  // Sağlayıcıya göre teknolojileri filtreleme
  const getAvailableTechnologies = (provider) => {
    const techMap = {
      aws: {
        webserver: ['NGINX', 'Apache', 'Lighttpd'],
        database: ['MySQL', 'PostgreSQL', 'Amazon RDS', 'MongoDB'],
        language: ['PHP', 'Node.js', 'Python', 'Ruby'],
        container: ['Docker', 'Amazon ECS', 'Amazon EKS']
      },
      gcp: {
        webserver: ['NGINX', 'Apache', 'Cloud Run'],
        database: ['MySQL', 'PostgreSQL', 'Cloud SQL', 'MongoDB'],
        language: ['PHP', 'Node.js', 'Python', 'Go'],
        container: ['Docker', 'Google Kubernetes Engine', 'Cloud Run']
      },
      azure: {
        webserver: ['NGINX', 'Apache', 'IIS'],
        database: ['MySQL', 'PostgreSQL', 'Azure SQL', 'CosmosDB'],
        language: ['PHP', 'Node.js', 'Python', '.NET'],
        container: ['Docker', 'Azure Kubernetes Service', 'Container Instances']
      },
      digitalocean: {
        webserver: ['NGINX', 'Apache'],
        database: ['MySQL', 'PostgreSQL', 'MongoDB'],
        language: ['PHP', 'Node.js', 'Python', 'Ruby'],
        container: ['Docker', 'DOKS (DigitalOcean Kubernetes)']
      }
    }

    return techMap[provider] || {}
  }

  // Task Options bölümünü güncelleyelim
  const renderTaskOptions = () => {
    if (!selectedTask || !selectedProvider) return null

    const availableTech = getAvailableTechnologies(selectedProvider)[selectedTask] || []

    return (
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
          Kullanılabilir Teknolojiler
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {availableTech.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTaskOption(tech)}
              className={`p-3 rounded-xl text-sm transition-colors duration-200
                ${selectedTaskOption === tech
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md'
                  : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
                flex items-center justify-center text-center`}
            >
              {getTechIcon(tech)}
              <span className="ml-2">{tech}</span>
            </button>
          ))}
        </div>
        {selectedTaskOption && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-300">
              <span className="font-medium">{selectedTaskOption}</span> seçildi - {selectedProvider} üzerinde kurulum için rehberi görüntüleyin
            </p>
          </div>
        )}
      </div>
    )
  }

  // Teknoloji ikonları için yardımcı fonksiyon
  const getTechIcon = (tech) => {
    const icons = {
      'NGINX': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      'Docker': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      // ... diğer teknolojiler için ikonlar
    }

    return icons[tech] || null
  }

  // Apache kurulum rehberini render et
  const renderApacheGuide = () => {
    if (selectedTaskOption !== 'Apache' || selectedProvider !== 'aws') return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {apacheSetupAWS.title}
        </h2>

        {/* Kurulum Adımları */}
        <div className="space-y-6">
          {apacheSetupAWS.steps.map((step, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              {/* Adım Numarası ve Açıklama */}
              <div className="flex items-center mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <h3 className="ml-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                  {step.description}
                </h3>
              </div>

              {/* Komut */}
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3">
                <code className="font-mono text-blue-600 dark:text-blue-400">
                  {step.command}
                </code>
                <CopyButton text={step.command} />
              </div>

              {/* Açıklama */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.explanation}
              </p>
            </div>
          ))}
        </div>

        {/* Notlar */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-4">
            Önemli Notlar
          </h3>
          <ul className="space-y-2">
            {apacheSetupAWS.notes.map((note, index) => (
              <li key={index} className="flex items-start text-blue-600 dark:text-blue-400">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* OS Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  İşletim Sistemi
                </h3>
                <div className="flex justify-center gap-4">
                  {Object.entries(osNames).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setSelectedOS(value)}
                      className={`flex flex-col items-center p-4 rounded-xl transition-colors duration-200
                        ${selectedOS === value
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      title={label}
                    >
                      <span className={`${selectedOS === value ? 'text-white' : 'text-blue-500 dark:text-blue-300'}`}>
                        {getOSIcon(value)}
                      </span>
                      <span className="mt-2 text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Provider Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Sunucu Sağlayıcı
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(providers).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setSelectedProvider(value)}
                      className={`flex flex-col items-center p-4 rounded-xl transition-colors duration-200
                        ${selectedProvider === value
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      title={label}
                    >
                      <span className={`${selectedProvider === value ? 'text-white' : 'text-blue-500 dark:text-blue-300'}`}>
                        {getProviderIcon(value)}
                      </span>
                      <span className="mt-2 text-sm font-medium text-center">
                        {label.split(' ').map((word, i) => (
                          <span key={i} className="block">{word}</span>
                        ))}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Task Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Görev Seçimi
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.values(tasks).map((task) => (
                    <button
                      key={task.id}
                      onClick={() => setSelectedTask(task.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-colors duration-200
                        ${selectedTask === task.id
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                      <span className={`${selectedTask === task.id ? 'text-white' : 'text-blue-500 dark:text-blue-300'}`}>
                        {task.icon}
                      </span>
                      <span className="mt-2 text-sm font-medium">{task.name}</span>
                    </button>
                  ))}
                </div>

                {/* Task Options */}
                {selectedTask && renderTaskOptions()}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedTaskOption && (
              <InstallationSteps
                guide={getInstallationGuide(selectedOS, selectedProvider, selectedTask, selectedTaskOption)}
                provider={providers[selectedProvider]}
                technology={selectedTaskOption}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolGuide 