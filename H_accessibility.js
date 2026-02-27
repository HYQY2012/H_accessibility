<!-- 欢迎使用该无障碍工具！ -->
<!-- 该工具仓库链接：https://github.com/HYQY2012/H_accessibility -->
<!-- BY HYQY -->


const style=document.createElement('style');style.textContent=`
* {box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;}
.accessibility-sidebar{position:fixed;top:0;right:0;height:100vh;width:72px;background:rgba(255,255,255,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:-2px 0 15px rgba(0,0,0,0.05);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;z-index:99999;padding:20px 0;border-radius:12px 0 0 12px;margin-right:8px;}
.accessibility-icon-btn{width:56px;height:56px;border-radius:14px;border:none;background:rgba(245,245,247,1);color:#1d1d1f;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .1s ease;font-weight:600;}
.accessibility-icon-btn:hover{background:rgba(230,230,235,1);transform:scale(1.03);}
.accessibility-icon-btn.active{background:#0071e3;color:#fff;}
.accessibility-modal{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;z-index:999999;}
.accessibility-modal.show{display:flex;}
.accessibility-modal-content{width:80%;max-width:700px;background:#ffffff;border-radius:20px;padding:32px;box-shadow:0 15px 50px rgba(0,0,0,0.1);position:relative;}
.accessibility-close-modal{position:absolute;top:24px;right:24px;width:36px;height:36px;border-radius:50%;border:none;background:#f5f5f7;color:#1d1d1f;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.accessibility-close-modal:hover{background:#e8e8ed;}
.accessibility-svg-container{width:100%;height:380px;display:flex;align-items:center;justify-content:center;border:1px solid #f5f5f7;border-radius:16px;margin:24px 0;overflow:hidden;}
.accessibility-text-highlight{background:rgba(255,215,0,0.2)!important;color:#1d1d1f!important;}
body.contrast-high{background:#ffffff!important;color:#000000!important;font-weight:500!important;}
body.contrast-ultra{background:#000000!important;color:#ffffff!important;font-weight:600!important;}
body.font-bold-1{font-weight:500!important;}
body.font-bold-2{font-weight:600!important;}
body.font-bold-3{font-weight:700!important;}
.accessibility-subtitle{position:fixed;top:0;left:0;width:100%;background:rgba(0,0,0,0.8);color:#ffffff;padding:12px;text-align:center;font-size:20px;font-weight:600;z-index:99999998;display:none;backdrop-filter:blur(10px);}
.accessibility-subtitle.show{display:block;}
.accessibility-slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:#f5f5f7;border-radius:3px;margin:20px 0;}
.accessibility-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;border-radius:50%;background:#0071e3;cursor:pointer;border:2px solid #ffffff;box-shadow:0 2px 8px rgba(0,0,0,0.15);}
.accessibility-keyboard{position:fixed;left:0;bottom:0;width:100vw;background:rgba(255,255,255,0.98);backdrop-filter:blur(20px);padding:12px 8px;z-index:9999999;display:none;box-sizing:border-box;border-radius:16px 16px 0 0;box-shadow:0 -5px 30px rgba(0,0,0,0.08);touch-action:manipulation;}
.accessibility-keyboard.show{display:block!important;}
.keyboard-row{display:flex;gap:6px;margin-bottom:8px;}
.accessibility-key{flex:1;height:52px;border-radius:12px;border:none;background:#f5f5f7;color:#1d1d1f;font-size:18px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.08s ease;touch-action:manipulation;}
.accessibility-key.clicked{background:#0071e3;color:#ffffff;transform:scale(1.02);}
.key-func{flex:1.2;}
.key-space{flex:4;}
.key-shift.active{background:#0071e3;color:#ffffff;}
`;document.head.appendChild(style);

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('cut', e => e.preventDefault());
document.addEventListener('paste', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case 'c': case 'v': case 'x': case 'a': case 's': case 'p':
        e.preventDefault();
        break;
    }
  }
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    e.preventDefault();
  }
});

const sidebar=document.createElement('div');sidebar.className='accessibility-sidebar';sidebar.innerHTML=`
<button class="accessibility-icon-btn" id="font-size-plus">➕</button>
<button class="accessibility-icon-btn" id="font-size-minus">➖</button>
<button class="accessibility-icon-btn" id="font-weight">𝐁</button>
<button class="accessibility-icon-btn" id="contrast">◐</button>
<button class="accessibility-icon-btn" id="read-click">🗣️</button>
<button class="accessibility-icon-btn" id="speed-adjust">🕙</button>
<button class="accessibility-icon-btn" id="read-pause">⏯️</button>
<button class="accessibility-icon-btn" id="reset-all">🔄</button>
<button class="accessibility-icon-btn" id="about-us">ℹ️</button>
<button class="accessibility-icon-btn" id="toggle-subtitle">📝</button>
`;document.body.appendChild(sidebar);

const modal=document.createElement('div');modal.className='accessibility-modal';modal.innerHTML=`
<div class="accessibility-modal-content">
<div class="accessibility-svg-container">
<img src="about.svg" style="max-width:100%;max-height:100%;object-fit:contain" alt="关于我们">
</div>
<button class="accessibility-close-modal" id="close-modal">✕</button>
</div>
`;document.body.appendChild(modal);

const speedModal=document.createElement('div');speedModal.className='accessibility-modal';speedModal.innerHTML=`
<div class="accessibility-modal-content" style="max-width:500px;">
<input type="range" class="accessibility-slider" id="speech-rate" min="0.5" max="2" step="0.1" value="1">
<div style="display:flex;justify-content:space-between;font-weight:600;color:#86868b">
<span>慢速</span><span id="speed-value">1.0倍</span><span>快速</span></div>
<button class="accessibility-close-modal" id="close-speed-modal">✕</button>
</div>
`;document.body.appendChild(speedModal);

const subtitle=document.createElement('div');subtitle.className='accessibility-subtitle';subtitle.id='subtitle';document.body.appendChild(subtitle);

const keyboard=document.createElement('div');keyboard.className='accessibility-keyboard';
const letterLayoutUpper = `
<div class="keyboard-row">
<button class="accessibility-key">Q</button>
<button class="accessibility-key">W</button>
<button class="accessibility-key">E</button>
<button class="accessibility-key">R</button>
<button class="accessibility-key">T</button>
<button class="accessibility-key">Y</button>
<button class="accessibility-key">U</button>
<button class="accessibility-key">I</button>
<button class="accessibility-key">O</button>
<button class="accessibility-key">P</button>
</div>
<div class="keyboard-row">
<button class="accessibility-key">A</button>
<button class="accessibility-key">S</button>
<button class="accessibility-key">D</button>
<button class="accessibility-key">F</button>
<button class="accessibility-key">G</button>
<button class="accessibility-key">H</button>
<button class="accessibility-key">J</button>
<button class="accessibility-key">K</button>
<button class="accessibility-key">L</button>
<button class="accessibility-key key-func" data-action="backspace">⌫</button>
</div>
<div class="keyboard-row">
<button class="accessibility-key key-func key-shift" data-action="shift">↑</button>
<button class="accessibility-key">Z</button>
<button class="accessibility-key">X</button>
<button class="accessibility-key">C</button>
<button class="accessibility-key">V</button>
<button class="accessibility-key">B</button>
<button class="accessibility-key">N</button>
<button class="accessibility-key">M</button>
<button class="accessibility-key key-func" data-action="clear">🗑️</button>
</div>
<div class="keyboard-row">
<button class="accessibility-key key-func" data-action="switch-num">123</button>
<button class="accessibility-key key-func" data-action="symbol">§</button>
<button class="accessibility-key key-space" data-action="space">␣</button>
<button class="accessibility-key key-func" data-action="close">❌</button>
</div>
`;
const letterLayoutLower = `
<div class="keyboard-row">
<button class="accessibility-key">q</button>
<button class="accessibility-key">w</button>
<button class="accessibility-key">e</button>
<button class="accessibility-key">r</button>
<button class="accessibility-key">t</button>
<button class="accessibility-key">y</button>
<button class="accessibility-key">u</button>
<button class="accessibility-key">i</button>
<button class="accessibility-key">o</button>
<button class="accessibility-key">p</button>
</div>
<div class="keyboard-row">
<button class="accessibility-key">a</button>
<button class="accessibility-key">s</button>
<button class="accessibility-key">d</button>
<button class="accessibility-key">f</button>
<button class="accessibility-key">g</button>
<button class="accessibility-key">h</button>
<button class="accessibility-key">j</button>
<button class="accessibility-key">k</button>
<button class="accessibility-key">l</button>
<button class="accessibility-key key-func" data-action="backspace">⌫</button>
</div>
<div class="keyboard-row">
<button class="accessibility-key key-func key-shift active" data-action="shift">↑</button>
<button class="accessibility-key">z</button>
<button class="accessibility-key">x</button>
<button class="accessibility-key">c</button>
<button class="accessibility-key">v</button>
<button class="accessibility-key">b</button>
<button class="accessibility-key">n</button>
<button class="accessibility-key">m</button>
<button class="accessibility-key key-func" data-action="clear">🗑️</button>
</div>
<div class="keyboard-row">
<button class="accessibility-key key-func" data-action="switch-num">123</button>
<button class="accessibility-key key-func" data-action="symbol">§</button>
<button class="accessibility-key key-space" data-action="space">␣</button>
<button class="accessibility-key key-func" data-action="close">❌</button>
</div>
`;
const numberLayout = `
<div class="keyboard-row">
<button class="accessibility-key" data-value="1">1</button>
<button class="accessibility-key" data-value="2">2</button>
<button class="accessibility-key" data-value="3">3</button>
<button class="accessibility-key" data-value="4">4</button>
<button class="accessibility-key" data-value="5">5</button>
<button class="accessibility-key" data-value="6">6</button>
<button class="accessibility-key" data-value="7">7</button>
<button class="accessibility-key" data-value="8">8</button>
<button class="accessibility-key" data-value="9">9</button>
<button class="accessibility-key" data-value="0">0</button>
</div>
<div class="keyboard-row">
<button class="accessibility-key" data-value="!">!</button>
<button class="accessibility-key" data-value="@">@</button>
<button class="accessibility-key" data-value="#">#</button>
<button class="accessibility-key" data-value="$">$</button>
<button class="accessibility-key" data-value="%">%</button>
<button class="accessibility-key" data-value="^">^</button>
<button class="accessibility-key" data-value="&">&</button>
<button class="accessibility-key" data-value="*">*</button>
<button class="accessibility-key" data-value="(">(</button>
<button class="accessibility-key key-func" data-action="backspace">⌫</button>
</div>
<div class="keyboard-row">
<button class="accessibility-key key-func">↑</button>
<button class="accessibility-key" data-value="-">-</button>
<button class="accessibility-key" data-value="_">_</button>
<button class="accessibility-key" data-value="=">=</button>
<button class="accessibility-key" data-value="+">+</button>
<button class="accessibility-key" data-value="[">[</button>
<button class="accessibility-key" data-value="]">]</button>
<button class="accessibility-key" data-value="{">{</button>
<button class="accessibility-key key-func" data-action="clear">🗑️</button>
</div>
<div class="keyboard-row">
<button class="accessibility-key key-func" data-action="switch-letter">ABC</button>
<button class="accessibility-key key-func" data-action="symbol">§</button>
<button class="accessibility-key key-space" data-action="space">␣</button>
<button class="accessibility-key key-func" data-action="close">❌</button>
</div>
`;
keyboard.innerHTML = letterLayoutUpper;
document.body.appendChild(keyboard);

let baseFontSize=16,speechRate=1,clickReadMode=!1,currentUtterance=null,highlightedElement=null,fontWeightLevel=0,contrastLevel=0,subtitleVisible=!0,currentInput=null;
let isNumberMode = false;
let isUpperCase = true;

function speakSweet(t){const e=new SpeechSynthesisUtterance(t);e.lang="zh-CN";e.rate=speechRate;e.pitch=1.3;e.volume=1;window.speechSynthesis.speak(e)}
function resetAllKey(){document.querySelectorAll('.accessibility-key').forEach(k=>k.classList.remove('clicked'))}

function handleKeyClick(e){
  e.preventDefault();
  e.stopPropagation();
  resetAllKey();
  this.classList.add('clicked');
  setTimeout(()=>this.classList.remove('clicked'),80);
  
  if(!currentInput) return;
  
  const action = this.getAttribute('data-action');
  const value = this.getAttribute('data-value') || this.textContent.trim();
  const isNumberInput = currentInput.type === 'number' || (currentInput.hasAttribute('inputmode') && currentInput.getAttribute('inputmode') === 'numeric');

  switch(action){
    case 'backspace':
      currentInput.value = currentInput.value.slice(0, -1);
      break;
    case 'clear':
      currentInput.value = '';
      break;
    case 'close':
      keyboard.classList.remove('show');
      currentInput = null;
      break;
    case 'space':
      if(!isNumberInput) currentInput.value += ' ';
      else speakSweet("数字输入框不支持输入空格");
      break;
    case 'shift':
      isUpperCase = !isUpperCase;
      keyboard.innerHTML = isUpperCase ? letterLayoutUpper : letterLayoutLower;
      bindKeyEvents();
      speakSweet(isUpperCase ? "已切换为大写字母" : "已切换为小写字母");
      break;
    case 'switch-num':
      isNumberMode = true;
      keyboard.innerHTML = numberLayout;
      bindKeyEvents();
      break;
    case 'switch-letter':
      isNumberMode = false;
      keyboard.innerHTML = isUpperCase ? letterLayoutUpper : letterLayoutLower;
      bindKeyEvents();
      break;
    case 'symbol':
      speakSweet("符号功能暂未开放");
      break;
    default:
      if(isNumberInput){
        if(/^[0-9.\-]+$/.test(value)){
          currentInput.value += value;
        }else{
          speakSweet("当前为数字输入框，仅支持输入数字相关字符");
        }
      }else{
        currentInput.value += value;
      }
      break;
  }
}

function bindKeyEvents(){
  const keys = document.querySelectorAll('.accessibility-key');
  keys.forEach(key => {
    key.removeEventListener('click', handleKeyClick);
    key.addEventListener('click', handleKeyClick, {passive: false});
    key.addEventListener('touchstart', handleKeyClick, {passive: false});
  });
}

bindKeyEvents();

document.getElementById("font-size-plus").onclick=()=>{baseFontSize+=2;document.body.style.fontSize=baseFontSize+"px"};
document.getElementById("font-size-minus").onclick=()=>{baseFontSize>12&&(baseFontSize-=2);document.body.style.fontSize=baseFontSize+"px"};
document.getElementById("font-weight").onclick=()=>{fontWeightLevel=(fontWeightLevel+1)%4;document.body.classList.remove("font-bold-1","font-bold-2","font-bold-3");fontWeightLevel>0&&document.body.classList.add("font-bold-"+fontWeightLevel)};
document.getElementById("contrast").onclick=()=>{contrastLevel=(contrastLevel+1)%3;document.body.classList.remove("contrast-high","contrast-ultra");contrastLevel===1&&document.body.classList.add("contrast-high");contrastLevel===2&&document.body.classList.add("contrast-ultra")};
document.getElementById("read-click").onclick=()=>{clickReadMode=!clickReadMode;speakSweet(clickReadMode?"已开启朗读模式":"已关闭朗读模式")};
document.getElementById("speed-adjust").onclick=()=>{speedModal.classList.add("show")};
document.getElementById("speech-rate").oninput=t=>{speechRate=parseFloat(t.target.value);document.getElementById("speed-value").textContent=speechRate.toFixed(1)+"倍"};
document.getElementById("close-speed-modal").onclick=()=>{speedModal.classList.remove("show")};
document.getElementById("read-pause").onclick=()=>{window.speechSynthesis.paused?window.speechSynthesis.resume():window.speechSynthesis.pause()};
document.getElementById("reset-all").onclick=()=>{baseFontSize=16;document.body.style.fontSize="16px";document.body.classList.remove("font-bold-1","font-bold-2","font-bold-3","contrast-high","contrast-ultra");speakSweet("已恢复默认设置")};
document.getElementById("about-us").onclick=()=>{modal.classList.add("show")};
document.getElementById("close-modal").onclick=()=>{modal.classList.remove("show")};
document.getElementById("toggle-subtitle").onclick=()=>{subtitleVisible=!subtitleVisible;speakSweet(subtitleVisible?"字幕已打开":"字幕已关闭")};

document.addEventListener("click", function(e) {
  const target = e.target;
  if (target.closest(".accessibility-sidebar") || target.closest(".accessibility-modal")) return;

  const tag = target.tagName.toLowerCase();
  if ((tag === "input" || tag === "textarea") && clickReadMode) {
    currentInput = target;
    keyboard.classList.add("show");
    if(currentInput.type === 'number'){
      speakSweet("当前为数字输入框，请输入数字");
    }else{
      speakSweet("请使用无障碍键盘输入");
    }
    e.preventDefault();
    return;
  }

  if (!clickReadMode) return;
  if (target.closest('.accessibility-keyboard')) return;

  const ignore = ["script","style","svg","path","canvas","meta","link"];
  if (ignore.includes(target.tagName.toLowerCase()) || target.textContent.trim().length < 2) return;

  const text = target.textContent.trim();
  if (/\d{15}|\d{17}[\dXx]|1[3-9]\d{9}|密码|passw/i.test(text)) {
    speakSweet("包含敏感信息，已跳过");
    return;
  }

  if (highlightedElement) highlightedElement.classList.remove("accessibility-text-highlight");
  highlightedElement = target;
  target.classList.add("accessibility-text-highlight");

  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN"; u.pitch = 1.3; u.rate = speechRate;
  if (subtitleVisible) { subtitle.textContent = text; subtitle.classList.add("show"); }
  u.onend = () => {
    if (highlightedElement) highlightedElement.classList.remove("accessibility-text-highlight");
    subtitle.classList.remove("show");
  };
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
});

modal.onclick=t=>{t.target===modal&&modal.classList.remove("show")};

speedModal.onclick=t=>{t.target===speedModal&&speedModal.classList.remove("show")};
