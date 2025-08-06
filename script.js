// Initialize Feather Icons
feather.replace();

// Profile Image Cycling
let currentImageIndex = 0;
const profileImages = [
  '', // SP text (no image)
  'profile-img/image1.jpg',
  'profile-img/image2.jpg',
  'profile-img/image3.jpg'
];

function cycleProfileImage() {
  currentImageIndex = (currentImageIndex + 1) % profileImages.length;
  
  const desktopProfile = document.getElementById('desktop-profile');
  const mobileProfile = document.getElementById('mobile-profile');
  
  if (currentImageIndex === 0) {
    // Show SP text
    if (desktopProfile) {
      desktopProfile.style.backgroundImage = '';
      desktopProfile.textContent = 'SP';
      desktopProfile.classList.remove('has-image');
    }
    if (mobileProfile) {
      mobileProfile.style.backgroundImage = '';
      mobileProfile.textContent = 'SP';
      mobileProfile.classList.remove('has-image');
    }
  } else {
    // Show image
    const imageUrl = profileImages[currentImageIndex];
    if (desktopProfile) {
      desktopProfile.style.backgroundImage = `url('${imageUrl}')`;
      desktopProfile.textContent = '';
      desktopProfile.classList.add('has-image');
    }
    if (mobileProfile) {
      mobileProfile.style.backgroundImage = `url('${imageUrl}')`;
      mobileProfile.textContent = '';
      mobileProfile.classList.add('has-image');
    }
  }
}

// Theme Toggle Functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');
  const desktopThemeIcon = document.getElementById('desktop-theme-icon');
  
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    if (themeIcon) themeIcon.setAttribute('data-feather', 'moon');
    if (mobileThemeIcon) mobileThemeIcon.setAttribute('data-feather', 'moon');
    if (desktopThemeIcon) desktopThemeIcon.setAttribute('data-feather', 'moon');
    localStorage.setItem('theme', 'dark');
  } else {
    if (themeIcon) themeIcon.setAttribute('data-feather', 'sun');
    if (mobileThemeIcon) mobileThemeIcon.setAttribute('data-feather', 'sun');
    if (desktopThemeIcon) desktopThemeIcon.setAttribute('data-feather', 'sun');
    localStorage.setItem('theme', 'light');
  }
  
  feather.replace();
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');
  const desktopThemeIcon = document.getElementById('desktop-theme-icon');
  
  if (themeIcon) themeIcon.setAttribute('data-feather', 'moon');
  if (mobileThemeIcon) mobileThemeIcon.setAttribute('data-feather', 'moon');
  if (desktopThemeIcon) desktopThemeIcon.setAttribute('data-feather', 'moon');
  feather.replace();
}

// Auto-cycle profile image every 5 seconds
setInterval(cycleProfileImage, 5000);

// Circular Text Animation
const createAnimation = ({
  duration = 21,
  reversed = false,
  target,
  text,
  textProperties = undefined
}) => {
  const pathId = `path-${Math.floor(Math.random() * 900000) + 100000}`;
  const props = { duration, ease: "none", repeat: -1 };

  gsap.set(target.querySelector("path"), {
    attr: { fill: "none", id: pathId, stroke: "none" }
  });

  target.insertAdjacentHTML(
    "beforeend",
    `
      <text>
        <textPath href='#${pathId}' startOffset="0%">${text}</textPath>
        <textPath href='#${pathId}' startOffset="0%">${text}</textPath>
      </text>
      `
  );

  if (textProperties) {
    gsap.set(target.querySelectorAll("textPath"), textProperties);
  }

  gsap.fromTo(
    target.querySelectorAll("textPath")[0],
    { attr: { startOffset: "0%" } },
    { attr: { startOffset: reversed ? "-100%" : "100%" }, ...props }
  );
  gsap.fromTo(
    target.querySelectorAll("textPath")[1],
    { attr: { startOffset: reversed ? "100%" : "-100%" } },
    { attr: { startOffset: "0%" }, ...props }
  );
};

// Initialize circular text animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const ellipseElement = document.querySelector(".ellipse svg");
  if (ellipseElement) {
    createAnimation({
      duration: 20,
      reversed: true,
      target: ellipseElement,
      text: "★ EXPLORE WORKS ★ EXPLORE WORKS  ",
      textProperties: { 
        fontSize: /iPhone/.test(navigator.userAgent) ? "14px" : "13px",
        letterSpacing: "7px",
        dominantBaseline: "middle",
        textAnchor: "start"
      }
    });
  }
});

// Developer Todo List Animation
const todoTasks = [
  { text: "DSA Problem", icon: "code", priority: "high", completed: false },
  { text: "Apply to Google SWE Role", icon: "briefcase", priority: "high", completed: false },
  { text: "Build AI Chat Agent", icon: "cpu", priority: "medium", completed: false },
  { text: "Deploy Portfolio to AWS", icon: "cloud", priority: "medium", completed: false },
  { text: "Code Review for Team", icon: "users", priority: "low", completed: false },
  { text: "Update LinkedIn Profile", icon: "linkedin", priority: "low", completed: false },
  { text: "Practice System Design", icon: "layers", priority: "high", completed: false },
  { text: "Learn Next.js 14", icon: "book", priority: "medium", completed: false }
];

class TodoListAnimator {
  constructor() {
    this.currentTaskIndex = 0;
    this.displayedTasks = [];
    this.todoContainer = document.getElementById('todo-items');
    this.taskCompletionTimer = null;
  }

  addTodoItem(task, delay = 0) {
    setTimeout(() => {
      if (!this.todoContainer) return;

      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      todoItem.style.animationDelay = '0s';
      
      todoItem.innerHTML = `
        <i data-feather="${task.icon}" class="todo-icon"></i>
        <span class="todo-text">${task.text}</span>
        <span class="priority ${task.priority}">${task.priority.toUpperCase()}</span>
      `;

      this.todoContainer.appendChild(todoItem);
      this.displayedTasks.push({ element: todoItem, task: task });

      // Re-render feather icons
      feather.replace();

      // Remove old tasks if more than 4 displayed
      if (this.displayedTasks.length > 4) {
        const oldTask = this.displayedTasks.shift();
        oldTask.element.style.animation = 'todoSlideOut 0.4s ease-in forwards';
        setTimeout(() => {
          if (oldTask.element.parentNode) {
            oldTask.element.parentNode.removeChild(oldTask.element);
          }
        }, 400);
      }

      // Schedule task completion
      setTimeout(() => {
        this.completeTask(todoItem);
      }, 4000 + Math.random() * 3000); // Complete after 4-7 seconds

    }, delay);
  }

  completeTask(todoElement) {
    todoElement.classList.add('completed');
    
    // Add strikethrough animation
    const todoText = todoElement.querySelector('.todo-text');
    if (todoText) {
      todoText.style.position = 'relative';
      todoText.style.overflow = 'hidden';
      
      const strikethrough = document.createElement('div');
      strikethrough.style.position = 'absolute';
      strikethrough.style.top = '50%';
      strikethrough.style.left = '0';
      strikethrough.style.width = '100%';
      strikethrough.style.height = '1px';
      strikethrough.style.background = '#00ff88';
      strikethrough.style.transform = 'scaleX(0)';
      strikethrough.style.transformOrigin = 'left';
      strikethrough.style.animation = 'todoStrikethrough 0.6s ease-out forwards';
      
      todoText.appendChild(strikethrough);
    }
  }

  startTodoAnimation() {
    // Add initial tasks with staggered delays
    this.addTodoItem(todoTasks[0], 1000);
    this.addTodoItem(todoTasks[1], 2000);
    this.addTodoItem(todoTasks[2], 3000);

    // Continue adding tasks every 8 seconds
    setInterval(() => {
      this.currentTaskIndex = (this.currentTaskIndex + 1) % todoTasks.length;
      this.addTodoItem(todoTasks[this.currentTaskIndex]);
    }, 8000);
  }
}

// Add CSS for slide out animation
const style = document.createElement('style');
style.textContent = `
  @keyframes todoSlideOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;
document.head.appendChild(style);

// Mac Terminal Animation
const macCommands = [
  "npm install",
  "git add .",
  "git commit -m \"Initial commit\"",
  "git push origin main",
  "npm run dev"
];

const macOutputs = {
  "npm install": [
    "added 243 packages, and audited 243 packages in 4s",
    "found 0 vulnerabilities"
  ],
  "git add .": [
    "(no output)"
  ],
  "git commit -m \"Initial commit\"": [
    "[main (root-commit) abc1234] Initial commit",
    " 5 files changed, 120 insertions(+)",
    " create mode 100644 index.html",
    " create mode 100644 style.css",
    " create mode 100644 app.js"
  ],
  "git push origin main": [
    "Enumerating objects: 6, done.",
    "Counting objects: 100% (6/6), done.",
    "Delta compression using up to 12 threads",
    "Compressing objects: 100% (5/5), done.",
    "Writing objects: 100% (6/6), 1.23 KiB | 1.23 MiB/s, done.",
    "Total 6 (delta 0), reused 0 (delta 0), pack-reused 0",
    "To github.com:saketh/portfolio.git",
    " * [new branch]      main -> main"
  ],
  "npm run dev": [
    "> portfolio@1.0.0 dev",
    "> vite",
    "",
    "  VITE v4.2.0  ready in 1404 ms",
    "",
    "  ➜  Local:   http://localhost:5173/",
    "  ➜  Network: use --host to expose",
    "  ➜  press h to show help"
  ]
};

class MacTerminalAnimator {
  constructor() {
    this.currentCommandIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.commandElement = document.getElementById('mac-animated-command');
    this.contentElement = document.getElementById('mac-terminal-content');
  }

  addLine(text, type = 'output') {
    if (!this.contentElement) return;
    
    const newLine = document.createElement('div');
    newLine.classList.add('mac-terminal-line', type);
    newLine.textContent = text;
    this.contentElement.appendChild(newLine);
    
    // Auto-scroll by removing old lines if more than 6 lines (to prevent height growth)
    const lines = this.contentElement.querySelectorAll('.mac-terminal-line');
    if (lines.length > 6) {
      this.contentElement.removeChild(lines[0]);
    }
  }

  addOutput(command) {
    const outputs = macOutputs[command] || [];
    
    // Add the command line first
    this.addLine(command, 'command');
    
    // Add output lines with delay
    outputs.forEach((line, index) => {
      setTimeout(() => {
        this.addLine(line, 'output');
      }, (index + 1) * 100);
    });
  }

  type() {
    if (!this.commandElement) return;
    
    const currentCommand = macCommands[this.currentCommandIndex];
    
    if (!this.isDeleting) {
      this.commandElement.textContent = currentCommand.substring(0, this.currentCharIndex);
      this.currentCharIndex++;
      
      if (this.currentCharIndex > currentCommand.length) {
        this.isDeleting = true;
        
        // Add output when command is complete
        setTimeout(() => {
          this.addOutput(currentCommand);
        }, 500);
        
        setTimeout(() => this.type(), 1500);
        return;
      }
    } else {
      this.commandElement.textContent = currentCommand.substring(0, this.currentCharIndex);
      this.currentCharIndex--;
      
      if (this.currentCharIndex < 0) {
        this.isDeleting = false;
        this.currentCommandIndex = (this.currentCommandIndex + 1) % macCommands.length;
        setTimeout(() => this.type(), 300);
        return;
      }
    }
    
    setTimeout(() => this.type(), this.isDeleting ? 30 : 80);
  }

  start(delay = 0) {
    setTimeout(() => this.type(), delay);
  }
}

// Animated Terminal Commands
const terminalCommands = {
  left: [
    'npm create react-app portfolio',
    'cd portfolio',
    'npm install @mui/material @emotion/react',
    'npm install framer-motion',
    'git init',
    'git add .',
    'git commit -m "Initial commit"',
    'npm run dev',
    'git add .',
    'git commit -m "Added components"',
    'git push origin main',
    'npm run build',
    'npm run deploy'
  ],
  right: [
    'mkdir api-server && cd api-server',
    'npm init -y',
    'npm install express mongoose cors',
    'npm install jsonwebtoken bcryptjs',
    'npm install -D nodemon',
    'git init',
    'git add .',
    'git commit -m "Initial API setup"',
    'npm start',
    'git add .',
    'git commit -m "Added auth routes"',
    'docker build -t api .',
    'docker run -p 5000:5000 api',
    'git push origin main',
    'npm run deploy'
  ],
  center: [
    'kubectl get pods',
    'docker-compose up -d',
    'terraform init',
    'terraform plan',
    'aws s3 sync ./build s3://bucket',
    'helm install myapp ./chart',
    'kubectl apply -f deployment.yaml',
    'docker build -t app:latest .',
    'terraform apply',
    'kubectl logs -f pod/app',
    'aws ecr push app:latest',
    'helm upgrade myapp ./chart'
  ]
};

class TerminalAnimator {
  constructor(side, commands) {
    this.side = side;
    this.commands = commands;
    this.currentCommandIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.element = document.getElementById(`animated-command-${side}`);
    this.contentElement = document.getElementById(`terminal-content-${side}`);
  }

  addContent(text, type = 'info') {
    if (!this.contentElement) return;
    
    const newLine = document.createElement('div');
    newLine.classList.add('terminal-line', type);
    newLine.textContent = text;
    this.contentElement.appendChild(newLine);
    
    // Auto-scroll by removing old lines if more than 6 lines
    const lines = this.contentElement.querySelectorAll('.terminal-line');
    if (lines.length > 6) {
      this.contentElement.removeChild(lines[0]);
    }
  }

  getOutputForCommand(command) {
    if (this.side === 'left') {
      const outputs = {
        'npm create react-app portfolio': '✓ React app created successfully\n📁 Created portfolio directory',
        'cd portfolio': '✓ Changed directory to portfolio',
        'npm install @mui/material @emotion/react': '✓ Material-UI dependencies installed\n📦 Added 47 packages',
        'npm install framer-motion': '✓ Framer Motion animation library added',
        'git init': '✓ Initialized empty Git repository',
        'git add .': '✓ Staged all files for commit',
        'git commit -m "Initial commit"': '✓ [main 1a2b3c4] Initial commit\n📝 15 files changed, 2,847 insertions(+)',
        'npm run dev': '🚀 Development server started\n🌐 Local: http://localhost:3000',
        'git commit -m "Added components"': '✓ [main 5f6g7h8] Added components\n📝 8 files changed, 156 insertions(+)',
        'git push origin main': '✓ Pushed to origin/main\n🌐 Deployed successfully',
        'npm run build': '📦 Production build created\n✨ Build completed in 8.2s',
        'npm run deploy': '🌐 Deployed to production\n✅ Site live at portfolio.dev'
      };
      return outputs[command] || '✓ Command executed';
    } else if (this.side === 'right') {
      const outputs = {
        'mkdir api-server && cd api-server': '✓ Created and entered api-server directory',
        'npm init -y': '✓ Package.json created with defaults',
        'npm install express mongoose cors': '✓ Backend dependencies installed\n📦 Added 23 packages',
        'npm install jsonwebtoken bcryptjs': '✓ Authentication packages added',
        'npm install -D nodemon': '✓ Development dependencies installed',
        'git init': '✓ Initialized Git repository',
        'git add .': '✓ Staged all files',
        'git commit -m "Initial API setup"': '✓ [main 9i0j1k2] Initial API setup\n📝 12 files changed, 1,234 insertions(+)',
        'npm start': '🚀 Server running on port 5000\n🔗 Connected to MongoDB',
        'git commit -m "Added auth routes"': '✓ [main 3l4m5n6] Added auth routes\n📝 6 files changed, 89 insertions(+)',
        'docker build -t api .': '🐳 Docker image built successfully\n📦 Image size: 245MB',
        'docker run -p 5000:5000 api': '📡 Container running on port 5000',
        'git push origin main': '✓ Pushed to origin/main\n☁️ CI/CD pipeline triggered',
        'npm run deploy': '☁️ API deployed to cloud\n✅ Live at api.portfolio.dev'
      };
      return outputs[command] || '✓ Command executed';
    } else if (this.side === 'center') {
      const outputs = {
        'kubectl get pods': '✓ NAME READY STATUS RESTARTS AGE\n📋 app-7d8f9g1h2 1/1 Running 0 2m',
        'docker-compose up -d': '🐳 Creating network app_default\n✅ Container app_db_1 Started',
        'terraform init': '⚡ Terraform initialized successfully\n📦 Provider plugins installed',
        'terraform plan': '📋 Plan: 5 to add, 0 to change, 0 to destroy\n✓ Infrastructure plan ready',
        'aws s3 sync ./build s3://bucket': '☁️ Uploading build files to S3\n✅ 23 files synced successfully',
        'helm install myapp ./chart': '⎈ Release myapp installed\n🚀 Chart deployed to cluster',
        'kubectl apply -f deployment.yaml': '✓ deployment.apps/myapp created\n📦 Service myapp-service created',
        'docker build -t app:latest .': '🐳 Building Docker image\n✅ Image app:latest built successfully',
        'terraform apply': '⚡ Applying infrastructure changes\n✅ Apply complete! Resources: 5 added',
        'kubectl logs -f pod/app': '📄 Streaming logs from pod\n🔍 App started on port 3000',
        'aws ecr push app:latest': '☁️ Pushing to ECR repository\n✅ Image pushed to registry',
        'helm upgrade myapp ./chart': '⎈ Upgrading release myapp\n✅ Release upgraded successfully'
      };
      return outputs[command] || '✓ Command executed';
    }
  }

  type() {
    if (!this.element) return;
    
    const currentCommand = this.commands[this.currentCommandIndex];
    
    if (!this.isDeleting) {
      this.element.textContent = currentCommand.substring(0, this.currentCharIndex);
      this.currentCharIndex++;
      
      if (this.currentCharIndex > currentCommand.length) {
        this.isDeleting = true;
        
        // Add output when command is complete
        const output = this.getOutputForCommand(currentCommand);
        const outputLines = output.split('\n');
        
        // Add each line with a slight delay for realistic effect
        outputLines.forEach((line, index) => {
          setTimeout(() => {
            this.addContent(line, 'success');
          }, index * 200);
        });
        
        setTimeout(() => this.type(), 800);
        return;
      }
    } else {
      this.element.textContent = currentCommand.substring(0, this.currentCharIndex);
      this.currentCharIndex--;
      
      if (this.currentCharIndex < 0) {
        this.isDeleting = false;
        this.currentCommandIndex = (this.currentCommandIndex + 1) % this.commands.length;
        setTimeout(() => this.type(), 200);
        return;
      }
    }
    
    setTimeout(() => this.type(), this.isDeleting ? 20 : 60);
  }

  start(delay = 0) {
    setTimeout(() => this.type(), delay);
  }
}

// Start terminal animations
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Mac terminal animation
  const macTerminal = new MacTerminalAnimator();
  macTerminal.start(500);
  
  // Initialize todo list animation
  const todoList = new TodoListAnimator();
  todoList.startTodoAnimation();
  
  // Initialize left and right terminals only
  const leftTerminal = new TerminalAnimator('left', terminalCommands.left);
  const rightTerminal = new TerminalAnimator('right', terminalCommands.right);

  leftTerminal.start(1000);
  rightTerminal.start(2000);
});